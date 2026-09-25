// Highlight the active item in the top navigation
$(".nav-link").on('click', function(e) {
    var active = $(".nav-link-active");
    active.toggleClass('nav-link-active');
    e.target.classList.toggle('nav-link-active');
});

// Open the search dialog level with the box that was clicked, so it feels like that box
// expanding rather than a panel appearing at the top of the screen. Pagefind positions the
// dialog with --pf-modal-top / --pf-modal-max-height (defaults in custom.css); the keyboard
// shortcut (Ctrl/Cmd+K) keeps the defaults since there is no box to line up with.
(function () {
    var GAP = 24, MIN_HEIGHT = 360;
    document.addEventListener('click', function (e) {
        var trigger = e.target.closest && e.target.closest('pagefind-modal-trigger');
        if (!trigger) return;
        var top = trigger.getBoundingClientRect().top - 16; // the field sits 16px inside the dialog
        top = Math.max(GAP, Math.min(top, window.innerHeight - MIN_HEIGHT - GAP));
        document.body.style.setProperty('--pf-modal-top', Math.round(top) + 'px');
        document.body.style.setProperty('--pf-modal-max-height', Math.round(window.innerHeight - top - GAP) + 'px');
    }, true);
    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key && e.key.toLowerCase() === 'k') {
            document.body.style.removeProperty('--pf-modal-top');
            document.body.style.removeProperty('--pf-modal-max-height');
        }
    }, true);
})();
