/* o fs é quem irá ler o arquivo e gerar um novo,
ele vem por padrão no node, então não se preocupe */
const fs = require('fs')

// esta parte lê o arquivo "README_BASE"
fs.readFile('README-ALT.md', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

/* aqui é onde acontecem as substituições, por exemplo
substituindo %{titulo} por "Dynamic Readme" */
    const substituicoes = {
        titulo: 'Dynamic Readme',
        listaDeNomes: `- Carlos\n- Ana\n- Sérgio`
    }

/* aqui é o que verifica e executa as substituições, um
regex bem simples com object literals, não precisa mexer aqui */
    const modificado = data
        .replace(
            /%{.*}/gm,
            e => substituicoes?.[e.slice(2, -1)] || e
        )

/* após ter feito as mudanças ele cria um arquivo
chamado "README.md" com a nova versão */
    fs.writeFile('README.md', modificado, 'utf-8', (err) => {
        if (err) {
            throw err;
        }
        console.log('✔ Processo finalizado!');
    });
});