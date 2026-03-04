# Cesta Validades

## O que é o Projeto

Cesta Validades é uma aplicação web para gerenciamento de produtos com controle de validade. O projeto permite que os usuários:

- **Criar produtos**: Adicionar novos produtos com informações como nome, marca, código de barras, NCM, valor de custo, data de validade e quantidade.
- **Visualizar produtos**: Exibir produtos em uma tabela paginada com informações detalhadas.
- **Buscar produtos**: Pesquisar produtos na base de dados.
- **Alternar tema**: Mudar entre tema claro e escuro.

O aplicativo é otimizado para facilitar o controle de inventário de produtos perecíveis, permitindo o acompanhamento de datas de validade.

## Tecnologias Utilizadas

- **React** (v19.2.0) - Biblioteca para construção de interfaces de usuário
- **TypeScript** (v5.9.3) - Superset de JavaScript com tipagem estática
- **Vite** (v7.3.1) - Ferramenta de build e servidor de desenvolvimento
- **Tailwind CSS** (v4.2.1) - Framework CSS utilitário para estilização
- **shadcn/ui** - Componentes de UI reutilizáveis e customizáveis

## Bibliotecas Principais

- **@tailwindcss/vite** (v4.2.1) - Plugin Tailwind CSS para Vite
- **@tanstack/react-table** (v8.21.3) - Biblioteca para construção de tabelas
- **date-fns** (v4.1.0) - Utilitários para manipulação de datas
- **lucide-react** (v0.575.0) - Ícones em SVG
- **react-day-picker** (v9.14.0) - Componente de calendário
- **class-variance-authority** (v0.7.1) - Utilitário para variações de CSS
- **clsx** (v2.1.1) - Utilitário para concatenação condicional de classes
- **tailwind-merge** (v3.5.0) - Utilitário para resolver conflitos de Tailwind CSS

## Passo a Passo para Rodar na Máquina

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd cesta-validades
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   - Abra seu navegador e acesse: `http://localhost:5173`

### Comandos Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run preview` - Visualiza o build em ambiente local
- `npm run lint` - Verifica o código com ESLint
