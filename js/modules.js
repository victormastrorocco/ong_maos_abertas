
/**
 * Função para salvar dados de forma persistente no navegador.
 * Ideal para manter o registro do usuário mesmo após fechar a aba.
 */
export function salvarNoArmazenamento(chave, dados) {
    // O localStorage exige que os objetos sejam convertidos em formato de texto (JSON)
    localStorage.setItem(chave, JSON.stringify(dados));
    console.log(`Dados gravados com sucesso na chave: ${chave}`);
}

/**
 * Função para recuperar os dados armazenados.
 */
export function recuperarDoArmazenamento(chave) {
    const dados = localStorage.getItem(chave);
    // Converte de volta de texto (JSON) para objeto JavaScript
    return dados ? JSON.parse(dados) : null;
}
