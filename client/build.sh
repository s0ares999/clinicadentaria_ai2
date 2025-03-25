#!/bin/bash
# Instalar dependências
npm install

# Corrigir permissões de execução para o react-scripts
chmod +x node_modules/.bin/react-scripts

# Executar o build ignorando warnings
CI=false npm run build 