// Search inside altinndigital
$("#topbar-search-submit").click( function() {
    var url = "https://www.altinndigital.no/sok/?query=" + $("#topbar-search-by").val();
    window.open(url, "_self");
});


$("#mobilesearch-submit").click( function() {
    var url = "https://www.altinndigital.no/sok/?query=" + $("#mobilesearch-by").val();
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

$("#searchdocumentation-submit").click( function() {
    var url = "https://www.altinndigital.no/sok/?query=" + $("#searchdocumentation").val() + "&filters=documentation_20&pageNumber=0";
    window.open(url, "_self");
});