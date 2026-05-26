const fs = require('fs');

const content = fs.readFileSync('apps/api/src/db/models/index.ts', 'utf8');

// Regex to capture "export class Name extends Model { ... } Name.init( ... );"
const regex = /(export class (\w+) extends Model \{[\s\S]*?\n\}\n\2\.init\([\s\S]*?\);)/g;

let match;
const modelNames = [];

while ((match = regex.exec(content)) !== null) {
  const classCode = match[1];
  const className = match[2];
  modelNames.push(className);

  const fileContent = `import { DataTypes, Model, Optional } from 'sequelize';\nimport { sequelize } from '../index';\n\nconst def = { sequelize, timestamps: false };\n\n${classCode}\n`;

  fs.writeFileSync(`apps/api/src/db/models/${className}.ts`, fileContent);
}

console.log(`Created ${modelNames.length} models: ${modelNames.join(', ')}`);

if (modelNames.length === 0) {
    console.log("Failed to match models.");
    process.exit(1);
}

// Generate new index.ts
let newIndex = `import { sequelize } from '../index';\n\n`;

for (const name of modelNames) {
  newIndex += `import { ${name} } from './${name}';\n`;
}

newIndex += `\n// Associations\n`;
const assocMatch = content.match(/\/\/ Associations\n([\s\S]+?)export const models =/);
if (assocMatch) {
  newIndex += assocMatch[1].trim() + '\n\n';
}

newIndex += `export const models = {\n`;
for (const name of modelNames) {
  newIndex += `  ${name},\n`;
}
newIndex += `};\n\n`;

newIndex += `export async function syncAppTables() {\n`;
for (const name of ['RefreshToken', 'AuditLog', 'Bulletin']) {
  if (modelNames.includes(name)) {
    newIndex += `  await ${name}.sync();\n`;
  }
}
newIndex += `}\n`;

fs.writeFileSync('apps/api/src/db/models/index.ts', newIndex);
console.log('Updated index.ts successfully.');
