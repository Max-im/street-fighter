// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/Sprite.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sprite = void 0;
var Sprite = /*#__PURE__*/function () {
  function Sprite(data) {
    _classCallCheck(this, Sprite);
    this.image = new Image();
    this.position = data.position || {
      x: 0,
      y: 0
    };
    this.width = 50;
    this.height = 150;
    this.image.src = data.imgSrc;
    this.scale = data.scale || 1;
    this.framesMax = data.framesMax || 1;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = 5;
    this.offset = data.offset || {
      x: 0,
      y: 0
    };
  }
  _createClass(Sprite, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.drawImage(this.image, this.framesCurrent * (this.image.width / this.framesMax), 0, this.image.width / this.framesMax, this.image.height, this.position.x - this.offset.x, this.position.y - this.offset.y, this.image.width / this.framesMax * this.scale, this.image.height * this.scale);
    }
  }, {
    key: "animateFrames",
    value: function animateFrames() {
      this.framesElapsed++;
      if (this.framesElapsed % this.framesHold === 0) {
        if (this.framesCurrent < this.framesMax - 1) {
          this.framesCurrent++;
        } else {
          this.framesCurrent = 0;
        }
      }
    }
  }, {
    key: "update",
    value: function update(ctx) {
      this.draw(ctx);
      this.animateFrames();
    }
  }]);
  return Sprite;
}();
exports.Sprite = Sprite;
},{}],"src/Drawer.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drawer = void 0;
var Drawer = /*#__PURE__*/function () {
  function Drawer(ctx) {
    _classCallCheck(this, Drawer);
    this.ctx = ctx;
    this.top = 0;
    this.left = 0;
    this.width = 1024;
    this.height = 567;
  }
  _createClass(Drawer, null, [{
    key: "init",
    value: function init() {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Error while creating context');
      canvas.width = 1024;
      canvas.height = 567;
      document.body.appendChild(canvas);
      return new Drawer(ctx);
    }
  }]);
  return Drawer;
}();
exports.Drawer = Drawer;
},{}],"src/Timer.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timer = void 0;
var Timer = /*#__PURE__*/function () {
  function Timer(game) {
    var _this = this;
    _classCallCheck(this, Timer);
    this.secondsLeft = 60;
    this.width = 50;
    this.game = game;
    this.instance = setInterval(function () {
      return _this.secondsLeft--;
    }, 1000);
  }
  _createClass(Timer, [{
    key: "draw",
    value: function draw(ctx) {
      var strartPoint = 1024 / 2 - 30;
      ctx.fillStyle = 'white';
      ctx.fillRect(strartPoint, 10, this.width, this.width);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(strartPoint, 10, this.width, this.width);
      ctx.fillStyle = "#000000";
      ctx.font = "26px Georgia";
      var xSwitch = 10;
      if (this.secondsLeft.toString().length === 1) xSwitch = 15;
      ctx.fillText(this.secondsLeft, strartPoint + xSwitch, 40, this.width);
    }
  }, {
    key: "timeLeft",
    value: function timeLeft() {
      this.game.notify(undefined, {
        type: 'timeLeft',
        payload: null
      });
    }
  }, {
    key: "stopTimer",
    value: function stopTimer() {
      clearInterval(this.instance);
    }
  }, {
    key: "update",
    value: function update(ctx) {
      this.draw(ctx);
      if (this.secondsLeft <= 0) {
        clearInterval(this.instance);
        this.timeLeft();
      }
    }
  }]);
  return Timer;
}();
exports.Timer = Timer;
},{}],"src/Game.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;
var Timer_1 = require("./Timer");
var Game = /*#__PURE__*/function () {
  function Game(gameData) {
    _classCallCheck(this, Game);
    this.active = true;
    this.firstFighter = gameData.firstFighter;
    this.secondFighter = gameData.secondFighter;
    this.firstFighter.setMediator(this);
    this.secondFighter.setMediator(this);
    this.drawer = gameData.drawer;
    this.sprites = gameData.sprites;
    this.timer = new Timer_1.Timer(this);
  }
  _createClass(Game, [{
    key: "activeAttackCollision",
    value: function activeAttackCollision() {
      return this.firstFighter.attackBox.position.x + this.firstFighter.attackBox.width >= this.secondFighter.position.x && this.firstFighter.attackBox.position.x <= this.secondFighter.position.x + this.secondFighter.width && this.firstFighter.attackBox.position.y + this.firstFighter.attackBox.height >= this.secondFighter.position.y && this.firstFighter.attackBox.position.y <= this.secondFighter.position.y + this.secondFighter.height;
    }
  }, {
    key: "notify",
    value: function notify(sender, event) {
      if (event.type === 'attack') {
        var receiver = sender === this.firstFighter ? this.secondFighter : this.firstFighter;
        if (this.activeAttackCollision()) receiver.takeHit();
      } else if (event.type === 'dead') {
        this.active = false;
        this.timer.stopTimer();
        var winner = sender === this.firstFighter ? this.secondFighter : this.firstFighter;
        this.showResultMessage("".concat(winner.name, " WIN!"));
      } else if (event.type === 'timeLeft') {
        this.active = false;
        var firstFighterHealth = this.firstFighter.health.getHealth();
        var secondFighterHealth = this.secondFighter.health.getHealth();
        var message = 'Draw!';
        if (firstFighterHealth > secondFighterHealth) {
          message = "".concat(this.firstFighter.name, " WIN!");
          this.secondFighter.kill();
        } else if (firstFighterHealth < secondFighterHealth) {
          message = "".concat(this.secondFighter.name, " WIN!");
          this.firstFighter.kill();
        }
        this.showResultMessage(message);
      }
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this = this;
      window.requestAnimationFrame(this.animate.bind(this));
      this.drawer.ctx.fillStyle = 'black';
      this.drawer.ctx.fillRect(0, 0, this.drawer.width, this.drawer.height);
      this.sprites.forEach(function (sprite) {
        return sprite.update(_this.drawer.ctx);
      });
      if (!(this.firstFighter.control && this.secondFighter.control)) {
        throw new Error('Control not provided');
      }
      this.firstFighter.update(this.drawer.ctx);
      this.secondFighter.update(this.drawer.ctx);
      this.timer.update(this.drawer.ctx);
    }
  }, {
    key: "showResultMessage",
    value: function showResultMessage(msg) {
      var ctx = this.drawer.ctx;
      ctx.fillStyle = "#000000";
      ctx.font = "50px Georgia";
      var textSwitch = 1024 / 2 - msg.length * 15 / 2;
      ctx.fillText(msg, textSwitch, 567 / 2, 100);
    }
  }]);
  return Game;
}();
exports.Game = Game;
},{"./Timer":"src/Timer.ts"}],"src/Control.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Control = void 0;
var Control = /*#__PURE__*/function () {
  function Control(fighter, movementMap) {
    _classCallCheck(this, Control);
    this.fighter = fighter;
    this.movementMap = movementMap;
    this.canAttack = true;
    this.isJumped = false;
    fighter.control = this;
    window.addEventListener('keydown', this.keydownHandle.bind(this));
    window.addEventListener('keyup', this.keyupHandle.bind(this));
  }
  _createClass(Control, [{
    key: "keyupHandle",
    value: function keyupHandle(event) {
      if (this.fighter.dead) return;
      if (event.key === this.movementMap.left) {
        this.fighter.stop();
      } else if (event.key === this.movementMap.right) {
        this.fighter.stop();
      }
    }
  }, {
    key: "keydownHandle",
    value: function keydownHandle(event) {
      if (this.fighter.dead) return;
      if (event.key === this.movementMap.left) {
        this.fighter.moveBack();
      } else if (event.key === this.movementMap.right) {
        this.fighter.move();
      } else if (event.key === this.movementMap.up && !this.isJumped) {
        this.fighter.jump();
        this.isJumped = true;
      } else if (event.key === this.movementMap.attack && this.canAttack) {
        this.fighter.attack();
        this.canAttack = false;
      }
    }
  }]);
  return Control;
}();
exports.Control = Control;
},{}],"images/background.png":[function(require,module,exports) {
module.exports = "/background.0063873b.png";
},{}],"images/shop.png":[function(require,module,exports) {
module.exports = "/shop.fedd44fa.png";
},{}],"src/Health/Health.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Health = void 0;
var Health = /*#__PURE__*/function () {
  function Health(fighter) {
    _classCallCheck(this, Health);
    this.health = 100;
    this.height = 30;
    this.healthLen = (1024 - 100) / 2;
    this.fighter = fighter;
  }
  _createClass(Health, [{
    key: "minusHealth",
    value: function minusHealth(val) {
      this.health -= val;
    }
  }, {
    key: "getHealth",
    value: function getHealth() {
      return this.health;
    }
  }, {
    key: "hasHealth",
    value: function hasHealth() {
      return this.health > 0;
    }
  }, {
    key: "update",
    value: function update(ctx) {
      ctx.fillStyle = 'red';
      ctx.fillRect(this.startFrom, 20, this.healthLen, this.height);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(this.startFrom, 20, this.healthLen, this.height);
      ctx.fillStyle = 'blue';
      var currentHealth = this.healthLen * this.health / 100;
      var healthShift = (this.healthLen - currentHealth) * this.shiftMultiply + this.startFrom;
      var healthStart = this.health > 0 ? healthShift : 0;
      ctx.fillRect(healthStart, 20, currentHealth, this.height);
      ctx.fillStyle = "#000000";
      ctx.font = "20px Georgia";
      ctx.fillText(this.fighter.name, this.startFrom + this.textStart, this.height + 10);
    }
  }]);
  return Health;
}();
exports.Health = Health;
},{}],"src/Health/LeftHealth.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeftHealth = void 0;
var Health_1 = require("./Health");
var LeftHealth = /*#__PURE__*/function (_Health_1$Health) {
  _inherits(LeftHealth, _Health_1$Health);
  var _super = _createSuper(LeftHealth);
  function LeftHealth(fighter) {
    var _this;
    _classCallCheck(this, LeftHealth);
    _this = _super.call(this, fighter);
    _this.gap = 0;
    _this.startFrom = 10 + _this.gap;
    _this.shiftMultiply = 0;
    _this.currentHealthGap = 0;
    _this.nameGap = 0;
    _this.textStart = 20;
    return _this;
  }
  return _createClass(LeftHealth);
}(Health_1.Health);
exports.LeftHealth = LeftHealth;
},{"./Health":"src/Health/Health.ts"}],"src/Health/RightHealth.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RightHealth = void 0;
var Health_1 = require("./Health");
var RightHealth = /*#__PURE__*/function (_Health_1$Health) {
  _inherits(RightHealth, _Health_1$Health);
  var _super = _createSuper(RightHealth);
  function RightHealth(fighter) {
    var _this;
    _classCallCheck(this, RightHealth);
    _this = _super.call(this, fighter);
    _this.shiftMultiply = 1;
    _this.gap = 80;
    _this.startFrom = _this.gap + _this.healthLen;
    _this.nameGap = 0;
    _this.textStart = _this.healthLen - 60;
    return _this;
  }
  return _createClass(RightHealth);
}(Health_1.Health);
exports.RightHealth = RightHealth;
},{"./Health":"src/Health/Health.ts"}],"src/Fighter.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fighter = void 0;
var LeftHealth_1 = require("./Health/LeftHealth");
var RightHealth_1 = require("./Health/RightHealth");
var Sprite_1 = require("./Sprite");
var FighterComponent = /*#__PURE__*/function (_Sprite_1$Sprite) {
  _inherits(FighterComponent, _Sprite_1$Sprite);
  var _super = _createSuper(FighterComponent);
  function FighterComponent(spriteData, mediator) {
    var _this;
    _classCallCheck(this, FighterComponent);
    _this = _super.call(this, spriteData);
    _this.mediator = mediator;
    return _this;
  }
  _createClass(FighterComponent, [{
    key: "setMediator",
    value: function setMediator(mediator) {
      this.mediator = mediator;
    }
  }]);
  return FighterComponent;
}(Sprite_1.Sprite);
var Fighter = /*#__PURE__*/function (_FighterComponent) {
  _inherits(Fighter, _FighterComponent);
  var _super2 = _createSuper(Fighter);
  function Fighter(data) {
    var _this2;
    _classCallCheck(this, Fighter);
    _this2 = _super2.call(this, {
      position: data.position,
      imgSrc: data.imgSrc,
      scale: data.scale,
      framesMax: data.framesMax,
      offset: data.offset
    });
    _this2.gravity = 0.7;
    _this2.killed = false;
    _this2.velocity = data.velocity;
    _this2.width = 50;
    _this2.height = 150;
    _this2.attackBox = {
      position: {
        x: _this2.position.x,
        y: _this2.position.y
      },
      offset: data.attackBox.offset,
      width: data.attackBox.width,
      height: data.attackBox.height
    };
    _this2.name = data.name;
    _this2.fighterNum = data.fighterNum;
    _this2.health = data.fighterNum === 1 ? new LeftHealth_1.LeftHealth(_assertThisInitialized(_this2)) : new RightHealth_1.RightHealth(_assertThisInitialized(_this2));
    _this2.framesCurrent = 0;
    _this2.framesElapsed = 0;
    _this2.framesHold = 5;
    _this2.attackFrame = data.attackFrame;
    _this2.dead = false;
    _this2.sprites = data.sprites;
    return _this2;
  }
  _createClass(Fighter, [{
    key: "disabled",
    value: function disabled() {
      return this.dead || this.killed || !this.mediator.active;
    }
  }, {
    key: "setSpriteState",
    value: function setSpriteState(sprite) {
      this.image = sprite.image;
      this.framesMax = sprite.framesMax;
      this.framesCurrent = 0;
    }
  }, {
    key: "move",
    value: function move() {
      if (this.disabled()) return;
      this.setSpriteState(this.sprites.run);
      this.velocity.x = +5;
    }
  }, {
    key: "moveBack",
    value: function moveBack() {
      if (this.disabled()) return;
      this.setSpriteState(this.sprites.run);
      this.velocity.x = -5;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.disabled()) return;
      this.setSpriteState(this.sprites.idle);
      this.velocity.x = 0;
    }
  }, {
    key: "attack",
    value: function attack() {
      if (this.disabled()) return;
      this.setSpriteState(this.sprites.attack1);
    }
  }, {
    key: "jump",
    value: function jump() {
      if (this.disabled()) return;
      this.setSpriteState(this.sprites.jump);
      this.velocity.y = -20;
    }
  }, {
    key: "kill",
    value: function kill() {
      if (this.image !== this.sprites.death.image) {
        this.setSpriteState(this.sprites.death);
        this.killed = true;
      }
    }
  }, {
    key: "takeHit",
    value: function takeHit() {
      this.health.minusHealth(20);
      if (!this.health.hasHealth()) return this.kill();
      this.setSpriteState(this.sprites.takeHit);
    }
  }, {
    key: "update",
    value: function update(ctx) {
      var _a;
      this.draw(ctx);
      if (!this.dead) this.animateFrames();
      if (this.image === this.sprites.idle.image) this.control.canAttack = true;
      // move attack box
      this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
      this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.health.update(ctx);
      // gravity function
      if (this.position.y + this.height + this.velocity.y >= 567 - 96) {
        this.velocity.y = 0;
        this.position.y = 330;
      } else this.velocity.y += this.gravity;
      // attack notify
      if (this.image === this.sprites.attack1.image && this.framesCurrent === this.framesMax - 1) {
        this.mediator.notify(this, {
          type: 'attack',
          payload: ''
        });
      }
      // stop attack
      if (this.image === this.sprites.attack1.image && this.framesCurrent === this.framesMax - 1) {
        this.setSpriteState(this.sprites.idle);
        this.control.canAttack = true;
      }
      // change jumping sprites
      if (this.velocity.y < 0) this.setSpriteState(this.sprites.jump);else if (this.velocity.y > 0) this.setSpriteState(this.sprites.fall);
      // change skin after jump
      if (((_a = this.control) === null || _a === void 0 ? void 0 : _a.isJumped) && this.position.y === 330) {
        this.setSpriteState(this.sprites.idle);
        this.control.isJumped = false;
        this.control.canAttack = true;
      }
      // change skin after taking a hit
      if (this.image === this.sprites.takeHit.image && this.framesCurrent === this.framesMax - 1) {
        this.setSpriteState(this.sprites.idle);
      }
      // dead
      if (this.image === this.sprites.death.image && this.framesCurrent === this.framesMax - 1) {
        this.dead = true;
        this.mediator.notify(this, {
          type: 'dead',
          payload: ''
        });
      }
    }
  }]);
  return Fighter;
}(FighterComponent);
exports.Fighter = Fighter;
},{"./Health/LeftHealth":"src/Health/LeftHealth.ts","./Health/RightHealth":"src/Health/RightHealth.ts","./Sprite":"src/Sprite.ts"}],"../images/mack/Attack1.png":[function(require,module,exports) {
module.exports = "./Attack1.af761d61.png";
},{}],"../images/mack/Idle.png":[function(require,module,exports) {
module.exports = "./Idle.e84909ee.png";
},{}],"images/mack/Run.png":[function(require,module,exports) {
module.exports = "./Run.7677d074.png";
},{}],"images/mack/Jump.png":[function(require,module,exports) {
module.exports = "./Jump.3b6d4afc.png";
},{}],"images/mack/Fall.png":[function(require,module,exports) {
module.exports = "./Fall.2fe7ce0a.png";
},{}],"images/mack/TakeHit.png":[function(require,module,exports) {
module.exports = "./TakeHit.20f68536.png";
},{}],"images/mack/Death.png":[function(require,module,exports) {
module.exports = "./Death.ab7fbd75.png";
},{}],"src/Fighters/MackFighter.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mackFighter = void 0;
var Sprite_1 = require("../Sprite");
var Fighter_1 = require("../Fighter");
var Attack1_png_1 = __importDefault(require("../../images/mack/Attack1.png"));
var Idle_png_1 = __importDefault(require("../../images/mack/Idle.png"));
var Run_png_1 = __importDefault(require("../../images/mack/Run.png"));
var Jump_png_1 = __importDefault(require("../../images/mack/Jump.png"));
var Fall_png_1 = __importDefault(require("../../images/mack/Fall.png"));
var TakeHit_png_1 = __importDefault(require("../../images/mack/TakeHit.png"));
var Death_png_1 = __importDefault(require("../../images/mack/Death.png"));
var mackData = {
  position: {
    x: 250,
    y: 335
  },
  velocity: {
    x: 0,
    y: 0
  },
  imgSrc: Idle_png_1.default,
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  attackFrame: 4,
  fighterNum: 1,
  name: 'Mack',
  sprites: {
    idle: new Sprite_1.Sprite({
      imgSrc: Idle_png_1.default,
      framesMax: 8
    }),
    run: new Sprite_1.Sprite({
      imgSrc: Run_png_1.default,
      framesMax: 8
    }),
    jump: new Sprite_1.Sprite({
      imgSrc: Jump_png_1.default,
      framesMax: 2
    }),
    fall: new Sprite_1.Sprite({
      imgSrc: Fall_png_1.default,
      framesMax: 2
    }),
    attack1: new Sprite_1.Sprite({
      imgSrc: Attack1_png_1.default,
      framesMax: 6
    }),
    takeHit: new Sprite_1.Sprite({
      imgSrc: TakeHit_png_1.default,
      framesMax: 4
    }),
    death: new Sprite_1.Sprite({
      imgSrc: Death_png_1.default,
      framesMax: 6
    })
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }
};
exports.mackFighter = new Fighter_1.Fighter(mackData);
},{"../Sprite":"src/Sprite.ts","../Fighter":"src/Fighter.ts","../../images/mack/Attack1.png":"images/mack/Attack1.png","../../images/mack/Idle.png":"images/mack/Idle.png","../../images/mack/Run.png":"images/mack/Run.png","../../images/mack/Jump.png":"images/mack/Jump.png","../../images/mack/Fall.png":"images/mack/Fall.png","../../images/mack/TakeHit.png":"images/mack/TakeHit.png","../../images/mack/Death.png":"images/mack/Death.png"}],"images/kenji/Attack1.png":[function(require,module,exports) {
module.exports = "./Attack1.1a39cacf.png";
},{}],"images/kenji/Idle.png":[function(require,module,exports) {
module.exports = "./Idle.f837a079.png";
},{}],"images/kenji/Run.png":[function(require,module,exports) {
module.exports = "./Run.f39b5803.png";
},{}],"images/kenji/Jump.png":[function(require,module,exports) {
module.exports = "./Jump.0301a2ea.png";
},{}],"images/kenji/Fall.png":[function(require,module,exports) {
module.exports = "./Fall.0b6854f8.png";
},{}],"images/kenji/TakeHit.png":[function(require,module,exports) {
module.exports = "./TakeHit.4c5b9662.png";
},{}],"images/kenji/Death.png":[function(require,module,exports) {
module.exports = "./Death.4f1c2ce2.png";
},{}],"src/Fighters/KenjiFighter.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kenjiFighter = void 0;
var Sprite_1 = require("../Sprite");
var Fighter_1 = require("../Fighter");
var Attack1_png_1 = __importDefault(require("../../images/kenji/Attack1.png"));
var Idle_png_1 = __importDefault(require("../../images/kenji/Idle.png"));
var Run_png_1 = __importDefault(require("../../images/kenji/Run.png"));
var Jump_png_1 = __importDefault(require("../../images/kenji/Jump.png"));
var Fall_png_1 = __importDefault(require("../../images/kenji/Fall.png"));
var TakeHit_png_1 = __importDefault(require("../../images/kenji/TakeHit.png"));
var Death_png_1 = __importDefault(require("../../images/kenji/Death.png"));
var kenjiData = {
  position: {
    x: 750,
    y: 335
  },
  velocity: {
    x: 0,
    y: 0
  },
  imgSrc: Idle_png_1.default,
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 170
  },
  attackFrame: 1,
  fighterNum: 2,
  name: 'Kenji',
  sprites: {
    idle: new Sprite_1.Sprite({
      imgSrc: Idle_png_1.default,
      framesMax: 4
    }),
    run: new Sprite_1.Sprite({
      imgSrc: Run_png_1.default,
      framesMax: 8
    }),
    jump: new Sprite_1.Sprite({
      imgSrc: Jump_png_1.default,
      framesMax: 2
    }),
    fall: new Sprite_1.Sprite({
      imgSrc: Fall_png_1.default,
      framesMax: 2
    }),
    attack1: new Sprite_1.Sprite({
      imgSrc: Attack1_png_1.default,
      framesMax: 4
    }),
    takeHit: new Sprite_1.Sprite({
      imgSrc: TakeHit_png_1.default,
      framesMax: 3
    }),
    death: new Sprite_1.Sprite({
      imgSrc: Death_png_1.default,
      framesMax: 7
    })
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }
};
exports.kenjiFighter = new Fighter_1.Fighter(kenjiData);
},{"../Sprite":"src/Sprite.ts","../Fighter":"src/Fighter.ts","../../images/kenji/Attack1.png":"images/kenji/Attack1.png","../../images/kenji/Idle.png":"images/kenji/Idle.png","../../images/kenji/Run.png":"images/kenji/Run.png","../../images/kenji/Jump.png":"images/kenji/Jump.png","../../images/kenji/Fall.png":"images/kenji/Fall.png","../../images/kenji/TakeHit.png":"images/kenji/TakeHit.png","../../images/kenji/Death.png":"images/kenji/Death.png"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Sprite_1 = require("./Sprite");
var Drawer_1 = require("./Drawer");
var Game_1 = require("./Game");
var Control_1 = require("./Control");
var background_png_1 = __importDefault(require("../images/background.png"));
var shop_png_1 = __importDefault(require("../images/shop.png"));
var MackFighter_1 = require("./Fighters/MackFighter");
var KenjiFighter_1 = require("./Fighters/KenjiFighter");
var drawer = Drawer_1.Drawer.init();
var shop = new Sprite_1.Sprite({
  position: {
    x: 650,
    y: 225
  },
  imgSrc: shop_png_1.default,
  scale: 2,
  framesMax: 6
});
var background = new Sprite_1.Sprite({
  imgSrc: background_png_1.default
});
var sprites = [background, shop];
new Control_1.Control(MackFighter_1.mackFighter, {
  left: 'a',
  right: 'd',
  up: 'w',
  attack: ' '
});
new Control_1.Control(KenjiFighter_1.kenjiFighter, {
  left: 'ArrowLeft',
  right: 'ArrowRight',
  up: 'ArrowUp',
  attack: 'ArrowDown'
});
var game = new Game_1.Game({
  firstFighter: MackFighter_1.mackFighter,
  secondFighter: KenjiFighter_1.kenjiFighter,
  sprites: sprites,
  drawer: drawer
});
game.animate();
},{"./Sprite":"src/Sprite.ts","./Drawer":"src/Drawer.ts","./Game":"src/Game.ts","./Control":"src/Control.ts","../images/background.png":"images/background.png","../images/shop.png":"images/shop.png","./Fighters/MackFighter":"src/Fighters/MackFighter.ts","./Fighters/KenjiFighter":"src/Fighters/KenjiFighter.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57401" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map