/*!
  * vue-egret.js v1.4.0
  * Copyright (c) 2020-present, Hsuna
  * Released code under the China License.
  */
'use strict';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/* @flow */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var UNICODE_REG_EXP = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Define a property.
 */

function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */

var BAIL_RE = new RegExp("[^".concat(UNICODE_REG_EXP.source, ".$_\\d]"));
function parsePath(path) {
  if (BAIL_RE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }

    return obj;
  };
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop(a, b, c) {} // can we use __proto__?

var hasProto = ('__proto__' in {});
var emptyObject = Object.freeze({}); // these helpers produces better vm code in JS engines due to their
// explicitness and function inlining

function isUndef(v) {
  return v === undefined || v === null;
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */

function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object';
}
/**
 * Convert a value to a string that is actually rendered.
 */

function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */

function toNumber(val) {
  var n = Number(String(val));
  return Array.isArray(val) || isNaN(n) || '' === val ? val : n;
}
/**
 * Merge an Array of Objects into a single Object.
 */

function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      res = _objectSpread2(_objectSpread2({}, res), arr[i]);
    }
  }

  return res;
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */

var _toString = Object.prototype.toString;
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
/**
 * Check if val is a valid array index.
 */

function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
var HOOK_RE = /^hook:/;
function isHook(n) {
  return HOOK_RE.test(n);
}
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}
var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
/**
 * Check whether an object has the property.
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */

function looseEqual(a, b) {
  if (a === b) return true;
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */

function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i;
  }

  return -1;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */

function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Create a cached version of a pure function.
 */

function cached(fn) {
  var cache = {};
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;
function normalizeChildren() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}
function normalizeArrayChildren() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return children.reduce(function (pre, vnode) {
    return pre.concat(Array.isArray(vnode) ? normalizeArrayChildren(vnode) : vnode);
  }, []);
}
function simpleNormalizeChildren() {
  var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
}
function createVNode(tag) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var normalizationType = arguments.length > 3 ? arguments[3] : undefined;

  if (Array.isArray(data)) {
    normalizationType = children;
    children = data;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode = _objectSpread2(_objectSpread2({}, data), {}, {
    tag: tag,
    children: children.filter(Boolean)
  });

  vnode.children.forEach(function (child) {
    return child.parent = vnode;
  });
  return vnode;
}
function createFnInvoker(fns, thisObject) {
  var invoker = function invoker() {
    var fns = invoker.fns;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (Array.isArray(fns)) {
      var cloned = _toConsumableArray(fns);

      var fn = cloned.shift();

      while (fn) {
        // eslint-disable-next-line prefer-spread
        fn.apply(thisObject || this, args);
        fn = cloned.shift();
      }
    } else {
      // eslint-disable-next-line prefer-spread
      return fns.apply(thisObject || this, args);
    }
  };

  invoker.fns = fns;
  return invoker;
}

/**
 * Check if a tag is a built-in tag.
 */

makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */

makeMap('key,ref,slot,slot-scope,is');
/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */

function bindObjectProps(data, value, isSync) {
  if (value) {
    if (!isObject(value)) ; else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var attrs = data.attrs || (data.attrs = {});

      var _loop = function _loop(key) {
        attrs[key] = value[key];

        if (isSync) {
          var on = data.on || (data.on = {});
          on["update:".concat(key)] = createFnInvoker(function ($event) {
            value[key] = $event;
          });
        }
      };

      for (var key in value) {
        _loop(key);
      }
    }
  }

  return data;
}
function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) ; else {
      var on = data.on = _objectSpread2({}, data.on);

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.

function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/**
 * 列表渲染
 * @author Hsuna
 * @param { any } val   渲染数据，可递归数据
 * @param { Function } render     渲染函数
 * @return { Array<T> } 渲染后列表
 */

function renderList(val, render) {
  if (Array.isArray(val) || 'string' === typeof val) {
    return Array.from(val).map(function (v, i) {
      return render(v, i);
    });
  } else if ('number' === typeof val) {
    return Array.from({
      length: val
    }).map(function (v, i) {
      return render(i + 1, i);
    });
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      var ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }

      return ret;
    } else {
      return Object.keys(val).map(function (k, i) {
        return render(val[k], k, i);
      });
    }
  }

  return [];
}

// dep实例的ID
var uid$1 = 0;

var Dep = /*#__PURE__*/function () {
  function Dep() {
    _classCallCheck(this, Dep);

    this.id = uid$1++;
    this.subs = [];
  }

  _createClass(Dep, [{
    key: "depend",
    value: function depend() {
      if (Dep.target) {
        Dep.target.addDep(this);
      }
    }
  }, {
    key: "addSub",
    value: function addSub(sub) {
      this.subs.push(sub);
    }
  }, {
    key: "removeSub",
    value: function removeSub(sub) {
      var index = this.subs.indexOf(sub);

      if (index > -1) {
        this.subs.splice(index, 1);
      }
    }
  }, {
    key: "notify",
    value: function notify() {
      this.subs.forEach(function (e) {
        e.update();
      });
    }
  }]);

  return Dep;
}(); // The current target watcher being evaluated.
Dep.target = null;
var targetStack = [];
function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}
function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

var DIR_REG = /^v-|^@|^:|^#/; // v-foo=

var BIND_REG = /^(v-bind:|:)/; // v-bind:foo | :foo

var ON_REG = /^(v-on:|@)/; // v-on:type | @type

var DYNAMIC_ARG_RE = /^\[.*\]$/; // v-on:[arg]

function parseAttrList(ast) {
  var astData = {
    tag: ast.tag,
    key: ast.key,
    ref: ast.ref,
    refInFor: false,
    attrs: [],
    on: [],
    nativeOn: [],
    directives: [],
    wrapDir: []
  };
  ast.attrsList.forEach(function (attr) {
    if (DIR_REG.test(attr.name)) {
      var dir = parseDirective(attr.name, attr.value);

      if (BIND_REG.test(attr.name)) {
        astData.attrs.push(dir);

        if (dir.modifiers && dir.modifiers.sync) {
          astData.on.push(_objectSpread2(_objectSpread2({}, dir), {}, {
            name: 'sync'
          }));
        }
      } else if (ON_REG.test(attr.name)) {
        if (dir.modifiers.native) {
          astData.nativeOn.push(dir);
        } else {
          astData.on.push(dir);
        }
      } else {
        astData.directives.push(dir);
      }
    } else {
      astData.attrs.push({
        name: 'bind',
        arg: attr.name,
        expression: "_n(\"".concat(attr.value, "\")")
      });
    }
  });

  if (ast.text) {
    astData.attrs.push({
      name: 'text',
      arg: "\"text\"",
      expression: ast.text
    });
  }

  if (ast.ref) {
    astData.refInFor = checkInFor(ast);
  }

  return astData;
}
function parseDirective(directive, expression) {
  var name = '',
      arg = '',
      modifiers = []; // @type => v-on:type, :type =>

  directive = directive.replace(BIND_REG, 'v-bind:').replace(ON_REG, 'v-on:'); // v-my-directive:key.foo.bar => ['v-my-directive:key', 'foo', 'bar']

  var _directive$split = directive.split('.');

  var _directive$split2 = _toArray(_directive$split);

  directive = _directive$split2[0];
  modifiers = _directive$split2.slice(1);

  var _directive$split3 = directive.split(':');

  var _directive$split4 = _slicedToArray(_directive$split3, 2);

  name = _directive$split4[0];
  arg = _directive$split4[1];
  return {
    name: name.replace(DIR_REG, ''),
    expression: expression,
    arg: arg ? DYNAMIC_ARG_RE.test(arg) ? arg.slice(1, -1) : "\"".concat(arg, "\"") : '',
    rawArg: arg || '',
    modifiers: modifiers.reduce(function (o, k) {
      return Object.assign(o, _defineProperty({}, k, true));
    }, {})
  };
}
var parseEvent = cached(function (name) {
  var once = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once,
    capture: capture
  };
});
function parseModel(val) {
  // eslint-disable-next-line prefer-const
  var len, str, index, expressionPos, expressionEndPos;

  function next() {
    return str.charCodeAt(++index);
  }

  function eof() {
    return index >= len;
  }

  function isStringStart(chr) {
    return chr === 0x22 || chr === 0x27;
  }

  function parseBracket(chr) {
    var inBracket = 1;
    expressionPos = index;

    while (!eof()) {
      chr = next();

      if (isStringStart(chr)) {
        parseString(chr);
        continue;
      }

      if (chr === 0x5b) inBracket++;
      if (chr === 0x5d) inBracket--;

      if (inBracket === 0) {
        expressionEndPos = index;
        break;
      }
    }
  }

  function parseString(chr) {
    var stringQuote = chr;

    while (!eof()) {
      chr = next();

      if (chr === stringQuote) {
        break;
      }
    }
  }

  val = val.trim();

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index = val.lastIndexOf('.');

    if (index > -1) {
      return {
        exp: val.slice(0, index),
        key: '"' + val.slice(index + 1) + '"'
      };
    } else {
      return {
        exp: val,
        key: null
      };
    }
  }

  str = val;
  index = expressionPos = expressionEndPos = 0;

  while (index < len) {
    var _chr = str.charCodeAt(++index);
    /* istanbul ignore if */


    if (isStringStart(_chr)) {
      parseString(_chr);
    } else if (_chr === 0x5b) {
      parseBracket(_chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  };
}

function checkInFor(ast) {
  var parent = ast;

  while (parent) {
    if (parent.for !== undefined) {
      return true;
    }

    parent = parent.parent;
  }

  return false;
}

function on(data, dir) {
  data.wrapDir.push(function (code) {
    return "_g(".concat(code, ",").concat(dir.expression, ")");
  });
}

function bind(data, dir) {
  data.wrapDir.push(function (code) {
    return "_b(".concat(code, ",").concat(dir.expression).concat(dir.modifiers && dir.modifiers.sync ? ',true' : '', ")");
  });
}

function normalizeDirectives(dirs) {
  return dirs.reduce(function (obj, dir) {
    return obj[dir.name] = dir, obj;
  }, {});
}
var baseDirectives = {
  on: on,
  bind: bind
};

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

var delComma = function delComma(str) {
  return str.replace(/,$/, '');
};

function genData(ast) {
  var data = parseAttrList(ast);
  var str = '{'; // directives first.

  if (data.directives && data.directives.length) {
    str += genDirectives(data.directives, data);
  } // key


  if (data.key) {
    str += "key:".concat(data.key, ",");
  } // ref


  if (data.ref) {
    str += "ref:".concat(data.ref, ",");
  }

  if (data.refInFor) {
    str += "refInFor:true,";
  } // attributes


  if (data.attrs && data.attrs.length) {
    str += "attrs:".concat(genProps(data.attrs), ",");
  } // on


  if (data.on && data.on.length) {
    str += "on:".concat(genHandlers(data.on), ",");
  } // nativeOn


  if (data.nativeOn && data.nativeOn.length) {
    str += "nativeOn:".concat(genHandlers(data.nativeOn), ",");
  }

  str = delComma(str) + '}';

  if (data.wrapDir && data.wrapDir.length) {
    data.wrapDir.forEach(function (wrap) {
      str = wrap(str);
    });
  }

  return str;
}
function genSync(expression) {
  var res = parseModel(expression);

  if (res.key === null) {
    return "".concat(expression, "=$event");
  } else {
    return "$set(".concat(res.exp, ", ").concat(res.key, ", $event)");
  }
}
function genProps(dirs) {
  var res = '';
  dirs.forEach(function (dir) {
    if ('text' === dir.name) {
      res += "".concat(dir.rawArg || dir.arg, ":_s(").concat(dir.expression, "),");
    } else {
      res += "".concat(dir.rawArg || dir.arg, ":").concat(dir.expression, ",");
    }
  });
  return res ? "{".concat(delComma(res), "}") : '';
}
function genHandlers(dirs) {
  var res = '';
  dirs.forEach(function (dir) {
    var isSync = 'sync' == dir.name;
    var isDynamic = false;
    var name = dir.arg;

    if (isSync) {
      name = "_p(".concat(name, ", \"update:\")");
      isDynamic = true;
    } // check modifier


    if (dir.modifiers) {
      if (dir.modifiers.capture) {
        name = "_p(".concat(name, ", \"!\")");
        isDynamic = true;
      }

      if (dir.modifiers.once) {
        name = "_p(".concat(name, ", \"~\")");
        isDynamic = true;
      }
    }

    if (isDynamic) {
      name = "[".concat(name, "]");
    }

    res += "".concat(name, ":").concat(genHandler(dir, isSync), ",");
  });
  return res ? "{".concat(delComma(res), "}") : '';
}

var genGuard = function genGuard(condition) {
  return "if(".concat(condition, ")return null;");
};

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget")
};
function genHandler(dir, isSync) {
  var expression = (isSync ? genSync(dir.expression) : dir.expression) || '';
  var isMethodPath = simplePathRE.test(expression); // @touchTap="doSomething"

  var isFunctionExpression = fnExpRE.test(expression); // @touchTap="() => {}" or @touchTap="function(){}"

  var isFunctionInvocation = simplePathRE.test(expression.replace(fnInvokeRE, '')); // @touchTap="doSomething($event)"
  // 在没有修饰符的情况下

  if (!dir.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return expression;
    }

    return "function($event){".concat(isFunctionInvocation ? "return ".concat(expression) : expression, "}");
  } else {
    var code = '';

    for (var key in dir.modifiers) {
      if (modifierCode[key]) {
        code += modifierCode[key];
      }
    }

    var handlerCode = isMethodPath ? "return ".concat(expression, "($event)") : isFunctionExpression ? "return (".concat(expression, ")($event)") : isFunctionInvocation ? "return ".concat(expression) : expression;
    return "function($event){".concat(code).concat(handlerCode, "}");
  }
}
function genDirectives(dirs, astData) {
  var res = '';
  dirs.forEach(function (dir) {
    var needRuntime = true;
    var gen = baseDirectives[dir.name];

    if (gen) {
      needRuntime = !!gen(astData, dir);
    }

    if (needRuntime) {
      res += "{name:\"".concat(dir.name, "\",value:_n(").concat(dir.expression, "),expression:\"").concat(dir.expression, "\"").concat(dir.arg ? ",arg:".concat(dir.arg) : '').concat(dir.modifiers ? ",modifiers:".concat(JSON.stringify(dir.modifiers)) : '', "},");
    }
  });
  return res ? "directives:[".concat(delComma(res), "],") : '';
}
function genVNode(ast) {
  var isCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var forRes = ast.for;

  if (isCheck && forRes && forRes.for) {
    return "_l((".concat(forRes.for, "), function(").concat([forRes.alias, forRes.iterator1, forRes.iterator2].filter(Boolean).join(','), "){return ").concat(genVNode(ast, false), "})");
  } else if (isCheck && ast.ifConditions) {
    return '(' + ast.ifConditions.map(function (_ref) {
      var exp = _ref.exp,
          target = _ref.target;
      return "".concat(exp, "?").concat(genVNode(target, false), ":");
    }).join('') + '"")';
  } else {
    if (isUndef(ast.component) && 'template' === ast.tag) {
      return ast.children.length > 0 ? "[].concat(".concat(ast.children.map(function (ast) {
        return genVNode(ast);
      }), ")") : '';
    } else {
      var dataStr = genData(ast);
      var normalizationType = getNormalizationType(ast.children);
      return "_c(".concat(ast.component || "\"".concat(ast.tag, "\"")).concat('{}' !== dataStr ? ",".concat(dataStr) : '').concat(ast.children.length > 0 ? ",[].concat(".concat(ast.children.map(function (ast) {
        return genVNode(ast);
      }), ")") : '').concat(normalizationType ? ",".concat(normalizationType) : '', ")");
    }
  }
}

function needsNormalization(ast) {
  return ast.for !== undefined || ast.tag === 'template' || ast.tag === 'slot';
}

function maybeComponent(ast) {
  return !!ast.component;
}

function getNormalizationType(children) {
  var res = 0;

  for (var i = 0; i < children.length; i++) {
    var ast = children[i];

    if (needsNormalization(ast) || ast.ifConditions && ast.ifConditions.some(function (c) {
      return needsNormalization(c.target);
    })) {
      res = ALWAYS_NORMALIZE;
      break;
    }

    if (maybeComponent(ast) || ast.ifConditions && ast.ifConditions.some(function (c) {
      return maybeComponent(c.target);
    })) {
      res = SIMPLE_NORMALIZE;
    }
  }

  return res;
}

/**
 * Not type-checking this file because it's mostly vendor code.
 */
var START_TAG_CLOSE = /\/\s*>/;
var START_TAG_RE = /^<([^>\s\/]+)((\s+[^=>\s]+(\s*=\s*((\"[^"]*\")|(\'[^']*\')|[^>\s]+))?)*)\s*\/?\s*>/m;
var ATTR_RE = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm;
var END_TAG_RE = /^<\/([^>\s]+)[^>]*>/m;

var ParseHtml = /*#__PURE__*/function () {
  function ParseHtml(s, options) {
    _classCallCheck(this, ParseHtml);

    this.options = options;

    this._parse(s);
  }

  _createClass(ParseHtml, [{
    key: "_parse",
    value: function _parse(s) {
      var index;
      var treatAsChars = false;

      while (s.length > 0) {
        // Comment
        if (s.substring(0, 4) == '<!--') {
          index = s.indexOf('-->');

          if (index != -1) {
            this.options.comment(s.substring(4, index));
            s = s.substring(index + 3);
            treatAsChars = false;
          } else {
            treatAsChars = true;
          }
        } // end tag
        else if (s.substring(0, 2) == '</') {
            if (END_TAG_RE.test(s)) {
              s = s.replace(END_TAG_RE, this.parseEndTag.bind(this));
              treatAsChars = false;
            } else {
              treatAsChars = true;
            }
          } // start tag
          else if (s.charAt(0) == '<') {
              if (START_TAG_RE.test(s)) {
                s = s.replace(START_TAG_RE, this.parseStartTag.bind(this));
                treatAsChars = false;
              } else {
                treatAsChars = true;
              }
            }

        if (treatAsChars) {
          index = s.indexOf('<');

          if (index == -1) {
            this.options.characters(s);
            s = '';
          } else {
            this.options.characters(s.substring(0, index));
            s = s.substring(index);
          }
        }

        treatAsChars = true;
      }
    }
  }, {
    key: "parseStartTag",
    value: function parseStartTag(sTag, sTagName, sRest) {
      var attrs = this.parseAttributes(sTagName, sRest);
      var unary = START_TAG_CLOSE.test(sTag);
      this.options.startElement(sTagName, attrs, unary);
      return '';
    }
  }, {
    key: "parseEndTag",
    value: function parseEndTag(sTag, sTagName) {
      this.options.endElement(sTagName);
      return '';
    }
  }, {
    key: "parseAttributes",
    value: function parseAttributes(sTagName, sRest) {
      var _this = this;

      var attrs = [];
      sRest.replace(ATTR_RE, function () {
        var _this$parseAttribute;

        for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
          arg[_key] = arguments[_key];
        }

        var attr = (_this$parseAttribute = _this.parseAttribute).call.apply(_this$parseAttribute, [_this, sTagName].concat(arg));

        if (attr.name && '/' !== attr.name) attrs.push(attr);
        return '';
      });
      return attrs;
    }
  }, {
    key: "parseAttribute",
    value: function parseAttribute(sTagName, sAttribute, sName) {
      var value = '';
      if (arguments[7]) value = arguments[8];else if (arguments[5]) value = arguments[6];else if (arguments[3]) value = arguments[4];
      var empty = !value && !arguments[3];
      return {
        name: sName,
        value: empty ? null : value
      };
    }
  }]);

  return ParseHtml;
}();

var FOR_ALIAS_RE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var FOR_ITERATOR_RE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var STRIP_PARENS_RE = /^\(|\)$/g;
function parseFor(exp) {
  var inMatch = exp.match(FOR_ALIAS_RE);
  if (!inMatch) return;
  var res = {
    for: '',
    alias: ''
  };
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(STRIP_PARENS_RE, '');
  var iteratorMatch = alias.match(FOR_ITERATOR_RE);

  if (iteratorMatch) {
    res.alias = alias.replace(FOR_ITERATOR_RE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();

    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }

  return res;
}
function getBindingAttr(node, name) {
  var dynamicValue = getAndRemoveAttr(node, ':' + name) || getAndRemoveAttr(node, 'v-bind:' + name);
  if (dynamicValue != null) return dynamicValue;
  var staticValue = getAndRemoveAttr(node, name);
  if (staticValue != null) return JSON.stringify(staticValue);
}
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

/**
 * 创建语法树节点
 * @param { string } tag 标签名
 * @param { Array<ASTAttr> } attrs 属性列表
 * @param { ASTNode } parent 父语法树节点
 * @return { ASTNode } 新语法树节点
 */
function createASTNode(tag, attrs, parent) {
  return {
    tag: tag,
    text: '',
    attrsList: attrs,
    attrsMap: attrs.reduce(function (m, i) {
      return Object.assign(m, _defineProperty({}, i.name, i.value));
    }, {}),
    parent: parent,
    children: []
  };
}

/**
 * 模板解析工厂
 * @description 将模板解析成AST
 * @author Hsuna
 */

var REG_TRIM = /^\s+|\s+$/g; //去掉头尾空白

var REG_BREAK = /^\s*\n+|\n+\s*$/g; //去掉前后的空白行

var REG_INTERPOLATE = /{{([^}]+?)}}/; //{{text}}

var ParserFactory = /*#__PURE__*/function () {
  function ParserFactory() {
    _classCallCheck(this, ParserFactory);
  }

  _createClass(ParserFactory, [{
    key: "startElement",
    value: function startElement(tagName, attrs, unary) {
      this._parent = this._target;
      this._target = createASTNode(tagName, attrs, this._parent);

      if (!this._root) {
        this._root = this._target;
      } else if (!this._parent) {
        throw new Error('tow root');
      }

      if (unary) {
        this.endElement(tagName);
      }
    }
  }, {
    key: "endElement",
    value: function endElement(tagName) {
      var exp;
      if (exp = getBindingAttr(this._target, 'is')) this._target.component = exp;
      if (exp = getBindingAttr(this._target, 'key')) this._target.key = exp;
      if (exp = getBindingAttr(this._target, 'ref')) this._target.ref = exp;
      if (exp = getAndRemoveAttr(this._target, 'v-for')) this._target.for = parseFor(exp);
      if (exp = getAndRemoveAttr(this._target, 'v-if')) this._target.if = this.addIfConditions(exp);else if (exp = getAndRemoveAttr(this._target, 'v-else-if')) this._target.elseif = this.addIfConditions(exp, true);else if ('undefined' !== typeof (exp = getAndRemoveAttr(this._target, 'v-else'))) this._target.else = this.addIfConditions(true, true);

      if (this._parent && this._target !== this._root && !this._target.elseif && !this._target.else) {
        this._parent.children.push(this._target);
      }

      this._target = this._parent;

      if (this._parent) {
        this._parent = this._parent.parent;
      }
    }
  }, {
    key: "comment",
    value: function comment(text) {}
    /**
     *
     * @param { string } text
     */

  }, {
    key: "characters",
    value: function characters(text) {
      if (this._target) {
        var content = text.replace(REG_BREAK, '') // 去掉前后的空白行
        .split('\n').map(function (s) {
          return s.replace(REG_TRIM, '');
        }).join('\n'); // 去掉每行头尾空白

        var m = content.match(REG_INTERPOLATE);
        var templateArr = [];

        while (m) {
          templateArr.push(JSON.stringify(content.slice(0, m.index)));
          templateArr.push(m[1].replace(REG_TRIM, ''));
          content = content.slice(m.index + m[0].length);
          m = content.match(REG_INTERPOLATE);
        }

        if (content.length) {
          templateArr.push(JSON.stringify(content));
        }

        if (templateArr.length) {
          this._target.text = "''.concat(".concat(templateArr.join(','), ")");
        }
      }
    }
    /**
     *
     * @param exp
     * @param prev 前置
     */

  }, {
    key: "addIfConditions",
    value: function addIfConditions(exp) {
      var prev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var target;

      if (prev) {
        var parent = this._target.parent;

        if (parent) {
          var curTarget = parent.children[parent.children.length - 1];

          if (curTarget) {
            target = curTarget;
          }
        }
      } else {
        target = this._target;
      }

      if (target) {
        if (!target.ifConditions) target.ifConditions = [];
        target.ifConditions.push({
          exp: exp,
          target: this._target
        });
      }

      return exp;
    }
    /**
     * 获取根语法树节点
     * @get { ASTNode } root
     */

  }, {
    key: "root",
    get: function get() {
      return this._root;
    }
  }], [{
    key: "created",
    value: function created(template) {
      var parser = new ParserFactory();
      new ParseHtml(template, parser);
      return parser;
    }
  }]);

  return ParserFactory;
}();

function astStrRender(template) {
  // 通过模板解析，将模板转化为AST
  var ast = genVNode(ParserFactory.created(template).root);
  return "with(this){ return ".concat(ast, ";}");
}

function ev(data) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var arr = str.split('.');

  var _iterator = _createForOfIteratorHelper(arr),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;
      if (data[key]) data = data[key];else return null;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return data;
}

function installRender(target) {
  target._c = createVNode;
  target._n = toNumber;
  target._s = toString;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._l = renderList;
  target._b = bindObjectProps;
  target._g = bindObjectListeners;
  target._p = prependModifier; // 返回render创建方法

  target.$createVNode = createVNode;
}
var DEFAULT_ATTR = '__VUE_EGRET_DEFAULT__';
/**
 * 渲染器
 * @author Hsuna
 */

var Render = /*#__PURE__*/function () {
  /** 新虚拟节点 */
  // private _newVnode:VNode;
  function Render(vm) {
    _classCallCheck(this, Render);

    this._vm = vm;
    this._components = Object.assign({}, VueEgret._components, this._vm._components);
    this._directives = Object.assign({}, VueEgret._directives, this._vm._directives);

    this._init();
  }

  _createClass(Render, [{
    key: "_init",
    value: function _init() {
      // 安装渲染器AST运行方法
      installRender(this._vm);
      this._render = 'function' === typeof this._vm.$options.render // 如果存在渲染器这渲染，否则渲染模板
      ? this._vm.$options.render : Function.prototype.constructor(astStrRender(this._vm.$options.template));

      this._tick();
    }
  }, {
    key: "_tick",
    value: function _tick() {
      if (this._vm) {
        var newVNode = this._createVNode();

        this._vnode = this._patch(this._vnode, newVNode);
      }
    }
  }, {
    key: "inserted",
    value: function inserted() {
      // 触发指令：被绑定元素插入父节点时调用
      this._triggerDirective('inserted', this._vnode);
    }
  }, {
    key: "update",
    value: function update() {
      this._tick();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this._vnode && this._destroyDisObj(this._vnode);
      this._vm = null;
    }
    /**
     *
     * @param { VNode } oldVNode
     * @param { VNode } newVNode
     * @return { VNode }
     */

  }, {
    key: "_patch",
    value: function _patch(oldVNode, newVNode) {
      if (!oldVNode) {
        //如果不存在旧节点的情况下，说明还未初始化，则初始化页面
        // 创建新节点
        this._vm.$el = this._createDisObj(newVNode);
      } else if (this._sameVNode(oldVNode, newVNode)) {
        //相似节点采用更新的方式
        this._patchVNode(oldVNode, newVNode);
      } else {
        //非相似节点直接替换
        // 获取父节点
        var parent = oldVNode.parent.sp;

        if (parent) {
          // 创建新节点
          var sp = this._createDisObj(newVNode);

          parent.addChildAt(sp, parent.getChildIndex(oldVNode.sp));

          this._destroyDisObj(oldVNode);
        }
      }

      return newVNode;
    }
    /**
     * 比较替换新旧节点
     * @param { VNode } oldVNode
     * @param { VNode } newVNode
     */

  }, {
    key: "_patchVNode",
    value: function _patchVNode(oldVNode, newVNode) {
      newVNode.sp = oldVNode.sp;
      newVNode.vm = oldVNode.vm;

      this._updateDisObj(oldVNode, newVNode);
    }
    /**
     * 通过diff算法，最小粒度更新节点
     * @param { Array<VNode> } oldCh 虚拟节点旧子列表
     * @param { Array<VNode> } newCh 虚拟节点新子列表
     * @param { egret.DisplayObjectContainer } parent 节点显示对象
     */

  }, {
    key: "_updateChildren",
    value: function _updateChildren(oldCh, newCh, parent) {
      if (oldCh === newCh) return;
      var oldStartIdx = 0;
      var newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var newEndIdx = newCh.length - 1;
      var oldStartVNode = oldCh[0];
      var oldEndVNode = oldCh[oldEndIdx];
      var newStartVNode = newCh[0];
      var newEndVNode = newCh[newEndIdx];

      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (!oldStartVNode) {
          oldStartVNode = oldCh[++oldStartIdx];
        } else if (!oldEndVNode) {
          oldEndVNode = oldCh[--oldEndIdx];
        } else if (this._sameVNode(oldStartVNode, newStartVNode)) {
          // 头部节点相似，头部指针移动
          this._patchVNode(oldStartVNode, newStartVNode);

          oldStartVNode = oldCh[++oldStartIdx];
          newStartVNode = newCh[++newStartIdx];
        } else if (this._sameVNode(oldEndVNode, newEndVNode)) {
          // 底部节点相似，底部指针移动
          this._patchVNode(oldEndVNode, newEndVNode);

          oldEndVNode = oldCh[--oldEndIdx];
          newEndVNode = newCh[--newEndIdx];
        } else {
          var sp = void 0;

          for (var i = oldStartIdx; i <= oldEndIdx; i++) {
            if (this._sameVNode(newStartVNode, oldCh[i])) {
              // 查找旧显示列表是否有与当前位置相似的新节点
              this._patchVNode(oldCh[i], newStartVNode); // 将相似的旧节点插入到新节点对应位置
              // 修改显示对象位置


              sp = newStartVNode.sp;
              parent.setChildIndex(sp, newStartIdx); // 修改虚拟节点位置

              var oldVNode = oldCh.splice(i, 1)[0];
              oldCh.splice(newStartIdx, 0, oldVNode);
              oldStartVNode = oldCh[++oldStartIdx];
              break;
            }
          }

          if (!sp) {
            sp = this._createDisObj(newStartVNode);
            parent.addChildAt(sp, newStartIdx);
          }

          newStartVNode = newCh[++newStartIdx];
        }
      }

      if (oldStartIdx > oldEndIdx) {
        // 新增缺少的显示对象列表
        var _sp;

        for (; newStartIdx <= newEndIdx; ++newStartIdx) {
          newStartVNode = newCh[newStartIdx];
          _sp = this._createDisObj(newStartVNode);
          parent.addChildAt(_sp, newStartIdx);
        }
      } else if (newStartIdx > newEndIdx) {
        // 删除多余的显示对象列表
        for (; oldStartIdx <= oldEndIdx; ++oldStartIdx) {
          oldStartVNode = oldCh[oldStartIdx];

          this._destroyDisObj(oldStartVNode);
        }
      }
    }
    /**
     * 获取虚拟节点
     * @return { VNode }
     */

  }, {
    key: "_createVNode",
    value: function _createVNode() {
      return this._render.call(this._vm, createVNode);
    }
    /**
     * 判断新旧节点是否一致
     * @param { VNode } oldVNode 旧节点
     * @param { VNode } newVNode 新节点
     * @return { boolean }
     */

  }, {
    key: "_sameVNode",
    value: function _sameVNode(oldVNode, newVNode) {
      return oldVNode.key === newVNode.key && // VM实例时生成的key值
      oldVNode.tag === newVNode.tag && // 类名
      (oldVNode.attrs || {}).key === (newVNode.attrs || {}).key // 属性key值，当属性使用key时，进行强制比对，特别是循环列表，进行强制替换
      ;
    }
    /**
     * 创建新的显示对象
     * @param { VNode } vnode 对象虚拟节点
     * @return { egret.DisplayObject } 返回新的显示对象
     */

  }, {
    key: "_createDisObj",
    value: function _createDisObj(vnode) {
      var _this = this;

      var VClass = this._components[vnode.tag];
      pushTarget(); //阻断所有更新监听
      // Component

      if (VClass) {
        var parentOptions = {
          parent: this._vm,
          propsData: {},
          _propsKeys: [],
          attrs: {},
          listeners: {}
        };
        var props = VClass.options.props;

        for (var key in props) {
          parentOptions._propsKeys.push(key);

          if (hasOwn(this._vm.$props, key)) parentOptions.propsData[key] = this._vm.$props[key];
          if (hasOwn(vnode.attrs, key)) parentOptions.propsData[key] = vnode.attrs[key];
        }

        for (var _key in vnode.attrs) {
          if (!hasOwn(parentOptions.propsData, _key)) parentOptions.attrs[_key] = vnode.attrs[_key];
        } // 创建虚拟dom节点


        vnode.vm = new VClass(parentOptions); // 将实际显示对象关联虚拟节点

        vnode.sp = vnode.vm.$el; // 新增组件内部事件

        for (var type in vnode.on) {
          parentOptions.listeners[type] = vnode.on[type] = this._addInvoker(type, vnode);
        } // 新增原生事件


        for (var _type in vnode.nativeOn) {
          vnode.nativeOn[_type] = this._addInvoker(_type, vnode, true);
        } // 如果inheritAttrs不为false，则禁用 Attribute 继承


        if (false !== vnode.vm.$options.inheritAttrs) {
          this._addAttrs(vnode, parentOptions.attrs);
        }
      } else {
        VClass = egret[vnode.tag] || ev(window, vnode.tag);

        if (VClass) {
          vnode.sp = new VClass();

          for (var _type2 in vnode.on) {
            vnode.on[_type2] = this._addInvoker(_type2, vnode);
          }

          this._addAttrs(vnode, vnode.attrs);
        }
      }

      if (!VClass) throw new Error("Then [".concat(vnode.tag, "] Node is undefined!!!")); // 实例节点

      if (vnode.ref) {
        var refs = this._vm.$refs;
        var ref = vnode.vm || vnode.sp;

        if (vnode.refInFor) {
          if (!Array.isArray(refs[vnode.ref])) {
            refs[vnode.ref] = [ref];
          } else {
            var refList = refs[vnode.ref];
            if (refList.indexOf(ref) < 0) refList.push(ref);
          }
        } else {
          refs[vnode.ref] = ref;
        }
      } // 触发指令：只调用一次，指令第一次绑定到元素时调用


      this._triggerDirective('bind', vnode);

      vnode.children.forEach(function (child) {
        vnode.sp.addChild(_this._createDisObj(child));
      });
      popTarget();
      return vnode.sp;
    }
    /**
     * 更新显示对象
     * @param { VNode } oldVNode 旧虚拟节点
     * @param { VNode } newVNode 新虚拟节点
     */

  }, {
    key: "_updateDisObj",
    value: function _updateDisObj(oldVNode, newVNode) {
      if (oldVNode.vm) {
        // 更新继承属性
        for (var key in oldVNode.vm.$props) {
          if (hasOwn(this._vm.$props, key)) oldVNode.vm.$props[key] = this._vm.$props[key]; // bug：1.1.6 属性优先级错误，导致继承失败

          if (hasOwn(newVNode.attrs, key)) oldVNode.vm.$props[key] = newVNode.attrs[key];
        }

        var parentOptions = oldVNode.vm._parentOptions;
        var oldParentAttrs = parentOptions.attrs;
        parentOptions.attrs = [];

        for (var _key2 in newVNode.attrs) {
          if (!hasOwn(oldVNode.vm.$props, _key2)) parentOptions.attrs[_key2] = newVNode.attrs[_key2];
        } // 更新组件事件


        for (var type in newVNode.on) {
          parentOptions.listeners[type] = oldVNode.on[type] = newVNode.on[type] = this._updateInvoker(type, oldVNode, newVNode);
        }

        for (var _type3 in oldVNode.on) {
          if (isUndef(newVNode.on[_type3])) {
            this._removeInvoker(_type3, oldVNode);
          }
        } // 更新原生事件


        for (var _type4 in newVNode.nativeOn) {
          oldVNode.nativeOn[_type4] = newVNode.nativeOn[_type4] = this._updateInvoker(_type4, oldVNode, newVNode, true);
        }

        for (var _type5 in oldVNode.nativeOn) {
          if (isUndef(newVNode.nativeOn[_type5])) {
            this._removeInvoker(_type5, oldVNode, true);
          }
        } // 如果inheritAttrs不为false，则禁用 Attribute 继承


        if (false !== oldVNode.vm.$options.inheritAttrs) {
          this._updateAttrs(oldVNode, oldParentAttrs, parentOptions.attrs);
        }
      } else {
        // 如果是原生类，则直接更新原生事件
        for (var _type6 in newVNode.on) {
          oldVNode.on[_type6] = this._updateInvoker(_type6, oldVNode, newVNode);
        }

        for (var _type7 in oldVNode.on) {
          if (isUndef(newVNode.on[_type7])) {
            this._removeInvoker(_type7, oldVNode);
          }
        } // 更新属性


        this._updateAttrs(oldVNode, oldVNode.attrs, newVNode.attrs);
      } // 触发指令：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前


      this._triggerDirective('update', newVNode, oldVNode); // 更新子集


      this._updateChildren(oldVNode.children, newVNode.children, newVNode.sp); // 触发指令：指令所在组件的 VNode 及其子 VNode 全部更新后调用。


      this._triggerDirective('componentUpdated', newVNode, oldVNode);
    }
    /**
     * 通过虚拟节点销毁显示对象
     * @param { VNode } vnode
     * @return { VNode } 返回销毁的虚拟节点
     */

  }, {
    key: "_destroyDisObj",
    value: function _destroyDisObj(vnode) {
      var _this2 = this;

      if (vnode.vm) vnode.vm.$callHook('beforeDestroyed');

      if (vnode.sp) {
        // 触发指令
        this._triggerDirective('unbind', vnode); // 通过获取父节点，移除显示对象


        vnode.parent && vnode.parent.sp && vnode.parent.sp.removeChild(vnode.sp); // 移除组件事件

        if (!vnode.vm) {
          for (var type in vnode.on) {
            this._removeInvoker(type, vnode, false);
          }
        } // 移除原生事件


        for (var _type8 in vnode.nativeOn) {
          this._removeInvoker(_type8, vnode, true);
        }
      } // 触发销毁方法，不在此处销毁，由vm内处理销毁
      // if(vnode.vm) vnode.vm.$destroy()
      // 移除各项示例挂载


      if (vnode.ref) {
        var refs = this._vm.$refs;
        var ref = vnode.vm || vnode.sp;

        if (vnode.refInFor && Array.isArray(refs[vnode.ref])) {
          var refList = refs[vnode.ref];

          if (refList.length <= 1) {
            delete this._vm.$refs[vnode.ref];
          } else {
            var index = refList.indexOf(ref);

            if (index > 0) {
              refList.splice(index, 1);
            }
          }
        } else {
          delete this._vm.$refs[vnode.ref];
        }
      } // 递归子对象，进行销毁


      vnode.children.forEach(function (vnode) {
        return _this2._destroyDisObj(vnode);
      });
      return vnode;
    }
    /**
     * 新增属性
     * @param { VNode } 虚拟节点
     * @param { Record<string, any> } attrs 属性组
     */

  }, {
    key: "_addAttrs",
    value: function _addAttrs(vnode, attrs) {
      if (!hasOwn(vnode.sp, DEFAULT_ATTR)) vnode.sp[DEFAULT_ATTR] = {};

      for (var name in attrs) {
        vnode.sp[DEFAULT_ATTR][name] = vnode.sp[name];
        vnode.sp[name] = attrs[name];
      }
    }
    /**
     * 更新属性
     * @param { VNode } 虚拟节点
     * @param { Record<string, any> } oldAttrs 旧属性组
     * @param { Record<string, any> } newAttrs 新属性组
     */

  }, {
    key: "_updateAttrs",
    value: function _updateAttrs(vnode, oldAttrs, newAttrs) {
      for (var name in newAttrs) {
        if (oldAttrs[name] !== newAttrs[name]) {
          if (!hasOwn(vnode.sp[DEFAULT_ATTR], name)) {
            vnode.sp[DEFAULT_ATTR][name] = vnode.sp[name];
          }

          vnode.sp[name] = newAttrs[name];
        }
      }

      for (var _name in oldAttrs) {
        if (isUndef(newAttrs[_name])) {
          vnode.sp[_name] = vnode.sp[DEFAULT_ATTR][_name];
        }
      }
    }
    /**
     * 新增事件对象
     * @param { string } type 事件类型
     * @param { VNode } 虚拟节点
     * @param { boolean } isNative 是否原生事件
     * @return { VNodeInvoker } 事件对象
     */

  }, {
    key: "_addInvoker",
    value: function _addInvoker(type, vnode) {
      var isNative = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var prefix = isNative ? 'nativeOn' : 'on';
      var event = parseEvent(type);
      var on = vnode[prefix][type];

      if (isUndef(on.fns)) {
        on = createFnInvoker(on, this._vm);
      }

      if (!vnode.vm || isNative) {
        vnode.sp[event.once ? 'once' : 'addEventListener'](event.name, on, this._vm, event.capture);
      } else {
        vnode.vm[event.once ? '$once' : '$on'](event.name, on);
      }

      return on;
    }
    /**
     * 更新事件对象
     * @param { string } type 事件类型
     * @param { VNode } oldVNode 旧虚拟节点
     * @param { VNode } newVNode 新虚拟节点
     * @param { boolean } isNative 是否原生事件
     * @return { VNodeInvoker } 事件对象
     */

  }, {
    key: "_updateInvoker",
    value: function _updateInvoker(type, oldVNode, newVNode) {
      var isNative = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var prefix = isNative ? 'nativeOn' : 'on';
      var oldOn = oldVNode[prefix][type];
      var newOn = newVNode[prefix][type];

      if (isUndef(newOn)) ; else if (isUndef(oldOn)) {
        return this._addInvoker(type, newVNode, isNative);
      } else if (newOn !== oldOn) {
        //事件不一样的，直接替换内部执行函数
        oldOn.fns = newOn;
        return oldOn;
      }
    }
    /**
     * 移除事件对象
     * @param { string } type 事件类型
     * @param { VNode } 虚拟节点
     * @param { boolean } isNative 是否原生事件
     * @return { VNodeInvoker } 事件对象
     */

  }, {
    key: "_removeInvoker",
    value: function _removeInvoker(type, vnode) {
      var isNative = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var on = isNative ? vnode.nativeOn[type] : vnode.on[type];
      var event = parseEvent(type);

      if (!vnode.vm || isNative) {
        vnode.sp.removeEventListener(event.name, on, this._vm, event.capture);
      } else {
        vnode.vm.$off(event.name, on);
      }

      return on;
    }
    /**
     * 触发指令
     * @param { string } hook 钩子函数：bind | inserted | update | componentUpdated | unbind
     * @param { VNode } vnode 虚拟节点
     * @param { VNode } oldVnode 旧虚拟节点
     */

  }, {
    key: "_triggerDirective",
    value: function _triggerDirective(hook, vnode, oldVnode) {
      if (vnode.directives) {
        var oldDir = oldVnode && normalizeDirectives(oldVnode.directives);

        var _iterator2 = _createForOfIteratorHelper(vnode.directives),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var dir = _step2.value;
            var directive = this._directives[dir.name];

            if (directive && directive[hook]) {
              var binding = _objectSpread2({}, dir);

              if (oldDir) {
                if (hasOwn(oldDir[dir.name], 'value')) binding['oldValue'] = oldDir[dir.name].value;
                if (hasOwn(oldDir[dir.name], 'arg')) binding['oldArg'] = oldDir[dir.arg].value;
              }

              directive[hook].apply(this._vm, [vnode.sp, binding].concat(Array.prototype.slice.call(arguments, 1)));
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  }]);

  return Render;
}();

/* @flow */
var seenObjects = new Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val)) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
UA && /msie|trident/.test(UA);
UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
UA && /chrome\/\d+/.test(UA) && !isEdge;
UA && /phantomjs/.test(UA);
UA && UA.match(/firefox\/(\d+)/);

var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var p = Promise.resolve();

var timerFunc = function timerFunc() {
  p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
  // it can get stuck in a weird state where callbacks are pushed into the
  // microtask queue but the queue isn't being flushed, until the browser
  // needs to do some other work, e.g. handle a timer. Therefore we can
  // "force" the microtask queue to be flushed by adding an empty timer.

  if (isIOS) setTimeout(noop);
};

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        console.log(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}

var queue = [];
var activatedChildren = [];
var has = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
/**
 * Flush both queues and run the watchers.
 */

function flushSchedulerQueue() {
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has[id] = null;
    watcher.run();
  } // keep copies of post queues before resetting state


  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated hooks

  callUpdatedHooks(updatedQueue);
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      vm.$callHook('updated');
    }
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

var uid = 0;

var Watcher = /*#__PURE__*/function () {
  function Watcher(vm, expOrFn, cb, options) {
    _classCallCheck(this, Watcher);

    // options
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.immediate = !!options.immediate;
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = this.immediate = false;
    }

    vm._watchers.push(this);

    this.id = uid++;
    this.active = true;
    this.dirty = this.lazy; // for lazy watchers

    this.vm = vm; // 存放dep实例

    this.deps = [];
    this.newDeps = []; // 存放dep的ID

    this.depIds = new Set();
    this.newDepIds = new Set(); // 更新触发回调函数

    this.cb = cb || noop; // parse expression for getter

    this.expression = expOrFn.toString();

    if ('function' === typeof expOrFn) {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);

      if (!this.getter) {
        this.getter = noop;
      }
    } // 如果非懒加载在创建watcher实例时先取一次值


    this.value = this.lazy ? undefined : this.get();

    if (this.immediate) {
      try {
        cb.call(vm, this.value);
      } catch (error) {
        console.error("callback for immediate watcher \"".concat(this.expression, "\""));
      }
    }
  }
  /**
   * Evaluate the getter, and re-collect dependencies.
   */


  _createClass(Watcher, [{
    key: "get",
    value: function get() {
      pushTarget(this);
      var value;

      try {
        value = this.getter.call(this.vm, this.vm);
      } catch (e) {
        // TODO
        console.log(e);
      } finally {
        // "touch" every property so they are all tracked as
        // dependencies for deep watching
        if (this.deep) {
          traverse(value);
        }

        popTarget();
        this.cleanupDeps();
      }

      return value;
    }
    /**
     * Add a dependency to this directive.
     */

  }, {
    key: "addDep",
    value: function addDep(dep) {
      var id = dep.id;

      if (!this.newDepIds.has(id)) {
        this.newDepIds.add(id);
        this.newDeps.push(dep);

        if (!this.depIds.has(id)) {
          dep.addSub(this);
        }
      }
    }
    /**
     * Clean up for dependency collection.
     */

  }, {
    key: "cleanupDeps",
    value: function cleanupDeps() {
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
    }
    /**
     * Subscriber interface.
     * Will be called when a dependency changes.
     */

  }, {
    key: "update",
    value: function update() {
      /* istanbul ignore else */
      if (this.lazy) {
        this.dirty = true;
      } else if (this.sync) {
        this.run();
      } else {
        queueWatcher(this);
      }
    }
    /**
     * Scheduler job interface.
     * Will be called by the scheduler.
     */

  }, {
    key: "run",
    value: function run() {
      if (!this.active) return;
      var value = this.get();

      if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value)) {
        // set new value
        var oldValue = this.value;
        this.value = value;
        this.cb.call(this.vm, value, oldValue);
      }
    }
    /**
     * Evaluate the value of the watcher.
     * This only gets called for lazy watchers.
     */

  }, {
    key: "evaluate",
    value: function evaluate() {
      this.value = this.get();
      this.dirty = false;
    }
    /**
     * Depend on all deps collected by this watcher.
     */

  }, {
    key: "depend",
    value: function depend() {
      var i = this.deps.length;

      while (i--) {
        this.deps[i].depend();
      }
    }
    /**
     * Remove self from all dependencies' subscriber list.
     */

  }, {
    key: "teardown",
    value: function teardown() {
      if (!this.active) return; // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.

      var i = this.deps.length;

      while (i--) {
        this.deps[i].removeSub(this);
      }

      this.active = false;
    }
  }]);

  return Watcher;
}();

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
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

    if (inserted) ob.observeArray(inserted); // notify change

    ob.dep.notify();
    return result;
  });
});

var Observer = /*#__PURE__*/function () {
  function Observer(value) {
    _classCallCheck(this, Observer);

    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);

    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods);
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }

      value.forEach(function (item) {
        return observe(item);
      });
    } else {
      this.walk(value);
    }
  }
  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */


  _createClass(Observer, [{
    key: "walk",
    value: function walk(obj) {
      for (var key in obj) {
        defineReactive(obj, key);
      }
    }
    /**
     * Observe a list of Array items.
     */

  }, {
    key: "observeArray",
    value: function observeArray(items) {
      items.forEach(function (item) {
        return observe(item);
      });
    }
  }]);

  return Observer;
}();
function defineReactive(obj, key, val) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function get() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
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
    set: function set(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* try {
        if (
          (Array.isArray(newVal) || isPlainObject(newVal)) &&
          Object.isExtensible(newVal) &&
          !(newVal instanceof egret.HashObject) &&
          !newVal._isVue
        ) {
          // 复杂类型的比较，如果复杂类型数据没有不同，只是引用不一的话，则不更新
          return;
        }
      } catch (e) {
        // TODO
        console.log(e);
      } */
      // #7981: for accessor properties without setter


      if (getter && !setter) return;

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */

function observe(value, asRootData) {
  if (!isObject(value)) return;
  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if ((Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !(value instanceof egret.HashObject) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */

function set(target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    console.warn('Avoid adding reactive properties to a Vue instance or its root $data at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */

function del(target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    console.warn('Avoid deleting properties on a Vue instance or its root $data - just set it to null.');
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */

function dependArray(arr) {
  arr.forEach(function (e) {
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  });
}
/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 * eg: Boolean => function Boolean() { [native code] } => 'Boolean'
 */

function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}
function checkType(type, expectedTypes) {
  var eTypes = Array.isArray(expectedTypes) ? expectedTypes : [expectedTypes];
  return eTypes.some(function (eType) {
    return isSameType(eType, type);
  });
}
function normalizeProp(propsOptions) {
  var props = {};
  var val;

  if (Array.isArray(propsOptions)) {
    for (var i = propsOptions.length - 1; i >= 0; i--) {
      val = propsOptions[i];

      if (typeof val === 'string') {
        props[val] = {
          type: null
        };
      }
    }
  } else {
    for (var key in propsOptions) {
      val = propsOptions[key];
      props[key] = isPlainObject(val) ? val : {
        type: val
      };
    }
  }

  return props;
}
function validateProp(options, vm) {
  if ('object' === _typeof(options) && options.type) {
    if (typeof options.default === 'function') {
      if (!checkType(Function, options.type)) return options.default.call(vm);
    } else if (typeof options.default === 'undefined') {
      if (checkType(String, options.type)) return '';else if (checkType(Number, options.type)) return 0;else if (checkType(Boolean, options.type)) return false;else if (checkType(Array, options.type)) return [];else if (checkType(Object, options.type)) return {};
    }

    return options.default;
  }

  return options;
}

/**
 * 动画Promise包装
 * @description 用于检测egret.Tween是否被安装，且空值时，返回this的Tween
 * @author Hsuna
 * @param { Array<TweenData> } params 运动参数
 * - egret.Tween.set: ['set', :props]
 * - egret.Tween.to: ['to', :props, :duration?, :ease?]
 * - egret.Tween.wait: ['wait', :duration, :passive?]
 * @param { RefData } target 可选，运动对象
 * @return { Promise<egret.Tween> }
 */
function tween() {
  var _this = this;

  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var target = arguments.length > 1 ? arguments[1] : undefined;

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  if ('Tween' in egret) {
    return new Promise(function (resolve) {
      var _egret$Tween;

      var t = (_egret$Tween = egret.Tween).get.apply(_egret$Tween, [target || _this].concat(args));

      params.forEach(function (_ref) {
        var _t;

        var _ref2 = _toArray(_ref),
            name = _ref2[0],
            args = _ref2.slice(1);

        if ('function' === typeof t[name]) t = (_t = t)[name].apply(_t, _toConsumableArray(args)); // 至少要一个参数，所以这里拆成arg0和args
      });
      t.call(resolve, _this, [t]);
    }); //return tween instanceof egret.Tween ? tween : ;
  } else throw 'The egret.Tween.js not import!!!';
}

/**
 * 组件类
 * @author Hsuna
 * @param { ComponentOptions } options 组件配置
 * @param { ComponentParentOptions } parentOptions 继承配置
 */

var Component = /*#__PURE__*/function () {
  function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var parentOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Component);

    /** 子组件集合 */
    this.$children = [];
    /** 获取注册列表 */

    this.$refs = {}; // 全局方法

    /** 设置对象的 property */

    this.$set = set;
    /** 删除对象的 property */

    this.$delete = del;
    /** 回调延迟到下次更新 */

    this.$nextTick = function (fn) {
      return nextTick(fn, this);
    };
    /** Tween方法 */


    this.$tween = tween; // private __tickHandler: ComponentMap<Function> = [];

    this._global = {};
    this._data = {};
    this._props = {};
    this._hasHookEvent = false; // 状态值

    this._isVue = true;
    this._isMounted = false;
    this._isBeingDestroyed = false;
    this._isDestroyed = false;
    this._watchers = [];
    this._events = {};
    this._components = {};
    this._directives = {};
    this.$options = options;
    this._parentOptions = parentOptions;

    this._init();
  }

  _createClass(Component, [{
    key: "_init",
    value: function _init() {
      this.$parent = this._parentOptions.parent;
      if (this.$parent) this.$parent.$children.push(this);
      this.$root = this.$parent ? this.$parent.$root : this;

      this._initMethods(this.$options.methods);

      this.$callHook('beforeCreate');

      this._initGlobal();

      this._initData(this.$options.data);

      this._initProps(this.$options.props, this._parentOptions.propsData);

      this._initComputed(this.$options.computed);

      this._initWatch(this.$options.watch);

      this._initComponents(this.$options.components);

      this._initDirectives(this.$options.directives);

      this.$callHook('created');
      this._render = new Render(this);

      this._initEvent();
    }
  }, {
    key: "_initEvent",
    value: function _initEvent() {
      var _this = this;

      /* 添加到显示列表时触发挂载 */
      this.$el.once(egret.Event.ADDED, function () {
        return _this._render.inserted();
      }, this.$el);
      /* 添加到舞台时触发挂载 */

      this.$el.once(egret.Event.ADDED_TO_STAGE, function () {
        _this.$callHook('beforeMount');

        _this._global.stage = _this.$el.stage;
        _this._watcher = new Watcher(_this, function () {
          if (!_this._render) return; // 防止渲染器销毁时，进程依然回调方法

          if (_this._isMounted) _this.$callHook('beforeUpdate');

          _this._render.update();
        }, noop);
        _this._isMounted = true;

        _this.$callHook('mounted');
      }, this.$el);
      /* 从舞台移除时销毁该示例 */

      this.$el.once(egret.Event.REMOVED_FROM_STAGE, function () {
        return _this.$destroy();
      }, this.$el);
    }
    /** 初始化全局参数，用于全局方便获取 */

  }, {
    key: "_initGlobal",
    value: function _initGlobal() {
      this._global = {
        stage: new egret.Stage()
      }; // 监听数据

      observe(this._global, true);
    }
  }, {
    key: "_initProps",
    value: function _initProps() {
      var _this2 = this;

      var propsOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var propsData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var props = normalizeProp(propsOptions); // normalizeProp

      var _loop = function _loop(key) {
        _this2._props[key] = hasOwn(propsData, key) ? propsData[key] : validateProp(props[key], _this2);
        Object.defineProperty(_this2, key, {
          get: function get() {
            return this._props[key];
          },
          set: function set(val) {
            console.error('The props data not set!');
          }
        });
      };

      for (var key in props) {
        _loop(key);
      } // 监听数据


      observe(this._props, true);
    }
  }, {
    key: "_initData",
    value: function _initData(data) {
      var _this3 = this;

      this._data = typeof data === 'function' ? this._getData(data) : data || {};

      var _loop2 = function _loop2(key) {
        Object.defineProperty(_this3, key, {
          get: function get() {
            return this._data[key];
          },
          set: function set(val) {
            this._data[key] = val;
          }
        });
      };

      for (var key in this._data) {
        _loop2(key);
      } // 监听数据


      observe(this._data, true);
    }
  }, {
    key: "_initMethods",
    value: function _initMethods() {
      var methods = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // 将methods上的方法赋值到vm实例上
      for (var e in methods) {
        this[e] = methods[e];
      }
    }
  }, {
    key: "_initComputed",
    value: function _initComputed() {
      var computed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var propertyDefinition;

      for (var key in computed) {
        var userDef = computed[key] || noop;
        propertyDefinition = typeof userDef === 'function' ? {
          get: userDef,
          set: noop
        } : {
          get: userDef.get,
          set: userDef.set
        };
        Object.defineProperty(this, key, propertyDefinition);
      }
    }
  }, {
    key: "_initWatch",
    value: function _initWatch() {
      var _this4 = this;

      var watch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _loop3 = function _loop3(key) {
        var handler = watch[key];

        if (Array.isArray(handler)) {
          handler.forEach(function (h) {
            return _this4._createWatcher(key, h);
          });
        } else {
          _this4._createWatcher(key, handler);
        }
      };

      for (var key in watch) {
        _loop3(key);
      }
    }
  }, {
    key: "_initComponents",
    value: function _initComponents() {
      var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      for (var name in components) {
        this._components[name] = VueEgret.extend(components[name]);
      }
    }
  }, {
    key: "_initDirectives",
    value: function _initDirectives() {
      var directives = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      for (var name in directives) {
        this._directives[name] = directives[name];
      }
    }
  }, {
    key: "_getData",
    value: function _getData(data) {
      pushTarget();

      try {
        return data.call(this, this);
      } catch (e) {
        console.log(e);
        return {};
      } finally {
        popTarget();
      }
    }
  }, {
    key: "_createWatcher",
    value: function _createWatcher(expOrFn, handler, options) {
      if (isPlainObject(handler)) {
        options = handler;
        handler = handler.handler;
      }

      if (typeof handler === 'string') {
        handler = this[handler];
      }

      return this.$watch(expOrFn, handler, options);
    }
  }, {
    key: "$on",
    value: function $on(event, fn) {
      var _this5 = this;

      if (Array.isArray(event)) {
        event.forEach(function (evt) {
          return _this5.$on(evt, fn);
        });
      } else {
        var events = this._events[event] || (this._events[event] = []);
        events.push(fn); // optimize hook:event cost by using a boolean flag marked at registration
        // instead of a hash lookup

        if (isHook(event)) {
          this._hasHookEvent = true;
        }
      }

      return this;
    }
  }, {
    key: "$once",
    value: function $once(event, fn) {
      var _this6 = this;

      var on = function on() {
        _this6.$off(event, on);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return fn.apply(_this6, args);
      };

      on.fn = fn;
      this.$on(event, on);
      return this;
    }
  }, {
    key: "$off",
    value: function $off(event, fn) {
      var _this7 = this;

      // all
      if (!arguments.length) {
        this._events = Object.create(null);
        this._hasHookEvent = false;
        return this;
      } // array of events


      if (Array.isArray(event)) {
        event.forEach(function (evt) {
          return _this7.$off(evt, fn);
        });
        return this;
      } // specific event


      var cbs = this._events[event];

      if (!cbs) {
        return this;
      }

      if (!fn) {
        this._events[event] = null;
        return this;
      }

      if (fn) {
        // specific handler
        var cb;
        var i = cbs.length;

        while (i--) {
          cb = cbs[i];

          if (cb === fn) {
            cbs.splice(i, 1);
            break;
          }
        }
      }

      return this;
    }
  }, {
    key: "$emit",
    value: function $emit(event) {
      var _this8 = this;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var cbs = this._events[event];

      if (cbs) {
        _toConsumableArray(cbs).forEach(function (cb) {
          return cb.apply(_this8.$parent, args);
        });
      }

      return this;
    }
    /**
     *
     * @param expOrFn
     * @param cb
     * @param options
     */

  }, {
    key: "$watch",
    value: function $watch(expOrFn, cb, options) {
      if (isPlainObject(cb)) {
        return this._createWatcher(expOrFn, cb, options);
      }

      options = options || {};
      var watcher = new Watcher(this, expOrFn, cb, options);
      return function unwatchFn() {
        watcher.teardown();
      };
    }
  }, {
    key: "$callHook",
    value: function $callHook(name) {
      // 阻断所有数据变动
      pushTarget();

      if ('function' === typeof this.$options[name]) {
        var _this$$options$name;

        for (var _len3 = arguments.length, rest = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          rest[_key3 - 1] = arguments[_key3];
        }

        (_this$$options$name = this.$options[name]).call.apply(_this$$options$name, [this].concat(rest));
      }

      if (this._hasHookEvent) {
        this.$emit('hook:' + name);
      }

      popTarget();
    }
    /**
     * 强制刷新
     */

  }, {
    key: "$forceUpdate",
    value: function $forceUpdate() {
      if (this._watcher) {
        this._watcher.update();
      }
    }
    /**
     * 挂载
     * @param { egret.DisplayObjectContainer } parent 挂载对象
     * @return { Component }
     */

  }, {
    key: "$mount",
    value: function $mount(parent) {
      if (parent instanceof egret.DisplayObjectContainer && this.$el) {
        parent.addChild(this.$el);
      }

      return this;
    }
    /**
     * 销毁
     * @description 销毁对象
     * @author Hsuna
     */

  }, {
    key: "$destroy",
    value: function $destroy() {
      if (this._isBeingDestroyed) return;
      this.$callHook('beforeDestroy');
      this._isBeingDestroyed = true; // 从parent列表中移除

      if (this.$parent && !this.$parent._isBeingDestroyed) {
        var index = this.$parent.$children.indexOf(this);
        if (index > -1) this.$parent.$children.splice(index, 1);
      } // 销毁观察器


      if (this._watcher) {
        this._watcher.teardown();

        this._watcher = null;
        this._watchers = null;
      } // 销毁渲染器


      if (this._render) {
        this._render.destroy();

        this._render = null;
      } // 销毁内部事件


      if (this._events) {
        this._events = null;
      }

      this._isDestroyed = true;
      this.$callHook('destroyed');
    }
    /**
     * 通过挂载名或者组件，获取实际的显示对象
     * @param { ComponentRef } ref 显示对象名
     * @param { boolean } isAll 是否返回全部，如果选是，则返回数组对象
     * @return { TArray<egret.DisplayObject> }
     */

  }, {
    key: "$displayObject",
    value: function $displayObject(ref, isAll) {
      var _this9 = this;

      if ('string' === typeof ref) {
        // 挂载名
        var refs = this.$refs[ref];

        if (Array.isArray(refs)) {
          if (isAll) return refs.map(function (ref) {
            return _this9.$displayObject(ref);
          });
          return this.$displayObject(refs[0]);
        }

        return this.$displayObject(refs);
      } else if (ref instanceof Component) {
        // 组件
        return ref.$el;
      } else if (ref instanceof egret.DisplayObject) {
        // 显示对象本身
        return ref;
      }

      return null;
    }
    /**
     * 碰撞检测
     * @description 用于检测两个显示对象间是否存在碰撞
     * @author Hsuna
     * @param { ComponentRef } ref1 显示对象1
     * @param { ComponentRef } ref2 显示对象2
     * @return { boolean }
     */

  }, {
    key: "$hitTest",
    value: function $hitTest(ref1, ref2) {
      var disObj1 = this.$displayObject(ref1);
      var disObj2 = this.$displayObject(ref2);
      if (!disObj1 || !disObj2) return true;
      var rect1 = disObj1.getBounds();
      var rect2 = disObj2.getBounds();
      rect1.x = disObj1.x, rect1.y = disObj1.y;
      rect2.x = disObj2.x, rect2.y = disObj2.y;
      return rect1.intersects(rect2);
    }
    /**
     * 坐标点碰撞检测
     * @description 用于检测坐标点是否在对象内
     * @author Hsuna
     * @param { ComponentRef } ref 显示对象
     * @param { number } x 坐标X
     * @param { number } y 坐标Y
     * @param { boolean } shapeFlag 是否采用像素值检测
     * @return { boolean }
     */

  }, {
    key: "$hitTestPoint",
    value: function $hitTestPoint(ref, x, y, shapeFlag) {
      var disObj = this.$displayObject(ref);
      return disObj ? disObj.hitTestPoint(x, y, shapeFlag) : false;
    }
    /**
     * 将全局坐标转化为本地坐标
     * @param { ComponentRef } ref 显示对象
     * @param { number } stateX  全局坐标X
     * @param { number } stateY  全局坐标Y
     * @return { egret.Point } 本地坐标
     */

  }, {
    key: "$globalToLocal",
    value: function $globalToLocal(ref, stateX, stateY) {
      var disObj = this.$displayObject(ref);
      var resultPoint = new egret.Point(stateX, stateY);
      disObj && disObj.globalToLocal(stateX, stateY, resultPoint);
      return resultPoint;
    }
    /**
     * 将本地坐标转化为全局坐标
     * @param { ComponentRef } ref 显示对象
     * @param { number } localX  本地坐标X
     * @param { number } localY  本地坐标Y
     * @return { egret.Point } 全局坐标
     */

  }, {
    key: "$localToGlobal",
    value: function $localToGlobal(ref, localX, localY) {
      var disObj = this.$displayObject(ref);
      var resultPoint = new egret.Point(localX, localY);
      disObj && disObj.localToGlobal(localX, localY, resultPoint);
      return resultPoint;
    }
    /**
     * 获取舞台信息
     * @return { egret.Stage }
     */

  }, {
    key: "$stage",
    get: function get() {
      return this._global.stage;
    }
    /**
     * 获取舞台宽度
     * @return { number }
     */

  }, {
    key: "$stageWidth",
    get: function get() {
      return this._global.stage.stageWidth;
    }
    /**
     * 获取舞台高度
     * @return { number }
     */

  }, {
    key: "$stageHeight",
    get: function get() {
      return this._global.stage.stageHeight;
    }
  }, {
    key: "$data",
    get: function get() {
      return this._data;
    }
  }, {
    key: "$props",
    get: function get() {
      return this._props;
    }
    /** 获取属性 */

  }, {
    key: "$attrs",
    get: function get() {
      return this._parentOptions.attrs || emptyObject;
    }
    /** 获取事件 */

  }, {
    key: "$listeners",
    get: function get() {
      return this._parentOptions.listeners || emptyObject;
    }
  }]);

  return Component;
}();
/**
 * VueEgret类
 * @description
 * @author Hsuna
 */

var VueEgret = /*#__PURE__*/function (_Component) {
  _inherits(VueEgret, _Component);

  var _super = _createSuper(VueEgret);

  function VueEgret(options) {
    _classCallCheck(this, VueEgret);

    return _super.call(this, options);
  }
  /**
   * 设置全局组件
   * @param { string } name 组件名 用于全局定义
   * @param { ComponentOptions } options 组件配置
   */


  _createClass(VueEgret, null, [{
    key: "component",
    value: function component(name, options) {
      if (options) return VueEgret._components[name] = VueEgret.extend(options);
      return VueEgret._components[name];
    }
    /**
     * 设置全局指令
     */

  }, {
    key: "directive",
    value: function directive(name, definition) {
      if (definition) return VueEgret._directives[name] = typeof definition === 'function' ? {
        bind: definition,
        update: definition
      } : definition;
      return VueEgret._directives[name];
    }
    /**
     * 通过配置，获取组件类型
     * @param { ComponentOptions } options
     */

  }, {
    key: "extend",
    value: function extend(options) {
      var _a;

      if ('function' === typeof options) return options;
      return _a = /*#__PURE__*/function (_Component2) {
        _inherits(_a, _Component2);

        var _super2 = _createSuper(_a);

        function _a() {
          var parentOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          _classCallCheck(this, _a);

          return _super2.call(this, options, parentOptions);
        }

        return _a;
      }(Component), _a.options = options, _a;
    }
    /**
     * 通过配置，获取主类
     * 由于egret启动是需要实例化Main类
     * @param { ComponentOptions } options
     */

  }, {
    key: "classMain",
    value: function classMain(options) {
      return /*#__PURE__*/function (_egret$DisplayObjectC) {
        _inherits(_class, _egret$DisplayObjectC);

        var _super3 = _createSuper(_class);

        function _class() {
          var _this10;

          _classCallCheck(this, _class);

          _this10 = _super3.call(this);
          _this10.vm = new VueEgret(options);

          _this10.vm.$mount(_assertThisInitialized(_this10));

          return _this10;
        }

        return _class;
      }(egret.DisplayObjectContainer);
    }
  }]);

  return VueEgret;
}(Component);
VueEgret.version = "1.4.0";
/** 组件库缓存 */

VueEgret._components = {};
/** 指令缓存 */

VueEgret._directives = {};
VueEgret.set = set;
VueEgret.delete = del;
VueEgret.nextTick = nextTick;

// iife/cjs usage extends esm default export - so import it all

module.exports = VueEgret;
