/* domain method */
function loadLayout(){
    preloadHtml('intro', () => swapMain('#intro') );
    preloadHtmls(
      [ 'gnb', 'footer', // layout
        'issues', 'link', 'book', 'detail' // menu
      ] 
    );
  }
function loadReadme() {
    preload('./pages/README.md', '#rawReadme', () => 
      showMarkdown('#rawReadme', '#main')
    );
}
function showIssue(id) {
    const url = document.querySelector('#detail-hx')
        .getAttribute('hx-get')
        .replace("{{number}}", id);
    clickHtmxEvent('#detail-hx', 'get', url);
}
function pageIssue(evt){
    if(evt.detail.xhr.response.length <= 5){
        // hide more btn
        document.querySelector('.issues-list-tr-next').style.display = 'none'; 
    }
    swapMain('#issues')
}
function listIssue(){
    const curUrl =  document.querySelector('#issues-hx')
    .getAttribute('hx-get');
    let currentPage = extractPageNoWithUrl(curUrl);
    const nextPage = currentPage + 1;
    const url = document.querySelector('#issues-hx')
        .getAttribute('hx-get')
        .replace("page="+currentPage, "page="+nextPage);

    clickHtmxEvent('#issues-hx', 'get', url);
}

function preloadHtmls(args = []) {
    args.forEach((id) => {
        preloadHtml(id);
    });
}
function preloadHtml(arg, callback){
    preload('./pages/'+arg+'.html', '#' + arg, callback);
}

/* funcional method */
function preload(loadFile, targetId, callback = ()=>{}) { 
    fetch(loadFile)
        .then(response => response.text())
        .then(data => {
            document.querySelector(targetId).innerHTML = data;
            if(callback) callback();
        }).catch(e => console.log(e));
}
function swapMain(src) {
    //check if already swap
    const hx = document.querySelector(src+'-hx');
    let needSwap = true;
    if(hx){
        const target = hx.getAttribute('hx-target');
        if(document.querySelectorAll(target).length > 1){
            needSwap = false;
        }
    }

    if(needSwap){
        document.querySelector('#main').innerHTML = document.querySelector(src).innerHTML;
    }
    document.querySelector('#main').classList.remove('markdown-body');
}
function appendMain(src){
   document.querySelector('#main').innerHTML += document.querySelector(src).innerHTML;
}   
function hxTrigger(id, arg) {
    htmx.trigger('#' + id + '-hx', 'click', arg);
}
function clickHtmxEvent(selector, method, url ,swap = ''){
    const elm = document.querySelector(selector);
    elm.setAttribute('hx-'+method, url);
    htmx.process(elm);
    htmx.trigger(selector, 'click');
}
// example: https://a.b.c/d?page=NNN
function extractPageNoWithUrl(url){
    const match = /\bpage=(\d+)/.exec(url);
    let page = 1;
    if(match && match.length>1){
        page = parseInt(match[1],10);
    }
    return page;
}