'use strict';
require('../library/utils.js');
const templater = require('./templater.js');

function initialize() {
    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker.register('/sw.js').then(function (registration) {
    //         console.log('ServiceWorker registration successful with scope: ', registration.scope);
    //     }).catch(function (err) {
    //         console.log('ServiceWorker registration failed: ', err);
    //     });
    // }

    let sessionTemplate = $('#episode')[0].innerHTML;

    $('#rssinput-submit')[0].onclick = e => {
        let query = $("#rssinput-input")[0].value;
        if(!query)
            return;

        fetch('/API/Feed/' + encodeURIComponent(query)).then((res => {
            res.json().then(result => {
                let resultEl = $('#feed')[0];
                for (let i = 0; i < result.length; i++) {
                    if(!result[i].image.url){
                        result[i].image.url = result[i].meta.image.url
                    }
                    resultEl.innerHTML = resultEl.innerHTML + templater(sessionTemplate, result[i]);
                }

                $('.play-episode').forEach(d=>d.onclick=ce=>{
                    var url2play = ce.srcElement.parentElement.parentElement.dataset.url;
                    $('#streamplayer')[0].src = url2play;
                    $('#streamplayer')[0].play();
                });
            });
        }))
    };
}

initialize();
