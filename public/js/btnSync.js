;(function(){
    const btnSync = $("#btnSync");
    function salvarConfig(){
        const salvarConfig = new XMLHttpRequest();
        salvarConfig.open('POST', env + 'api/configuracoes/salvar');
        salvarConfig.setRequestHeader("Content-Type", "application/json");
        var configMural = {
            usuario: "sambrmg@gmail.com",
            direcao: document.querySelector("#btnMudaLayout").innerHTML.trim()
        }
        salvarConfig.send(JSON.stringify(configMural));
    }
    btnSync.click(function(){

        salvarConfig();

        btnSync.addClass("botaoSync--esperando");
        btnSync.removeClass("botaoSync--sincronizado");

        const salvadorDeCartoes = new XMLHttpRequest();
        salvadorDeCartoes.open('POST', env + 'api/cartoes/incluir');
        salvadorDeCartoes.setRequestHeader("Content-Type", "application/json");

        const cartoes = document.querySelectorAll(".cartao");
        const infosDoMural = {
            usuario: "sambrmg@gmail.com"
            ,cartoes: Array.from($(".cartao")).map(function(cartao){
                return {
                    conteudo: cartao.querySelector(".cartao-conteudo").textContent
                    ,cor: getComputedStyle(cartao).getPropertyValue("background-color")
                }
            })
        }

        salvadorDeCartoes.send(JSON.stringify(infosDoMural));

        salvadorDeCartoes.addEventListener("load", function(){
            const response = JSON.parse(salvadorDeCartoes.response);
            console.log(`${response.quantidade} cartões salvos em ${response.usuario}`);

            btnSync.removeClass("botaoSync--esperando");
            btnSync.addClass("botaoSync--sincronizado");
        });

        salvadorDeCartoes.addEventListener("error", function(){
            btnSync.removeClass("botaoSync--esperando");
            btnSync.addClass("botaoSync--deuRuim");
        });
    });

    btnSync.removeClass('no-js');
})()