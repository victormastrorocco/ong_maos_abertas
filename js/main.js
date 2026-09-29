// Importa as funções de armazenamento do nosso módulo
import { salvarNoArmazenamento, recuperarDoArmazenamento } from './modules.js';

// 1. Definição do catálogo de rotas baseado em Hash (Evita erro 404 no F5 do GitHub Pages)
const rotas = {
    '#': '<h1>Início</h1><p>Bem-vindo à página principal do sistema.</p>',
    '#/': '<h1>Início</h1><p>Bem-vindo à página principal do sistema.</p>',
    '#projetos': '<h1>Projetos Ativos</h1><p>Conheça nossas frentes de atuação.</p>',
    '#cadastro': '<h1>Registro</h1><p>Preencha os dados no formulário abaixo.</p>'
};

// 2. Função principal para limpar e renderizar o contêiner alvo baseado no Hash atual
const renderizarConteudo = () => {
    const hash = window.location.hash || '#/';
    const container = document.querySelector('main');
    
    // Resgata o template da rota solicitada ou devolve erro 404
    const fragmentoHTML = rotas[hash] || '<h1>Erro 404</h1><p>Página não encontrada.</p>';
    
    if (container) {
        container.innerHTML = fragmentoHTML;
    }
};

// 3. O "Escutador" de Navegação SPA (Delegação de Eventos via Hash)
document.addEventListener('click', (evento) => {
    if (evento.target.matches('.header__link') || evento.target.matches('.btn--secondary')) {
        evento.preventDefault(); 
        
        let href = evento.target.getAttribute('href');
        let hash = '#/';
        
        if (href.includes('projetos')) {
            hash = '#projetos';
        } else if (href.includes('cadastro')) {
            hash = '#cadastro';
        }
        
        // Altera o hash na URL sem recarregar o servidor
        window.location.hash = hash;
        renderizarConteudo();
    }
});

// 4. Sincronização com a mudança de hash na URL
window.addEventListener('hashchange', renderizarConteudo);

// 5. Inicialização: Executa no carregamento da página e gerencia o formulário
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza a rota inicial com base no hash atual da URL
    renderizarConteudo();

    const formCadastro = document.getElementById('form-cadastro');
    const alertaSucesso = document.getElementById('alerta-sucesso');
    const alertaErro = document.getElementById('alerta-erro');

    if (formCadastro) {
        
        // --- FLUXO INVERSO: RESTAURAÇÃO DA INTERFACE ---
        const dadosSalvos = recuperarDoArmazenamento('ong_voluntario');
        if (dadosSalvos) {
            const inputNome = document.getElementById('nome-completo');
            const inputEmail = document.getElementById('email-usuario');
            const inputCpf = document.getElementById('cpf-usuario');
            const selectApoio = document.getElementById('tipo-apoio');

            if (inputNome) inputNome.value = dadosSalvos.nome || '';
            if (inputEmail) inputEmail.value = dadosSalvos.email || '';
            if (inputCpf) inputCpf.value = dadosSalvos.cpf || '';
            if (selectApoio && dadosSalvos.apoio) selectApoio.value = dadosSalvos.apoio;
        }

        formCadastro.addEventListener('submit', (evento) => {
            evento.preventDefault(); 

            const nome = document.getElementById('nome-completo').value.trim();
            const email = document.getElementById('email-usuario').value.trim();
            const cpf = document.getElementById('cpf-usuario').value.trim();
            const tipoApoio = document.getElementById('tipo-apoio').value;

            // Validação com RegEx
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailValido = regexEmail.test(email);

            const cpfLimpo = cpf.replace(/\D/g, ''); 
            const regexCpf = /^[0-9]{11}$/;
            const cpfValido = regexCpf.test(cpfLimpo);

            if (nome !== "" && emailValido && cpfValido && tipoApoio !== "") {
                const dadosUsuario = {
                    nome: nome,
                    email: email,
                    cpf: cpfLimpo,
                    apoio: tipoApoio,
                    dataCadastro: new Date().toLocaleDateString('pt-BR')
                };

                salvarNoArmazenamento('ong_voluntario', dadosUsuario);

                if (alertaSucesso) alertaSucesso.style.display = 'flex';
                if (alertaErro) alertaErro.style.display = 'none';
                
            } else {
                if (alertaErro) alertaErro.style.display = 'flex';
                if (alertaSucesso) alertaSucesso.style.display = 'none';
            }
        });
    }
});
