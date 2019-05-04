;(function(){
    "use strict"    
document.getElementById("btnMudaLayout").addEventListener("click",function(){
    if (document.querySelector(".mural").classList.contains("muralColunas")){
        layoutLinhas();
    }else{
        layoutColunas();
    }
});

function layoutLinhas(){
    document.querySelector(".mural").classList.remove("muralColunas");
    document.querySelector(".mural").classList.add("muralLinhas");
    document.querySelector("#btnMudaLayout").innerHTML = "Colunas";
    
}

function layoutColunas(){
    document.querySelector(".mural").classList.remove("muralLinhas");
    document.querySelector(".mural").classList.add("muralColunas");
    document.querySelector("#btnMudaLayout").innerHTML = "Linhas";
}

let numeroCartao = 0;
window.form = document.querySelector(".formNovoCartao");

window.adicionaCartaoNoMural = function(cartaoObj){
    numeroCartao++;

    const conteudoCartao = cartaoObj.conteudo;
    
    const cartao = $(`
    <article id="cartao_${numeroCartao}" tabindex="0" class="cartao">
        <div class="opcoesDoCartao">
            <button class="opcoesDoCartao-remove opcoesDoCartao-opcao" tabindex="0">
                <svg><use xlink:href="#iconeRemover"></use></svg>
            </button>
    
            <input type="radio" name="corDoCartao${numeroCartao}" value="#EBEF40" id="corPadrao-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo" checked>
            <label for="corPadrao-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #EBEF40;" tabindex="0">
                Padrão
            </label>
    
            <input type="radio" name="corDoCartao${numeroCartao}" value="#F05450" id="corImportante-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo">
            <label for="corImportante-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #F05450;" tabindex="0">
                Importante
            </label>
    
            <input type="radio" name="corDoCartao${numeroCartao}" value="#92C4EC" id="corTarefa-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo">
            <label for="corTarefa-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #92C4EC;" tabindex="0">
                Tarefa
            </label>
    
            <input type="radio" name="corDoCartao${numeroCartao}" value="#76EF40" id="corInspiracao-cartao${numeroCartao}" class="opcoesDoCartao-radioTipo">
            <label for="corInspiracao-cartao${numeroCartao}" class="opcoesDoCartao-tipo opcoesDoCartao-opcao" style="color: #76EF40;" tabindex="0">
                Inspiracão
            </label>
        </div>
        <p class="cartao-conteudo" contenteditable tabindex="0">${conteudoCartao}</p>
    </article>
    `);

    cartao.css("background-color", cartaoObj.cor);

    cartao.on("focusin", function(){
        cartao.addClass("cartao--focado");
    });

    cartao.on("focusout", function(){
        cartao.removeClass("cartao--focado");
    });

    cartao.on("change", ".opcoesDoCartao-radioTipo", function mudaCor(event){
        cartao.css("background-color", event.target.value);
    });

    cartao.on("keydown", function deixaClicarComEnter(event){
        if (event.target.classList.contains("opcoesDoCartao-opcao") && (event.key === "Enter" || event.key === " ")){
            event.target.click();
        }
    });

    cartao.on('click', function(event){
        const elementoSelecionado = event.target;
        if (elementoSelecionado.classList.contains('opcoesDoCartao-remove')){
            cartao.addClass("cartao--some");
            cartao.on("transitionend", function(){
                cartao.remove();
            })
        }
    });


    $(".mural").append(cartao);
}
$.ajax({
    url: env + "api/configuracoes/sambrmg@gmail.com"
    ,method: "GET"
    ,dataType: "json"
    ,success: function(objeto){
        if(objeto.length > 0 ){
            if(objeto[0].direcao == "Linhas"){
                layoutColunas()
            }else{
                layoutLinhas()
            }
        }
    }
});
$.ajax({
    url: env + "api/cartoes/sambrmg@gmail.com"
    ,method: "GET"
    ,dataType: "json"
    ,success: function(objeto){
        if(objeto.length > 0 ){
            const cartoes = objeto[0].cartoes;
            cartoes.forEach(function(cartao){
                adicionaCartaoNoMural(cartao);
                
            })
        }
    }
});

})()