import os
import re

index_path = 'apps/api/src/db/models/index.ts'
with open(index_path, 'r') as f:
    content = f.read()

# Pattern to extract individual classes
# export class Name extends Model { ... } Name.init(...);
pattern = re.compile(r'(export class (\w+) extends Model \{.*?\n\}\n\2\.init\([\s\S]*?\);\n)', re.MULTILINE)
matches = pattern.findall(content)

imports = "import { DataTypes, Model, Optional } from 'sequelize';\nimport { sequelize } from '../index';\n\nconst def = { sequelize, timestamps: false };\n\n"

model_names = []
for match in matches:
    class_code = match[0]
    class_name = match[1]
    model_names.append(class_name)
    
    file_content = imports + class_code
    with open(f'apps/api/src/db/models/{class_name}.ts', 'w') as f:
        f.write(file_content)

print(f"Created {len(model_names)} model files: {', '.join(model_names)}")

# Now create the new index.ts
new_index = "import { sequelize } from '../index';\n\n"
for name in model_names:
    new_index += f"import {{ {name} }} from './{name}';\n"

new_index += "\n// Associations\n"
# Extract associations from original file
assoc_pattern = re.compile(r'// Associations\n([\s\S]+?)export const models =')
assoc_match = assoc_pattern.search(content)
if assoc_match:
    new_index += assoc_match.group(1).strip() + "\n\n"

new_index += "export const models = {\n"
for name in model_names:
    new_index += f"  {name},\n"
new_index += "};\n\n"

new_index += "export async function syncAppTables() {\n"
for name in ['RefreshToken', 'AuditLog', 'Bulletin']:
    if name in model_names:
        new_index += f"  await {name}.sync();\n"
new_index += "}\n"

with open('apps/api/src/db/models/index.ts', 'w') as f:
    f.write(new_index)

print("Updated index.ts")
