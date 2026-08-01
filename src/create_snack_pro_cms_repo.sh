#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET_DIR="$ROOT_DIR/snack-pro-cms"

if [ -d "$TARGET_DIR" ]; then
  echo "Error: target directory already exists: $TARGET_DIR"
  exit 1
fi

mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"

# Initialize git repo on main
git init -b main

# Add README
cat > README.md <<'MD'
# snack-pro-cms

Repositorio local para el proyecto Snack Pro (CMS).
Este repo se creó localmente y queda listo para agregar un remote y sincronizar con la rama remota.

Comandos útiles:
- Agregar remote: git remote add origin <REMOTE_URL>
- Subir main: git push -u origin main
MD

# Add sensible .gitignore
cat > .gitignore <<'IGN'
# Node / build
node_modules/
dist/
build/
.vscode/
.idea/
.DS_Store

# Env
.env
.env.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Misc
/coverage
/.cache
IGN

# Create a minimal placeholder app
mkdir -p src
cat > src/index.html <<'HTML'
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>snack-pro-cms</title>
  </head>
  <body>
    <div id="root">snack-pro-cms placeholder</div>
  </body>
</html>
HTML

# Initial commit
git add .
git commit -m "chore: init snack-pro-cms local repository"

echo "Repository initialized at: $TARGET_DIR"
echo "Next: cd \"$TARGET_DIR\" && git remote add origin <REMOTE_URL> && git push -u origin main"
