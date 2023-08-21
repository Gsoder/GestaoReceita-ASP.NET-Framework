window.onload = function () {
    const receitas = [];

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

    $("#excluirReceita").on("click", function (e) {
        const length = 10;
        const randomString = generateRandomString(length);
        a = document.getElementById('testSocial');
        a.innerText = randomString;
        $(a).css('font-weight', 'bold')
        $(a).css('font-size', '30px')
        $(a).css('user-select', 'none')
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