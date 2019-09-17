var __reflect = this && this.__reflect || function (t, e, r) {
        t.__class__ = e, r ? r.push(e) : r = [e], t.__types__ = t.__types__ ? r.concat(t.__types__) : r
    },
    __extends = this && this.__extends || function (t, e) {
        function r() {
            this.constructor = t
        }
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
        r.prototype = e.prototype, t.prototype = new r
    },
    __awaiter = this && this.__awaiter || function (t, e, r, i) {
        return new(r || (r = Promise))(function (n, o) {
            function s(t) {
                try {
                    h(i.next(t))
                } catch (e) {
                    o(e)
                }
            }

            function a(t) {
                try {
                    h(i["throw"](t))
                } catch (e) {
                    o(e)
                }
            }

            function h(t) {
                t.done ? n(t.value) : new r(function (e) {
                    e(t.value)
                }).then(s, a)
            }
            h((i = i.apply(t, e || [])).next())
        })
    },
    __generator = this && this.__generator || function (t, e) {
        function r(t) {
            return function (e) {
                return i([t, e])
            }
        }

        function i(r) {
            if (n) throw new TypeError("Generator is already executing.");
            for (; h;) try {
                if (n = 1, o && (s = o[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(s = s.call(o, r[1])).done) return s;
                switch (o = 0, s && (r = [0, s.value]), r[0]) {
                    case 0:
                    case 1:
                        s = r;
                        break;
                    case 4:
                        return h.label++, {
                            value: r[1],
                            done: !1
                        };
                    case 5:
                        h.label++, o = r[1], r = [0];
                        continue;
                    case 7:
                        r = h.ops.pop(), h.trys.pop();
                        continue;
                    default:
                        if (s = h.trys, !(s = s.length > 0 && s[s.length - 1]) && (6 === r[0] || 2 === r[0])) {
                            h = 0;
                            continue
                        }
                        if (3 === r[0] && (!s || r[1] > s[0] && r[1] < s[3])) {
                            h.label = r[1];
                            break
                        }
                        if (6 === r[0] && h.label < s[1]) {
                            h.label = s[1], s = r;
                            break
                        }
                        if (s && h.label < s[2]) {
                            h.label = s[2], h.ops.push(r);
                            break
                        }
                        s[2] && h.ops.pop(), h.trys.pop();
                        continue
                }
                r = e.call(t, h)
            } catch (i) {
                r = [6, i], o = 0
            } finally {
                n = s = 0
            }
            if (5 & r[0]) throw r[1];
            return {
                value: r[0] ? r[1] : void 0,
                done: !0
            }
        }
        var n, o, s, a, h = {
            label: 0,
            sent: function () {
                if (1 & s[0]) throw s[1];
                return s[1]
            },
            trys: [],
            ops: []
        };
        return a = {
            next: r(0),
            "throw": r(1),
            "return": r(2)
        }, "function" == typeof Symbol && (a[Symbol.iterator] = function () {
            return this
        }), a
    },
    __assign = this && this.__assign || Object.assign || function (t) {
        for (var e, r = 1, i = arguments.length; i > r; r++) {
            e = arguments[r];
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n])
        }
        return t
    },
    uis;
! function (t) {
    var e = function (e) {
        function r() {
            return e.call(this) || this
        }
        return __extends(r, e), r.prototype.setSize = function (t, e) {
            this.width = t, this.height = e
        }, r.prototype.setLocation = function (t, e) {
            this.x = t, this.y = e
        }, Object.defineProperty(r.prototype, "children", {
            get: function () {
                return this.$children
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.dispose = function () {
            var e = 0;
            for (this.$children.length - 1; e >= 0; e--) {
                var r = this.$children[e];
                r && (r instanceof t.CSprite ? r.dispose() : r instanceof egret.MovieClip ? r.stop() : r instanceof egret.Bitmap ? r.texture = null : r instanceof egret.TextField && (r.text = ""), r.$parent && this.removeChild(r), r = null)
            }
        }, r
    }(egret.Sprite);
    t.CSprite = e, __reflect(e.prototype, "uis.CSprite")
}(uis || (uis = {}));
var module;
! function (t) {
    var e = function (t) {
        function e(e) {
            var r = t.call(this) || this;
            return r._name = e, r.init(), r
        }
        return __extends(e, t), e.prototype.init = function () {}, Object.defineProperty(e.prototype, "ui", {
            get: function () {
                return this._ui
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "controller", {
            get: function () {
                return this._controller
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype.dispose = function () {
            this._controller && (this._controller.dispose(), this._controller = null), this._ui && (this._ui.dispose(), this._ui = null)
        }, e
    }(uis.CSprite);
    t.BaseModule = e, __reflect(e.prototype, "module.BaseModule", ["module.IUI"]);
    var r = function (t) {
        function e() {
            var e = t.call(this) || this;
            return e.init(), e
        }
        return __extends(e, t), e.prototype.init = function () {}, e.prototype.dispose = function () {
            t.prototype.dispose.call(this)
        }, e
    }(uis.CSprite);
    t.BaseUI = r, __reflect(r.prototype, "module.BaseUI", ["module.IUI"]);
    var i = function () {
        function t(t) {
            this._ui = t, this.init()
        }
        return t.prototype.init = function () {}, t.prototype.dispose = function () {
            this._ui.dispose(), this._ui = null
        }, t
    }();
    t.BaseController = i, __reflect(i.prototype, "module.BaseController", ["module.IController"])
}(module || (module = {}));
var infos;
! function (t) {
    var e = function () {
        function t() {}
        return t
    }();
    t.BaseInfo = e, __reflect(e.prototype, "infos.BaseInfo")
}(infos || (infos = {}));
var infos;
! function (t) {
    var e = function () {
        function t() {}
        return t.mapInfo = [
            [{
                x: 0,
                y: 400.6,
                w: 399.55,
                h: 100,
                r: 0
            }, {
                x: 399.55,
                y: 301.65,
                w: 101.45,
                h: 198.95,
                r: 0
            }, {
                x: 501,
                y: 400.6,
                w: 397.9,
                h: 100,
                r: 0
            }],
            [{
                x: 0,
                y: 400.6,
                w: 30.25,
                h: 100,
                r: 0
            }, {
                x: 27.15,
                y: 271.2,
                w: 101.2,
                h: 229.35,
                r: 0
            }, {
                x: 128.35,
                y: 400.6,
                w: 573.85,
                h: 100,
                r: 0
            }, {
                x: 601.05,
                y: 327,
                w: 99.65,
                h: 330.4,
                r: 180
            }, {
                x: 702.35,
                y: 300.6,
                w: 99.15,
                h: 199,
                r: 0
            }, {
                x: 801.5,
                y: 400.6,
                w: 99.95,
                h: 100,
                r: 0
            }],
            [{
                x: 0,
                y: 400.6,
                w: 403.8,
                h: 100,
                r: 0
            }, {
                x: 403.8,
                y: 280.5,
                w: 102.7,
                h: 220.1,
                r: 0
            }, {
                x: 506.5,
                y: 400.1,
                w: 394.05,
                h: 100,
                r: 0
            }],
            [{
                x: 0,
                y: 348,
                w: 177.8,
                h: 152.05,
                r: 0
            }, {
                x: 327.85,
                y: 267.7,
                w: 172.3,
                h: 66,
                r: 0
            }, {
                x: 598.85,
                y: 151.65,
                w: 169.8,
                h: 65.55,
                r: 0
            }],
            [{
                x: 165.1,
                y: 304.35,
                w: 160.85,
                h: 43.75,
                r: 0
            }, {
                x: 349.6,
                y: 238.3,
                w: 109.25,
                h: 243.05,
                r: 180
            }, {
                x: 482.65,
                y: 302.95,
                w: 126.75,
                h: 43.8,
                r: 0
            }, {
                x: 560.25,
                y: 239.9,
                w: 108.7,
                h: 245.1,
                r: 180
            }, {
                x: 656.25,
                y: 187.95,
                w: 108.35,
                h: 312.9,
                r: 0
            }],
            [{
                x: 136.35,
                y: 259.1,
                w: 41.25,
                h: 42.5,
                r: 0
            }, {
                x: 498.4,
                y: 237.1,
                w: 96.3,
                h: 262.9,
                r: 0
            }, {
                x: 594.7,
                y: 347.95,
                w: 319.95,
                h: 152.05,
                r: 0
            }],
            [{
                x: 0,
                y: 347.95,
                w: 211,
                h: 151.45,
                r: 0
            }, {
                x: 446.85,
                y: 448.25,
                w: 209.8,
                h: 51.15,
                r: 0
            }, {
                x: 783.95,
                y: 321.2,
                w: 102,
                h: 49,
                r: 0
            }],
            [{
                x: 129.7,
                y: 221.2,
                w: 132,
                h: 49.75,
                r: 0
            }, {
                x: 381,
                y: 137.45,
                w: 50,
                h: 49.25,
                r: 0
            }, {
                x: 495.8,
                y: 231.4,
                w: 182,
                h: 151,
                r: 0
            }, {
                x: 628.95,
                y: 154.6,
                w: 51.45,
                h: 158.5,
                r: 180
            }, {
                x: 677.8,
                y: 231.4,
                w: 78.5,
                h: 62.5,
                r: 0
            }, {
                x: 756.3,
                y: 165.65,
                w: 91.25,
                h: 128.25,
                r: 0
            }, {
                x: 839.3,
                y: 100.2,
                w: 62.65,
                h: 134.5,
                r: 0
            }],
            [{
                x: .1,
                y: 100.15,
                w: 30.05,
                h: 134.5,
                r: 0
            }, {
                x: 171.45,
                y: 348.3,
                w: 194.25,
                h: 149.75,
                r: 0
            }, {
                x: 365.7,
                y: 288.1,
                w: 83.75,
                h: 209.95,
                r: 0
            }, {
                x: 449.45,
                y: 226.8,
                w: 92.5,
                h: 271.25,
                r: 0
            }, {
                x: 541.95,
                y: 161.8,
                w: 92.75,
                h: 130.75,
                r: 0
            }, {
                x: 541.95,
                y: 347.55,
                w: 375.85,
                h: 150.5,
                r: 0
            }],
            [{
                x: 0,
                y: 347.55,
                w: 127.55,
                h: 151.95,
                r: 0
            }, {
                x: 301.65,
                y: 453.6,
                w: 427.5,
                h: 45.9,
                r: 0
            }, {
                x: 464.05,
                y: 380.85,
                w: 47,
                h: 402.7,
                r: 180
            }, {
                x: 617.75,
                y: 348.1,
                w: 60.1,
                h: 402.75,
                r: 180
            }, {
                x: 729.15,
                y: 353.6,
                w: 77.95,
                h: 145.9,
                r: 0
            }, {
                x: 807.1,
                y: 453.6,
                w: 91.75,
                h: 45.9,
                r: 0
            }],
            [{
                x: 0,
                y: 453.55,
                w: 174.1,
                h: 45.9,
                r: 0
            }, {
                x: 86.9,
                y: 393.25,
                w: 80.05,
                h: 404.1,
                r: 180
            }, {
                x: 245.65,
                y: 357.1,
                w: 247.2,
                h: 45,
                r: 0
            }, {
                x: 571.15,
                y: 247.5,
                w: 245.15,
                h: 47.05,
                r: 0
            }, {
                x: 750.95,
                y: 186.45,
                w: 80.05,
                h: 244.45,
                r: 180
            }],
            [{
                x: 74.2,
                y: 52.55,
                w: 53.95,
                h: 44.8,
                r: 0
            }, {
                x: 225.1,
                y: 307.75,
                w: 158.45,
                h: 42.1,
                r: 0
            }, {
                x: 409,
                y: 239.55,
                w: 110.35,
                h: 243.75,
                r: 180
            }, {
                x: 541.8,
                y: 307.95,
                w: 124.75,
                h: 41.9,
                r: 0
            }, {
                x: 617.7,
                y: 239.15,
                w: 108.25,
                h: 243.65,
                r: 180
            }, {
                x: 714.55,
                y: 192.25,
                w: 104.85,
                h: 305.75,
                r: 0
            }, {
                x: 819.4,
                y: 347.3,
                w: 100,
                h: 150.7,
                r: 0
            }],
            [{
                x: 0,
                y: 347.45,
                w: 203.55,
                h: 151.1,
                r: 0
            }, {
                x: 343.5,
                y: 274.15,
                w: 186.5,
                h: 52.05,
                r: 0
            }, {
                x: 651,
                y: 209.55,
                w: 63.85,
                h: 243.15,
                r: 180
            }, {
                x: 702.45,
                y: 382.3,
                w: 196.25,
                h: 71.5,
                r: 0
            }],
            [{
                x: -.2,
                y: 382.25,
                w: 193.25,
                h: 71.5,
                r: 0
            }, {
                x: 107.2,
                y: 303.05,
                w: 93.05,
                h: 309.5,
                r: 180
            }, {
                x: 288.45,
                y: 298.5,
                w: 250.45,
                h: 200,
                r: 0
            }, {
                x: 615.3,
                y: 181.55,
                w: 144.15,
                h: 50,
                r: 0
            }, {
                x: 803.45,
                y: 39.15,
                w: 97.25,
                h: 50.3,
                r: 0
            }, {
                x: 880.25,
                y: 321.6,
                w: 20.45,
                h: 49.95,
                r: 0
            }],
            [{
                x: -.2,
                y: 321.6,
                w: 124.05,
                h: 49.95,
                r: 0
            }, {
                x: -.2,
                y: 39.15,
                w: 47.9,
                h: 50.3,
                r: 0
            }, {
                x: 167.9,
                y: 173.8,
                w: 144.45,
                h: 50.3,
                r: 0
            }, {
                x: 340.5,
                y: 395.5,
                w: 302.2,
                h: 104.45,
                r: 0
            }, {
                x: 642.7,
                y: 347.8,
                w: 277.3,
                h: 152.15,
                r: 0
            }],
            [{
                x: 0,
                y: 347.75,
                w: 151.2,
                h: 151.1,
                r: 0
            }, {
                x: 305.3,
                y: 443.05,
                w: 147.9,
                h: 52.7,
                r: 0
            }, {
                x: 504.15,
                y: 347.75,
                w: 148.1,
                h: 53.7,
                r: 0
            }, {
                x: 701.85,
                y: 237,
                w: 149.15,
                h: 53.15,
                r: 0
            }],
            [{
                x: 2.85,
                y: 137.25,
                w: 148.55,
                h: 52.5,
                r: 0
            }, {
                x: 255.8,
                y: 253.5,
                w: 227.65,
                h: 52.5,
                r: 0
            }, {
                x: 400.35,
                y: 179.95,
                w: 53.3,
                h: 184.7,
                r: 180
            }, {
                x: 573.7,
                y: 149.05,
                w: 145.85,
                h: 50.4,
                r: 0
            }, {
                x: 696.6,
                y: 86.75,
                w: 53.7,
                h: 91.35,
                r: 180
            }],
            [{
                x: 1.8,
                y: 345.6,
                w: 251.55,
                h: 151.1,
                r: 0
            }, {
                x: 366.9,
                y: 261.95,
                w: 259.45,
                h: 52.1,
                r: 0
            }, {
                x: 733.65,
                y: 347.75,
                w: 181.45,
                h: 151.05,
                r: 0
            }],
            [{
                x: 0,
                y: 347.8,
                w: 196.95,
                h: 151.9,
                r: 0
            }, {
                x: 338.4,
                y: 274.4,
                w: 189.35,
                h: 51.2,
                r: 0
            }, {
                x: 526.45,
                y: 135.75,
                w: 148.8,
                h: 51.85,
                r: 0
            }, {
                x: 698.25,
                y: 375.95,
                w: 200.75,
                h: 71.85,
                r: 0
            }],
            [{
                x: -.7,
                y: 375.95,
                w: 190.15,
                h: 71.85,
                r: 0
            }, {
                x: 101.9,
                y: 300.05,
                w: 91.75,
                h: 305.3,
                r: 180
            }, {
                x: 284.95,
                y: 297.5,
                w: 252.7,
                h: 201.95,
                r: 0
            }, {
                x: 609.3,
                y: 181.3,
                w: 145,
                h: 48.65,
                r: 0
            }, {
                x: 875.75,
                y: 321.9,
                w: 25.95,
                h: 49.35,
                r: 0
            }],
            [{
                x: -.3,
                y: 321.9,
                w: 118.95,
                h: 49.35,
                r: 0
            }, {
                x: 162,
                y: 174.05,
                w: 145.65,
                h: 49.35,
                r: 0
            }, {
                x: 335.5,
                y: 393.65,
                w: 304.65,
                h: 105.7,
                r: 0
            }, {
                x: 640.15,
                y: 345.5,
                w: 274.85,
                h: 153.85,
                r: 0
            }],
            [{
                x: 0,
                y: 346.15,
                w: 204.2,
                h: 152.15,
                r: 0
            }, {
                x: 342.65,
                y: 445.15,
                w: 219.6,
                h: 49.05,
                r: 0
            }, {
                x: 512.7,
                y: 373.5,
                w: 55.35,
                h: 380.25,
                r: 180
            }, {
                x: 652.7,
                y: 355.8,
                w: 151.35,
                h: 49.7,
                r: 0
            }, {
                x: 796.35,
                y: 273.8,
                w: 56.35,
                h: 281.2,
                r: 180
            }, {
                x: 883,
                y: 299.45,
                w: 15.9,
                h: 50.2,
                r: 0
            }],
            [{
                x: 0,
                y: 299.4,
                w: 136.5,
                h: 50.2,
                r: 0
            }, {
                x: 100.9,
                y: 235.85,
                w: 56.35,
                h: 242.7,
                r: 180
            }, {
                x: 206.15,
                y: 222.95,
                w: 150.3,
                h: 49.6,
                r: 0
            }, {
                x: 328.8,
                y: 146.45,
                w: 56.9,
                h: 153.35,
                r: 180
            }, {
                x: 428.1,
                y: 130.3,
                w: 151.1,
                h: 50.25,
                r: 0
            }, {
                x: 628.75,
                y: 8.9,
                w: 151.35,
                h: 49.2,
                r: 0
            }, {
                x: 700.55,
                y: 222.95,
                w: 151.85,
                h: 51.4,
                r: 0
            }],
            [{
                x: 103.65,
                y: 299.9,
                w: 100,
                h: 163.85,
                r: 0
            }, {
                x: 203.65,
                y: 399.25,
                w: 95.8,
                h: 100,
                r: 0
            }, {
                x: 306.75,
                y: 218.75,
                w: 109.8,
                h: 244.5,
                r: 180
            }, {
                x: 352.75,
                y: 297.65,
                w: 100,
                h: 100,
                r: 0
            }, {
                x: 642.65,
                y: 348.6,
                w: 274.8,
                h: 150.55,
                r: 0
            }],
            [{
                x: 0,
                y: 349.15,
                w: 84.5,
                h: 151.75,
                r: 0
            }, {
                x: 177.35,
                y: 239.4,
                w: 111.15,
                h: 245.8,
                r: 180
            }, {
                x: 228.55,
                y: 303.55,
                w: 159.55,
                h: 43.95,
                r: 0
            }, {
                x: 415.2,
                y: 239.4,
                w: 111.9,
                h: 245.8,
                r: 180
            }, {
                x: 520.95,
                y: 305,
                w: 159.6,
                h: 39.6,
                r: 0
            }, {
                x: 750.25,
                y: 234.95,
                w: 237.05,
                h: 245,
                r: 180
            }, {
                x: 810.45,
                y: 279.95,
                w: 88.4,
                h: 219.9,
                r: 0
            }],
            [{
                x: -1.35,
                y: 279.95,
                w: 216.4,
                h: 219.9,
                r: 0
            }, {
                x: 252.2,
                y: 124.2,
                w: 247.55,
                h: 57.15,
                r: 0
            }, {
                x: 378.1,
                y: 277.65,
                w: 247.55,
                h: 57.2,
                r: 0
            }, {
                x: 692.3,
                y: 153.75,
                w: 109.15,
                h: 347.2,
                r: 0
            }],
            [{
                x: 124.7,
                y: 307.3,
                w: 159.75,
                h: 40.35,
                r: 0
            }, {
                x: 310.35,
                y: 239.05,
                w: 109.25,
                h: 243.5,
                r: 180
            }, {
                x: 443.5,
                y: 307.3,
                w: 159.7,
                h: 41.1,
                r: 0
            }, {
                x: 521.05,
                y: 242.15,
                w: 109.2,
                h: 245.9,
                r: 180
            }, {
                x: 799.75,
                y: 352.15,
                w: 40,
                h: 40.85,
                r: 0
            }, {
                x: 1098.35,
                y: 348.4,
                w: 132,
                h: 151.6,
                r: 0
            }],
            [{
                x: 0,
                y: 348.35,
                w: 204.05,
                h: 152.5,
                r: 0
            }, {
                x: 259.25,
                y: 233.8,
                w: 144.5,
                h: 50.5,
                r: 0
            }, {
                x: 449.3,
                y: 91.85,
                w: 144.15,
                h: 51.45,
                r: 0
            }, {
                x: 524,
                y: 373.35,
                w: 145.1,
                h: 51.35,
                r: 0
            }, {
                x: 713.75,
                y: 273.95,
                w: 145.4,
                h: 52.55,
                r: 0
            }, {
                x: 898.85,
                y: 184.45,
                w: 36.8,
                h: 187.75,
                r: 180
            }],
            [{
                x: 25.75,
                y: 184.45,
                w: 25.75,
                h: 187.75,
                r: 180
            }, {
                x: 102.05,
                y: 275.55,
                w: 131,
                h: 51.05,
                r: 0
            }, {
                x: 351,
                y: 211.2,
                w: 62.45,
                h: 214.25,
                r: 180
            }, {
                x: 400.85,
                y: 384.55,
                w: 393,
                h: 72.25,
                r: 0
            }, {
                x: 703.4,
                y: 303.95,
                w: 89.15,
                h: 310,
                r: 180
            }],
            [{
                x: 84.35,
                y: 286.2,
                w: 80.7,
                h: 62.9,
                r: 0
            }, {
                x: 163.45,
                y: 226.2,
                w: 83.15,
                h: 122.9,
                r: 0
            }, {
                x: 246.6,
                y: 165.8,
                w: 92.95,
                h: 183.3,
                r: 0
            }, {
                x: 328.25,
                y: 104.7,
                w: 89.65,
                h: 132.65,
                r: 0
            }, {
                x: 336.65,
                y: 396,
                w: 304.3,
                h: 105.6,
                r: 0
            }, {
                x: 641,
                y: 349.1,
                w: 275.9,
                h: 150.65,
                r: 0
            }],
            [{
                x: 0,
                y: 349.1,
                w: 204.7,
                h: 151.6,
                r: 0
            }, {
                x: 295.2,
                y: 236.8,
                w: 79.4,
                h: 64.15,
                r: 0
            }, {
                x: 374.6,
                y: 176.85,
                w: 83.55,
                h: 124.1,
                r: 0
            }, {
                x: 458.15,
                y: 115.7,
                w: 92.75,
                h: 185.25,
                r: 0
            }, {
                x: 540.2,
                y: 55.7,
                w: 88.35,
                h: 130.8,
                r: 0
            }, {
                x: 801,
                y: 205,
                w: 97.9,
                h: 65.55,
                r: 0
            }],
            [{
                x: 0,
                y: 204.95,
                w: 184.65,
                h: 66,
                r: 0
            }, {
                x: 386.55,
                y: 154.45,
                w: 86.35,
                h: 157.85,
                r: 180
            }, {
                x: 458.25,
                y: 245.3,
                w: 145.25,
                h: 50.05,
                r: 0
            }, {
                x: 804.9,
                y: 39.9,
                w: 96.1,
                h: 52.15,
                r: 0
            }, {
                x: 818.4,
                y: 323.75,
                w: 82.6,
                h: 51.35,
                r: 0
            }],
            [{
                x: -.1,
                y: 323.75,
                w: 119.05,
                h: 51.35,
                r: 0
            }, {
                x: -.05,
                y: 39.85,
                w: 48.5,
                h: 52.15,
                r: 0
            }, {
                x: 163.8,
                y: 176,
                w: 144.95,
                h: 50.85,
                r: 0
            }, {
                x: 314.55,
                y: 90.3,
                w: 86.85,
                h: 60.3,
                r: 0
            }, {
                x: 337.7,
                y: 394.85,
                w: 305.05,
                h: 105,
                r: 0
            }, {
                x: 642.75,
                y: 348.25,
                w: 275.4,
                h: 151.6,
                r: 0
            }]
        ], t
    }();
    t.GameInfo = e, __reflect(e.prototype, "infos.GameInfo")
}(infos || (infos = {}));
var loading;
! function (t) {
    var e = function (t) {
        function e() {
            var e = t.call(this) || this;
            return e.createView(), e
        }
        return __extends(e, t), e.prototype.createView = function () {
            this.textField = new uis.CLabel, this.textField.setLocation(160, 240), this.textField.width = 480, this.textField.height = 100, this.addChild(this.textField)
        }, e.prototype.onProgress = function (t, e) {
            this.textField.text = "Loading..." + t + "/" + e
        }, e
    }(uis.CSprite);
    t.LoadingUI = e, __reflect(e.prototype, "loading.LoadingUI", ["RES.PromiseTaskReporter"])
}(loading || (loading = {}));
var managers;
! function (t) {
    var e = function () {
        function t() {
            this._textures = {}, this._animats = {}
        }
        return t.prototype.getTextureByName = function (t) {
            return this._textures[t] || (this._textures[t] = RES.getRes(t)), this._textures[t]
        }, t.prototype.getAnimatByName = function (t, e) {
            if (void 0 === e && (e = ""), !this._animats[t]) {
                var r = RES.getRes("mc_" + t + "_data"),
                    i = RES.getRes("mc_" + t + "_tex");
                this._animats[t] = new egret.MovieClipDataFactory(r, i)
            }
            return this._animats[t].generateMovieClipData(e || t)
        }, t.getInstance = function () {
            return t._instance || (t._instance = new t)
        }, t
    }();
    t.AssetsManager = e, __reflect(e.prototype, "managers.AssetsManager")
}(managers || (managers = {}));
var managers;
! function (t) {
    var e = function () {
        function t() {
            if (this._moduleMap = {}, t._instance) throw new Error("Singleton is a singleton.");
            t._scenes[types.SceneType.START] = module.start.MStart, t._scenes[types.SceneType.GAME] = module.game.MGame, t._scenes[types.SceneType.OVER] = module.over.MOver
        }
        return t.prototype.init = function (t) {
            this._root = t
        }, t.prototype.changeScene = function (e) {
            if (e !== this._curType) {
                this._moduleMap[this._curType] && (this._moduleMap[this._curType].dispose(), this._moduleMap[this._curType] = null);
                var r = new t._scenes[e](e);
                this._root.addChild(r.ui), this._moduleMap[e] = r, this._curType = e
            }
        }, t.getInstance = function () {
            return t._instance || (t._instance = new t)
        }, t._scenes = {}, t
    }();
    t.SceneManager = e, __reflect(e.prototype, "managers.SceneManager")
}(managers || (managers = {}));
var Main = function (t) {
    function e() {
        var e = t.call(this) || this;
        return e._init(), e
    }
    return __extends(e, t), e.prototype._init = function () {
        this.stage ? this._addedStageHandler(null) : this.addEventListener(egret.Event.ADDED_TO_STAGE, this._addedStageHandler, this), this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this._removedStageHandler, this)
    }, e.prototype._addedStageHandler = function (t) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._addedStageHandler, this), egret.lifecycle.addLifecycleListener(function (t) {}), egret.lifecycle.onPause = function () {
            egret.ticker.pause()
        }, egret.lifecycle.onResume = function () {
            egret.ticker.resume()
        }, this.runGame()["catch"](function (t) {
            console.log(t)
        })
    }, e.prototype._removedStageHandler = function (t) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this._addedStageHandler, this), this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this._removedStageHandler, this)
    }, e.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (t) {
                switch (t.label) {
                    case 0:
                        return [4, this.loadResource()];
                    case 1:
                        return t.sent(), this.createGameScene(), [2]
                }
            })
        })
    }, e.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var t, e;
            return __generator(this, function (r) {
                switch (r.label) {
                    case 0:
                        return r.trys.push([0, 3, , 4]), t = new loading.LoadingUI, this.stage.addChild(t), [4, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        return r.sent(), [4, RES.loadGroup("preload", 0, t)];
                    case 2:
                        return r.sent(), this.stage.removeChild(t), [3, 4];
                    case 3:
                        return e = r.sent(), console.error(e), [3, 4];
                    case 4:
                        return [2]
                }
            })
        })
    }, e.prototype.createGameScene = function () {
        infos.BaseInfo.stage = this.stage, managers.SceneManager.getInstance().init(this), managers.SceneManager.getInstance().changeScene(types.SceneType.START)
    }, e
}(uis.CSprite);
__reflect(Main.prototype, "Main");
var module;
! function (t) {
    var e;
    ! function (e) {
        var r = function (t) {
            function r() {
                return null !== t && t.apply(this, arguments) || this
            }
            return __extends(r, t), r.prototype.init = function () {
                this._ui = new e.MGameUI, this._controller = new e.MGameController(this._ui)
            }, r
        }(t.BaseModule);
        e.MGame = r, __reflect(r.prototype, "module.game.MGame")
    }(e = t.game || (t.game = {}))
}(module || (module = {}));
var module;
! function (t) {
    var e;
    ! function (e) {
        var r = function (t) {
            function r(e) {
                var r = t.call(this, e) || this;
                return r._gameing = !1, r._isRot = !1, r._frameNum = 0, r._pause = !1, r
            }
            return __extends(r, t), r.prototype.init = function () {
                this._playerItem = this._ui.playerItem, this._ui.showOrHideTips(!0), this._playerItem.playOrStop(!1), this._initEvent()
            }, r.prototype._initEvent = function () {
                this._ui.addEventListener(egret.Event.ENTER_FRAME, this._enterFrameHandler, this), this._ui.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchTopHandler, this)
            }, r.prototype._removeEvent = function () {
                this._ui.removeEventListener(egret.Event.ENTER_FRAME, this._enterFrameHandler, this), this._ui.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchTopHandler, this)
            }, r.prototype._touchTopHandler = function () {
                this._gameing ? e.items.PlayerItem.RUN === this._playerItem.status ? (this._playerItem.status = e.items.PlayerItem.JUMP, this._speedY = -11) : e.items.PlayerItem.JUMP === this._playerItem.status && (this._playerItem.status = e.items.PlayerItem.DJUMP, this._speedY = -11) : (this._playerItem.rotation = 0, this._playerItem.status = e.items.PlayerItem.RUN, this._playerItem.setLocation(100, 330), this._playerItem.playOrStop(!0), this._ui.showOrHideTips(!1), this._frameNum = 0, this._speedY = 0, this._isRot = !1, this._gameing = !0)
            }, r.prototype._enterFrameHandler = function () {
                this._pause || this._gameing && (this._frameNum++, this._ui.mapView.updataMap(r.MOVE_SPEED), this._playerItem.y = this._playerItem.y + this._speedY, this._speedY++, infos.GameInfo.score = Math.floor(this._frameNum * r.MOVE_SPEED / 50), this._ui.setScore(infos.GameInfo.score), e.items.PlayerItem.DJUMP == this._playerItem.status && 0 == this._isRot ? (this._playerItem.rotation = this._playerItem.rotation + 20, this._playerItem.rotation >= 180 && (this._isRot = !0, this._playerItem.rotation = 0)) : e.items.PlayerItem.RUN == this._playerItem.status && (this._playerItem.status = e.items.PlayerItem.RUN), this._checkHit())
            }, r.prototype._checkHit = function () {
                var t = this,
                    i = this._playerItem.localToGlobal(0, 0);
                this._ui.mapView.mapItems.forEach(function (n, o) {
                    n.globalToLocal(i.x, i.y);
                    n.hitTestPoint(i.x, i.y - 20) && (t._playerItem.y = n.getTransformedBounds(t._ui).bottom + 22, t._speedY = 0, t._playerItem.rotation = 0), n.hitTestPoint(i.x, i.y + 35) && (t._playerItem.y = n.getTransformedBounds(t._ui).top - 34, t._speedY = 0, t._playerItem.status = e.items.PlayerItem.RUN, t._isRot = !1, t._playerItem.rotation = 0), n.hitTestPoint(i.x + 20, i.y) && (t._playerItem.x = t._playerItem.x - r.MOVE_SPEED)
                }), console.log(this._playerItem.y, infos.BaseInfo.stage.height, .5 * this._playerItem.height), (this._playerItem.x < -this._playerItem.width || this._playerItem.y > infos.BaseInfo.stage.stageHeight + .5 * this._playerItem.height) && managers.SceneManager.getInstance().changeScene(types.SceneType.OVER)
            }, r.prototype.dispose = function () {
                this._removeEvent(), t.prototype.dispose.call(this)
            }, r.MOVE_SPEED = 8, r
        }(t.BaseController);
        e.MGameController = r, __reflect(r.prototype, "module.game.MGameController")
    }(e = t.game || (t.game = {}))
}(module || (module = {}));
var module;
! function (t) {
    var e;
    ! function (e) {
        var r = function (t) {
            function r() {
                return t.call(this) || this
            }
            return __extends(r, t), r.prototype.init = function () {
                this.touchEnabled = !0, this._bgImg = new uis.CImage("img_bg_02_jpg", 420, 500), this._bgImg.setLocation(0, 0), this.addChild(this._bgImg), this._mapView = new e.items.MapView, this.addChild(this._mapView), this._playerItem = new e.items.PlayerItem, this._playerItem.setLocation(100, 330), this.addChild(this._playerItem), this._scoreTxt = new uis.CLabel, this._scoreTxt.size = 20, this._scoreTxt.setSize(400, 30), this._scoreTxt.setLocation(20, 20), this.addChild(this._scoreTxt), this._tips = new uis.CImage("img_tips_png", 245, 112), this._tips.setLocation(83, 113), this.addChild(this._tips)
            }, r.prototype.showOrHideTips = function (t) {
                this._tips.visible = t, this._scoreTxt.visible = !t
            }, r.prototype.setScore = function (t) {
                this._scoreTxt.text = "当前分数为：" + t
            }, Object.defineProperty(r.prototype, "mapView", {
                get: function () {
                    return this._mapView
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(r.prototype, "playerItem", {
                get: function () {
                    return this._playerItem
                },
                enumerable: !0,
                configurable: !0
            }), r.prototype.dispose = function () {}, r
        }(t.BaseUI);
        e.MGameUI = r, __reflect(r.prototype, "module.game.MGameUI")
    }(e = t.game || (t.game = {}))
}(module || (module = {}));
var module;
! function (t) {
    var e;
    ! function (t) {
        var e;
        ! function (t) {
            var e = function (t) {
                function e(e, r) {
                    var i = t.call(this) || this;
                    return i.setSize(Math.ceil(e), Math.ceil(r)), i._initView(), i
                }
                return __extends(e, t), e.prototype._initView = function () {
                    this._headImg = new uis.CImage("img_obshead_jpg", this.width, 30), this._headImg.setFillMode(egret.BitmapFillMode.REPEAT), this._headImg.setLocation(0, 0), this.addChild(this._headImg), this._bodyImg = new uis.CImage("img_obsbody_jpg", this.width, this.height - 30), this._bodyImg.setFillMode(egret.BitmapFillMode.REPEAT), this._bodyImg.setLocation(0, 30), this.addChild(this._bodyImg)
                }, e.prototype.updateSize = function (t, e) {
                    t = Math.ceil(t), e = Math.ceil(e), this.width = t, this.height = e, this._headImg.width = t, this._bodyImg.width = t, this._bodyImg.height = e - 30
                }, e
            }(uis.CSprite);
            t.MapItem = e, __reflect(e.prototype, "module.game.items.MapItem")
        }(e = t.items || (t.items = {}))
    }(e = t.game || (t.game = {}))
}(module || (module = {}));
var module;
! function (t) {
    var e;
    ! function (t) {
        var e;
        ! function (t) {
            var e = function (e) {
                function r() {
                    var t = e.call(this) || this;
                    return t._flag = !1, t._mapIndex = 0, t._mapCount = 0, t._mapCount = infos.GameInfo.mapInfo.length, t._mapIndex = 0, t._flag = !1, t._initView(), t
                }
                return __extends(r, e), r.prototype._initView = function () {
                    this._mapA = new uis.CSprite, this._mapB = new uis.CSprite, this._updataMapByIndex(this._mapA, this._mapIndex), this._updataMapByIndex(this._mapB, this._mapIndex), this._mapA.x = 0, this._mapB.x = this._mapA.width - 2, this.addChild(this._mapA), this.addChild(this._mapB)
                }, r.prototype.updataMap = function (t) {
                    if (this._mapA.x = this._mapA.x - t, this._mapB.x = this._mapB.x - t, this._mapA.x < 0 && !this._flag || this._mapB.x < 0 && this._flag) {
                        var e = this._flag ? this._mapB : this._mapA,
                            r = this._flag ? this._mapA : this._mapB;
                        this._mapIndex = this._mapIndex + 1 < this._mapCount ? this._mapIndex + 1 : 0, this._updataMapByIndex(r, this._mapIndex), r.x = e.x + e.width - 2, this._flag = !this._flag
                    }
                }, r.prototype._updataMapByIndex = function (e, r) {
                    for (var i, n = infos.GameInfo.mapInfo[r], o = Math.max(n.length, e.numChildren), s = new egret.Rectangle(0, 0, 1, 1), a = 0; o > a; a++) {
                        var h = void 0,
                            u = void 0;
                        a < e.numChildren && (h = e.getChildAt(a)), u = n[a], u ? (h ? h.updateSize(u.w, u.h) : (h = new t.MapItem(u.w, u.h), e.addChild(h)), h.rotation = u.r, h.setLocation(u.x, u.y), i = h.getTransformedBounds(e, i), s = s.union(i)) : h && (e.removeChild(h), h && h.dispose(), h = null, a--)
                    }
                    e.width = s.width, e.height = s.height
                }, Object.defineProperty(r.prototype, "mapItems", {
                    get: function () {
                        return this._mapA.children.concat(this._mapB.children)
                    },
                    enumerable: !0,
                    configurable: !0
                }), r
            }(uis.CSprite);
            t.MapView = e, __reflect(e.prototype, "module.game.items.MapView")
        }(e = t.items || (t.items = {}))
    }(e = t.game || (t.game = {}))
}(module || (module = {}));
var events;
! function (t) {
    var e = function (t) {
        function e() {
            return t.call(this) || this
        }
        return __extends(e, t), e.prototype.addEventListener = function (e, r, i, n, o) {
            t.prototype.addEventListener.call(this, e, r, i, n, o)
        }, e.prototype.removeEventListener = function (e, r, i, n) {
            t.prototype.removeEventListener.call(this, e, r, i, n)
        }, e.getInstance = function () {
            return e._instance || (e._instance = new e)
        }, e
    }(egret.EventDispatcher);
    t.EventTrigger = e, __reflect(e.prototype, "events.EventTrigger")
}(events || (events = {}));
var module;
! function (t) {
    var e;
    ! function (e) {
        var r = function (t) {
            function r() {
                return null !== t && t.apply(this, arguments) || this
            }
            return __extends(r, t), r.prototype.init = function () {
                this._ui = new e.MOverUI, this._controller = new e.MOverController(this._ui)
            }, r
        }(t.BaseModule);
        e.MOver = r, __reflect(r.prototype, "module.over.MOver")
    }(e = t.over || (t.over = {}))
}(module || (module = {}));
var module;
! function (t) {
    var e;
    ! function (e) {
        var r = function (t) {
            function e(e) {
                return t.call(this, e) || this
            }
            return __extends(e, t), e.prototype.init = function () {
                this._ui.setScore(infos.GameInfo.score), this._initEvent()
            }, e.prototype._initEvent = function () {
                this._ui.replayBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchReplayHandler, this), this._ui.moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchMoreHandler, this)
            }, e.prototype._removeEvent = function () {
                this._ui.replayBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchReplayHandler, this), this._ui.moreBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchMoreHandler, this)
            }, e.prototype._touchReplayHandler = function () {
                managers.SceneManager.getInstance().changeScene(types.SceneType.GAME)
            }, e.prototype._touchMoreHandler = function () {
                managers.SceneManager.getInstance().changeScene(types.SceneType.GAME)
            }, e.prototype.dispose = function () {
                this._removeEvent(), t.prototype.dispose.call(this)
            }, e
        }(t.BaseController);
        e.MOverController = r, __reflect(r.prototype, "module.over.MOverController")
    }(e = t.over || (t.over = {}))
}(module || (module = {}));
var module;
! function (t) {
    var e;
    ! function (e) {
        var r = function (t) {
            function e() {
                return t.call(this) || this
            }
            return __extends(e, t), e.prototype.init = function () {
                this._bgImg = new uis.CImage("img_bg_03_jpg", 420, 500), this._bgImg.setLocation(0, 0), this.addChild(this._bgImg), this._replayBtn = new uis.CButton("img_btn_2_png", 143, 64), this._replayBtn.setLocation(56, 360), this.addChild(this._replayBtn), this._moreBtn = new uis.CButton("img_btn_3_png", 143, 64), this._moreBtn.setLocation(225, 360), this.addChild(this._moreBtn), this._scoreTxt = new uis.CLabel, this._scoreTxt.setLocation(120, 200), this._scoreTxt.setSize(300, 40), this.addChild(this._scoreTxt)
            }, e.prototype.setScore = function (t) {
                this._scoreTxt.text = "你获得的分数为：" + t
            }, Object.defineProperty(e.prototype, "replayBtn", {
                get: function () {
                    return this._replayBtn
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "moreBtn", {
                get: function () {
                    return this._moreBtn
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.dispose = function () {}, e
        }(t.BaseUI);
        e.MOverUI = r, __reflect(r.prototype, "module.over.MOverUI")
    }(e = t.over || (t.over = {}))
}(module || (module = {}));
var module;
! function (t) {
    var e;
    ! function (e) {
        var r = function (t) {
            function r() {
                return null !== t && t.apply(this, arguments) || this
            }
            return __extends(r, t), r.prototype.init = function () {
                this._ui = new e.MStartUI, this._controller = new e.MStartController(this._ui)
            }, r
        }(t.BaseModule);
        e.MStart = r, __reflect(r.prototype, "module.start.MStart")
    }(e = t.start || (t.start = {}))
}(module || (module = {}));
var module;
! function (t) {
    var e;
    ! function (e) {
        var r = function (t) {
            function e(e) {
                return t.call(this, e) || this
            }
            return __extends(e, t), e.prototype.init = function () {
                this._initEvent()
            }, e.prototype._initEvent = function () {
                this._ui.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this._touchStartHandler, this)
            }, e.prototype._removeEvent = function () {
                this._ui.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._touchStartHandler, this)
            }, e.prototype._touchStartHandler = function () {
                managers.SceneManager.getInstance().changeScene(types.SceneType.GAME)
            }, e.prototype.dispose = function () {
                this._removeEvent(), t.prototype.dispose.call(this)
            }, e
        }(t.BaseController);
        e.MStartController = r, __reflect(r.prototype, "module.start.MStartController")
    }(e = t.start || (t.start = {}))
}(module || (module = {}));
var module;
! function (t) {
    var e;
    ! function (e) {
        var r = function (t) {
            function e() {
                return t.call(this) || this
            }
            return __extends(e, t), e.prototype.init = function () {
                this._bgImg = new uis.CImage("img_bg_01_jpg", 420, 500), this._bgImg.setLocation(0, 0), this.addChild(this._bgImg), this._startBtn = new uis.CButton("img_btn_1_png", 173, 76), this._startBtn.setLocation(127, 383), this.addChild(this._startBtn)
            }, Object.defineProperty(e.prototype, "startBtn", {
                get: function () {
                    return this._startBtn
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.dispose = function () {}, e
        }(t.BaseUI);
        e.MStartUI = r, __reflect(r.prototype, "module.start.MStartUI")
    }(e = t.start || (t.start = {}))
}(module || (module = {}));
var tools;
! function (t) {
    var e = function () {
        function t() {}
        return t.changeColor = function (e, r) {
            if (e) {
                e.filters = [], t._colorMap || (t._colorMap = (n = {}, n[t.GRAY] = t.gray(), n[t.WHITE] = t.white(), n[t.BLACK] = t.black(), n[t.RED] = t.red(), n[t.RED_DARK] = t.redDark(), n[t.BLUE] = t.blue(), n[t.GREEN] = t.green(), n[t.YELLOW] = t.yellow(), n[t.ORANGE] = t.orange(), n[t.PURPLE] = t.purple(), n[t.DARK] = t.dark(), n[t.LIGHT] = t.light(), n));
                var i = t._colorMap[r];
                return i && (e.filters = [i]), e;
                var n
            }
        }, t.gray = function () {
            var t = [.4, .4, .4, 0, 0, .4, .4, .4, 0, 0, .4, .4, .4, 0, 0, 0, 0, 0, 1, 0],
                e = new egret.ColorMatrixFilter(t);
            return e
        }, t.white = function () {
            var t = [1, 1, 1, 0, 20, 1, 1, 1, 0, 20, 1, 1, 1, 0, 20, 0, 0, 0, 1, 0],
                e = new egret.ColorMatrixFilter(t);
            return e
        }, t.black = function () {
            var t = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                e = new egret.ColorMatrixFilter(t);
            return e
        }, t.red = function () {
            var t = [1, 1, 1, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 1, 0],
                e = new egret.ColorMatrixFilter(t);
            return e
        }, t.redDark = function () {
            var t = [.5, .5, .5, 0, 0, .2, .2, .2, 0, 0, .1, .1, .1, 0, 0, 0, 0, 0, 1, 0],
                e = new egret.ColorMatrixFilter(t);
            return e
        }, t.blue = function () {
            var t = [0, 0, 0, 0, 20, .7, .7, .7, 0, 20, 1, 1, 1, 0, 20, 0, 0, 0, 1, 0],
                e = new egret.ColorMatrixFilter(t);
            return e
        }, t.blueDark = function () {
            var t = [0, 0, 0, 0, 20, .3, .3, .3, 0, 20, 1, 1, 1, 0, 20, 0, 0, 0, 1, 0],
                e = new egret.ColorMatrixFilter(t);
            return e
        }, t.green = function () {
            var t = [0, 0, 0, 0, 20, .7, .7, .7, 0, 20, .3, .3, .3, 0, 20, 0, 0, 0, 1, 0],
                e = new egret.ColorMatrixFilter(t);
            return e
        }, t.orange = function () {
            var t = [1, 1, 1, 0, 0, .5, .5, .5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                e = new egret.ColorMatrixFilter(t);
            return e
        }, t.yellow = function () {
            var t = [.9, .9, .9, 0, 20, .7, .7, .7, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 1, 0],
                e = new egret.ColorMatrixFilter(t);
            return e
        }, t.purple = function () {
            var t = [1, 1, 1, 0, 20, 0, 0, 0, 0, 20, 1, 1, 1, 0, 20, 0, 0, 0, 1, 0],
                e = new egret.ColorMatrixFilter(t);
            return e
        }, t.dark = function () {
            var t = [.5, 0, 0, 0, 0, 0, .5, 0, 0, 0, 0, 0, .5, 0, 0, 0, 0, 0, 1, 0],
                e = new egret.ColorMatrixFilter(t);
            return e
        }, t.light = function () {
            var t = [1, 0, 0, 0, 100, 0, 1, 0, 0, 100, 0, 0, 1, 0, 100, 0, 0, 0, 1, 0],
                e = new egret.ColorMatrixFilter(t);
            return e
        }, t.light2 = function () {
            var t = [1, 0, 0, 0, 25, 0, 1, 0, 0, 25, 0, 0, 1, 0, 25, 0, 0, 0, 1, 0],
                e = new egret.ColorMatrixFilter(t);
            return e
        }, t.GRAY = "GRAY", t.WHITE = "WHITE", t.BLACK = "BLACK", t.RED = "RED", t.RED_DARK = "RED_DARK", t.BLUE = "BLUE", t.GREEN = "GREEN", t.YELLOW = "YELLOW", t.ORANGE = "ORANGE", t.PURPLE = "PURPLE", t.DARK = "DARK", t.LIGHT = "LIGHT", t
    }();
    t.ColorTransKit = e, __reflect(e.prototype, "tools.ColorTransKit")
}(tools || (tools = {}));
var tools;
! function (t) {
    var e = function () {
        function e() {}
        return e.drawTexture = function (t, e, r, i, n) {
            var o = new egret.RenderTexture;
            return o.drawToTexture(new egret.Bitmap(t), new egret.Rectangle(e, r, i, n)), o
        }, e.copyTexture = function (t) {
            var e = new egret.RenderTexture;
            return e.drawToTexture(new egret.Bitmap(t)), e
        }, e.copyBitmap = function (t) {
            return new egret.Bitmap(e.copyTexture(t))
        }, e.drawBitmap = function (t, r, i, n, o) {
            return new egret.Bitmap(e.drawTexture(t, r, i, n, o))
        }, e.colorBitmap = function (e, r) {
            var i = new egret.Bitmap(e);
            return t.ColorTransKit.changeColor(i, r), i
        }, e
    }();
    t.TextureTool = e, __reflect(e.prototype, "tools.TextureTool")
}(tools || (tools = {}));
var types;
! function (t) {
    var e;
    ! function (t) {
        t[t.START = 0] = "START", t[t.GAME = 1] = "GAME", t[t.OVER = 2] = "OVER"
    }(e = t.SceneType || (t.SceneType = {}))
}(types || (types = {}));
var uis;
! function (t) {
    var e = (new egret.ColorMatrixFilter([.3, .6, 0, 0, 0, .3, .6, 0, 0, 0, .3, .6, 0, 0, 0, 0, 0, 0, 1, 0]), function (e) {
        function r(t, i, n, o) {
            void 0 === o && (o = r.NONE);
            var s = e.call(this) || this;
            return s.touchEnabled = !0, s._status = 0, s._curBmp = new egret.Bitmap, s.addChild(s._curBmp), s.setSkin(t, i, n, o), s._initEvent(), s
        }
        return __extends(r, e), r.prototype._initEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouchEventHandler, this), this.addEventListener(egret.TouchEvent.TOUCH_END, this._onTouchEventHandler, this), this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this._onTouchEventHandler, this)
        }, r.prototype._removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this._onTouchEventHandler, this), this.removeEventListener(egret.TouchEvent.TOUCH_END, this._onTouchEventHandler, this), this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this._onTouchEventHandler, this)
        }, r.prototype._onTouchEventHandler = function (t) {
            if (r.STATUS_DISABLED !== this._status) switch (t.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this.setStatus(r.STATUS_ACTIVE);
                    break;
                case egret.TouchEvent.TOUCH_END:
                case egret.TouchEvent.TOUCH_CANCEL:
                    this.setStatus(r.STATUS_NORMAL)
            }
        }, r.prototype.setSkin = function (e, i, n, o) {
            this._orgImg ? this._orgImg.setSkin(e, i, n) : this._orgImg = new t.CImage(e, i, n);
            var s = this._orgImg.orgBmp.texture;
            switch (this._skins = [], o) {
                case r.NONE:
                    this._skins[0] = tools.TextureTool.copyBitmap(s), this._skins[1] = tools.TextureTool.colorBitmap(s, tools.ColorTransKit.DARK), this._skins[2] = tools.TextureTool.colorBitmap(s, tools.ColorTransKit.GRAY), this.width = this._curBmp.width = i, this.height = this._curBmp.height = n;
                    break;
                case r.DOUBLE:
                    this._skins[0] = tools.TextureTool.drawBitmap(s, 0, 0, i, n / 2), this._skins[1] = tools.TextureTool.drawBitmap(s, 0, n / 2, i, n / 2), this._skins[2] = tools.TextureTool.colorBitmap(tools.TextureTool.drawTexture(s, 0, 0, i, n / 2), tools.ColorTransKit.GRAY), this.width = this._curBmp.width = i, this.height = this._curBmp.height = n / 2;
                    break;
                case r.THREE:
                    this._skins[0] = tools.TextureTool.drawBitmap(s, 0, 0, i, n / 3), this._skins[1] = tools.TextureTool.drawBitmap(s, 0, n / 3, i, n / 3), this._skins[2] = tools.TextureTool.drawBitmap(s, 0, n / 3 * 2, i, n / 3), this.width = this._curBmp.width = i, this.height = this._curBmp.height = n / 3
            }
            this._type = o, this.setStatus(this._status)
        }, r.prototype.setStatus = function (t) {
            var e;
            switch (t) {
                case r.STATUS_NORMAL:
                    e = this._skins[0];
                    break;
                case r.STATUS_ACTIVE:
                    e = this._skins[1];
                    break;
                case r.STATUS_DISABLED:
                    e = this._skins[2]
            }
            this._curBmp.texture = e.texture, this._curBmp.filters = e.filters, this._status = t
        }, r.prototype.dispose = function () {
            this._removeEvent(), e.prototype.dispose.call(this), this._orgImg = null, this._curBmp = null
        }, r.NONE = 0, r.DOUBLE = 1, r.THREE = 2, r.STATUS_NORMAL = 0, r.STATUS_ACTIVE = 1, r.STATUS_DISABLED = 2, r
    }(t.CSprite));
    t.CButton = e, __reflect(e.prototype, "uis.CButton")
}(uis || (uis = {}));
var uis;
! function (t) {
    var e = function (t) {
        function e(e, r, i, n, o) {
            void 0 === n && (n = 0), void 0 === o && (o = 0);
            var s = t.call(this) || this;
            return s._skin = new egret.Bitmap, s.addChild(s._skin), s.setSkin(e, r, i, n, o), s
        }
        return __extends(e, t), e.prototype.setSkin = function (t, e, r, i, n) {
            void 0 === i && (i = 0), void 0 === n && (n = 0), this._skin.x = i, this._skin.y = n, this.setSize(e, r), this._skin.texture = managers.AssetsManager.getInstance().getTextureByName(t)
        }, e.prototype.setFillMode = function (t) {
            this._skin.fillMode = t
        }, e.prototype.setFilter = function (t) {
            void 0 === t && (t = []), this._skin.filters = t
        }, Object.defineProperty(e.prototype, "width", {
            set: function (t) {
                this._skin.width = t, this.$setWidth(t)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "height", {
            set: function (t) {
                this._skin.height = t, this.$setHeight(t)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "orgBmp", {
            get: function () {
                return this._skin
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype.dispose = function () {
            t.prototype.dispose.call(this), this._skin = null
        }, e
    }(t.CSprite);
    t.CImage = e, __reflect(e.prototype, "uis.CImage")
}(uis || (uis = {}));
var uis;
! function (t) {
    var e = function (t) {
        function e(e, r, i) {
            void 0 === e && (e = ""), void 0 === r && (r = {}), void 0 === i && (i = null);
            var n = t.call(this) || this;
            return n._textField = new egret.TextField, r = __assign({
                size: 16,
                textColor: 0,
                stroke: 1,
                strokeColor: 16777215
            }, r), Object.keys(r).forEach(function (t) {
                return n._textField[t] = r[t]
            }), n._textField.text = e, n._textField.filters = i, n.addChild(n._textField), n
        }
        return __extends(e, t), Object.defineProperty(e.prototype, "size", {
            set: function (t) {
                this._textField.size = t
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "color", {
            set: function (t) {
                this._textField.textColor = t
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "strokeColor", {
            set: function (t) {
                this._textField.strokeColor = t
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "text", {
            get: function () {
                return this._textField.text
            },
            set: function (t) {
                this._textField.text = t
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype.setSize = function (t, e) {
            this._textField && (this._textField.width = t, this._textField.height = e)
        }, e.prototype.dispose = function () {
            t.prototype.dispose.call(this), this._textField = null
        }, e
    }(t.CSprite);
    t.CLabel = e, __reflect(e.prototype, "uis.CLabel")
}(uis || (uis = {}));
var uis;
! function (t) {
    var e = function (t) {
        function e(e, r) {
            void 0 === e && (e = ""), void 0 === r && (r = 24);
            var i = t.call(this) || this;
            return i._frameMap = {}, i._initView(e, r), i._initEvent(), i
        }
        return __extends(e, t), e.prototype._initView = function (t, e) {
            void 0 === t && (t = ""), this._movieData = managers.AssetsManager.getInstance().getAnimatByName(t), this._movie = new egret.MovieClip(this._movieData), this._movie.frameRate = e, this.addChild(this._movie)
        }, e.prototype._initEvent = function () {
            this._movie.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this._frameLabelHandler, this)
        }, e.prototype._removeEvent = function () {
            this._movie.removeEventListener(egret.MovieClipEvent.FRAME_LABEL, this._frameLabelHandler, this)
        }, e.prototype._frameLabelHandler = function (t) {
            var e = this;
            if (this._movie.isPlaying) {
                var r = this._frameMap[t.frameLabel] || [];
                r.forEach(function (t) {
                    return t.call(e)
                })
            }
        }, e.prototype.play = function () {
            this._movie.play()
        }, e.prototype.stop = function () {
            this._movie.stop()
        }, e.prototype.gotoAndPlay = function (t, e) {
            void 0 === e && (e = 0), this._movie.gotoAndPlay(t, e)
        }, e.prototype.gotoAndStop = function (t) {
            this._movie.gotoAndStop(t)
        }, e.prototype.addFrameScript = function (t, e) {
            if (e && "function" == typeof e) {
                if ("string" == typeof t) {
                    var r = this.getFrameLabelByName(t);
                    if (!r) return;
                    t = r.frame
                }
                var i = "frame_" + t;
                this._movie.frameEvents[t] = i, this._frameMap[i] ? this._frameMap[i].push(e) : this._frameMap[i] = [e]
            }
        }, e.prototype.getFrameLabelByName = function (t, e) {
            void 0 === e && (e = !1), void 0 === e && (e = !1), e && (t = t.toLowerCase());
            var r = this._movie.frameLabels;
            if (r)
                for (var i = null, n = 0; n < r.length; n++)
                    if (i = r[n], e ? i.name.toLowerCase() == t : i.name == t) return i;
            return null
        }, Object.defineProperty(e.prototype, "isPlaying", {
            get: function () {
                return this._movie.isPlaying
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype.dispose = function () {
            this._removeEvent(), t.prototype.dispose.call(this), this._movie = null
        }, e
    }(t.CSprite);
    t.CMovieClip = e, __reflect(e.prototype, "uis.CMovieClip")
}(uis || (uis = {}));



var module;
! function (t) {
    var e;
    ! function (t) {
        var e;
        ! function (t) {
            var e = function (t) {
                function e() {
                    var e = t.call(this) || this;
                    return e._start = -1, e._initView(), e
                }
                return __extends(e, t), e.prototype._initView = function () {
                    var t = this;
                    this._movie = new uis.CMovieClip("player", 18), this.addChild(this._movie), this._movie.setLocation(0, 0), this._movie.addFrameScript(10, function () {
                        t._movie.gotoAndPlay(0)
                    }), this._movie.addFrameScript(11, function () {
                        t._movie.stop()
                    }), this.status = e.RUN
                }, e.prototype.playOrStop = function (t) {
                    t ? this._movie.gotoAndPlay(0) : this._movie.gotoAndStop(0)
                }, Object.defineProperty(e.prototype, "status", {
                    get: function () {
                        return this._start
                    },
                    set: function (t) {
                        if (t != this._start) {
                            var r = 0;
                            switch (t) {
                                case e.RUN:
                                    r = 10;
                                    break;
                                case e.JUMP:
                                case e.DJUMP:
                                    r = 11
                            }
                            this._movie.gotoAndPlay(r), this._start = t
                        }
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.RUN = 0, e.JUMP = 1, e.DJUMP = 2, e
            }(uis.CSprite);
            t.PlayerItem = e, __reflect(e.prototype, "module.game.items.PlayerItem")
        }(e = t.items || (t.items = {}))
    }(e = t.game || (t.game = {}))
}(module || (module = {}));