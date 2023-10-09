/* domain method */
function loadLayout(){
    preloadHtml('intro', () => swapMain('#intro') );
    preloadHtmls(
      [ 'gnb', 'footer', // layout
        'link', 'book', 'detail' // menu
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
    document.querySelector('#main').innerHTML = document.querySelector(src).innerHTML;
    document.querySelector('#main').classList.remove('markdown-body');
}
function hxTrigger(id, arg) {
    htmx.trigger('#' + id + '-hx', 'click', arg);
}
function clickHtmxEvent(selector, method, url ){
    const elm = document.querySelector(selector);
    elm.setAttribute('hx-'+method, url);
    htmx.process(elm);
    htmx.trigger(selector, 'click');
}