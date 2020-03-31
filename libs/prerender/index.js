(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["prerender"] = factory();
	else
		root["prerender"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./packages/prerender/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./packages/prerender/index.ts":
/*!*************************************!*\
  !*** ./packages/prerender/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar render_1 = __webpack_require__(/*! src/helpers/render */ \"./src/helpers/render.ts\");\r\nfunction default_1(template) {\r\n    return \"function(){\" + render_1.astStrRender(template) + \"}\";\r\n}\r\nexports.default = default_1;\r\n\n\n//# sourceURL=webpack://%5Bname%5D/./packages/prerender/index.ts?");

/***/ }),

/***/ "./src/helpers/index.ts":
/*!******************************!*\
  !*** ./src/helpers/index.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar FOR_ALIAS_RE = /([\\s\\S]*?)\\s+(?:in|of)\\s+([\\s\\S]*)/;\r\nvar FOR_ITERATOR_RE = /,([^,\\}\\]]*)(?:,([^,\\}\\]]*))?$/;\r\nvar STRIP_PARENS_RE = /^\\(|\\)$/g;\r\nfunction parseFor(exp) {\r\n    var inMatch = exp.match(FOR_ALIAS_RE);\r\n    if (!inMatch)\r\n        return;\r\n    var res = { for: '', alias: '', };\r\n    res.for = inMatch[2].trim();\r\n    var alias = inMatch[1].trim().replace(STRIP_PARENS_RE, '');\r\n    var iteratorMatch = alias.match(FOR_ITERATOR_RE);\r\n    if (iteratorMatch) {\r\n        res.alias = alias.replace(FOR_ITERATOR_RE, '').trim();\r\n        res.iterator1 = iteratorMatch[1].trim();\r\n        if (iteratorMatch[2]) {\r\n            res.iterator2 = iteratorMatch[2].trim();\r\n        }\r\n    }\r\n    else {\r\n        res.alias = alias;\r\n    }\r\n    return res;\r\n}\r\nexports.parseFor = parseFor;\r\nfunction getAndRemoveAttr(node, name) {\r\n    var val = node.attrsMap[name];\r\n    var list = node.attrsList;\r\n    for (var i = 0, l = list.length; i < l; i++) {\r\n        if (list[i].name === name) {\r\n            list.splice(i, 1);\r\n            break;\r\n        }\r\n    }\r\n    return val;\r\n}\r\nexports.getAndRemoveAttr = getAndRemoveAttr;\r\nfunction getAndRemoveAttrByRegex(node, name) {\r\n    var list = node.attrsList;\r\n    for (var i = 0, l = list.length; i < l; i++) {\r\n        var attr = list[i];\r\n        if (name.test(attr.name)) {\r\n            list.splice(i, 1);\r\n            return attr;\r\n        }\r\n    }\r\n}\r\nexports.getAndRemoveAttrByRegex = getAndRemoveAttrByRegex;\r\n\n\n//# sourceURL=webpack://%5Bname%5D/./src/helpers/index.ts?");

/***/ }),

/***/ "./src/helpers/render.ts":
/*!*******************************!*\
  !*** ./src/helpers/render.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar parser_1 = __webpack_require__(/*! ../parser */ \"./src/parser/index.ts\");\r\nvar v_node_1 = __webpack_require__(/*! ../render/v-node */ \"./src/render/v-node.ts\");\r\nfunction astStrRender(template) {\r\n    var ast = v_node_1.genVNode(parser_1.default.created(template).root);\r\n    return \"with(this){ return \" + ast + \";}\";\r\n}\r\nexports.astStrRender = astStrRender;\r\n\n\n//# sourceURL=webpack://%5Bname%5D/./src/helpers/render.ts?");

/***/ }),

/***/ "./src/parser/html-parser.ts":
/*!***********************************!*\
  !*** ./src/parser/html-parser.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __read = (this && this.__read) || function (o, n) {\r\n    var m = typeof Symbol === \"function\" && o[Symbol.iterator];\r\n    if (!m) return o;\r\n    var i = m.call(o), r, ar = [], e;\r\n    try {\r\n        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);\r\n    }\r\n    catch (error) { e = { error: error }; }\r\n    finally {\r\n        try {\r\n            if (r && !r.done && (m = i[\"return\"])) m.call(i);\r\n        }\r\n        finally { if (e) throw e.error; }\r\n    }\r\n    return ar;\r\n};\r\nvar __spread = (this && this.__spread) || function () {\r\n    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));\r\n    return ar;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar START_TAG_CLOSE = /\\/\\s*>/;\r\nvar START_TAG_RE = /^<([^>\\s\\/]+)((\\s+[^=>\\s]+(\\s*=\\s*((\\\"[^\"]*\\\")|(\\'[^']*\\')|[^>\\s]+))?)*)\\s*\\/?\\s*>/m;\r\nvar ATTR_RE = /([^=\\s]+)(\\s*=\\s*((\\\"([^\"]*)\\\")|(\\'([^']*)\\')|[^>\\s]+))?/gm;\r\nvar END_TAG_RE = /^<\\/([^>\\s]+)[^>]*>/m;\r\nvar ParseHtml = (function () {\r\n    function ParseHtml(s, options) {\r\n        this.options = options;\r\n        this._parse(s);\r\n    }\r\n    ParseHtml.prototype._parse = function (s) {\r\n        var index;\r\n        var treatAsChars = false;\r\n        while (s.length > 0) {\r\n            if (s.substring(0, 4) == \"<!--\") {\r\n                index = s.indexOf(\"-->\");\r\n                if (index != -1) {\r\n                    this.options.comment(s.substring(4, index));\r\n                    s = s.substring(index + 3);\r\n                    treatAsChars = false;\r\n                }\r\n                else {\r\n                    treatAsChars = true;\r\n                }\r\n            }\r\n            else if (s.substring(0, 2) == \"</\") {\r\n                if (END_TAG_RE.test(s)) {\r\n                    s = s.replace(END_TAG_RE, this.parseEndTag.bind(this));\r\n                    treatAsChars = false;\r\n                }\r\n                else {\r\n                    treatAsChars = true;\r\n                }\r\n            }\r\n            else if (s.charAt(0) == \"<\") {\r\n                if (START_TAG_RE.test(s)) {\r\n                    s = s.replace(START_TAG_RE, this.parseStartTag.bind(this));\r\n                    treatAsChars = false;\r\n                }\r\n                else {\r\n                    treatAsChars = true;\r\n                }\r\n            }\r\n            if (treatAsChars) {\r\n                index = s.indexOf(\"<\");\r\n                if (index == -1) {\r\n                    this.options.characters(s);\r\n                    s = \"\";\r\n                }\r\n                else {\r\n                    this.options.characters(s.substring(0, index));\r\n                    s = s.substring(index);\r\n                }\r\n            }\r\n            treatAsChars = true;\r\n        }\r\n    };\r\n    ParseHtml.prototype.parseStartTag = function (sTag, sTagName, sRest) {\r\n        var attrs = this.parseAttributes(sTagName, sRest);\r\n        var unary = START_TAG_CLOSE.test(sTag);\r\n        this.options.startElement(sTagName, attrs, unary);\r\n        return '';\r\n    };\r\n    ParseHtml.prototype.parseEndTag = function (sTag, sTagName) {\r\n        this.options.endElement(sTagName);\r\n        return '';\r\n    };\r\n    ParseHtml.prototype.parseAttributes = function (sTagName, sRest) {\r\n        var _this = this;\r\n        var attrs = [];\r\n        sRest.replace(ATTR_RE, function () {\r\n            var _a;\r\n            var arg = [];\r\n            for (var _i = 0; _i < arguments.length; _i++) {\r\n                arg[_i] = arguments[_i];\r\n            }\r\n            var attr = (_a = _this.parseAttribute).call.apply(_a, __spread([_this, sTagName], arg));\r\n            if (attr.name && '/' !== attr.name)\r\n                attrs.push(attr);\r\n            return '';\r\n        });\r\n        return attrs;\r\n    };\r\n    ParseHtml.prototype.parseAttribute = function (sTagName, sAttribute, sName) {\r\n        var value = \"\";\r\n        if (arguments[7])\r\n            value = arguments[8];\r\n        else if (arguments[5])\r\n            value = arguments[6];\r\n        else if (arguments[3])\r\n            value = arguments[4];\r\n        var empty = !value && !arguments[3];\r\n        return { name: sName, value: empty ? null : value };\r\n    };\r\n    return ParseHtml;\r\n}());\r\nexports.default = ParseHtml;\r\n\n\n//# sourceURL=webpack://%5Bname%5D/./src/parser/html-parser.ts?");

/***/ }),

/***/ "./src/parser/index.ts":
/*!*****************************!*\
  !*** ./src/parser/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar html_parser_1 = __webpack_require__(/*! ./html-parser */ \"./src/parser/html-parser.ts\");\r\nvar index_1 = __webpack_require__(/*! ../helpers/index */ \"./src/helpers/index.ts\");\r\nvar ast_node_1 = __webpack_require__(/*! ../render/ast-node */ \"./src/render/ast-node.ts\");\r\nvar ParserFactory = (function () {\r\n    function ParserFactory() {\r\n    }\r\n    ParserFactory.created = function (template) {\r\n        var parser = new ParserFactory();\r\n        new html_parser_1.default(template, parser);\r\n        return parser;\r\n    };\r\n    ParserFactory.prototype.startElement = function (tagName, attrs, unary) {\r\n        this._parent = this._target;\r\n        this._target = ast_node_1.default(tagName, attrs, this._parent);\r\n        if (!this._root) {\r\n            this._root = this._target;\r\n        }\r\n        else if (!this._parent) {\r\n            throw new Error('tow root');\r\n        }\r\n        if (unary) {\r\n            this.endElement(tagName);\r\n        }\r\n    };\r\n    ParserFactory.prototype.endElement = function (tagName) {\r\n        var exp;\r\n        if (exp = index_1.getAndRemoveAttr(this._target, 'v-for'))\r\n            this._target.processMap.for = index_1.parseFor(exp);\r\n        if (exp = index_1.getAndRemoveAttr(this._target, 'v-if'))\r\n            this._target.processMap.if = this.addIfConditions(exp);\r\n        else if (exp = index_1.getAndRemoveAttr(this._target, 'v-else-if'))\r\n            this._target.processMap.elseif = this.addIfConditions(exp, true);\r\n        else if ('undefined' !== typeof (exp = index_1.getAndRemoveAttr(this._target, 'v-else')))\r\n            this._target.processMap.else = this.addIfConditions(true, true);\r\n        if (this._parent\r\n            && this._target !== this._root\r\n            && !this._target.processMap.elseif\r\n            && !this._target.processMap.else) {\r\n            this._parent.children.push(this._target);\r\n        }\r\n        this._target = this._parent;\r\n        if (this._parent) {\r\n            this._parent = this._parent.parent;\r\n        }\r\n    };\r\n    ParserFactory.prototype.comment = function (text) {\r\n    };\r\n    ParserFactory.prototype.characters = function (text) {\r\n        if (this._target) {\r\n            this._target.text = text.replace(/^\\s+|\\s+$|\\r|\\n/g, '');\r\n        }\r\n    };\r\n    ParserFactory.prototype.addIfConditions = function (exp, prev) {\r\n        if (prev === void 0) { prev = false; }\r\n        var processMap;\r\n        if (prev) {\r\n            var parent_1 = this._target.parent;\r\n            if (parent_1) {\r\n                var curTarget = parent_1.children[parent_1.children.length - 1];\r\n                if (curTarget) {\r\n                    processMap = curTarget.processMap;\r\n                    processMap.ifConditions.push({ exp: exp, target: this._target });\r\n                }\r\n            }\r\n        }\r\n        else {\r\n            processMap = this._target.processMap;\r\n            if (!processMap.ifConditions)\r\n                processMap.ifConditions = [];\r\n            processMap.ifConditions.push({ exp: exp, target: this._target });\r\n        }\r\n        return exp;\r\n    };\r\n    Object.defineProperty(ParserFactory.prototype, \"root\", {\r\n        get: function () {\r\n            return this._root;\r\n        },\r\n        enumerable: true,\r\n        configurable: true\r\n    });\r\n    return ParserFactory;\r\n}());\r\nexports.default = ParserFactory;\r\n\n\n//# sourceURL=webpack://%5Bname%5D/./src/parser/index.ts?");

/***/ }),

/***/ "./src/render/ast-node.ts":
/*!********************************!*\
  !*** ./src/render/ast-node.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar uuid = 1234;\r\nfunction createASTNode(tag, attrs, parent) {\r\n    return {\r\n        key: tag + \"_\" + ++uuid,\r\n        tag: tag,\r\n        text: '',\r\n        attrsList: attrs,\r\n        attrsMap: attrs.reduce(function (m, i) {\r\n            var _a;\r\n            return Object.assign(m, (_a = {}, _a[i.name] = i.value, _a));\r\n        }, {}),\r\n        processMap: {},\r\n        parent: parent,\r\n        children: []\r\n    };\r\n}\r\nexports.default = createASTNode;\r\n\n\n//# sourceURL=webpack://%5Bname%5D/./src/render/ast-node.ts?");

/***/ }),

/***/ "./src/render/v-node.ts":
/*!******************************!*\
  !*** ./src/render/v-node.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar REF_REG = /^(:?ref)/;\r\nvar BIND_REG = /^(v-bind:|:)/;\r\nvar ON_REG = /^(v-on:|@)/;\r\nvar TEXT_REG = /\\{\\{([^}]+)\\}\\}/g;\r\nvar fnExpRE = /^([\\w$_]+|\\([^)]*?\\))\\s*=>|^function(?:\\s+[\\w$]+)?\\s*\\(/;\r\nvar simplePathRE = /^[A-Za-z_$][\\w$]*(?:\\.[A-Za-z_$][\\w$]*|\\['[^']*?']|\\[\"[^\"]*?\"]|\\[\\d+]|\\[[A-Za-z_$][\\w$]*])*$/;\r\nfunction genAttr(ast) {\r\n    var ref = '', attrs = '', on = '';\r\n    ast.attrsList.forEach(function (attr) {\r\n        if (REF_REG.test(attr.name)) {\r\n            ref = /^(:)/.test(attr.name) ? \"\" + attr.value : \"\\\"\" + attr.value + \"\\\"\";\r\n        }\r\n        else if (BIND_REG.test(attr.name)) {\r\n            attrs += \"\\\"\" + attr.name.replace(BIND_REG, '') + \"\\\":_n(\" + attr.value + \"),\";\r\n        }\r\n        else if (ON_REG.test(attr.name)) {\r\n            on += \"\\\"\" + attr.name.replace(ON_REG, '') + \"\\\":\" + genHandler(attr.value) + \",\";\r\n        }\r\n        else {\r\n            attrs += \"\\\"\" + attr.name + \"\\\":_n(\\\"\" + attr.value + \"\\\"),\";\r\n        }\r\n    });\r\n    if (ast.text) {\r\n        attrs += \"text:\" + genText(ast) + \",\";\r\n    }\r\n    return \"{attrs:{\" + attrs + \"},on:{\" + on + \"}\" + (ref ? \",ref:\" + ref : '') + \"}\";\r\n}\r\nexports.genAttr = genAttr;\r\nfunction genText(ast) {\r\n    return \"_s(\\\"\" + ast.text.replace(TEXT_REG, function (_, expOrFn) { return \"\\\"+(\" + expOrFn + \")+\\\"\"; }) + \"\\\")\";\r\n}\r\nexports.genText = genText;\r\nfunction genHandler(exp) {\r\n    if (simplePathRE.test(exp) || fnExpRE.test(exp)) {\r\n        return exp;\r\n    }\r\n    return \"function($event){\" + exp + \"}\";\r\n}\r\nexports.genHandler = genHandler;\r\nfunction genVNode(ast, isCheck) {\r\n    if (isCheck === void 0) { isCheck = true; }\r\n    var forRes = ast.processMap.for;\r\n    if (isCheck && forRes && forRes.for) {\r\n        return \"_l((\" + forRes.for + \"), function(\" + [forRes.alias, forRes.iterator1, forRes.iterator2].filter(Boolean).join(',') + \"){return \" + genVNode(ast, false) + \"})\";\r\n    }\r\n    else if (isCheck && ast.processMap.ifConditions) {\r\n        return '(' + ast.processMap.ifConditions.map(function (_a) {\r\n            var exp = _a.exp, target = _a.target;\r\n            return exp + \"?\" + genVNode(target, false) + \":\";\r\n        }).join('') + '\"\")';\r\n    }\r\n    else {\r\n        return \"_c(\\\"\" + ast.tag + \"\\\",\\\"\" + ast.key + \"\\\",\" + genAttr(ast) + (ast.children.length > 0 ? \",[].concat(\" + ast.children.map(function (ast) { return genVNode(ast); }) + \")\" : '') + \")\";\r\n    }\r\n}\r\nexports.genVNode = genVNode;\r\nfunction createVNode(tag, key, data, children) {\r\n    if (children === void 0) { children = []; }\r\n    var vnode = {\r\n        key: key,\r\n        tag: tag,\r\n        ref: data.ref || '',\r\n        children: children.filter(Boolean),\r\n        attrs: data.attrs,\r\n        props: {},\r\n        on: data.on,\r\n    };\r\n    vnode.children.forEach(function (child) { return child.parent = vnode; });\r\n    return vnode;\r\n}\r\nexports.createVNode = createVNode;\r\n\n\n//# sourceURL=webpack://%5Bname%5D/./src/render/v-node.ts?");

/***/ })

/******/ })["default"];
});