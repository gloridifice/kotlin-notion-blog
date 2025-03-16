function getRandomLetter() {
    var code = Math.random() < 0.5
        ? Math.floor(Math.random() * 26) + 65
        : Math.floor(Math.random() * 26) + 97;
    return String.fromCharCode(code);
}
function getRandomString(length) {
    return Array.from({ length: length }, getRandomLetter).join('');
}
document.addEventListener("DOMContentLoaded", function () {
    var targets = document.getElementsByClassName("cursor_follower");
    if (!targets || targets.length == 0)
        return;
    var lastX = 0;
    var lastY = 0;
    document.addEventListener("mousemove", function (event) {
        for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
            var target = targets_1[_i];
            if (target instanceof HTMLElement) {
                target.style.position = "absolute";
                target.style.fontFamily = "monospace";
                var fontSize = 32;
                var rect = target.getBoundingClientRect();
                target.style.fontSize = "".concat(fontSize, "px");
                target.style.whiteSpace = 'pre-line';
                var xSize = fontSize / 2;
                var ySize = fontSize;
                var x = Math.floor(event.pageX / xSize) * xSize;
                var y = Math.floor(event.pageY / ySize) * ySize;
                if (lastX != x || lastY != y) {
                    target.style.left = "".concat(x - rect.width / 2, "px");
                    target.style.top = "".concat(y - rect.height / 2, "px");
                    target.textContent = Array.from({ length: 5 }, function (_, i) { return getRandomString(10) + '\n'; }).join('');
                }
                lastX = x;
                lastY = y;
            }
        }
    });
});
