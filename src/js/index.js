'use strict';
require('../library/utils.js');
const templater = require('./templater.js');

function initialize() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function (err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    }

    let sessionTemplate = $('#episode')[0].innerHTML;

    $('.rssinput-submit')[0].onclick = e => {
        fetch('/API/Feed/' + encodeURIComponent(e.target.parentElement.parentElement.firstChild.value)).then((res => {
            res.json().then(result => {

                let resultEl = $('#result')[0];
                for (let i = 0; i < result.length; i++) {
                    resultEl.innerHTML = resultEl.innerHTML + templater(sessionTemplate, result[i]);
                }
            });
        }))
    };
}

initialize();
