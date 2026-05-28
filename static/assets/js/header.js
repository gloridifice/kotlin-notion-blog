var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
var CARD_WIDTH_STEP_PCT = 10;
document.addEventListener('DOMContentLoaded', function () {
    var containers = document.querySelectorAll('.stack-container');
    containers.forEach(function (container) {
        var cards = Array.prototype.slice.call(container.querySelectorAll('.stack-card'));
        var cardRotations = cards.map(function () { return (Math.random() * 12) - 6; });
        var height = 0;
        function updateContainerHeight() {
            var firstCard = cards[0];
            var img = firstCard === null || firstCard === void 0 ? void 0 : firstCard.querySelector('img');
            if (!img)
                return;
            var applyHeight = function () {
                var w = container.offsetWidth;
                if (w === 0 || !img.naturalWidth || !img.naturalHeight)
                    return;
                height = Math.min(w * img.naturalHeight / img.naturalWidth, window.innerHeight * 0.75);
                container.style.height = "".concat(height, "px");
                cards.forEach(function (it) {
                    it.style.height = "".concat(height, "px");
                });
            };
            if (img.complete && img.naturalWidth > 0) {
                applyHeight();
            }
            else {
                img.addEventListener('load', applyHeight, { once: true });
            }
        }
        updateContainerHeight();
        function applyCardWidthsByHeight() {
            var pairs = [];
            for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
                var card = cards_1[_i];
                var img = card.querySelector('img');
                if (img)
                    pairs.push({ card: card, img: img });
            }
            if (pairs.length <= 1)
                return;
            var sameRatio = function (a, b) {
                return a.naturalWidth * b.naturalHeight === b.naturalWidth * a.naturalHeight;
            };
            var doApply = function () {
                if (!pairs.every(function (p) { return p.img.complete && p.img.naturalWidth > 0; }))
                    return false;
                var sorted = __spreadArray([], pairs, true).sort(function (a, b) { return a.img.naturalHeight - b.img.naturalHeight; });
                var widthPct = 100;
                sorted.forEach(function (_a, i) {
                    var card = _a.card, img = _a.img;
                    if (i > 0 && !sameRatio(img, sorted[i - 1].img)) {
                        widthPct -= CARD_WIDTH_STEP_PCT;
                    }
                    card.style.maxWidth = "".concat(widthPct, "%");
                });
                return true;
            };
            if (!doApply()) {
                var pending_1 = pairs.filter(function (p) { return !(p.img.complete && p.img.naturalWidth > 0); }).length;
                pairs.forEach(function (_a) {
                    var img = _a.img;
                    if (img.complete && img.naturalWidth > 0)
                        return;
                    img.addEventListener('load', function () {
                        pending_1--;
                        if (pending_1 === 0)
                            doApply();
                    }, { once: true });
                });
            }
        }
        applyCardWidthsByHeight();
        var isAnimating = false;
        function layoutCards() {
            cards.forEach(function (card, i) {
                if (i === 0) {
                    card.className = 'stack-card active';
                    card.style.zIndex = cards.length.toString();
                    card.style.transform = "scale(1) rotate(0deg) translate3d(0, 0, 0)";
                }
                else {
                    card.className = 'stack-card underneath';
                    card.style.zIndex = (cards.length - i).toString();
                    var scale = Math.max(0.85, 1 - (i * 0.05));
                    var translateY = i * -8;
                    var indexAttr = card.dataset.index;
                    var rotation = indexAttr ? cardRotations[parseInt(indexAttr, 10)] : 0;
                    card.style.transform = "scale(".concat(scale, ") translateY(").concat(translateY, "px) rotate(").concat(rotation, "deg)");
                }
            });
        }
        function nextCard(direction) {
            if (direction === void 0) { direction = 'right'; }
            if (isAnimating || cards.length <= 1)
                return;
            isAnimating = true;
            var topCard = cards[0];
            topCard.classList.remove('active');
            topCard.classList.add('animating-out');
            var moveX = direction === 'right' ? window.innerWidth : -window.innerWidth;
            var rotateOut = direction === 'right' ? 30 : -30;
            topCard.style.transform = "translate3d(".concat(moveX, "px, -50px, 0) rotate(").concat(rotateOut, "deg) scale(1.1)");
            setTimeout(function () {
                var removedCard = cards.shift();
                if (!removedCard)
                    return;
                removedCard.style.transition = 'none';
                removedCard.style.transform = "scale(0.8) translateY(20px)";
                removedCard.classList.remove('animating-out');
                void removedCard.offsetWidth;
                removedCard.style.transition = '';
                cards.push(removedCard);
                layoutCards();
                isAnimating = false;
            }, 400);
            var remainingCards = cards.slice(1);
            remainingCards.forEach(function (card, i) {
                if (i === 0) {
                    card.style.transform = "scale(1) rotate(0deg) translate3d(0, 0, 0)";
                }
                else {
                    var scale = Math.max(0.85, 1 - (i * 0.05));
                    var translateY = i * -8;
                    var indexAttr = card.dataset.index;
                    var rotation = indexAttr ? cardRotations[parseInt(indexAttr, 10)] : 0;
                    card.style.transform = "scale(".concat(scale, ") translateY(").concat(translateY, "px) rotate(").concat(rotation, "deg)");
                }
            });
        }
        container.addEventListener('click', function () {
            if (!isAnimating)
                nextCard('right');
        });
        var touchStartX = 0;
        var touchStartY = 0;
        container.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        container.addEventListener('touchend', function (e) {
            var touchEndX = e.changedTouches[0].screenX;
            var touchEndY = e.changedTouches[0].screenY;
            var diffX = touchStartX - touchEndX;
            var diffY = touchStartY - touchEndY;
            if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0)
                    nextCard('left');
                else
                    nextCard('right');
            }
        });
        layoutCards();
    });
    window.addEventListener('resize', function () {
        document.querySelectorAll('.stack-container').forEach(function (c) {
            var firstImg = c.querySelector('.stack-card:first-child img');
            if (!firstImg || !firstImg.naturalWidth)
                return;
            c.style.height = "".concat(c.offsetWidth * firstImg.naturalHeight / firstImg.naturalWidth, "px");
        });
    });
});
