'use strict';
require('../library/utils.js');

function initialize() {
    $('.rssinput-submit')[0].onclick = e => {
        fetch('/API/Feed/' + encodeURIComponent(e.target.parentElement.parentElement.firstChild.value)).then((res => {
            res.json().then(json => { 
                $('#debug').innerHTML = json; 
            });
        }))
    };
}

initialize();
