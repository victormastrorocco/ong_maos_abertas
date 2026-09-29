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
// A delegação otimiza a performance ao colocar um único listener no document
document.addEventListener('click', (evento) => {
    // Intercepta apenas os links marcados como roteamento interno (seus links de navegação)
    if (evento.target.matches('.header__link') || evento.target.matches('.btn--secondary')) {
        // Bloqueia o recarregamento nativo da página inteira
        evento.preventDefault(); 
        
        // Extrai a rota pretendida do atributo href e ajusta para o formato do nosso catálogo
        let caminho = evento.target.getAttribute('href');
        if (caminho === 'index.html') caminho = '/';
        if (caminho === 'projetos.html') caminho = '/projetos';
        if (caminho === 'cadastro.html') caminho = '/cadastro';
        
        // Registra a mudança de rota no histórico do navegador via History interface
        window.history.pushState(null, '', caminho); 
        
        // Atualiza o DOM injetando a nova interface
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

    // Só aplica a lógica se o formulário existir na página atual
    if (formCadastro) {
        // Escuta ativamente o gatilho de submissão de dados
        formCadastro.addEventListener('submit', (evento) => {
            // Evita o comportamento natural do navegador de recarregar a tela no submit
            evento.preventDefault(); 

            // Captura os dados do formulário
            const nome = document.getElementById('nome-completo').value.trim();
            const email = document.getElementById('email-usuario').value.trim();
            const cpf = document.getElementById('cpf-usuario').value.trim();
            const tipoApoio = document.getElementById('tipo-apoio').value;

            // Verificação rigorosa de consistência (validação de dados falhos)
            // Checa se os campos não estão vazios e se o email tem formato válido
            const emailValido = email.includes('@') && email.includes('.');
            const cpfValido = cpf.length >= 11;

            if (nome !== "" && emailValido && cpfValido && tipoApoio !== "") {
                const dadosUsuario = {
                    nome: nome,
                    email: email,
                    cpf: cpf,
                    apoio: tipoApoio,
                    dataCadastro: new Date().toLocaleDateString('pt-BR')
                };

                // Persistência da informação utilizando localStorage para criar sessões contínuas
                salvarNoArmazenamento('ong_voluntario', dadosUsuario);

                // Manipula o CSS via DOM para mostrar a mensagem de sucesso
                alertaSucesso.style.display = 'flex';
                alertaErro.style.display = 'none';
                
                // Limpa o formulário após salvar
                formCadastro.reset();
            } else {
                // Altera as condições dinâmicas para exibir a mensagem de erro
                alertaErro.style.display = 'flex';
                alertaSucesso.style.display = 'none';
            }
        });
    }
});
