// Importa a função de armazenamento do nosso módulo
import { salvarNoArmazenamento } from './modules.js';

// 1. Definição do catálogo de rotas (Mapeamento URL -> Fragmento HTML)
const rotas = {
    '/': '<h1>Início</h1><p>Bem-vindo à página principal do sistema.</p>',
    '/projetos': '<h1>Projetos Ativos</h1><p>Conheça nossas frentes de atuação.</p>',
    '/cadastro': '<h1>Registro</h1><p>Preencha os dados no formulário abaixo.</p>'
};

// 2. Função principal para limpar e renderizar o contêiner alvo
const renderizarConteudo = (caminho) => {
    // Localiza o contêiner base na árvore DOM (sua tag <main>)
    const container = document.querySelector('main');
    
    // Resgata o template da rota solicitada ou devolve erro 404 se não existir
    const fragmentoHTML = rotas[caminho] || '<h1>Erro 404</h1><p>Página não encontrada.</p>';
    
    // Insere a marcação HTML interna para atualizar a view dinâmica
    if (container) {
        container.innerHTML = fragmentoHTML;
    }
};

// 3. O "Escutador" de Navegação SPA (Delegação de Eventos)
document.addEventListener('click', (evento) => {
    // Intercepta apenas os links marcados como roteamento interno
    if (evento.target.matches('.header__link') || evento.target.matches('.btn--secondary')) {
        evento.preventDefault(); 
        
        let caminho = evento.target.getAttribute('href');
        if (caminho === 'index.html') caminho = '/';
        if (caminho === 'projetos.html') caminho = '/projetos';
        if (caminho === 'cadastro.html') caminho = '/cadastro';
        
        window.history.pushState(null, '', caminho); 
        renderizarConteudo(caminho);
    }
});

// 4. Sincronização com as setas "Voltar" e "Avançar" do navegador
window.addEventListener('popstate', () => {
    renderizarConteudo(window.location.pathname);
});

// 5. Inicialização e Controle de Formulário (Eventos de Submit)
document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-cadastro');
    const alertaSucesso = document.getElementById('alerta-sucesso');
    const alertaErro = document.getElementById('alerta-erro');

    if (formCadastro) {
        formCadastro.addEventListener('submit', (evento) => {
            evento.preventDefault(); 

            // Captura os dados do formulário removendo espaços extras
            const nome = document.getElementById('nome-completo').value.trim();
            const email = document.getElementById('email-usuario').value.trim();
            const cpf = document.getElementById('cpf-usuario').value.trim();
            const tipoApoio = document.getElementById('tipo-apoio').value;

            // --- LÓGICA CONDICIONAL E REGEX ---
            // Verifica se o email tem formato válido (texto@texto.texto)
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailValido = regexEmail.test(email);

            // Tira traços e pontos do CPF e verifica se sobraram 11 números
            const cpfLimpo = cpf.replace(/\D/g, ''); 
            const regexCpf = /^[0-9]{11}$/;
            const cpfValido = regexCpf.test(cpfLimpo);

            // Verificação de consistência: Tudo deve estar correto e preenchido
            if (nome !== "" && emailValido && cpfValido && tipoApoio !== "") {
                const dadosUsuario = {
                    nome: nome,
                    email: email,
                    cpf: cpfLimpo,
                    apoio: tipoApoio,
                    dataCadastro: new Date().toLocaleDateString('pt-BR')
                };

                // Persistência da informação
                salvarNoArmazenamento('ong_voluntario', dadosUsuario);

                // Manipula o DOM para mostrar sucesso e ocultar erro
                alertaSucesso.style.display = 'flex';
                alertaErro.style.display = 'none';
                
                formCadastro.reset();
            } else {
                // Manipula o DOM para mostrar erro e ocultar sucesso
                alertaErro.style.display = 'flex';
                alertaSucesso.style.display = 'none';
            }
        });
    }
});
