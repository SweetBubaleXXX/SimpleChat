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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_script__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/script */ \"./public/src/scripts/script.js\");\n/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sass/style.scss */ \"./public/src/sass/style.scss\");\n\r\n\n\n//# sourceURL=webpack://simplechat/./public/src/main.js?");

/***/ }),

/***/ "./public/src/scripts/debounce.js":
/*!****************************************!*\
  !*** ./public/src/scripts/debounce.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback, ms) {\r\n    let isWaiting = false;\r\n    return function () {\r\n        if (isWaiting) return;\r\n        callback.apply(this, arguments);\r\n        isWaiting = true;\r\n        setTimeout(() => {\r\n            isWaiting = false;\r\n        }, ms);\r\n    }\r\n}\n\n//# sourceURL=webpack://simplechat/./public/src/scripts/debounce.js?");

/***/ }),

/***/ "./public/src/scripts/messageNode.js":
/*!*******************************************!*\
  !*** ./public/src/scripts/messageNode.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MessageNode)\n/* harmony export */ });\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ \"./public/src/scripts/user.js\");\n\r\n\r\n/*\r\nGenerates HTML element from message object\r\n\r\nmessage: <Object>\r\n\r\nReturns <HTMLDivElement>\r\n*/\r\nclass MessageNode {\r\n    constructor(message) {\r\n        this.box = this.createBox(message);\r\n        if (!this.box.self) {\r\n            this.box.append(this.createSpan(\"username\"));\r\n        }\r\n        [\"messageBody\", \"time\"].forEach((elem) => {\r\n            this.box.append(this.createSpan(elem));\r\n        });\r\n        return this.box;\r\n    }\r\n\r\n    createBox(message) {\r\n        let elem = document.createElement(\"div\");\r\n        let date = new Date(message.time);\r\n        elem.messageObj = message;\r\n\r\n        elem.id = message.id;\r\n        elem.className = \"message\";\r\n\r\n        elem.self = message.senderId === _user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].id;\r\n        elem.self && elem.classList.add(\"self\");\r\n\r\n        elem.username = message.sender;\r\n        elem.messageBody = message.text;\r\n        elem.time = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;\r\n        return elem;\r\n    }\r\n\r\n    createSpan(name) {\r\n        let span = document.createElement(\"span\");\r\n        span.className = name;\r\n        span.innerHTML = this.box[name];\r\n        name === \"username\" && (span.title = this.box[name]);\r\n        return span;\r\n    }\r\n}\n\n//# sourceURL=webpack://simplechat/./public/src/scripts/messageNode.js?");

/***/ }),

/***/ "./public/src/scripts/messageStorage.js":
/*!**********************************************!*\
  !*** ./public/src/scripts/messageStorage.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"messageStorage\": () => (/* binding */ messageStorage),\n/* harmony export */   \"messageContainer\": () => (/* binding */ messageContainer)\n/* harmony export */ });\n/* harmony import */ var _messageNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messageNode */ \"./public/src/scripts/messageNode.js\");\n/* harmony import */ var _scroller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scroller */ \"./public/src/scripts/scroller.js\");\n\r\n\r\n\r\nconst MESSAGE_HISTORY_LIMIT = 100;\r\n\r\nconst messageContainer = document.querySelector(\".message-container\");\r\n\r\nconst messageStorage = {\r\n    list: new Array(),\r\n\r\n    new(message) {\r\n        let newNode = new _messageNode__WEBPACK_IMPORTED_MODULE_0__[\"default\"](message);\r\n\r\n        this.list = this.list.filter(node => { // Remove duplicate\r\n            return node.messageObj.id !== message.id || (() => {\r\n                messageContainer.removeChild(node);\r\n                return false;\r\n            })()\r\n        });\r\n\r\n        if (!this.list.length) { // If list is empty, append message\r\n            messageContainer.append(newNode);\r\n            return this.list.push(newNode);\r\n        }\r\n\r\n        this.list.find((node, index) => { // Insert after first older message\r\n            if (node.messageObj.time < message.time) {\r\n                node.after(newNode);\r\n                this.list.splice(index, 0, newNode);\r\n                return true;\r\n            }\r\n        });\r\n        this.save();\r\n    },\r\n\r\n    save() {\r\n        let listOfMessages = this.list.map(node => node.messageObj);\r\n        sessionStorage.history = JSON.stringify(listOfMessages.slice(0, MESSAGE_HISTORY_LIMIT));\r\n    },\r\n\r\n    load() {\r\n        let history = \"history\" in sessionStorage && JSON.parse(sessionStorage.history); // false (if not exists) or history Object\r\n        if (history) {\r\n            messageContainer.innerHTML = '';\r\n            history.reverse().forEach((obj, index, arr) => {\r\n                let converted = new _messageNode__WEBPACK_IMPORTED_MODULE_0__[\"default\"](obj);\r\n                messageContainer.append(converted);\r\n                arr[index] = converted;\r\n            });\r\n            this.list = history.slice().reverse(); // assign reversed copy\r\n            _scroller__WEBPACK_IMPORTED_MODULE_1__[\"default\"].scroll();\r\n            messageContainer.classList.add(\"smooth-scroll\");\r\n        }\r\n    }\r\n};\r\n\r\n\n\n//# sourceURL=webpack://simplechat/./public/src/scripts/messageStorage.js?");

/***/ }),

/***/ "./public/src/scripts/script.js":
/*!**************************************!*\
  !*** ./public/src/scripts/script.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ \"./public/src/scripts/user.js\");\n/* harmony import */ var _messageStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./messageStorage */ \"./public/src/scripts/messageStorage.js\");\n/* harmony import */ var _scroller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scroller */ \"./public/src/scripts/scroller.js\");\n/* harmony import */ var _debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./debounce */ \"./public/src/scripts/debounce.js\");\n\r\n\r\n\r\n\r\n\r\nconst socket = io();\r\n\r\nconst form = document.forms.inputForm;\r\nlet messageInput = form.elements.input;\r\nlet toBottomButton = document.getElementById(\"to-bottom-icon\");\r\n\r\nform.addEventListener(\"submit\", sendMessage);\r\nmessageInput.onkeyup = detectCtrlEnter;\r\ntoBottomButton.onclick = _scroller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].scroll;\r\n\r\n_messageStorage__WEBPACK_IMPORTED_MODULE_1__.messageContainer.onscroll = (0,_debounce__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(e => {\r\n    showToBottom(e);\r\n}, 100);\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n    reconnectFromStorage();\r\n});\r\n\r\ndocument.documentElement.setAttribute('class',\r\n    'ontouchend' in document ? 'touch' : 'no-touch');\r\n\r\nfunction showToBottom(e) {\r\n    let elem = e.target;\r\n    let frame = document.querySelector(\".frame\");\r\n    if (_scroller__WEBPACK_IMPORTED_MODULE_2__[\"default\"].ifNotFirstPage(elem)) {\r\n        frame.classList.add(\"to-bottom\");\r\n    }\r\n    else {\r\n        frame.classList.remove(\"to-bottom\");\r\n    }\r\n}\r\n\r\n// Sends message on Ctrl+Enter\r\nfunction detectCtrlEnter(e) {\r\n    if (e.ctrlKey && e.code === \"Enter\") {\r\n        sendMessage(e);\r\n    }\r\n}\r\n\r\nfunction isEmptyFilled(string) {\r\n    let pattern = /^\\s*$/;\r\n    return !string || pattern.test(string);\r\n}\r\n\r\n// Tries to connect by data from sessionStorage, otherwise prompt username\r\nfunction reconnectFromStorage() {\r\n    let username = sessionStorage.username;\r\n    let id = sessionStorage.id;\r\n    if (id && username) {\r\n        socket.emit(\"add user\", {\r\n            username: username,\r\n            id: id\r\n        });\r\n    }\r\n    else {\r\n        connectByUsername();\r\n    }\r\n}\r\n\r\n// Gets username and connects\r\nfunction connectByUsername() {\r\n    let name = getUsername();\r\n    socket.emit(\"add user\", {\r\n        username: name\r\n    });\r\n}\r\n\r\n// Promts username while it's empty\r\nfunction getUsername() {\r\n    let pickedName;\r\n    while (isEmptyFilled(pickedName)) {\r\n        pickedName = prompt(\"Pick username\");\r\n    }\r\n    return pickedName;\r\n}\r\n\r\nfunction sendMessage(e) {\r\n    e.preventDefault();\r\n\r\n    let text = messageInput.value;\r\n    if (!isEmptyFilled(text)) {\r\n        let date = Date.now();\r\n        let message = {\r\n            id: `${_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].id}:${date.toString().slice(-9)}`,\r\n            sender: _user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].username,\r\n            senderId: _user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].id,\r\n            text: text,\r\n            time: date\r\n        }\r\n        socket.emit(\"message\", message);\r\n        appendMessage(message, true);\r\n        messageInput.value = \"\";\r\n    }\r\n}\r\n\r\n// Creates Scroller and appends message to messageStorage\r\nfunction appendMessage(message, self = false) {\r\n    new _scroller__WEBPACK_IMPORTED_MODULE_2__[\"default\"](() => {\r\n        _messageStorage__WEBPACK_IMPORTED_MODULE_1__.messageStorage[\"new\"](message);\r\n    }, self);\r\n    console.log(_messageStorage__WEBPACK_IMPORTED_MODULE_1__.messageContainer.scrollTop);\r\n}\r\n\r\nsocket.on(\"connect\", () => {\r\n    console.log(\"You're connected\");\r\n});\r\n\r\nsocket.on(\"connect_error\", err => {\r\n    console.log(`connect_error due to ${err.message}`);\r\n});\r\n\r\nsocket.on(\"successfully added\", userObj => {\r\n    sessionStorage.setItem(\"username\", userObj.username);\r\n    sessionStorage.setItem(\"id\", userObj.id);\r\n    _user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].set(userObj);\r\n    _messageStorage__WEBPACK_IMPORTED_MODULE_1__.messageStorage.load();\r\n    console.log(`Username: ${_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].username}\\nId: ${_user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].id}`);\r\n});\r\n\r\nsocket.on(\"can't add user\", message => {\r\n    message && alert(message);\r\n    connectByUsername();\r\n});\r\n\r\nsocket.on(\"new user\", amount => {\r\n    document.getElementById(\"user-count\").innerHTML = amount;\r\n});\r\n\r\nsocket.on(\"message\", appendMessage);\n\n//# sourceURL=webpack://simplechat/./public/src/scripts/script.js?");

/***/ }),

/***/ "./public/src/scripts/scroller.js":
/*!****************************************!*\
  !*** ./public/src/scripts/scroller.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Scroller)\n/* harmony export */ });\n/* harmony import */ var _messageStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messageStorage */ \"./public/src/scripts/messageStorage.js\");\n\r\n\r\n/*\r\nDefines if should scroll and scrolls after callback function\r\n\r\ncallback: function after that it tries to scroll\r\n\r\nshouldScroll: <Boolean>, if true: ignores current scroll position\r\n*/\r\nclass Scroller {\r\n    constructor(callback, shouldScroll = false) {\r\n        shouldScroll = shouldScroll || this._ifBottom();\r\n        callback();\r\n        shouldScroll && this.constructor.scroll();\r\n    }\r\n\r\n    _ifBottom() {\r\n        let scrlTop = Math.ceil(_messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageContainer.scrollTop);\r\n        let height = _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageContainer.clientHeight;\r\n        let scrlHeight = _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageContainer.scrollHeight;\r\n        return scrlHeight <= scrlTop + height;\r\n    }\r\n\r\n    static scroll() {\r\n        _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageContainer.scrollTop = _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageContainer.scrollHeight;\r\n    }\r\n\r\n    static ifNotFirstPage(elem) {\r\n        return elem.scrollHeight - elem.scrollTop > 2 * elem.clientHeight;\r\n    }\r\n\r\n    // Returns current scroll position [0, 1]\r\n    // static getScrollPos(elem) {\r\n    //     return elem.scrollTop / (elem.scrlHeight - elem.clientHeight);\r\n    // }\r\n}\n\n//# sourceURL=webpack://simplechat/./public/src/scripts/scroller.js?");

/***/ }),

/***/ "./public/src/scripts/user.js":
/*!************************************!*\
  !*** ./public/src/scripts/user.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    id: undefined,\r\n    _username: undefined,\r\n\r\n    get username() {\r\n        return this._username;\r\n    },\r\n\r\n    set username(val) {\r\n        this._username = val;\r\n        document.getElementById(\"top-username\").innerHTML = val;\r\n    },\r\n\r\n    set(obj) {\r\n        for (let [key, value] of Object.entries(obj)) {\r\n            this[key] = value;\r\n        }\r\n    }\r\n});\n\n//# sourceURL=webpack://simplechat/./public/src/scripts/user.js?");

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