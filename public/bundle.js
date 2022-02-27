/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/src/sass/style.scss":
/*!************************************!*\
  !*** ./public/src/sass/style.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://simplechat/./public/src/sass/style.scss?");

/***/ }),

/***/ "./public/src/main.js":
/*!****************************!*\
  !*** ./public/src/main.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/script */ \"./public/src/scripts/script.js\");\n/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sass/style.scss */ \"./public/src/sass/style.scss\");\n\n\n\n//# sourceURL=webpack://simplechat/./public/src/main.js?");

/***/ }),

/***/ "./public/src/scripts/messageNode.js":
/*!*******************************************!*\
  !*** ./public/src/scripts/messageNode.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MessageNode)\n/* harmony export */ });\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ \"./public/src/scripts/user.js\");\n\n\nclass MessageNode {\n    constructor(messageObj) {\n        this.box = this.createBox(messageObj);\n        if (!this.box.self) {\n            this.box.append(this.createSpan(\"username\"));\n        }\n        [\"messageBody\", \"time\"].forEach((elem) => {\n            this.box.append(this.createSpan(elem));\n        });\n        return this.box;\n    }\n\n    createBox(messageObj) {\n        let elem = document.createElement(\"div\");\n        let date = new Date(messageObj.time);\n\n        elem.id = `${messageObj.senderId}:${messageObj.time}`;\n        elem.senderId = messageObj.senderId;\n        elem.timeMs = messageObj.time;\n        elem.self = messageObj.sender === _user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].username;\n        elem.className = \"message\";\n        elem.self && elem.classList.add(\"self\");\n\n        elem.username = messageObj.sender;\n        elem.messageBody = messageObj.text;\n        elem.time = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;\n        return elem;\n    }\n\n    createSpan(name) {\n        let span = document.createElement(\"span\");\n        span.className = name;\n        span.innerHTML = this.box[name];\n        name === \"username\" && (span.title = this.box[name]);\n        return span;\n    }\n}\n\n//# sourceURL=webpack://simplechat/./public/src/scripts/messageNode.js?");

/***/ }),

/***/ "./public/src/scripts/messageStorage.js":
/*!**********************************************!*\
  !*** ./public/src/scripts/messageStorage.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"messageStorage\": () => (/* binding */ messageStorage),\n/* harmony export */   \"messageContainer\": () => (/* binding */ messageContainer)\n/* harmony export */ });\n/* harmony import */ var _messageNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messageNode */ \"./public/src/scripts/messageNode.js\");\n\n\nconst messageContainer = document.querySelector(\".message-container\");\n\nconst messageStorage = {\n    list: new Array(),\n\n    new(message) {\n        let newNode = new _messageNode__WEBPACK_IMPORTED_MODULE_0__[\"default\"](message);\n\n        this.list = this.list.filter(node => {\n            return node.id !== newNode.id || (() => {\n                messageContainer.removeChild(node);\n                return false;\n            })()\n        });\n\n        if (!this.list.length) {\n            messageContainer.append(newNode);\n            return this.list.push(newNode);\n        }\n\n        this.list.find((node, index) => {\n            if (node.timeMs < newNode.timeMs) {\n                node.after(newNode);\n                this.list.splice(index, 0, newNode);\n                return true;\n            }\n        });\n        this.save();\n    },\n\n    save() {\n        sessionStorage.history = JSON.stringify(this.list);\n    },\n\n    load() {\n        let history = \"history\" in sessionStorage && JSON.parse(sessionStorage.history);\n        if (history) {\n            messageContainer.innerHTML = '';\n            history.reverse().forEach((obj, index, arr) => {\n                let converted = new _messageNode__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n                    sender: obj.username,\n                    senderId: obj.senderId,\n                    text: obj.messageBody,\n                    time: obj.timeMs\n                });\n                messageContainer.append(converted);\n                arr[index] = converted;\n            });\n            this.list = history.slice().reverse();\n        }\n    }\n};\n\n\n\n//# sourceURL=webpack://simplechat/./public/src/scripts/messageStorage.js?");

/***/ }),

/***/ "./public/src/scripts/script.js":
/*!**************************************!*\
  !*** ./public/src/scripts/script.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _messageStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messageStorage */ \"./public/src/scripts/messageStorage.js\");\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ \"./public/src/scripts/user.js\");\n\n\n\nconst socket = io();\n\nconst form = document.forms.inputForm;\nlet messageInput = form.elements.input;\n\nform.addEventListener(\"submit\", sendMessage);\nmessageInput.onkeyup = detectCtrlEnter;\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    reconnectFromStorage();\n});\n\ndocument.documentElement.setAttribute('class',\n    'ontouchend' in document ? 'touch' : 'no-touch');\n\nfunction isEmptyFilled(string) {\n    let pattern = /^\\s*$/;\n    return !string || pattern.test(string);\n}\n\nfunction reconnectFromStorage() {\n    let username = sessionStorage.name;\n    let id = sessionStorage.userId;\n    if (id && username) {\n        socket.emit(\"add user\", {\n            userId: id,\n            name: username\n        });\n    }\n    else {\n        connectByUsername();\n    }\n}\n\nfunction connectByUsername() {\n    let name = getUsername();\n    socket.emit(\"add user\", {\n        name: name\n    });\n}\n\nfunction getUsername() {\n    let pickedName;\n    while (isEmptyFilled(pickedName)) {\n        pickedName = prompt(\"Pick username\");\n    }\n    return pickedName;\n}\n\nfunction sendMessage(e) {\n    e.preventDefault();\n\n    let text = messageInput.value;\n    if (!isEmptyFilled(text)) {\n        let date = Date.now();\n        let message = {\n            sender: _user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].username,\n            senderId: _user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].id,\n            text: text,\n            time: date\n        }\n        socket.emit(\"message\", message);\n        appendMessage(message, true);\n        messageInput.value = \"\";\n    }\n}\n\nfunction appendMessage(message, self = false) {\n    scroll = createScroller(self);\n    _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageStorage[\"new\"](message);\n    scroll();\n}\n\nfunction createScroller(self) {\n    let scrlTop = Math.ceil(_messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageContainer.scrollTop);\n    let height = _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageContainer.clientHeight;\n    let scrlHeight = _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageContainer.scrollHeight;\n    var shouldScroll = self || scrlHeight <= scrlTop + height;\n\n    return function () {\n        if (shouldScroll) {\n            _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageContainer.scrollTop = _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageContainer.scrollHeight;\n        }\n    }\n}\n\nfunction detectCtrlEnter(e) {\n    if (e.ctrlKey && e.code === \"Enter\") {\n        sendMessage(e);\n    }\n}\n\nsocket.on(\"connect\", () => {\n    console.log(\"You're connected\");\n});\n\nsocket.on(\"connect_error\", err => {\n    console.log(`connect_error due to ${err.message}`);\n});\n\nsocket.on(\"successfully added\", userObj => {\n    // sessionStorage = Object.assign(sessionStorage, userObj);\n    sessionStorage.setItem(\"name\", userObj.name);\n    sessionStorage.setItem(\"userId\", userObj.userId);\n    _user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].username = userObj.name;\n    _user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].id = userObj.userId;\n    _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageStorage.load();\n    console.log(`Username: ${_user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].username}\\nId: ${_user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].id}`);\n});\n\nsocket.on(\"can't add user\", message => {\n    message && alert(message);\n    connectByUsername();\n});\n\nsocket.on(\"message\", appendMessage);\n\n//# sourceURL=webpack://simplechat/./public/src/scripts/script.js?");

/***/ }),

/***/ "./public/src/scripts/user.js":
/*!************************************!*\
  !*** ./public/src/scripts/user.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n    username: undefined,\n    id: undefined\n});\n\n//# sourceURL=webpack://simplechat/./public/src/scripts/user.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/src/main.js");
/******/ 	
/******/ })()
;