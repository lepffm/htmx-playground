import * as monaco from 'https:///cdn.jsdelivr.net/npm/monaco-editor@0.43.0/+esm';
import { renderMarkdown } from 'https://unpkg.com/monaco-editor@0.43.0/esm/vs/base/browser/markdownRenderer.js';

function initMonaco(){
    const editor = monaco.editor.create(document.querySelector('.monaco'), {
        value: 'type here',
        language: 'markdown',
        lineNumber: 'on',
        readOnly: false,
        theme: 'vs-dark'
    });
}
function copyMonacoToFormData(targetElemId) {
    const elem = document.getElementById(targetElemId);
    elem.value = editor.getModel().getValue();
}

function showMarkdown(from, to) {
    const htmlResult = renderMarkdown({
        value: document.querySelector(from).innerHTML 
    }, {}); 
    document.querySelector(to).innerHTML = htmlResult.element.outerHTML;
    document.querySelector(to).classList.add('markdown-body');
}
// use global object
window.showMarkdown = showMarkdown;
window.copyMonacoToFormData = copyMonacoToFormData;