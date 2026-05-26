const fs = require('fs');

let content = fs.readFileSync('apps/api/src/db/models/index.ts', 'utf8');

// The imports are currently: import { Admin } from './Admin';
// We need to change them to: import { Admin } from './Admin'; export { Admin };

const newContent = content.replace(/import \{ (\w+) \} from '\.\/\1';/g, "import { $1 } from './$1';\nexport { $1 };");

fs.writeFileSync('apps/api/src/db/models/index.ts', newContent);
console.log("Exports fixed.");
