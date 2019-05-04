btnsRemover = document.querySelectorAll(".opcoesDoCartao-remove");
cartoes = document.querySelectorAll(".cartao");

cartoes.forEach(cartao => {
    cartao.addEventListener("change",function mudaCor(event){
        const elementoSelecionado = event.target;
        const isRadioTipo = elementoSelecionado.classList.contains('opcoesDoCartao-radioTipo');
        if (isRadioTipo){
            cartao.style.backgroundColor = elementoSelecionado.value;
        }
    });

    cartao.addEventListener("keydown",function deixaClicarComEnter(event){
        if (event.target.classList.contains("opcoesDoCartao-opcao") && (event.key === 'Enter' || event.key === ' ')){
            event.target.click();
        }
    });

    cartao.addEventListener("click", function(event){
        const elementoSelecionado = event.target;
        if (elementoSelecionado.classList.contains("opcoesDoCartao-remove")){
            cartao.classList.add("cartao--some");
            cartao.on("transitionend", function(){
                cartao.remove();
            });
        }
    });

});

