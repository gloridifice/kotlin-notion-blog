var VisualMode;
(function (VisualMode) {
    VisualMode[VisualMode["Light"] = 0] = "Light";
    VisualMode[VisualMode["Dark"] = 1] = "Dark";
})(VisualMode || (VisualMode = {}));
var currentVisualMode = VisualMode.Light;
var visualModeCSSId = "visual_mode_css";
var visualMode = document.getElementById(visualModeCSSId);
if (visualMode == null) {
    visualMode = document.createElement("link");
    visualMode.id = visualModeCSSId;
    visualMode.rel = "stylesheet";
    document.head.append(visualMode);
    setVisualMode(getInitVisualMode());
}
window.addEventListener("load", function (ev) {
    addVisualButtonEvent();
    addTypeButtonEvent();
});
function addTypeButtonEvent() {
    var typeButtons = document.querySelectorAll(".post_type_button");
    var selectedClassName = "is_selected";
    typeButtons.forEach(function (button) {
        button.addEventListener("click", function (evt) {
            var selfIsSelected = button.classList.contains(selectedClassName);
            if (selfIsSelected)
                return;
            typeButtons.forEach(function (other) {
                other.classList.remove(selectedClassName);
            });
            button.classList.add(selectedClassName);
            var selfPreviewsId = button.id.split('_')[0] + "_type_previews";
            var hiddenClassName = "hidden";
            document.querySelectorAll(".post_type_previews").forEach(function (previews) {
                if (previews.id != selfPreviewsId) {
                    if (!previews.classList.contains(hiddenClassName))
                        previews.classList.add(hiddenClassName);
                }
                else {
                    if (previews.classList.contains(hiddenClassName))
                        previews.classList.remove(hiddenClassName);
                }
            });
        });
    });
}
function addVisualButtonEvent() {
    var its = document.querySelectorAll(".switch_visual_mode_button");
    console.log(its);
    its === null || its === void 0 ? void 0 : its.forEach(function (it) {
        it.addEventListener("click", function (ev1) {
            switchVisualMode();
        });
    });
}
function switchVisualMode() {
    if (currentVisualMode === VisualMode.Light) {
        setVisualMode(VisualMode.Dark);
    }
    else {
        setVisualMode(VisualMode.Light);
    }
}
function getInitVisualMode() {
    var modeCookie = readCookie("visual_mode");
    if (modeCookie != null) {
        return modeCookie === "light" ? VisualMode.Light : VisualMode.Dark;
    }
    var sysMode = getSystemVisualMode();
    createCookie("visual_mode", sysMode === VisualMode.Light ? "light" : "dark", null);
    return sysMode;
}
function getSystemVisualMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')) {
        return VisualMode.Dark;
    }
    return VisualMode.Light;
}
function setVisualMode(mode) {
    var visualMode = document.getElementById(visualModeCSSId);
    if (mode == VisualMode.Light) {
        visualMode.href = "/assets/css/color_scheme.light_mode.css";
    }
    else {
        visualMode.href = "/assets/css/color_scheme.dark_mode.css";
    }
    currentVisualMode = mode;
    createCookie("visual_mode", mode === VisualMode.Light ? "light" : "dark", null);
}
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toDateString();
    }
    else
        var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    createCookie(name, "", -1);
}
function setupTouchableAvatar(selector) {
    var els = document.querySelectorAll(selector);
    if (!els)
        return;
    els.forEach(function (el) {
        el.addEventListener("click", function () {
            if (el._anim) {
                el._anim.cancel();
            }
            var keyframes = [
                { transform: "scaleY(1)", offset: 0 },
                { transform: "scaleY(0.22)", offset: 0.4 },
                { transform: "scaleY(1)", offset: 1 }
            ];
            var timing = {
                duration: 500,
                easing: "cubic-bezier(.2,.7,.2,1)",
                fill: "forwards"
            };
            var anim = el.animate(keyframes, timing);
            el._anim = anim;
            anim.onfinish = function () {
                el._anim = null;
            };
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
    setupTouchableAvatar(".touchable-avatar");
});
