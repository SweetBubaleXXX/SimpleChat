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

/***/ "./public/src/scripts/messageNode.js":
/*!*******************************************!*\
  !*** ./public/src/scripts/messageNode.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MessageNode)\n/* harmony export */ });\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ \"./public/src/scripts/user.js\");\n\r\n\r\nclass MessageNode {\r\n    constructor(messageObj) {\r\n        this.box = this.createBox(messageObj);\r\n        if (!this.box.self) {\r\n            this.box.append(this.createSpan(\"username\"));\r\n        }\r\n        [\"messageBody\", \"time\"].forEach((elem) => {\r\n            this.box.append(this.createSpan(elem));\r\n        });\r\n        return this.box;\r\n    }\r\n\r\n    createBox(messageObj) {\r\n        let elem = document.createElement(\"div\");\r\n        let date = new Date(messageObj.time);\r\n\r\n        elem.id = `${messageObj.senderId}:${messageObj.time}`;\r\n        elem.senderId = messageObj.senderId;\r\n        elem.timeMs = messageObj.time;\r\n        elem.self = messageObj.sender === _user__WEBPACK_IMPORTED_MODULE_0__[\"default\"].username;\r\n        elem.className = \"message\";\r\n        elem.self && elem.classList.add(\"self\");\r\n\r\n        elem.username = messageObj.sender;\r\n        elem.messageBody = messageObj.text;\r\n        elem.time = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;\r\n        return elem;\r\n    }\r\n\r\n    createSpan(name) {\r\n        let span = document.createElement(\"span\");\r\n        span.className = name;\r\n        span.innerHTML = this.box[name];\r\n        name === \"username\" && (span.title = this.box[name]);\r\n        return span;\r\n    }\r\n}\n\n//# sourceURL=webpack://simplechat/./public/src/scripts/messageNode.js?");

/***/ }),

/***/ "./public/src/scripts/messageStorage.js":
/*!**********************************************!*\
  !*** ./public/src/scripts/messageStorage.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"messageStorage\": () => (/* binding */ messageStorage),\n/* harmony export */   \"messageContainer\": () => (/* binding */ messageContainer)\n/* harmony export */ });\n/* harmony import */ var _messageNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messageNode */ \"./public/src/scripts/messageNode.js\");\n\r\n\r\nconst messageContainer = document.querySelector(\".message-container\");\r\n\r\nconst messageStorage = {\r\n    list: new Array(),\r\n\r\n    new(message) {\r\n        let newNode = new _messageNode__WEBPACK_IMPORTED_MODULE_0__[\"default\"](message);\r\n\r\n        this.list = this.list.filter(node => {\r\n            return node.id !== newNode.id || (() => {\r\n                messageContainer.removeChild(node);\r\n                return false;\r\n            })()\r\n        });\r\n\r\n        if (!this.list.length) {\r\n            messageContainer.append(newNode);\r\n            return this.list.push(newNode);\r\n        }\r\n\r\n        this.list.find((node, index) => {\r\n            if (node.timeMs < newNode.timeMs) {\r\n                node.after(newNode);\r\n                this.list.splice(index, 0, newNode);\r\n                return true;\r\n            }\r\n        });\r\n        this.save();\r\n    },\r\n\r\n    save() {\r\n        sessionStorage.history = JSON.stringify(this.list);\r\n    },\r\n\r\n    load() {\r\n        let history = \"history\" in sessionStorage && JSON.parse(sessionStorage.history);\r\n        if (history) {\r\n            messageContainer.innerHTML = '';\r\n            history.reverse().forEach((obj, index, arr) => {\r\n                let converted = new _messageNode__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n                    sender: obj.username,\r\n                    senderId: obj.senderId,\r\n                    text: obj.messageBody,\r\n                    time: obj.timeMs\r\n                });\r\n                messageContainer.append(converted);\r\n                arr[index] = converted;\r\n            });\r\n            this.list = history.slice().reverse();\r\n        }\r\n    }\r\n};\r\n\r\n\n\n//# sourceURL=webpack://simplechat/./public/src/scripts/messageStorage.js?");

/***/ }),

/***/ "./public/src/scripts/script.js":
/*!**************************************!*\
  !*** ./public/src/scripts/script.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _messageStorage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messageStorage */ \"./public/src/scripts/messageStorage.js\");\n/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user */ \"./public/src/scripts/user.js\");\n\r\n\r\n\r\nconst socket = io();\r\n\r\nconst form = document.forms.inputForm;\r\nlet messageInput = form.elements.input;\r\n\r\nform.addEventListener(\"submit\", sendMessage);\r\nmessageInput.onkeyup = detectCtrlEnter;\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n    reconnectFromStorage();\r\n});\r\n\r\ndocument.documentElement.setAttribute('class',\r\n    'ontouchend' in document ? 'touch' : 'no-touch');\r\n\r\nfunction isEmptyFilled(string) {\r\n    let pattern = /^\\s*$/;\r\n    return !string || pattern.test(string);\r\n}\r\n\r\nfunction reconnectFromStorage() {\r\n    let username = sessionStorage.name;\r\n    let id = sessionStorage.userId;\r\n    if (id && username) {\r\n        socket.emit(\"add user\", {\r\n            userId: id,\r\n            name: username\r\n        });\r\n    }\r\n    else {\r\n        connectByUsername();\r\n    }\r\n}\r\n\r\nfunction connectByUsername() {\r\n    let name = getUsername();\r\n    socket.emit(\"add user\", {\r\n        name: name\r\n    });\r\n}\r\n\r\nfunction getUsername() {\r\n    let pickedName;\r\n    while (isEmptyFilled(pickedName)) {\r\n        pickedName = prompt(\"Pick username\");\r\n    }\r\n    return pickedName;\r\n}\r\n\r\nfunction sendMessage(e) {\r\n    e.preventDefault();\r\n\r\n    let text = messageInput.value;\r\n    if (!isEmptyFilled(text)) {\r\n        let date = Date.now();\r\n        let message = {\r\n            sender: _user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].username,\r\n            senderId: _user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].id,\r\n            text: text,\r\n            time: date\r\n        }\r\n        socket.emit(\"message\", message);\r\n        appendMessage(message, true);\r\n        messageInput.value = \"\";\r\n    }\r\n}\r\n\r\nfunction appendMessage(message, self = false) {\r\n    scroll = createScroller(self);\r\n    _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageStorage[\"new\"](message);\r\n    scroll();\r\n}\r\n\r\nfunction createScroller(self) {\r\n    let scrlTop = Math.ceil(_messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageContainer.scrollTop);\r\n    let height = _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageContainer.clientHeight;\r\n    let scrlHeight = _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageContainer.scrollHeight;\r\n    var shouldScroll = self || scrlHeight <= scrlTop + height;\r\n\r\n    return function () {\r\n        if (shouldScroll) {\r\n            _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageContainer.scrollTop = _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageContainer.scrollHeight;\r\n        }\r\n    }\r\n}\r\n\r\nfunction detectCtrlEnter(e) {\r\n    if (e.ctrlKey && e.code === \"Enter\") {\r\n        sendMessage(e);\r\n    }\r\n}\r\n\r\nsocket.on(\"connect\", () => {\r\n    console.log(\"You're connected\");\r\n});\r\n\r\nsocket.on(\"successfully added\", userObj => {\r\n    // sessionStorage = Object.assign(sessionStorage, userObj);\r\n    sessionStorage.setItem(\"name\", userObj.name);\r\n    sessionStorage.setItem(\"userId\", userObj.userId);\r\n    _user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].username = userObj.name;\r\n    _user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].id = userObj.userId;\r\n    _messageStorage__WEBPACK_IMPORTED_MODULE_0__.messageStorage.load();\r\n    console.log(`Username: ${_user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].username}\\nId: ${_user__WEBPACK_IMPORTED_MODULE_1__[\"default\"].id}`);\r\n});\r\n\r\nsocket.on(\"can't add user\", message => {\r\n    message && alert(message);\r\n    connectByUsername();\r\n});\r\n\r\nsocket.on(\"message\", appendMessage);\r\n\r\nsocket.on(\"connect_error\", (err) => {\r\n    console.log(`connect_error due to ${err.message}`);\r\n  });\n\n//# sourceURL=webpack://simplechat/./public/src/scripts/script.js?");

/***/ }),

/***/ "./public/src/scripts/user.js":
/*!************************************!*\
  !*** ./public/src/scripts/user.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    username: undefined,\r\n    id: undefined\r\n});\n\n//# sourceURL=webpack://simplechat/./public/src/scripts/user.js?");

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