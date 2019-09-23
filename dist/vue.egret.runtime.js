(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueEgret"] = factory();
	else
		root["VueEgret"] = factory();
})(window, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
function noop(a, b, c) { }
exports.noop = noop;
exports.hasProto = '__proto__' in {};
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
exports.isObject = isObject;
function toString(val) {
    return val == null
        ? ''
        : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
            ? JSON.stringify(val, null, 2)
            : String(val);
}
exports.toString = toString;
function toNumber(val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n;
}
exports.toNumber = toNumber;
var _toString = Object.prototype.toString;
function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
function isRegExp(v) {
    return _toString.call(v) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
__export(__webpack_require__(4));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var uid = 0;
var Dep = (function () {
    function Dep() {
        this.id = uid++;
        this.subs = [];
    }
    Dep.prototype.depend = function () {
        if (Dep.target) {
            Dep.target.addDep(this);
        }
    };
    Dep.prototype.addSub = function (sub) {
        this.subs.push(sub);
    };
    Dep.prototype.removeSub = function (sub) {
        var index = this.subs.indexOf(sub);
        if (index > -1) {
            this.subs.splice(index, 1);
        }
    };
    Dep.prototype.notify = function () {
        this.subs.forEach(function (e) {
            e.update();
        });
    };
    return Dep;
}());
exports.default = Dep;
Dep.target = null;
var targetStack = [];
function pushTarget(target) {
    targetStack.push(target);
    Dep.target = target;
}
exports.pushTarget = pushTarget;
function popTarget() {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
}
exports.popTarget = popTarget;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
* vue-egret 1.0.0
* @author Hsuna
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = __webpack_require__(3);
var index_1 = __webpack_require__(11);
var watcher_1 = __webpack_require__(13);
var dep_1 = __webpack_require__(1);
var index_2 = __webpack_require__(0);
var Component = (function () {
    function Component(sp, options) {
        if (options === void 0) { options = {}; }
        this._watchers = [];
        this._components = {};
        this.sp = sp;
        this.options = options;
        this._init();
    }
    Component.prototype._init = function () {
        this.$callHook('beforeCreate');
        this._initData();
        this._initMethods();
        this._initWatch();
        this._initComponents();
        this.$callHook('created');
        this._render = new render_1.default(this);
        this._watcher = new watcher_1.default(this, this._render.update.bind(this._render), index_2.noop);
    };
    Component.prototype._initData = function () {
        var _this = this;
        var data = this.options.data;
        this._data = typeof data === 'function' ? this._getData(data) : data || {};
        Object.keys(this._data).forEach(function (key) { return Object.defineProperty(_this, key, {
            get: function () {
                return this['_data'][key];
            },
            set: function (val) {
                this['_data'][key] = val;
            }
        }); });
        index_1.observe(this._data);
    };
    Component.prototype._initMethods = function () {
        var _this = this;
        var _a = this.options.methods, methods = _a === void 0 ? {} : _a;
        Object.keys(methods).forEach(function (e) { return _this[e] = methods[e]; });
    };
    Component.prototype._initWatch = function (watch) {
        var _this = this;
        if (watch === void 0) { watch = {}; }
        Object.keys(watch).forEach(function (key) {
            var handler = watch[key];
            if (Array.isArray(handler)) {
                handler.forEach(function (h) { return _this._createWatcher(key, h); });
            }
            else {
                _this._createWatcher(key, handler);
            }
        });
    };
    Component.prototype._initComponents = function () {
        var _this = this;
        var components = this.options.components || {};
        Object.keys(components).forEach(function (name) {
            _this._components[name] = VueEgret.classFactory(components[name]);
        });
    };
    Component.prototype._getData = function (data) {
        dep_1.pushTarget();
        try {
            return data.call(this, this);
        }
        catch (e) {
            return {};
        }
        finally {
            dep_1.popTarget();
        }
    };
    Component.prototype._createWatcher = function (expOrFn, handler, options) {
        if (index_2.isPlainObject(handler)) {
            options = handler;
            handler = handler.handler;
        }
        if (typeof handler === 'string') {
            handler = this[handler];
        }
        return this.$watch(expOrFn, handler, options);
    };
    Component.prototype.$watch = function (expOrFn, cb, options) {
        if (index_2.isPlainObject(cb)) {
            return this._createWatcher(expOrFn, cb, options);
        }
        options = options || {};
        var watcher = new watcher_1.default(this, expOrFn, cb);
        return function unwatchFn() {
            watcher.teardown();
        };
    };
    Component.prototype.$callHook = function (name) {
        var _a;
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        if ('function' === typeof this.options[name]) {
            (_a = this.options[name]).call.apply(_a, __spreadArrays([this], rest));
        }
    };
    return Component;
}());
exports.Component = Component;
var VueEgret = (function (_super) {
    __extends(VueEgret, _super);
    function VueEgret(options) {
        var _this = _super.call(this) || this;
        _this.vm = new Component(_this, options);
        return _this;
    }
    VueEgret._components = {};
    VueEgret.component = function (name, options) {
        VueEgret._components[name] = VueEgret.classFactory(options);
    };
    VueEgret.classFactory = function (options) { return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super.call(this, options) || this;
        }
        return class_1;
    }(VueEgret)); };
    return VueEgret;
}(egret.Sprite));
exports.default = VueEgret;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var parser_1 = __webpack_require__(5);
var v_node_1 = __webpack_require__(9);
var rendreList_1 = __webpack_require__(10);
var index_1 = __webpack_require__(2);
function installRender(target) {
    target._c = v_node_1.createVNode;
    target._n = util_1.toNumber;
    target._s = util_1.toString;
    target._l = rendreList_1.renderList;
}
exports.installRender = installRender;
var Render = (function () {
    function Render(vm) {
        this.vm = vm;
        this._init();
    }
    Render.prototype._init = function () {
        installRender(this.vm);
        this.astCode = v_node_1.genVNode(parser_1.default.created(this.vm.options.template).root);
    };
    Render.prototype.update = function () {
        var vnode = this._createVNode(this.astCode);
        this.vnode = this._patch(this.vnode, vnode);
    };
    Render.prototype._patch = function (oldVNode, newVNode) {
        if (!oldVNode) {
            var sp = this._createDisObj(newVNode);
            this.vm.sp.addChild(sp);
        }
        else if (this._sameVNode(oldVNode, newVNode)) {
            this._patchVNode(oldVNode, newVNode);
        }
        else {
            var parent_1 = oldVNode.sp.parent;
            if (parent_1) {
                var sp = this._createDisObj(newVNode);
                parent_1.addChildAt(sp, parent_1.getChildIndex(oldVNode.sp));
                this._destroyDisObj(oldVNode);
            }
        }
        return newVNode;
    };
    Render.prototype._patchVNode = function (oldVNode, newVNode) {
        newVNode.sp = oldVNode.sp;
        if (oldVNode === newVNode)
            return;
        this._updateDisObj(oldVNode, newVNode);
        var oldCh = oldVNode.children, newCh = newVNode.children;
        if (oldCh === newCh)
            return;
        var len = Math.max(oldCh.length, newCh.length);
        for (var i = 0; i < len; i++) {
            if (newCh[i] && oldCh[i]) {
                oldCh[i] = this._patch(oldCh[i], newCh[i]);
            }
            else if (newCh[i]) {
                var sp = this._createDisObj(newCh[i]);
                newVNode.sp.addChild(sp);
            }
            else if (oldCh[i]) {
                this._destroyDisObj(oldCh[i]);
            }
        }
    };
    Render.prototype._sameVNode = function (oldVNode, newVNode) {
        return (oldVNode.tag === newVNode.tag);
    };
    Render.prototype._createVNode = function (code) {
        try {
            return Function.prototype.constructor("with(this){ return " + code + ";}").call(this.vm);
        }
        catch (e) {
            throw new Error(e);
        }
    };
    Render.prototype._createDisObj = function (vnode) {
        var _this = this;
        var VClass = this.vm._components[vnode.tag] || index_1.default._components[vnode.tag] || egret[vnode.tag];
        if (!VClass)
            throw new Error("Then [" + vnode.tag + "] Node is undefined!!!");
        vnode.sp = new VClass;
        Object.keys(vnode.attrs).forEach(function (name) {
            vnode.sp[name] = vnode.attrs[name];
        });
        Object.keys(vnode.on).forEach(function (type) {
            vnode.sp.addEventListener(type, vnode.on[type], _this.vm);
        });
        vnode.children.forEach(function (child) { return vnode.sp.addChild(_this._createDisObj(child)); });
        return vnode.sp;
    };
    Render.prototype._updateDisObj = function (oldVNode, newVNode) {
        var _this = this;
        Object.keys(newVNode.attrs).forEach(function (name) {
            if (oldVNode.attrs[name] !== newVNode.attrs[name]) {
                oldVNode.sp[name] = newVNode.attrs[name];
            }
        });
        Object.keys(newVNode.on).forEach(function (type) {
            if (oldVNode.on[type] !== newVNode.on[type]) {
                oldVNode.sp.removeEventListener(type, oldVNode.on[type], _this.vm);
                oldVNode.sp.addEventListener(type, newVNode.on[type], _this.vm);
            }
        });
    };
    Render.prototype._destroyDisObj = function (vnode) {
        var _this = this;
        if (vnode.sp) {
            if (vnode.sp instanceof index_1.default)
                vnode.sp.vm.$callHook('beforeDestroyed');
            vnode.sp.parent && vnode.sp.parent.removeChild(vnode.sp);
            Object.keys(vnode.on).forEach(function (type) {
                vnode.sp.removeEventListener(type, vnode.on[type], _this);
            });
            if (vnode.sp instanceof index_1.default)
                vnode.sp.vm.$callHook('destroyed');
        }
        vnode.children.forEach(function (vnode) { return _this._destroyDisObj(vnode); });
        return vnode;
    };
    return Render;
}());
exports.default = Render;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.UNICODE_REG_EXP = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
function isReserved(str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F;
}
exports.isReserved = isReserved;
function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
}
exports.def = def;
var BAIL_RE = new RegExp("[^" + exports.UNICODE_REG_EXP.source + ".$_\\d]");
function parsePath(path) {
    if (BAIL_RE.test(path)) {
        return;
    }
    var segments = path.split('.');
    return function (obj) {
        for (var i = 0; i < segments.length; i++) {
            if (!obj)
                return;
            obj = obj[segments[i]];
        }
        return obj;
    };
}
exports.parsePath = parsePath;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_parser_1 = __webpack_require__(6);
var index_1 = __webpack_require__(7);
var ast_node_1 = __webpack_require__(8);
var ParserFactory = (function () {
    function ParserFactory() {
    }
    ParserFactory.created = function (template) {
        var parser = new ParserFactory();
        new html_parser_1.default(template, parser);
        return parser;
    };
    ParserFactory.prototype.startElement = function (tagName, attrs, unary) {
        this.parent = this.target;
        this.target = ast_node_1.default(tagName, attrs, this.parent);
        if (!this.root) {
            this.root = this.target;
        }
        else if (!this.parent) {
            throw new Error('tow root');
        }
        if (unary) {
            this.endElement(tagName);
        }
    };
    ParserFactory.prototype.endElement = function (tagName) {
        var exp;
        if (exp = index_1.getAndRemoveAttr(this.target, 'ref'))
            this.target.processMap.ref = exp;
        if (exp = index_1.getAndRemoveAttr(this.target, 'v-for'))
            this.target.processMap.for = index_1.parseFor(exp);
        if (exp = index_1.getAndRemoveAttr(this.target, 'v-if'))
            this.target.processMap.if = this.addIfConditions(exp);
        else if (exp = index_1.getAndRemoveAttr(this.target, 'v-else-if'))
            this.target.processMap.elseif = this.addIfConditions(exp, true);
        else if ('undefined' !== typeof (exp = index_1.getAndRemoveAttr(this.target, 'v-else')))
            this.target.processMap.else = this.addIfConditions(true, true);
        if (this.parent
            && this.target !== this.root
            && !this.target.processMap.elseif
            && !this.target.processMap.else) {
            this.parent.children.push(this.target);
        }
        this.target = this.parent;
        if (this.parent) {
            this.parent = this.parent.parent;
        }
    };
    ParserFactory.prototype.comment = function (text) {
    };
    ParserFactory.prototype.characters = function (text) {
        this.target.text = text.replace(/^\s+|\s+$/g, '');
    };
    ParserFactory.prototype.addIfConditions = function (exp, prev) {
        if (prev === void 0) { prev = false; }
        var processMap;
        if (prev) {
            var parent_1 = this.target.parent;
            if (parent_1) {
                var curTarget = parent_1.children[parent_1.children.length - 1];
                if (curTarget) {
                    processMap = curTarget.processMap;
                    processMap.ifConditions.push({ exp: exp, target: this.target });
                }
            }
        }
        else {
            processMap = this.target.processMap;
            if (!processMap.ifConditions)
                processMap.ifConditions = [];
            processMap.ifConditions.push({ exp: exp, target: this.target });
        }
        return exp;
    };
    return ParserFactory;
}());
exports.default = ParserFactory;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var START_TAG_CLOSE = /\/\s*>/;
var START_TAG_RE = /^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m;
var ATTR_RE = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm;
var END_TAG_RE = /^<\/([^>\s]+)[^>]*>/m;
var ParseHtml = (function () {
    function ParseHtml(s, options) {
        this.options = options;
        this._parse(s);
    }
    ParseHtml.prototype._parse = function (s) {
        var index;
        var treatAsChars = false;
        while (s.length > 0) {
            if (s.substring(0, 4) == "<!--") {
                index = s.indexOf("-->");
                if (index != -1) {
                    this.options.comment(s.substring(4, index));
                    s = s.substring(index + 3);
                    treatAsChars = false;
                }
                else {
                    treatAsChars = true;
                }
            }
            else if (s.substring(0, 2) == "</") {
                if (END_TAG_RE.test(s)) {
                    s = s.replace(END_TAG_RE, this.parseEndTag.bind(this));
                    treatAsChars = false;
                }
                else {
                    treatAsChars = true;
                }
            }
            else if (s.charAt(0) == "<") {
                if (START_TAG_RE.test(s)) {
                    s = s.replace(START_TAG_RE, this.parseStartTag.bind(this));
                    treatAsChars = false;
                }
                else {
                    treatAsChars = true;
                }
            }
            if (treatAsChars) {
                index = s.indexOf("<");
                if (index == -1) {
                    this.options.characters(s);
                    s = "";
                }
                else {
                    this.options.characters(s.substring(0, index));
                    s = s.substring(index);
                }
            }
            treatAsChars = true;
        }
    };
    ParseHtml.prototype.parseStartTag = function (sTag, sTagName, sRest) {
        var attrs = this.parseAttributes(sTagName, sRest);
        var unary = START_TAG_CLOSE.test(sTag);
        this.options.startElement(sTagName, attrs, unary);
        return '';
    };
    ParseHtml.prototype.parseEndTag = function (sTag, sTagName) {
        this.options.endElement(sTagName);
        return '';
    };
    ParseHtml.prototype.parseAttributes = function (sTagName, s) {
        var _this = this;
        var attrs = [];
        s.replace(ATTR_RE, function () {
            var _a;
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            attrs.push((_a = _this.parseAttribute).call.apply(_a, __spreadArrays([_this, sTagName], arg)));
        });
        return attrs;
    };
    ParseHtml.prototype.parseAttribute = function (sTagName, sAttribute, sName) {
        var value = "";
        if (arguments[7])
            value = arguments[8];
        else if (arguments[5])
            value = arguments[6];
        else if (arguments[3])
            value = arguments[4];
        var empty = !value && !arguments[3];
        return { name: sName, value: empty ? null : value };
    };
    return ParseHtml;
}());
exports.default = ParseHtml;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FOR_ALIAS_RE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var FOR_ITERATOR_RE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var STRIP_PARENS_RE = /^\(|\)$/g;
function parseFor(exp) {
    var inMatch = exp.match(FOR_ALIAS_RE);
    if (!inMatch)
        return;
    var res = { for: '', alias: '', };
    res.for = inMatch[2].trim();
    var alias = inMatch[1].trim().replace(STRIP_PARENS_RE, '');
    var iteratorMatch = alias.match(FOR_ITERATOR_RE);
    if (iteratorMatch) {
        res.alias = alias.replace(FOR_ITERATOR_RE, '').trim();
        res.iterator1 = iteratorMatch[1].trim();
        if (iteratorMatch[2]) {
            res.iterator2 = iteratorMatch[2].trim();
        }
    }
    else {
        res.alias = alias;
    }
    return res;
}
exports.parseFor = parseFor;
function getAndRemoveAttr(node, name) {
    var val = node.attrsMap[name];
    var list = node.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
        if (list[i].name === name) {
            list.splice(i, 1);
            break;
        }
    }
    return val;
}
exports.getAndRemoveAttr = getAndRemoveAttr;
function getAndRemoveAttrByRegex(node, name) {
    var list = node.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
        var attr = list[i];
        if (name.test(attr.name)) {
            list.splice(i, 1);
            return attr;
        }
    }
}
exports.getAndRemoveAttrByRegex = getAndRemoveAttrByRegex;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function createASTNode(tag, attrs, parent) {
    return {
        tag: tag,
        text: '',
        attrsList: attrs,
        attrsMap: attrs.reduce(function (m, i) {
            var _a;
            return Object.assign(m, (_a = {}, _a[i.name] = i.value, _a));
        }, {}),
        processMap: {},
        parent: parent,
        children: []
    };
}
exports.default = createASTNode;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BIND_REG = /^(v-bind:|:)/;
var ON_REG = /^(v-on:|@)/;
var TEXT_REG = /\{\{([^}]+)\}\}/g;
var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;
function genAttr(ast) {
    var attrs = '', on = '';
    ast.attrsList.forEach(function (attr) {
        if (BIND_REG.test(attr.name)) {
            attrs += "\"" + attr.name.replace(BIND_REG, '') + "\":_n(" + attr.value + "),";
        }
        else if (ON_REG.test(attr.name)) {
            on += "\"" + attr.name.replace(ON_REG, '') + "\":" + genHandler(attr.value) + ",";
        }
        else {
            attrs += "\"" + attr.name + "\":_n(\"" + attr.value + "\"),";
        }
    });
    if (ast.text) {
        attrs += "text:" + genText(ast) + ",";
    }
    return "{attrs:{" + attrs + "},on:{" + on + "}}";
}
exports.genAttr = genAttr;
function genText(ast) {
    return "_s(\"" + ast.text.replace(TEXT_REG, function (_, expOrFn) { return "\"+(" + expOrFn + ")+\""; }) + "\")";
}
exports.genText = genText;
function genHandler(exp) {
    if (simplePathRE.test(exp) || fnExpRE.test(exp)) {
        return exp;
    }
    return "function($event){" + exp + "}";
}
exports.genHandler = genHandler;
function genVNode(ast, isCheck) {
    if (isCheck === void 0) { isCheck = true; }
    var forRes = ast.processMap.for;
    if (isCheck && forRes && forRes.for) {
        return "_l((" + forRes.for + "), function(" + [forRes.alias, forRes.iterator1, forRes.iterator2].filter(Boolean).join(',') + "){return " + genVNode(ast, false) + "})";
    }
    else if (isCheck && ast.processMap.ifConditions) {
        return '(' + ast.processMap.ifConditions.map(function (_a) {
            var exp = _a.exp, target = _a.target;
            return exp + "?" + genVNode(target, false) + ":";
        }).join('') + '"")';
    }
    else {
        return "_c(\"" + ast.tag + "\", " + genAttr(ast) + ", [].concat(" + ast.children.map(function (ast) { return genVNode(ast); }).join(',') + "))";
    }
}
exports.genVNode = genVNode;
function createVNode(tag, data, children) {
    var vnode = {
        tag: tag,
        children: children,
        attrs: data.attrs,
        on: data.on,
    };
    return vnode;
}
exports.createVNode = createVNode;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
function renderList(val, render) {
    if (Array.isArray(val) || 'string' === typeof val) {
        return Array.from(val).map(function (v, i) { return render(v, i); });
    }
    else if ('number' === typeof val) {
        return Array.from({ length: val }).map(function (v, i) { return render(i + 1, i); });
    }
    else if (util_1.isObject(val)) {
        return Object.keys(val).map(function (k, i) { return render(val[k], k, i); });
    }
    return [];
}
exports.renderList = renderList;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var array_1 = __webpack_require__(12);
var dep_1 = __webpack_require__(1);
var Observer = (function () {
    function Observer(value) {
        this.value = value;
        this.dep = new dep_1.default;
        index_1.def(value, '__ob__', this);
        if (Array.isArray(value)) {
            if (index_1.hasProto) {
                protoAugment(value, array_1.arrayMethods);
            }
            else {
                copyAugment(value, array_1.arrayMethods, array_1.arrayKeys);
            }
            value.forEach(function (item) { return observe(item); });
        }
        else {
            this.walk(value);
        }
    }
    Observer.prototype.walk = function (obj) {
        var _this = this;
        Object.keys(obj).forEach(function (key) {
            _this.defineReactive(obj, key);
        });
    };
    Observer.prototype.observeArray = function (items) {
        items.forEach(function (item) { return observe(item); });
    };
    Observer.prototype.defineReactive = function (obj, key, val) {
        var dep = new dep_1.default();
        var property = Object.getOwnPropertyDescriptor(obj, key);
        if (property && property.configurable === false) {
            return;
        }
        var getter = property && property.get;
        var setter = property && property.set;
        if ((!getter || setter) && arguments.length === 2) {
            val = obj[key];
        }
        var childOb = observe(val);
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                var value = getter ? getter.call(obj) : val;
                if (dep_1.default.target) {
                    dep.depend();
                    if (childOb) {
                        childOb.dep.depend();
                        if (Array.isArray(value)) {
                            dependArray(value);
                        }
                    }
                }
                return value;
            },
            set: function (newVal) {
                var value = getter ? getter.call(obj) : val;
                if (newVal === value || (newVal !== newVal && value !== value)) {
                    return;
                }
                if (getter && !setter)
                    return;
                if (setter) {
                    setter.call(obj, newVal);
                }
                else {
                    val = newVal;
                }
                childOb = observe(newVal);
                dep.notify();
            }
        });
    };
    return Observer;
}());
exports.default = Observer;
function observe(value) {
    if (!value || typeof value !== 'object')
        return;
    var ob;
    if (Object.prototype.hasOwnProperty.call(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__;
    }
    else {
        ob = new Observer(value);
    }
    return ob;
}
exports.observe = observe;
function dependArray(arr) {
    arr.forEach(function (e) {
        e && e.__ob__ && e.__ob__.dep.depend();
        if (Array.isArray(e)) {
            dependArray(e);
        }
    });
}
function protoAugment(target, src) {
    target.__proto__ = src;
}
function copyAugment(target, src, keys) {
    for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        index_1.def(target, key, src[key]);
    }
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var arrayProto = Array.prototype;
exports.arrayMethods = Object.create(arrayProto);
exports.arrayKeys = Object.getOwnPropertyNames(exports.arrayMethods);
var methodsToPatch = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
];
methodsToPatch.forEach(function (method) {
    var original = arrayProto[method];
    index_1.def(exports.arrayMethods, method, function mutator() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = original.apply(this, args);
        var ob = this.__ob__;
        var inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }
        if (inserted)
            ob.observeArray(inserted);
        ob.dep.notify();
        return result;
    });
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(0);
var dep_1 = __webpack_require__(1);
var uid = 0;
var Watcher = (function () {
    function Watcher(vm, expOrFn, cb) {
        vm._watchers.push(this);
        this.id = uid++;
        this.active = true;
        this.vm = vm;
        this.deps = [];
        this.newDeps = [];
        this.depIds = new Set();
        this.newDepIds = new Set();
        this.cb = cb;
        this.expression = expOrFn.toString();
        if ('function' === typeof expOrFn) {
            this.getter = expOrFn;
        }
        else {
            this.getter = index_1.parsePath(expOrFn);
            if (!this.getter) {
                this.getter = index_1.noop;
            }
        }
        this.value = this.get();
    }
    Watcher.prototype.get = function () {
        dep_1.pushTarget(this);
        var value = this.getter.call(this.vm, this.vm);
        dep_1.popTarget();
        this.cleanupDeps();
        return value;
    };
    Watcher.prototype.addDep = function (dep) {
        var id = dep.id;
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id);
            this.newDeps.push(dep);
            if (!this.depIds.has(id)) {
                dep.addSub(this);
            }
        }
    };
    Watcher.prototype.cleanupDeps = function () {
        var i = this.deps.length;
        while (i--) {
            var dep = this.deps[i];
            if (!this.newDepIds.has(dep.id)) {
                dep.removeSub(this);
            }
        }
        var tmp = this.depIds;
        this.depIds = this.newDepIds;
        this.newDepIds = tmp;
        this.newDepIds.clear();
        var tmp2 = this.deps;
        this.deps = this.newDeps;
        this.newDeps = tmp2;
        this.newDeps.length = 0;
    };
    Watcher.prototype.update = function () {
        this.run();
    };
    Watcher.prototype.run = function () {
        if (!this.active)
            return;
        var value = this.get();
        if (value !== this.value ||
            index_1.isObject(value)) {
            var oldValue = this.value;
            this.value = value;
            this.cb.call(this.vm, value, oldValue);
        }
    };
    Watcher.prototype.depend = function () {
        var i = this.deps.length;
        while (i--) {
            this.deps[i].depend();
        }
    };
    Watcher.prototype.teardown = function () {
        if (!this.active)
            return;
        var i = this.deps.length;
        while (i--) {
            this.deps[i].removeSub(this);
        }
        this.active = false;
    };
    return Watcher;
}());
exports.default = Watcher;


/***/ })
/******/ ])["default"];
});