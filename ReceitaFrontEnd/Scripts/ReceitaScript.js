window.onload = function () {
    const receitas = [];

    $(".test").on("click", function (e) {
        $(this).toggleClass('bottomhover');
        receitas.push(this);
        toggleMenuContagemDelete();
    });

    $("#EXLUIR").on("click", function (e) {
        sla = receita.length;
        i = 0
        while (i < sla) {

            receitas[i].removeChild(node);
            i++;

        }
    });

}

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