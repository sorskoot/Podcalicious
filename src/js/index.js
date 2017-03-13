'use strict';
require('../library/utils.js');
const templater = require('./templater.js');

const DB = 'Podcalicious-Database';

let sessionTemplate = $('#episode')[0].innerHTML;

function initialize() {
    // if ('serviceWorker' in navigator) {
    //     navigator.serviceWorker.register('/sw.js').then(function (registration) {
    //         console.log('ServiceWorker registration successful with scope: ', registration.scope);
    //     }).catch(function (err) {
    //         console.log('ServiceWorker registration failed: ', err);
    //     });
    // }     

    

    var db;

    //indexedDB.deleteDatabase(DB);

    var request = indexedDB.open(DB);

    request.onerror = function (event) {
        alert("Why didn't you allow my web app to use IndexedDB?!");
    };

    request.onsuccess = function (event) {
        db = event.target.result;

        let objectStore = db.transaction('feeds').objectStore("feeds");
        objectStore.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                 initializeFeed(cursor.value.feed);
            }
        }
    };

    request.onupgradeneeded = function (event) {
        db = event.target.result;

        // Create an objectStore for this database
        var objectStore = db.createObjectStore("feeds", { keyPath: "id" });
    };
    // http://www.codingblocks.net/podcast-feed.xml
    $('#rssinput-submit')[0].onclick = e => {
        let query = $("#rssinput-input")[0].value;
        if (!query)
            return;

        fetch('/API/Feed/' + encodeURIComponent(query)).then((res => {
            res.json().then(result => {

                let objectStore = db.transaction('feeds', 'readwrite').objectStore("feeds");

                let podcast = result.channel[0];
                let storerequest = objectStore.add({ id: podcast.link[0], feed: podcast });
                storerequest.onsuccess = function () {
                    initializeFeed(podcast);
                }
            });
        }))
    };
}

function initializeFeed(podcast) {
    let resultEl = $('#feed')[0];
    for (let i = 0; i < podcast.item.length; i++) {

        // if (!podcast.item[i]["itunes:image"]["0"].$.href) {
        //     podcast.item[i].image_url = podcast.item[i].meta.image.url;
        // }
        resultEl.innerHTML = resultEl.innerHTML + templater(sessionTemplate, podcast.item[i]);
    }

    $('.play-episode').forEach(d => d.onclick = ce => {
        let url2play = ce.srcElement.parentElement.parentElement.dataset.url;
        $('#streamplayer')[0].src = url2play;
        $('#streamplayer')[0].play();
    });
}

initialize();
