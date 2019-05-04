window.form.addEventListener("submit", function(event){
    event.preventDefault();
    const textarea = window.form.querySelector(".formNovoCartao-conteudo");
    const isTextAreaVazio = textarea.value.trim().length === 0;

    if (isTextAreaVazio){
        const msgErro = document.createElement("div");
        msgErro.classList.add("formNovoCartao-msg");
        msgErro.textContent = "Formulário inválido. Não digite vários nada!";

        const btnSubmit = window.form.children[window.form.children.length-1];
        window.form.addEventListener("animationend", function(event){
            event.target.remove();
        });

        window.form.insertBefore(msgErro, btnSubmit);
    }else{
        adicionaCartaoNoMural({conteudo: textarea.value});
    }
    textarea.value = "";
});

