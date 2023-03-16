const hljs = require("highlight.js");
export const deleteMdTag = (item) => {
    let md = require("markdown-it")();
    let deald = md.render(item).replace(/<\/?[^>]*>/g, "").replace(/[|]*\n/, "").replace(/&npsp;/gi, "");
    return deald
}
// function highlight() {

// const hljs = require("highlight.js");
// hljs.highlightAll();
// var d = new Date().getTime()
// if (window.performance && typeof window.performance.now === "function") {
//     d += performance.now();
// }
// const codeIndex = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
//     /[xy]/g,
//     function (c) {
//         var r = (d + Math.random() * 16) % 16 | 0;
//         d = Math.floor(d / 16);
//         return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
//     }
// );
// let html = `<button class="copy-btn mdi mdi-content-copy" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}"></button>`;
// const linesLength = str.split(/\n/).length - 1;
// let linesNum = '<span aria-hidden="true" class="line-numbers-rows">';
// for (let index = 0; index < linesLength; index++) {
//     linesNum = linesNum + "<span></span>";
// }
// linesNum += "</span>";
// if (lang == null ||lang=="") {
//     lang = "css";
// }
// if (lang && hljs.getLanguage(lang)) {
//     console.log(1);
//     // highlight.js 高亮代码
//     const preCode = hljs.highlight(lang, str, true).value;
//     html = html + preCode;
//     if (linesLength) {
//         html += '<b class="name">' + lang + "</b>";
//     }
//     // 将代码包裹在 textarea 中，由于防止textarea渲染出现问题，这里将 "<" 用 "<" 代替，不影响复制功能
//     return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
//         /<\/textarea>/g,
//         "</textarea>"
//     )}</textarea>`;
// }
// }
export const markdownToHtml = (data) => {
    const MarkdownIt = require("markdown-it");
    const md = new MarkdownIt({
        html: false,
        xhtmlOut: true,
        linkify: true,
        typographer: true,
        breaks: true,

        highlight(str, lang) {

            // 此处判断是否有添加代码语言
            if (lang && hljs.getLanguage(lang)) {

                // 得到经过highlight.js之后的html代码
                const preCode = hljs.highlight(lang, str, true).value
                // 以换行进行分割
                const lines = preCode.split(/\n/).slice(0, -1)
                // 添加自定义行号
                let html = lines.map((item, index) => {
                    return '<li><span class="line-num" data-num="' + (index + 1) + '"></span>' + item + '</li>'
                }).join('')
                html = '<ol>' + html + '</ol>'
                // 添加代码语言
                if (lines.length) {
                    console.log('加一次');
                    html += '<b class="name">' + lang + '</b>' + `
                    <div class="operation"><span class="copy mdi mdi-content-copy"></span><span class="expand mdi mdi-arrow-expand" 
                    onclick="let el=document.querySelector('.hljs');
                    if (el.className.indexOf('expandAll')== -1) 
                    { 
                    el.classList.add('expandAll');
                    document.body.style.overflow='hidden';}
                    else { el.classList.remove('expandAll');  
                    document.body.style.overflow='auto';}
                    "></span></div>
                    `
                }
                console.log(html);
                return '<pre class="hljs"><code>' +
                    html +
                    '</code></pre>'
            }
            // 未添加代码语言，此处与上面同理
            // const preCode = md.utils.escapeHtml(str)
            // const lines = preCode.split(/\n/).slice(0, -1)
            // let html = lines.map((item, index) => {
            //     return '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
            // }).join('')
            // html = '<ol>' + html + '</ol>'
            // return '<pre class="hljs"><code>' +
            //     html +
            //     '</code></pre>'
        }
    })
    // console.log(md.render(data));
    return md.render(data)


}


export const deleteHTMLTag = (content = []) => {
    return content != [] ? content.replace(/<\/?[^>]*>/g, "").replace(/[|]*\n/, "").replace(/&npsp;/gi, "") : [];
}