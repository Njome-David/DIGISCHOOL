import { Project, SyntaxKind, Node } from 'ts-morph';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const project = new Project({
  tsConfigFilePath: path.join(__dirname, '../tsconfig.app.json'),
});

const localesPath = path.join(__dirname, '../src/locales/fr.json');
let dict: Record<string, string> = {};
if (fs.existsSync(localesPath)) {
  dict = JSON.parse(fs.readFileSync(localesPath, 'utf8'));
}

function generateKey(text: string) {
  let key = text.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_');
  if (key.length > 30) key = key.substring(0, 30);
  if (key.endsWith('_')) key = key.slice(0, -1);
  if (key.startsWith('_')) key = key.slice(1);
  return key || 'empty_key';
}

function processFile(filePath: string) {
  const sourceFile = project.getSourceFile(filePath);
  if (!sourceFile) return;

  let needsImport = false;
  let componentsToInject = new Set<Node>();

  // 1. Process JSX Texts
  const jsxTexts = sourceFile.getDescendantsOfKind(SyntaxKind.JsxText);
  jsxTexts.forEach(node => {
    const text = node.getLiteralText();
    if (!text.trim() || text.trim().length < 2 || !/[a-zA-Z]/.test(text)) return;
    
    const comp = node.getFirstAncestorByKind(SyntaxKind.FunctionDeclaration) || 
                 node.getFirstAncestorByKind(SyntaxKind.ArrowFunction);
    if (comp) componentsToInject.add(comp);

    const val = text.trim();
    const key = generateKey(val);
    dict[key] = val;
    
    node.replaceWithText(`{t('${key}')}`);
    needsImport = true;
  });

  // 2. Process String Attributes in JSX
  const jsxAttributes = sourceFile.getDescendantsOfKind(SyntaxKind.JsxAttribute);
  jsxAttributes.forEach(node => {
    if (!Node.isJsxAttribute(node)) return;
    const nameNode = node.getNameNode();
    const name = nameNode ? nameNode.getText() : '';
    if (['label', 'placeholder', 'title', 'hint', 'description'].includes(name)) {
      const init = node.getInitializer();
      if (init && Node.isStringLiteral(init)) {
        const val = init.getLiteralValue();
        if (!val.trim() || !/[a-zA-Z]/.test(val)) return;
        
        const comp = node.getFirstAncestorByKind(SyntaxKind.FunctionDeclaration) || 
                     node.getFirstAncestorByKind(SyntaxKind.ArrowFunction);
        if (comp) componentsToInject.add(comp);

        const key = generateKey(val);
        dict[key] = val;
        
        init.replaceWithText(`{t('${key}')}`);
        needsImport = true;
      }
    }
  });

  if (needsImport) {
    // Add import if missing
    const hasImport = sourceFile.getImportDeclarations().some(i => i.getModuleSpecifierValue() === 'react-i18next');
    if (!hasImport) {
      sourceFile.addImportDeclaration({
        namedImports: ['useTranslation'],
        moduleSpecifier: 'react-i18next'
      });
    }

    // Inject hook into any function or arrow function that uses t(
    const injectHook = (body: Node) => {
      if (Node.isBlock(body)) {
        const text = body.getText();
        if (text.includes('t(') && !text.includes('useTranslation()')) {
          body.insertStatements(0, 'const { t } = useTranslation();');
        }
      }
    };

    sourceFile.getFunctions().forEach(f => {
      const body = f.getBody();
      if (body) injectHook(body);
    });

    sourceFile.getVariableDeclarations().forEach(v => {
      const init = v.getInitializer();
      if (init && Node.isArrowFunction(init)) {
        const body = init.getBody();
        if (body) injectHook(body);
      }
    });

    sourceFile.saveSync();
  }
}

// Run on all TSX files in src/
const srcDir = path.join(__dirname, '../src');
const allSourceFiles = project.getSourceFiles();

allSourceFiles.forEach(sourceFile => {
  const filePath = sourceFile.getFilePath();
  if (filePath.endsWith('.tsx') && filePath.includes('/src/')) {
    // skip main and app
    if (!filePath.endsWith('main.tsx') && !filePath.endsWith('App.tsx')) {
      console.log('Processing:', filePath);
      try {
        processFile(filePath);
      } catch (e) {
        console.error('Failed on:', filePath, e);
      }
    }
  }
});

// Save dictionary
fs.writeFileSync(localesPath, JSON.stringify(dict, null, 2));
console.log('Done processing all TSX files');
