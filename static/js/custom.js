// Highlight the active item in the top navigation
$(".nav-link").on('click', function(e) {
    var active = $(".nav-link-active");
    active.toggleClass('nav-link-active');
    e.target.classList.toggle('nav-link-active');
});
