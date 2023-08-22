window.onload = function () {
    

    const receitas = [];
    var randomString;

    var inputElement = document.getElementById("verificacao");
    inputElement.addEventListener("paste", function (event) {
        event.preventDefault();
        alert("Ação de colagem foi bloqueada.");
    });

    $(".test").on("click", function (e) {
        $(this).toggleClass('bottomhover');
        const divPai = this.parentElement;
        const divPai1 = divPai.parentElement;
        receitas.push(divPai1);
        console.log(receitas);
        toggleMenuContagemDelete();
    });

    $("#EXCLUIR").on("click", function (e) {
        sla = receitas.length;
        i = 0
        while (i < sla) {

            console.log(receitas[i])
            receitas[i].remove();
            $(".menu").removeClass("active");
            i++;

        }


    });

    $("#FecharAlert").on("click", function (e) {
       
        $(this).toggleClass("aaaa");

    });

    $("#excluirReceita").on("click", function (e) {
        document.getElementById('verificacao').value = '';
        const length = 10;
        var randomString = generateRandomString(length);
        sessionStorage.setItem("codigoValidacao", randomString);
        a = document.getElementById('testSocial');
        a.innerText = randomString;
        $(a).css('font-weight', 'bold')
        $(a).css('font-size', '30px')
        $(a).css('user-select', 'none')
    });

    $("#EXCLUIRTUDO").on("click", function (e) {
        var url = "/Receita/submeterCodigo";
        var codigo = $("#verificacao").val();
        var digitado = $("#verificacao").val();
        console.log(digitado)
        console.log(codigo)
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        $.post(url, { codigo: codigo, digitado: digitado }, function (data) {
            switch (data) {
                case "Codigo correto":
                    var url = "/Receita/Excluir";
                    $.get(url, null, function (data) {

                        if (data == "false") {

                            alerte("Lista vazia");
                            console.log("Lista vazia");

                        }
                        else {
                            alerte("Lista apagada");
                            console.log("Lista apagada");
                            $('.modal').modal('hide'); 
                        }
                    });
                break;
                case "Codigo não bate":
                    alerte("Erro no codigo", "warning");
                    console.log("Erro no codigo");
                    break;
                case "Codigo vazio":
                    alerte("Insira o codigo", "warning");
                    console.log("Insira o codigo");
                    break;
            }
        });

        /**/

    });
 };

    
  

function toggleMenuContagemDelete() {
    var isOpen = $(".test").hasClass('bottomhover');

    if (isOpen) {
        if (!$(".menu").hasClass("active")) {
            $(".menu").addClass("active");
        }
    } else {
        $(".menu").removeClass("active");
    }


}
function onClick(e) {
    e.preventDefault();
    grecaptcha.enterprise.ready(async () => {
        const token = await grecaptcha.enterprise.execute('6LdD-78nAAAAAFsoghhAlZeIJaJuapMXSopJVt_K', { action: 'LOGIN' });
    });
}
function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        randomString += chars.charAt(randomIndex);
    }

    return randomString;
}

function alerte(mensagem, tipo) {

    var alertElement = document.getElementById("meuAlerta");

    alertElement.classList.add("aaaa");

    
    alertElement.classList.remove("alert-success", "alert-danger", "alert-warning", "alert-info");

    
    switch (tipo) {
        case "success":
            alertElement.classList.add("alert", "alert-success");
            break;
        case "error":
            alertElement.classList.add("alert", "alert-danger");
            break;
        case "warning":
            alertElement.classList.add("alert", "alert-warning");
            break;
        default:
            alertElement.classList.add("alert", "alert-info");
            break;
    }
    alertElement.classList.add("fade");
    alertElement.classList.remove("aaaa");


    alertElement.innerHTML = mensagem;

    setTimeout(function () {
        alertElement.classList.add("aaaa");
        alertElement.innerHTML = '';
    }, 8000);

}