window.onload = function () {
    

    var receitas = [];
    var randomString;

    /*var inputElement = document.getElementById("verificacao");
    inputElement.addEventListener("paste", function (event) {
        event.preventDefault();
        alerte("Ação de colagem foi bloqueada.", "warning");
    });*/

    $(".test").on("click", function (e) {
        $(this).toggleClass('bottomhover');
        const divPai = this.parentElement;
        const divPai1 = divPai.parentElement;
        if ($(this).hasClass('bottomhover')) {
            receitas.push(divPai1);
        } else { 
            const indexToRemove = receitas.indexOf(divPai1);
            if (indexToRemove !== -1) {
                receitas.splice(indexToRemove, 1);
            }
        }
        console.log(receitas);
        toggleMenuContagemDelete();
    });

    $("#EXCLUIR").on("click", function (e) {
        var divsComClasse = document.querySelectorAll(".bottomhover");

        divsComClasse.forEach(function (div) {
            console.log(div);
        });
        sla = receitas.length;
        i = 0
        while (i < sla) {

            console.log(receitas[i])
            receitas[i].remove();
            $(".menu").removeClass("active");
            i++;

        }
        if (sla > 1) {
            alerte(sla + " receitas foram excluidas")
        } else {
            alerte("Uma receita foi excluida")
        }


        receitas = [];


    });

    $("#FecharAlert").on("click", function (e) {
       
        $(this).toggleClass("aaaa");

    });

    $("#excluirReceita").on("click", function (e) {
        document.getElementById('verificacao').value = '';
        var url = "/Receita/GenerateToken";
        $.get(url, null, function (data) {
            a = document.getElementById('testSocial');
            sessionStorage.setItem("codigoValidacao", data);
            a.innerText = data;
            $(a).css('font-weight', 'bold')
            $(a).css('font-size', '30px')
            $(a).css('user-select', 'none')
        });
        
    });

    $("#EXCLUIRTUDO").on("click", function (e) {
        var url = "/Receita/submeterCodigo";
        var digitado = $("#verificacao").val();
        console.log(sessionStorage.getItem("codigoValidacao"))
        console.log(digitado)

        $.post(url, { digitado: digitado }, function (data) {
            switch (data) {
                case "Codigo correto":
                    var url = "/Receita/excluirTudo";
                    $.get(url, null, function (data) {

                        if (data == "False") {

                            alerte("Lista vazia", "warning");
                            console.log("Lista vazia");

                        }
                        else {
                            alerte("Receitas apagadas", "sucess");
                            console.log("Lista apagada");
                            closeModal();
                            document.getElementById("tables").remove();

                            var container = document.querySelector('#vazio');
                            

                            var novoHTML = `
                            <div class="sla12">
                                <img src="../Imagens/OIG-removebg-preview.png"/>
                            </div>
                            <p style="text-align: center; margin-left: 20px;">Não há receitas para exibir.</p>
                            `;

                            container.innerHTML = novoHTML;

                            var myButton = document.getElementById("excluirReceita");
                            myButton.disabled = true;


                            myButton.style.backgroundColor = "#ccc";
                            myButton.style.color = "#666";
                            myButton.style.cursor = "not-allowed";
                            myButton.style.border = "none";
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


function alerte(mensagem, tipo) {

    var alertElement = document.getElementById("meuAlerta");

    alertElement.classList.add("aaaa");

    var audioWarning = new Audio('../Audio/notification-sound-7062.mp3'); 
    var audioSucess = new Audio("../Audio/short-success-sound-glockenspiel-treasure-video-game-6346.mp3")

    
    alertElement.classList.remove("alert-success", "alert-danger", "alert-warning", "alert-info");

    
    switch (tipo) {
        case "success":
            alertElement.classList.add("alert", "alert-success");
            audioSucess.play();
            break;
        case "error":
            alertElement.classList.add("alert", "alert-danger");
            audioWarning.play();
            break;
        case "warning":
            alertElement.classList.add("alert", "alert-warning");
            audioWarning.play();
            break;
        default:
            alertElement.classList.add("alert", "alert-info");
            audioWarning.play();
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

function closeModal() {
    var myModal = document.getElementById('staticBackdrop');
    var modal = bootstrap.Modal.getInstance(myModal);
    document.querySelector('.modal-backdrop').remove();
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
    modal.hide();
}