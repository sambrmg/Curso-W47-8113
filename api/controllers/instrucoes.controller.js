exports.listar = function (req, res) {
    res.send({
        instrucoes: [
            {
                conteudo: "Bem vindo ao web-8113!",
                cor: "#FFAA10"
            },
            {
                conteudo: "O site é otimizado para celulares!",
                cor: "#45AAEE"
            },
            {
                conteudo: "Para mudar o layout, clique no botão Linha do cabeçalho",
                cor: "#FF1010"
            }
        ]
    });
};