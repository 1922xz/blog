/*动态改变根元素字体大小*/
function recalc() {
    var clientWidth = document.documentElement.clientWidth;
    if (!clientWidth) return;
    console.log(clientWidth);
    document.documentElement.style.fontSize = 8 * (clientWidth / 640) + 'px';
}

export function initRecalc() {
    recalc();
    var resizeEvt = 'osrientationchange' in window ? 'orientationchange' : 'resize';
    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
}
