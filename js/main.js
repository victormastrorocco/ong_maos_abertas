// Importa as funções de armazenamento do nosso módulo
import { salvarNoArmazenamento, recuperarDoArmazenamento } from './modules.js';

// 1. Função de controle visual de rotas SPA baseadas em Hash (Sem apagar o layout estático)
const gerenciarRotasSPA = () => {
    const hash = window.location.hash || '#/';
    
    // Identifica qual página estamos com base na URL atual
    const path = window.location.pathname;
    
    // Atualiza classes ativas nos links de navegação do menu
    const links = document.querySelectorAll('.header__link, .btn--secondary');
    links.forEach(link => {
        link.style.color = ''; // Reseta cores
        if (link.getAttribute('href') === 'index.html' && (hash === '#/' || hash === '#')) {
            link.style.color = 'var(--color-primary)';
        }
        if (link.getAttribute('href') === 'projetos.html' && hash === '#projetos') {
            link.style.color = 'var(--color-primary)';
        }
    });
};

// 2. O "Escutador" de Navegação SPA (Delegação de Eventos via Hash)
document.addEventListener('click', (evento) => {
    const target = evento.target.closest('a');
    if (target && (target.matches('.header__link') || target.matches('.btn--secondary'))) {
        let href = target.getAttribute('href');
        
        // Se for um link interno para outra página HTML do projeto, permite a navegação natural para carregar a estrutura completa
        if (href && (href.includes('index.html') || href.includes('projetos.html') || href.includes('cadastro.html'))) {
            return; // Deixa o navegador abrir a página normalmente preservando o design
        }
    }
});

// 3. Sincronização com a mudança de hash ou carregamento
window.addEventListener('hashchange', gerenciarRotasSPA);

// 4. Inicialização: Executa no carregamento da página e gerencia o formulário e localStorage
document.addEventListener('DOMContentLoaded', () => {
    gerenciarRotasSPA();

    const formCadastro = document.getElementById('form-cadastro');
    const alertaSucesso = document.getElementById('alerta-sucesso');
    const alertaErro = document.getElementById('alerta-erro');

    if (formCadastro) {
        
        // --- FLUXO INVERSO: RESTAURAÇÃO DA INTERFACE VIA LOCALSTORAGE ---
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

            // Validação com RegEx de consistência
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

                // Gravação persistente no localStorage
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
