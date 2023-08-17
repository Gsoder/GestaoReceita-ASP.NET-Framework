window.onload = function () {

    $(".test").on("click", function (e) {
        $(this).toggleClass('bottomhover');
        toggleMenuContagemDelete();
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