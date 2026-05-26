#!/bin/bash

# Backend modules
cd apps/api/src/modules
modules=("auth" "academic" "pedagogy" "evaluations" "payments" "messages" "discipline" "documents" "reporting" "users")

for mod in "${modules[@]}"; do
    mkdir -p "$mod"
    if [ ! -f "$mod/$mod.controller.ts" ]; then
        touch "$mod/$mod.controller.ts"
        touch "$mod/$mod.routes.ts"
        touch "$mod/$mod.service.ts"
        touch "$mod/$mod.schema.ts"
    fi
done

cd ../../../../

# Frontend features
cd apps/web/src/features
features=("auth" "students" "academic" "pedagogy" "evaluations" "payments" "messages" "discipline" "documents" "dashboards")

for feat in "${features[@]}"; do
    mkdir -p "$feat/components"
    mkdir -p "$feat/hooks"
    mkdir -p "$feat/api"
    mkdir -p "$feat/store"
    # Create an index to make it not completely empty
    if [ ! -f "$feat/index.ts" ]; then
        echo "export * from './components';" > "$feat/index.ts"
    fi
done

cd ../../../../

# Shared components
mkdir -p apps/web/src/shared/components/ui
mkdir -p apps/web/src/shared/components/layout
mkdir -p apps/web/src/shared/components/form

echo "Directory structure created successfully."
