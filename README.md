# ONG Mãos Abertas - Plataforma de Apoio e Voluntariado

## 📋 Sobre o Projeto
Aplicação web front-end desenvolvida para fortalecer a presença digital de organizações do terceiro setor (ONGs), facilitando a captação de recursos e o engajamento de voluntários. O sistema foi estruturado como uma Single Page Application (SPA), garantindo navegação fluida, validação robusta de dados e persistência local.
## 🚀 Funcionalidades
- **Roteamento SPA por Hash:** Sistema de navegação dinâmico otimizado para evitar erros 404 em ambientes de hospedagem estática como o GitHub Pages.
- **Módulos ES6:** Organização de código limpa e modularizada, separando utilitários de armazenamento e regras de negócio (`modules.js` e `main.js`)
- **Validação de Formulários via RegEx:** Verificação rigorosa da consistência de dados para e-mails e CPFs informados pelos voluntários
- **Persistência com LocalStorage:** Retenção local dos dados da sessão e suporte ao fluxo inverso de restauração de preenchimento na interface

## 🛠️ Tecnologias Utilizadas
- **HTML5 Semântico** (com suporte às diretrizes de acessibilidade WCAG 2.1)
- **CSS3** (Estilização modular, Flexbox e Grid)
- **Vanilla JavaScript (ES6+ Modules)**
- **Git e GitHub Pages** (Controle de versões via GitFlow e deploy de produção)

## 💻 Instalação e Execução Local
Para testar e executar este projeto localmente em sua máquina, siga os passos abaixo:

```bash
# Clone o repositório para o seu ambiente local
$ git clone [https://github.com/victormastrorocco/victormastrorocco.github.io.git](https://github.com/victormastrorocco/victormastrorocco.github.io.git)

# Entre na pasta raiz do projeto
$ cd victormastrorocco.github.io

# Abra o arquivo index.html diretamente no seu navegador ou utilize um servidor local (como a extensão Live Server do VS Code)
