/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	const templater = __webpack_require__(3);
	
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
	        if (!query) return;
	
	        fetch('/API/Feed/' + encodeURIComponent(query)).then(res => {
	            res.json().then(result => {
	
	                let resultEl = $('#feed')[0];
	                for (let i = 0; i < result.length; i++) {
	                    resultEl.innerHTML = resultEl.innerHTML + templater(sessionTemplate, result[i]);
	                }
	            });
	        });
	    };
	}
	
	initialize();

/***/ },
/* 2 */
/***/ function(module, exports) {

	window.$ = function (selector) {
	  return document.querySelectorAll(selector);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	(function () {
	    module.exports = function templater(template, replacement) {
	        const regex = /{{(\w*(?:\.\w+)*)}}/g;
	        let m,
	            result = template;
	        while ((m = regex.exec(template)) !== null) {
	            if (m.index === regex.lastIndex) {
	                regex.lastIndex++;
	            }
	            var repl = getNested(replacement, m[1]);
	            if (repl) {
	                result = result.replace(m[0], repl);
	            }
	        }
	        return result;
	    };
	
	    function getNested(theObject, path) {
	
	        return path.split('.').reduce(function (obj, property) {
	            return obj[property];
	        }, theObject);
	    }
	})();

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map