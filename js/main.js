// Importa a função de armazenamento do nosso módulo
import { salvarNoArmazenamento } from './modules.js';

// Aguarda o carregamento completo da página (DOM) antes de executar
document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-cadastro');
    const alertaSucesso = document.getElementById('alerta-sucesso');
    const alertaErro = document.getElementById('alerta-erro');

    // Verifica se o formulário existe na página atual (para não dar erro nas outras páginas)
    if (formCadastro) {
        formCadastro.addEventListener('submit', (evento) => {
            // Previne que a página recarregue ao enviar o formulário
            evento.preventDefault(); 

            // Captura os valores digitados (Manipulação do DOM)
            const nome = document.getElementById('nome-completo').value;
            const email = document.getElementById('email-usuario').value;
            const tipoApoio = document.getElementById('tipo-apoio').value;

            // Validação simples
            if (nome !== "" && email !== "" && tipoApoio !== "") {
                // Cria um objeto com os dados
                const dadosUsuario = {
                    nome: nome,
                    email: email,
                    apoio: tipoApoio,
                    dataCadastro: new Date().toLocaleDateString('pt-BR')
                };

                // Salva os dados de forma persistente
                salvarNoArmazenamento('ong_voluntario', dadosUsuario);

                // Manipula o CSS via DOM para mostrar a mensagem de sucesso
                alertaSucesso.style.display = 'flex';
                alertaErro.style.display = 'none';
                
                // Limpa o formulário
                formCadastro.reset();
            } else {
                // Exibe a mensagem de erro
                alertaErro.style.display = 'flex';
                alertaSucesso.style.display = 'none';
            }
        });
    }
});
