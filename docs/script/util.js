/* domain method */
function loadLayout() {
    preloadHtml('intro', () => swapMain('#intro'));
    preloadHtmls(
        ['gnb', 'footer', // layout
            'issues', 'link', 'detail' // menu
        ]
    );
}
function loadReadme() {
    preload('./pages/README.md', '#rawReadme', () =>
        showMarkdown('#rawReadme', '#main')
    );
}
function showIssue(newPage) {
    const DETAIL_HX_ID = '#detail-hx';
    const url = document.querySelector(DETAIL_HX_ID)
        .getAttribute('hx-get');
    // https://a.b.c/d/page/NNN
    const curPage = extractPageByRegex(url, /\bissues\/(\d+)$/, 1);
    const newUrl = document.querySelector(DETAIL_HX_ID)
        .getAttribute('hx-get')
        .replace("issues/" + curPage, "issues/" + newPage);

    clickHtmxEvent(DETAIL_HX_ID, 'get', newUrl);
}

function pageIssue(evt) {
    if (evt.detail.xhr.response.length <= 5) {
        // hide more btn
        document.querySelector('.issues-list-tr-next').style.display = 'none';
    }
    swapMain('#issues')
}
function listIssue() {
    const LIST_HX_ID = '#issues-hx';
    const url = document.querySelector(LIST_HX_ID)
        .getAttribute('hx-get');
    // https://a.b.c/d?page=NNN
    let currentPage = extractPageByRegex(url, /\bpage=(\d+)/);
    const nextPage = currentPage + 1;
    const newUrl = document.querySelector(LIST_HX_ID)
        .getAttribute('hx-get')
        .replace("page=" + currentPage, "page=" + nextPage);

    clickHtmxEvent(LIST_HX_ID, 'get', newUrl);
}
function preloadHtmls(args = []) {
    args.forEach((id) => {
        preloadHtml(id);
    });
}
function preloadHtml(arg, callback) {
    preload('./pages/' + arg + '.html', '#' + arg, callback);
}

/* funcional method */
function preload(loadFile, targetId, callback = () => { }) {
    fetch(loadFile)
        .then(response => response.text())
        .then(data => {
            document.querySelector(targetId).innerHTML = data;
            if (callback) callback();
        }).catch(e => console.log(e));
}
function swapMain(src) {
    //check if already swap
    const hx = document.querySelector(src + '-hx');
    let needSwap = true;
    if (hx) {
        const target = hx.getAttribute('hx-target');
        if (document.querySelectorAll(target).length > 1) {
            needSwap = false;
        }
    }

    if (needSwap) {
        document.querySelector('#main').innerHTML = document.querySelector(src).innerHTML;
    }
    document.querySelector('#main').classList.remove('markdown-body');
}
function hxTrigger(id, arg) {
    htmx.trigger('#' + id + '-hx', 'click', arg);
}
function clickHtmxEvent(selector, method, url) {
    const elm = document.querySelector(selector);
    elm.setAttribute('hx-' + method, url);
    htmx.process(elm);
    htmx.trigger(selector, 'click');
}
function extractPageByRegex(url, regex, defaultVal = 1) {
    const match = regex.exec(url)
    let page = defaultVal;
    if (match && match.length > 1) {
        page = parseInt(match[1], 10);
    }
    return page;
}