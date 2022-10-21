// Search inside altinndigital
$("#topbar-search-submit").on('click', function() {
    var url = "https://google.com/search?q=site%3Ahttps%3A%2F%2Fdocs.data.altinn.no+" + $("#topbar-search-by").val();
    window.open(url, "_self");
});


$("#mobilesearch-submit").on('click', function() {
    var url = "https://google.com/search?q=site%3Ahttps%3A%2F%2Fdocs.data.altinn.no+" + $("#mobilesearch-by").val();
    window.open(url, "_self");
});

// Search inside altinndigital > documentation
var input = document.getElementById("searchdocumentation");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchdocumentation-submit").click();
    }
});

$("#searchdocumentation-submit").on('click', function() {
    var url = "https://google.com/search?q=site%3Ahttps%3A%2F%2Fdocs.data.altinn.no+" + $("#searchdocumentation").val();
    window.open(url, "_self");
});

$(".nav-link").on('click', function(e) {
    var active = $(".nav-link-active");
    active.toggleClass('nav-link-active');
    e.target.classList.toggle('nav-link-active');
});