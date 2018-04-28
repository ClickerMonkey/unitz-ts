(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Unitz", [], factory);
	else if(typeof exports === 'object')
		exports["Unitz"] = factory();
	else
		root["Unitz"] = factory();
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/Plurality.ts

var Plurality;
(function (Plurality) {
    Plurality[Plurality["SINGULAR"] = 0] = "SINGULAR";
    Plurality[Plurality["PLURAL"] = 1] = "PLURAL";
    Plurality[Plurality["EITHER"] = 2] = "EITHER";
})(Plurality = Plurality || (Plurality = {}));

// CONCATENATED MODULE: ./src/System.ts

var System;
(function (System) {
    System[System["METRIC"] = 0] = "METRIC";
    System[System["IMPERIAL"] = 1] = "IMPERIAL";
    System[System["NONE"] = 2] = "NONE";
    System[System["ANY"] = 3] = "ANY";
    System[System["GIVEN"] = 4] = "GIVEN";
})(System = System || (System = {}));

// CONCATENATED MODULE: ./src/Functions.ts

var Functions = (function () {
    function Functions() {
    }
    Functions.isZero = function (x) {
        return this.abs(x) < this.EPSILON;
    };
    Functions.isEqual = function (a, b) {
        return this.abs(a - b) < this.EPSILON;
    };
    Functions.isWhole = function (x) {
        return this.abs(Math.floor(x) - x) < this.EPSILON;
    };
    Functions.isSingular = function (x) {
        return this.isNumber(x) && this.abs(this.abs(x) - 1) < this.EPSILON;
    };
    Functions.isPlural = function (x) {
        return x !== 1 && x !== -1;
    };
    Functions.isNumber = function (x) {
        return isFinite(x);
    };
    Functions.trim = function (x) {
        return x ? x.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') : x;
    };
    Functions.gcd = function (a, b) {
        if (!this.isWhole(a) || !this.isWhole(b)) {
            return 1;
        }
        var x = a < b ? a : b;
        var y = a < b ? b : a;
        x = this.abs(x);
        y = this.abs(y);
        while (y) {
            var t = y;
            y = x % y;
            x = t;
        }
        return x;
    };
    Functions.abs = function (x) {
        return x < 0 ? -x : x;
    };
    Functions.sign = function (x) {
        return x < 0 ? -1 : (x === 0 ? 0 : 1);
    };
    Functions.appendTo = function (array, input) {
        if (input instanceof Array) {
            array.push.apply(array, input);
        }
        else if (input) {
            array.push(input);
        }
        return array;
    };
    Functions.isGroupDefinition = function (input) {
        return !!(input && input.system && input.unit && input.denominators && input.units);
    };
    Functions.isValueDefinition = function (input) {
        return !!(input && (input.value || input.unit || input.num || input.den));
    };
    Functions.isRangeDefinition = function (input) {
        return !!(input && input.min && input.max);
    };
    Functions.isArray = function (input) {
        return input instanceof Array;
    };
    Functions.isString = function (input) {
        return typeof (input) === 'string';
    };
    Functions.isDefined = function (input) {
        return typeof (input) !== 'undefined';
    };
    Functions.coalesce = function (a, b) {
        return this.isDefined(a) ? a : b;
    };
    Functions.EPSILON = 0.00001;
    return Functions;
}());


// CONCATENATED MODULE: ./src/Value.ts


var Value_Value = (function () {
    function Value(value, num, den, unit, group) {
        var divisor = Functions.gcd(num, den);
        this.value = value;
        this.num = num / divisor;
        this.den = den / divisor;
        this.unit = unit;
        this.group = group;
    }
    Object.defineProperty(Value.prototype, "isValid", {
        get: function () {
            return isFinite(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "isFraction", {
        get: function () {
            return this.den !== 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "isDecimal", {
        get: function () {
            return this.den === 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "scaled", {
        get: function () {
            return this.group ? this.value * this.group.baseScale : this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "classScaled", {
        get: function () {
            return this.group ? this.value * this.group.classScale : this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "actual", {
        get: function () {
            return this.num / this.den;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "mixedWhole", {
        get: function () {
            return this.den !== 1 ? Math.floor(this.num / this.den) : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "mixedNum", {
        get: function () {
            return this.den !== 1 ? this.num % this.den : this.num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "floor", {
        get: function () {
            return Math.floor(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "ceil", {
        get: function () {
            return Math.ceil(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "truncate", {
        get: function () {
            return this.value < 0 ? this.ceil : this.floor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "remainder", {
        get: function () {
            return this.value - this.floor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "error", {
        get: function () {
            return this.actual - this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "distance", {
        get: function () {
            return Functions.abs(this.error);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "asString", {
        get: function () {
            return (this.den === 1) ?
                (this.value + '') :
                (this.mixedWhole !== 0 ?
                    (this.mixedWhole + Value.SEPARATOR_MIXED + this.mixedNum + Value.SEPARATOR_FRACTION + this.den) :
                    (this.num + Value.SEPARATOR_FRACTION + this.den));
        },
        enumerable: true,
        configurable: true
    });
    Value.prototype.preferred = function () {
        return this.group ? new Value(this.value, this.num, this.den, this.group.preferredUnit, this.group) : this;
    };
    Value.prototype.copy = function () {
        return new Value(this.value, this.num, this.den, this.unit, this.group);
    };
    Value.prototype.zero = function () {
        return new Value(0, 0, 1, this.unit, this.group);
    };
    Value.prototype.truncated = function () {
        return new Value(this.truncate, this.truncate, 1, this.unit, this.group);
    };
    Value.prototype.fractioned = function () {
        if (this.isFraction) {
            return this;
        }
        if (this.group) {
            return Value.fromNumberWithDenominators(this.value, this.group.denominators, this.unit, this.group);
        }
        return this;
    };
    Value.prototype.numbered = function () {
        if (this.isFraction) {
            return new Value(this.value, this.value, 1, this.unit, this.group);
        }
        return this;
    };
    Value.prototype.convertTo = function (to) {
        var group = this.group;
        return group ? group.parent.convert(this.value, group, to) : this.value;
    };
    Value.prototype.convertToValue = function (group) {
        return Value.fromNumberForGroup(this.convertTo(group), group);
    };
    Value.prototype.conversions = function (transform, reverse, callback) {
        var _this = this;
        if (this.group) {
            this.group.matches(transform, reverse, function (group, index) {
                callback(_this.convertToValue(group), index);
            });
        }
    };
    Value.prototype.normalize = function (transform, forOutput) {
        var closest;
        var closestString;
        this.conversions(transform, false, function (convert) {
            var acceptable = !forOutput.isNumber(convert);
            if (!acceptable) {
                var number = forOutput.number(convert.value);
                acceptable = number !== '0';
            }
            if (acceptable) {
                var convertString = forOutput.value(convert);
                if (!closest || convertString.length <= closestString.length) {
                    closest = convert;
                    closestString = convertString;
                }
            }
        });
        return closest || this;
    };
    Value.prototype.add = function (addend, scale) {
        if (scale === void 0) { scale = 1; }
        var num = this.num * addend.den + addend.num * this.den * scale;
        var den = this.den * addend.den;
        var result = this.value + addend.value * scale;
        return new Value(result, num, den, this.unit, this.group);
    };
    Value.prototype.sub = function (subtrahend, scale) {
        if (scale === void 0) { scale = 1; }
        var num = this.num * subtrahend.den - subtrahend.num * this.den * scale;
        var den = this.den * subtrahend.den;
        var result = this.value - subtrahend.value * scale;
        return new Value(result, num, den, this.unit, this.group);
    };
    Value.prototype.mul = function (scale) {
        return new Value(this.value * scale, this.num * scale, this.den, this.unit, this.group);
    };
    Value.fromNumber = function (value, unit, group) {
        if (unit === void 0) { unit = ''; }
        if (group === void 0) { group = null; }
        return new Value(value, value, 1, unit, group);
    };
    Value.fromNumberWithRange = function (value, unit, group, minDen, maxDen) {
        if (unit === void 0) { unit = ''; }
        if (group === void 0) { group = null; }
        if (minDen === void 0) { minDen = 1; }
        if (maxDen === void 0) { maxDen = 100; }
        var closestDenominator = 0;
        var closestDistance = -1;
        for (var i = minDen; i <= maxDen; i++) {
            var den = i;
            var num = Math.floor(den * value);
            var actual = num / den;
            var distance = Functions.abs(value - actual);
            if (closestDistance === -1 || distance < closestDistance) {
                closestDistance = distance;
                closestDenominator = den;
            }
        }
        if (closestDistance > Functions.EPSILON) {
            return new Value(value, value, 1, unit, group);
        }
        if (closestDenominator === 0) {
            closestDenominator = 1;
        }
        return new Value(value, Math.floor(value * closestDenominator), closestDenominator, unit, group);
    };
    Value.fromNumberForGroup = function (value, group) {
        return this.fromNumberWithDenominators(value, group.denominators, group.preferredUnit, group);
    };
    Value.fromNumberWithDenominators = function (value, denominators, unit, group) {
        if (unit === void 0) { unit = ''; }
        if (group === void 0) { group = null; }
        var closestDenominator = 0;
        var closestDistance = -1;
        for (var i = 0; i < denominators.length; i++) {
            var den = denominators[i];
            var num = Math.floor(den * value);
            var actual = num / den;
            var distance = Functions.abs(value - actual);
            if (closestDistance === -1 || distance < closestDistance) {
                closestDistance = distance;
                closestDenominator = den;
            }
        }
        if (closestDistance > Functions.EPSILON) {
            return new Value(value, value, 1, unit, group);
        }
        if (closestDenominator === 0) {
            closestDenominator = 1;
        }
        return new Value(value, Math.floor(value * closestDenominator), closestDenominator, unit, group);
    };
    Value.fromFraction = function (num, den, unit, group) {
        if (unit === void 0) { unit = ''; }
        if (group === void 0) { group = null; }
        return new Value(num / den, num, den, unit, group);
    };
    Value.INVALID = new Value(Number.NaN, Number.NaN, 1, '', null);
    Value.SEPARATOR_FRACTION = '/';
    Value.SEPARATOR_MIXED = ' ';
    return Value;
}());


// CONCATENATED MODULE: ./src/Range.ts


var Range_Range = (function () {
    function Range(min, max) {
        this.min = min.value < max.value ? min : max;
        this.max = max.value > min.value ? max : min;
    }
    Object.defineProperty(Range.prototype, "isValid", {
        get: function () {
            return this.min.isValid && this.max.isValid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "isFraction", {
        get: function () {
            return this.min.isFraction || this.max.isFraction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "isDecimal", {
        get: function () {
            return this.min.isDecimal && this.max.isDecimal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "isRange", {
        get: function () {
            return this.min.value !== this.max.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "isFixed", {
        get: function () {
            return this.min.value === this.max.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "average", {
        get: function () {
            return (this.min.value + this.max.value) * 0.5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "value", {
        get: function () {
            return this.min.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "minimum", {
        get: function () {
            return this.min.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "maximum", {
        get: function () {
            return this.max.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "unit", {
        get: function () {
            return this.min.group.unit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "asString", {
        get: function () {
            return (this.min.value === this.max.value) ?
                (this.min.asString) :
                (this.min.asString + Range.SEPARATOR + this.max.asString);
        },
        enumerable: true,
        configurable: true
    });
    Range.prototype.isMatch = function (range) {
        return this.min.group === range.min.group &&
            this.max.group === range.max.group;
    };
    Range.prototype.preferred = function () {
        var min = this.min.preferred();
        var max = this.max.preferred();
        return new Range(min, max);
    };
    Range.prototype.positive = function () {
        var minNegative = this.min.value < 0;
        var maxNegative = this.max.value < 0;
        if (maxNegative) {
            return null;
        }
        var min = minNegative ? this.min.zero() : this.min.copy();
        var max = this.max.copy();
        return new Range(min, max);
    };
    Range.prototype.negative = function () {
        var minPositive = this.min.value >= 0;
        var maxPositive = this.max.value >= 0;
        if (minPositive) {
            return null;
        }
        var min = this.min.copy();
        var max = maxPositive ? this.max.zero() : this.max.copy();
        return new Range(min, max);
    };
    Range.prototype.nonzero = function () {
        var minZero = this.min.value === 0;
        var maxZero = this.max.value === 0;
        if (minZero && maxZero) {
            return null;
        }
        var min = this.min.copy();
        var max = this.max.copy();
        return new Range(min, max);
    };
    Range.prototype.maxd = function () {
        var fixed = this.max.copy();
        return new Range(fixed, fixed);
    };
    Range.prototype.mind = function () {
        var fixed = this.min.copy();
        return new Range(fixed, fixed);
    };
    Range.prototype.normalize = function (transform, forOutput) {
        var min = this.min.normalize(transform, forOutput);
        var max = this.max.normalize(transform, forOutput);
        return new Range(min, max);
    };
    Range.prototype.add = function (addend, scale) {
        if (scale === void 0) { scale = 1; }
        var min = this.min.add(addend.min, scale);
        var max = this.max.add(addend.max, scale);
        return new Range(min, max);
    };
    Range.prototype.sub = function (subtrahend, scale) {
        if (scale === void 0) { scale = 1; }
        var min = this.min.sub(subtrahend.min, scale);
        var max = this.max.sub(subtrahend.max, scale);
        return new Range(min, max);
    };
    Range.prototype.mul = function (scale) {
        var min = this.min.mul(scale);
        var max = this.max.mul(scale);
        return new Range(min, max);
    };
    Range.prototype.fractioned = function () {
        if (this.min.isFraction && this.max.isFraction) {
            return this;
        }
        var min = this.min.fractioned();
        var max = this.max.fractioned();
        return new Range(min, max);
    };
    Range.prototype.numbered = function () {
        if (!this.min.isFraction && !this.max.isFraction) {
            return this;
        }
        var min = this.min.numbered();
        var max = this.max.numbered();
        return new Range(min, max);
    };
    Range.fromFixed = function (fixed) {
        return new Range(fixed, fixed);
    };
    Range.INVALID = new Range(Value_Value.INVALID, Value_Value.INVALID);
    Range.SEPARATOR = ' - ';
    return Range;
}());


// CONCATENATED MODULE: ./src/Group.ts



var Group_Group = (function () {
    function Group(definition, parent) {
        this.baseScale = 1;
        this.classScale = 0;
        this.dynamic = false;
        this.system = definition.system;
        this.common = !!definition.common;
        this.unit = definition.unit;
        this.baseUnit = definition.baseUnit;
        this.preferredUnit = definition.preferredUnit || definition.unit;
        this.relativeUnit = definition.relativeUnit;
        this.relativeScale = definition.relativeScale || 1;
        this.units = definition.units;
        this.denominators = definition.denominators;
        this.parent = parent;
        this.updateUnits();
    }
    Object.defineProperty(Group.prototype, "isBase", {
        get: function () {
            return this.unit === this.baseUnit;
        },
        enumerable: true,
        configurable: true
    });
    Group.prototype.setDynamic = function (dynamic) {
        if (dynamic === void 0) { dynamic = true; }
        this.dynamic = dynamic;
        return this;
    };
    Group.prototype.addUnits = function (units) {
        var parent = this.parent;
        for (var unit in units) {
            this.units[unit] = units[unit];
            parent.addGroupUnit(unit, this);
        }
        this.updateUnits();
        return this;
    };
    Group.prototype.removeUnits = function (units) {
        var parent = this.parent;
        var existing = this.units;
        for (var i = 0; i < units.length; i++) {
            var unit = units[i];
            if (unit in existing) {
                delete existing[unit];
                parent.removeGroupUnit(unit, this);
            }
        }
        return this;
    };
    Group.prototype.addDenominator = function (denominators) {
        Functions.appendTo(this.denominators, denominators);
        return this;
    };
    Group.prototype.setDenominators = function (denominators) {
        this.denominators = denominators;
        return this;
    };
    Group.prototype.setCommon = function (common) {
        if (common === void 0) { common = true; }
        this.common = common;
        return this;
    };
    Group.prototype.setPreferred = function (unit) {
        this.preferredUnit = unit;
        return this;
    };
    Group.prototype.updateUnits = function () {
        this.singularShort = null;
        this.singularLong = null;
        this.pluralShort = null;
        this.pluralLong = null;
        for (var unit in this.units) {
            var plurality = this.units[unit];
            if (plurality !== Plurality.PLURAL) {
                if (!this.singularShort || unit.length < this.singularShort.length) {
                    this.singularShort = unit;
                }
                if (!this.singularLong || unit.length > this.singularLong.length) {
                    this.singularLong = unit;
                }
            }
            if (plurality !== Plurality.SINGULAR) {
                if (!this.pluralShort || unit.length < this.pluralShort.length) {
                    this.pluralShort = unit;
                }
                if (!this.pluralLong || unit.length > this.pluralLong.length) {
                    this.pluralLong = unit;
                }
            }
        }
        return this;
    };
    Group.prototype.getPluralLong = function () {
        return this.pluralLong;
    };
    Group.prototype.getPluralShort = function () {
        return this.pluralShort;
    };
    Group.prototype.getSingularLong = function () {
        return this.singularLong;
    };
    Group.prototype.getSingularShort = function () {
        return this.singularShort;
    };
    Group.prototype.matches = function (transform, reverse, callback) {
        if (this.parent) {
            this.parent.getVisibleGroups(transform, reverse, this, callback);
        }
    };
    return Group;
}());


// CONCATENATED MODULE: ./src/Class.ts


var Class_Class = (function () {
    function Class(name, groups) {
        this.name = name;
        this.groupMap = {};
        this.groups = [];
        this.converters = {};
        if (groups) {
            this.addGroups(groups);
        }
    }
    Class.prototype.addGroups = function (definitions) {
        for (var i = 0; i < definitions.length; i++) {
            this.addGroup(definitions[i]);
        }
        return this;
    };
    Class.prototype.addGroup = function (definition) {
        var group = new Group_Group(definition, this);
        var relativeUnit = group.relativeUnit, relativeScale = group.relativeScale, units = group.units;
        if (relativeUnit) {
            var relative = this.groupMap[relativeUnit];
            group.baseScale = relativeScale * relative.baseScale;
            group.baseUnit = relative.baseUnit;
        }
        for (var alias in units) {
            this.addGroupUnit(alias, group);
        }
        this.groups.push(group);
        return group;
    };
    Class.prototype.addGroupUnit = function (unit, group) {
        var lower = unit.toLowerCase();
        this.groupMap[unit] = group;
        if (!this.groupMap[lower]) {
            this.groupMap[lower] = group;
        }
        return this;
    };
    Class.prototype.removeGroupUnit = function (unit, group) {
        var lower = unit.toLowerCase();
        if (this.groupMap[unit] === group) {
            delete this.groupMap[unit];
        }
        if (this.groupMap[lower] === group) {
            delete this.groupMap[lower];
        }
        return this;
    };
    Class.prototype.getFirstBase = function () {
        var groups = this.groups;
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            if (group.unit === group.baseUnit) {
                return group;
            }
        }
        return null;
    };
    Class.prototype.setClassScales = function () {
        var groups = this.groups;
        var first = this.getFirstBase();
        if (first) {
            for (var i = 0; i < groups.length; i++) {
                var group = groups[i];
                if (group.baseUnit === first.baseUnit) {
                    group.classScale = group.baseScale;
                }
                else if (group.baseUnit in this.converters) {
                    group.classScale = this.converters[group.baseUnit][first.baseUnit](group.baseScale);
                }
            }
        }
        return this;
    };
    Class.prototype.setBaseConversion = function (fromUnit, toUnit, converter) {
        var converters = this.converters;
        converters[fromUnit] = converters[fromUnit] || {};
        converters[fromUnit][toUnit] = converter;
        return this;
    };
    Class.prototype.getVisibleGroups = function (transform, reverse, relatedGroup, callback) {
        var groups = this.groups;
        var matched = 0;
        var start = reverse ? groups.length - 1 : 0;
        var stop = reverse ? -1 : groups.length;
        var increment = reverse ? -1 : 1;
        for (var i = start; i !== stop; i += increment) {
            var group = groups[i];
            if (transform.isVisibleGroup(group, relatedGroup)) {
                var result = callback(group, matched++);
                if (result === false) {
                    break;
                }
            }
        }
    };
    Class.prototype.convert = function (value, from, to) {
        if (from === to || !from || !to) {
            return value;
        }
        var converted = value * from.baseScale;
        if (from.baseUnit !== to.baseUnit) {
            var map = this.converters[from.baseUnit];
            if (!map || !map[to.baseUnit]) {
                return 0;
            }
            var converter = map[to.baseUnit];
            converted = converter(converted);
        }
        return converted / to.baseScale;
    };
    return Class;
}());


// CONCATENATED MODULE: ./src/Output.ts


var OutputUnit;
(function (OutputUnit) {
    OutputUnit[OutputUnit["NONE"] = 0] = "NONE";
    OutputUnit[OutputUnit["GIVEN"] = 1] = "GIVEN";
    OutputUnit[OutputUnit["SHORT"] = 2] = "SHORT";
    OutputUnit[OutputUnit["LONG"] = 3] = "LONG";
})(OutputUnit = OutputUnit || (OutputUnit = {}));
var OutputFormat;
(function (OutputFormat) {
    OutputFormat[OutputFormat["GIVEN"] = 0] = "GIVEN";
    OutputFormat[OutputFormat["NUMBER"] = 1] = "NUMBER";
    OutputFormat[OutputFormat["MIXED"] = 2] = "MIXED";
    OutputFormat[OutputFormat["FRACTION"] = 3] = "FRACTION";
    OutputFormat[OutputFormat["IMPROPER"] = 4] = "IMPROPER";
})(OutputFormat = OutputFormat || (OutputFormat = {}));
var Output_Output = (function () {
    function Output(input) {
        this.unit = OutputUnit.GIVEN;
        this.format = OutputFormat.GIVEN;
        this.repeatUnit = false;
        this.unitSpacer = '';
        this.rangeSpacer = ' - ';
        this.fractionSpacer = '/';
        this.mixedSpacer = ' ';
        this.delimiter = ', ';
        this.significant = -1;
        if (Functions.isDefined(input)) {
            this.set(input);
        }
    }
    Output.prototype.set = function (input) {
        this.unit = Functions.coalesce(input.unit, this.unit);
        this.format = Functions.coalesce(input.format, this.format);
        this.repeatUnit = Functions.coalesce(input.repeatUnit, this.repeatUnit);
        this.unitSpacer = Functions.coalesce(input.unitSpacer, this.unitSpacer);
        this.rangeSpacer = Functions.coalesce(input.rangeSpacer, this.rangeSpacer);
        this.fractionSpacer = Functions.coalesce(input.fractionSpacer, this.fractionSpacer);
        this.mixedSpacer = Functions.coalesce(input.mixedSpacer, this.mixedSpacer);
        this.delimiter = Functions.coalesce(input.delimiter, this.delimiter);
        this.significant = Functions.coalesce(input.significant, this.significant);
        return this;
    };
    Output.prototype.extend = function (input) {
        var extended = this;
        if (Functions.isDefined(input)) {
            if (input instanceof Output) {
                extended = input;
            }
            else {
                extended = new Output(this);
                extended.set(input);
            }
        }
        return extended;
    };
    Output.prototype.ranges = function (ranges) {
        var out = '';
        for (var i = 0; i < ranges.length; i++) {
            var range = ranges[i];
            if (range.isValid) {
                if (out.length) {
                    out += this.delimiter;
                }
                out += this.range(range);
            }
        }
        return out;
    };
    Output.prototype.range = function (range) {
        var out = '';
        if (!range.isValid) {
            // nothing
        }
        else if (range.isFixed) {
            out += this.value(range.min);
        }
        else {
            var minUnit = this.repeatUnit || range.min.unit !== range.max.unit;
            out += this.value(range.min, minUnit);
            out += this.rangeSpacer;
            out += this.value(range.max);
        }
        return out;
    };
    Output.prototype.value = function (value, showUnit) {
        if (showUnit === void 0) { showUnit = true; }
        var out = '';
        if (!value.isValid) {
        }
        else if (this.isFraction(value)) {
            if (this.isMixed(value)) {
                out += value.mixedWhole;
                out += this.mixedSpacer;
                out += value.mixedNum;
                out += this.fractionSpacer;
                out += value.den;
            }
            else {
                out += value.num;
                out += this.fractionSpacer;
                out += value.den;
            }
        }
        else {
            out += this.number(value.value);
        }
        if (value.isValid && this.unit !== OutputUnit.NONE && showUnit) {
            var group = value.group;
            out += this.unitSpacer;
            if (this.isLongUnit(value)) {
                out += Functions.isSingular(value.value) ? group.getSingularLong() : group.getPluralLong();
            }
            else if (this.isShortUnit(value) || (group && group.dynamic)) {
                out += Functions.isSingular(value.value) ? group.getSingularShort() : group.getPluralShort();
            }
            else {
                out += value.unit;
            }
        }
        return out;
    };
    Output.prototype.number = function (x) {
        var valueString = x + '';
        if (this.significant >= 0 && valueString !== '0') {
            var valueSignificant = x
                .toFixed(this.significant)
                .replace(/0*$/, '')
                .replace(/\.$/, '');
            return valueSignificant.length < valueString.length ? valueSignificant : valueString;
        }
        return valueString;
    };
    Output.prototype.isFraction = function (value) {
        return value.isFraction && this.format !== OutputFormat.NUMBER;
    };
    Output.prototype.isNumber = function (value) {
        return value.isValid && !this.isFraction(value);
    };
    Output.prototype.isMixed = function (value) {
        return value.mixedWhole !== 0 && this.format !== OutputFormat.IMPROPER;
    };
    Output.prototype.isShortUnit = function (value) {
        return value.group && this.unit === OutputUnit.SHORT;
    };
    Output.prototype.isLongUnit = function (value) {
        return value.group && this.unit === OutputUnit.LONG;
    };
    return Output;
}());


// CONCATENATED MODULE: ./src/Transform.ts



var Transform_Transform = (function () {
    function Transform(input) {
        this.common = true;
        this.system = System.GIVEN;
        this.min = -Number.MAX_VALUE;
        this.max = Number.MAX_VALUE;
        this.convertWithMax = true;
        this.groupless = true;
        if (Functions.isDefined(input)) {
            this.set(input);
        }
    }
    Transform.prototype.set = function (input) {
        this.common = Functions.coalesce(input.common, this.common);
        this.system = Functions.coalesce(input.system, this.system);
        this.min = Functions.coalesce(input.min, this.min);
        this.max = Functions.coalesce(input.max, this.max);
        this.groupless = Functions.coalesce(input.groupless, this.groupless);
        this.convertWithMax = Functions.coalesce(input.convertWithMax, this.convertWithMax);
        this.onlyUnits = Functions.coalesce(input.onlyUnits, this.onlyUnits);
        this.notUnits = Functions.coalesce(input.notUnits, this.notUnits);
        this.onlyClasses = Functions.coalesce(input.onlyClasses, this.onlyClasses);
        this.notClasses = Functions.coalesce(input.notClasses, this.notClasses);
        return this;
    };
    Transform.prototype.extend = function (input) {
        var extended = this;
        if (Functions.isDefined(input)) {
            if (input instanceof Transform) {
                extended = input;
            }
            else {
                extended = new Transform(this);
                extended.set(input);
            }
        }
        return extended;
    };
    Transform.prototype.isVisibleGroup = function (group, givenGroup) {
        return this.isCommonMatch(group) &&
            this.isSystemMatch(group, givenGroup) &&
            this.isUnitMatch(group) &&
            this.isClassMatch(group.parent);
    };
    Transform.prototype.isCommonMatch = function (group) {
        return !this.common || group.common;
    };
    Transform.prototype.isSystemMatch = function (group, givenGroup) {
        switch (this.system) {
            case System.METRIC:
                return group.system === System.METRIC || group.system === System.ANY;
            case System.IMPERIAL:
                return group.system === System.IMPERIAL || group.system === System.ANY;
            case System.NONE:
                return false;
            case System.ANY:
                return true;
            case System.GIVEN:
                return !givenGroup || group.baseUnit === givenGroup.baseUnit;
        }
        return false;
    };
    Transform.prototype.isClassMatch = function (parent) {
        if (this.onlyClasses) {
            return this.onlyClasses.indexOf(parent.name) !== -1;
        }
        if (this.notClasses) {
            return this.notClasses.indexOf(parent.name) === -1;
        }
        return true;
    };
    Transform.prototype.isUnitMatch = function (group) {
        if (this.onlyUnits) {
            return this.onlyUnits.indexOf(group.unit) !== -1;
        }
        if (this.notUnits) {
            return this.notUnits.indexOf(group.unit) === -1;
        }
        return true;
    };
    return Transform;
}());


// CONCATENATED MODULE: ./src/Sort.ts


var SortType;
(function (SortType) {
    SortType[SortType["MIN"] = 0] = "MIN";
    SortType[SortType["MAX"] = 1] = "MAX";
    SortType[SortType["AVERAGE"] = 2] = "AVERAGE";
})(SortType = SortType || (SortType = {}));
var Sort_Sort = (function () {
    function Sort(input) {
        this.ascending = false;
        this.type = SortType.MAX;
        this.classes = {};
        if (Functions.isDefined(input)) {
            this.set(input);
        }
    }
    Sort.prototype.set = function (input) {
        this.ascending = Functions.coalesce(input.ascending, this.ascending);
        this.type = Functions.coalesce(input.type, this.type);
        if (Functions.isDefined(input.classes)) {
            for (var className in input.classes) {
                this.classes[className] = input.classes[className];
            }
        }
        return this;
    };
    Sort.prototype.extend = function (input) {
        var extended = this;
        if (Functions.isDefined(input)) {
            if (input instanceof Sort) {
                extended = input;
            }
            else {
                extended = new Sort(this);
                extended.set(input);
            }
        }
        return extended;
    };
    Sort.prototype.getSorter = function () {
        var _this = this;
        return function (a, b) {
            var d = _this.getClassComparison(a, b);
            if (d === 0) {
                switch (_this.type) {
                    case SortType.MIN:
                        d = _this.getMinComparison(a, b);
                        break;
                    case SortType.MAX:
                        d = _this.getMaxComparison(a, b);
                        break;
                    case SortType.AVERAGE:
                        d = _this.getAverageComparison(a, b);
                        break;
                }
            }
            return _this.ascending ? d : -d;
        };
    };
    Sort.prototype.getMinComparison = function (a, b) {
        return Functions.sign(a.min.classScaled - b.min.classScaled);
    };
    Sort.prototype.getMaxComparison = function (a, b) {
        return Functions.sign(a.max.classScaled - b.max.classScaled);
    };
    Sort.prototype.getAverageComparison = function (a, b) {
        var avg = (a.min.classScaled + a.max.classScaled) * 0.5;
        var bvg = (b.min.classScaled + b.max.classScaled) * 0.5;
        return Functions.sign(avg - bvg);
    };
    Sort.prototype.getClassComparison = function (a, b) {
        var ag = a.min.group ? 1 : -1;
        var bg = b.min.group ? 1 : -1;
        if (ag !== bg) {
            return ag - bg;
        }
        var ac = this.classes[a.min.group.parent.name] || 0;
        var bc = this.classes[b.min.group.parent.name] || 0;
        return ac - bc;
    };
    return Sort;
}());


// CONCATENATED MODULE: ./src/Core.ts







var Core_Core = (function () {
    function Core() {
    }
    Core.getGroup = function (unit) {
        if (!unit) {
            return null;
        }
        var exactGroup = Core.unitToGroup[unit];
        if (exactGroup) {
            return exactGroup;
        }
        var normalizedUnit = unit.toLowerCase();
        var normalizedGroup = Core.unitToGroup[normalizedUnit];
        if (normalizedGroup) {
            return normalizedGroup;
        }
        var dynamicUnit = Core.getDynamicMatch(unit);
        var dynamicGroup = Core.dynamicMatches[dynamicUnit];
        if (dynamicGroup) {
            return Core.addDynamicUnit(unit, dynamicGroup);
        }
        return Core.newDynamicGroup(unit);
    };
    Core.addClass = function (parent) {
        this.classMap[parent.name] = parent;
        this.classes.push(parent);
        var groups = parent.groupMap;
        for (var unit in groups) {
            this.unitToGroup[unit] = groups[unit];
        }
    };
    Core.addClasses = function () {
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        for (var i = 0; i < classes.length; i++) {
            this.addClass(classes[i]);
        }
    };
    Core.addDynamicUnit = function (unit, group) {
        group.units[unit] = Plurality.EITHER;
        var unitCount = 0;
        for (var groupUnit in group.units) {
            if (groupUnit) {
                unitCount++;
            }
        }
        if (unitCount > 1) {
            var longest = void 0;
            for (var groupUnit in group.units) {
                group.units[groupUnit] = Plurality.SINGULAR;
                if (!longest || groupUnit.length > longest.length) {
                    longest = groupUnit;
                }
            }
            if (longest) {
                group.units[longest] = Plurality.PLURAL;
            }
        }
        group.updateUnits();
        this.unitToGroup[unit] = group;
        this.unitToGroup[unit.toLowerCase()] = group;
        this.dynamicMatches[this.getDynamicMatch(unit)] = group;
        return group;
    };
    Core.newDynamicGroup = function (unit) {
        var parent = new Class_Class(unit);
        var group = parent.addGroup({
            system: System.ANY,
            unit: unit,
            common: true,
            baseUnit: unit,
            denominators: [2, 3, 4, 5, 6, 8, 10],
            units: {}
        });
        group.setDynamic();
        this.addDynamicUnit(unit, group);
        this.dynamicGroups.push(group);
        return group;
    };
    Core.getDynamicMatch = function (unit) {
        return unit.substring(0, this.dynamicMatchLength).toLowerCase();
    };
    Core.classMap = {};
    Core.classes = [];
    Core.unitToGroup = {};
    Core.dynamicGroups = [];
    Core.dynamicMatches = {};
    Core.dynamicMatchLength = 3;
    Core.globalOutput = new Output_Output();
    Core.globalTransform = new Transform_Transform();
    Core.globalSort = new Sort_Sort();
    return Core;
}());


// CONCATENATED MODULE: ./src/Base.ts






function uz(input) {
    return new Base_Base(input);
}
var Base_Base = (function () {
    function Base(input, ranges) {
        this.input = input;
        this.ranges = ranges || Parse_Parse.ranges(input, Core_Core.getGroup);
    }
    // 1c, 2.3m SCALE BY 2 = 2c, 4.6m
    Base.prototype.scale = function (amount) {
        return this.mutate(function (r) { return r.mul(amount); });
    };
    // 1c, 3m SCALE TO 1/2c = 1/2c, 1.5m
    Base.prototype.scaleTo = function (unitValue) {
        return this.scale(this.getScaleTo(unitValue));
    };
    // 5 kilograms = 5kg
    Base.prototype.preferred = function () {
        return this.mutate(function (r) { return r.preferred(); });
    };
    // 0c, 2tbsp, -4tbsp = 0c, 2tbsp
    Base.prototype.positive = function () {
        return this.mutate(function (r) { return r.positive(); });
    };
    // 0c, 2tbsp, -4tbsp = -4tbsp
    Base.prototype.negative = function () {
        return this.mutate(function (r) { return r.negative(); });
    };
    // 0c, 2tbsp = 2tbsp
    Base.prototype.nonzero = function () {
        return this.mutate(function (r) { return r.nonzero(); });
    };
    // 1/2, 0.3 = 1/2, 3/10
    Base.prototype.fractions = function () {
        return this.mutate(function (r) { return r.fractioned(); });
    };
    // 1/2, 0.3 = 0.5, 0.3
    Base.prototype.numbers = function () {
        return this.mutate(function (r) { return r.numbered(); });
    };
    // 1 - 3c = 3c
    Base.prototype.max = function () {
        return this.hasRanges ? this.mutate(function (r) { return r.maxd(); }) : this;
    };
    // 1 - 3c = 1c
    Base.prototype.min = function () {
        return this.hasRanges ? this.mutate(function (r) { return r.mind(); }) : this;
    };
    // 1.5pt = 3c
    Base.prototype.normalize = function (options, forOutput) {
        var output = Core_Core.globalOutput.extend(forOutput);
        var transform = Core_Core.globalTransform.extend(options);
        return this.mutate(function (r) { return r.normalize(transform, output); });
    };
    // 1c, 1pt = 1.5pt
    Base.prototype.compact = function (options) {
        var compacted = [];
        var transform = Core_Core.globalTransform.extend(options);
        var _a = this.groupByClass(), classes = _a.classes, groupless = _a.groupless;
        var _loop_1 = function (className) {
            var entry = classes[className];
            var ranges = entry.ranges;
            var parent_1 = entry.parent;
            var minGroupChosen = null;
            var maxGroupChosen = null;
            var minSum = 0;
            var maxSum = 0;
            // If the transformation options ignores this class, skip it.
            if (!transform.isClassMatch(parent_1)) {
                return "continue";
            }
            // Determine the smallest visible group we can use.
            parent_1.getVisibleGroups(transform, false, null, function (group) {
                minGroupChosen = maxGroupChosen = group;
                return false;
            });
            // If we can't find one, then no groups are valid. Skip them.
            if (!minGroupChosen) {
                return "continue";
            }
            // For each range, sum up the minimums and maximums while also determining
            // the largest min & max that should be used to represent the sums.
            for (var i = 0; i < ranges.length; i++) {
                var range = ranges[i];
                var minGroup = range.min.group;
                var maxGroup = range.max.group;
                if (minGroup.classScale > minGroupChosen.classScale && transform.isVisibleGroup(minGroup)) {
                    minSum = parent_1.convert(minSum, minGroupChosen, minGroup);
                    minGroupChosen = minGroup;
                }
                if (maxGroup.classScale > maxGroupChosen.classScale && transform.isVisibleGroup(maxGroup)) {
                    maxSum = parent_1.convert(maxSum, maxGroupChosen, maxGroup);
                    maxGroupChosen = maxGroup;
                }
                minSum += range.min.convertTo(minGroupChosen);
                maxSum += range.max.convertTo(maxGroupChosen);
            }
            var min = Value_Value.fromNumberForGroup(minSum, minGroupChosen);
            var max = Value_Value.fromNumberForGroup(maxSum, maxGroupChosen);
            compacted.push(new Range_Range(min, max));
        };
        for (var className in classes) {
            _loop_1(className);
        }
        // If the transform options permit groupless results and there are ranges
        // without groups - sum them all.
        if (transform.groupless && groupless.length) {
            var minSum = new Value_Value(0, 0, 1, '', null);
            var maxSum = new Value_Value(0, 0, 1, '', null);
            for (var i = 0; i < groupless.length; i++) {
                minSum = minSum.add(groupless[i].min);
                maxSum = maxSum.add(groupless[i].max);
            }
            compacted.push(new Range_Range(minSum, maxSum));
        }
        return new Base(this.input, compacted);
    };
    // 1.5pt = 1c, 1pt
    Base.prototype.expand = function (options) {
        var transform = Core_Core.globalTransform.extend(options);
        var compacted = this.compact(transform);
        var ranges = compacted.ranges;
        var expanded = [];
        var _loop_2 = function (i) {
            var range = ranges[i];
            var value = transform.convertWithMax ? range.max : range.min;
            var valueGroup = value.group;
            if (valueGroup) {
                valueGroup.matches(transform, true, function (group) {
                    if (!Functions.isZero(value.value)) {
                        var transformed = value.convertToValue(group);
                        if (group.isBase) {
                            expanded.push(Range_Range.fromFixed(transformed));
                        }
                        else if (Functions.abs(transformed.value) >= 1) {
                            var truncated = transformed.truncated();
                            var scaled = group.baseScale / valueGroup.baseScale;
                            value = value.sub(truncated, scaled);
                            expanded.push(Range_Range.fromFixed(truncated));
                        }
                    }
                });
            }
            else {
                expanded.push(range);
            }
        };
        for (var i = 0; i < ranges.length; i++) {
            _loop_2(i);
        }
        return new Base(this.input, expanded);
    };
    Base.prototype.add = function (input, scale) {
        if (scale === void 0) { scale = 1; }
        return this.operate(input, function (a, b) {
            return a.add(b, scale);
        });
    };
    Base.prototype.sub = function (input, scale) {
        if (scale === void 0) { scale = 1; }
        return this.operate(input, function (a, b) {
            return a.sub(b, scale);
        });
    };
    Base.prototype.operate = function (input, operate) {
        var ranges = this.ranges;
        var output = [];
        var other = Parse_Parse.base(input);
        var otherRanges = other.ranges;
        var otherUsed = [];
        for (var i = 0; i < ranges.length; i++) {
            var range = ranges[i];
            for (var k = 0; k < otherRanges.length; k++) {
                if (!otherUsed[k]) {
                    var otherRange = otherRanges[k];
                    if (range.isMatch(otherRange)) {
                        range = operate(range, otherRange);
                        otherUsed[k] = true;
                    }
                }
            }
            output.push(range);
        }
        for (var k = 0; k < otherRanges.length; k++) {
            if (!otherUsed[k]) {
                output.push(otherRanges[k]);
            }
        }
        return new Base(this.input, output);
    };
    Base.prototype.conversions = function (options) {
        var transform = Core_Core.globalTransform.extend(options);
        var compacted = this.compact(options);
        var ranges = compacted.ranges;
        var output = [];
        var _loop_3 = function (i) {
            var range = ranges[i];
            var convert = transform.convertWithMax ? range.max : range.min;
            convert.conversions(transform, false, function (transformed) {
                var min = transform.convertWithMax ? range.min.convertToValue(transformed.group) : transformed;
                var max = transform.convertWithMax ? transformed : range.max.convertToValue(transformed.group);
                if (min.value <= transform.max && max.value >= transform.min) {
                    output.push(new Range_Range(min, max));
                }
            });
        };
        for (var i = 0; i < ranges.length; i++) {
            _loop_3(i);
        }
        return new Base(this.input, output);
    };
    Base.prototype.mutate = function (mutator) {
        var ranges = [];
        var source = this.ranges;
        for (var i = 0; i < source.length; i++) {
            var mutated = mutator(source[i]);
            if (mutated) {
                ranges.push(mutated);
            }
        }
        return new Base(this.input, ranges);
    };
    Base.prototype.filter = function (options) {
        var transform = Core_Core.globalTransform.extend(options);
        var ranges = this.ranges;
        var filtered = [];
        for (var i = 0; i < ranges.length; i++) {
            var range = ranges[i];
            var group = transform.convertWithMax ? range.max.group : range.min.group;
            if ((group && transform.isVisibleGroup(group)) || (!group && transform.groupless)) {
                filtered.push(range);
            }
        }
        return new Base(this.input, filtered);
    };
    Base.prototype.sort = function (options) {
        var sort = Core_Core.globalSort.extend(options);
        var ranges = this.ranges.slice();
        ranges.sort(sort.getSorter());
        return new Base(this.input, ranges);
    };
    Base.prototype.groupByClass = function () {
        var ranges = this.ranges;
        var classes = {};
        var groupless = [];
        for (var i = 0; i < ranges.length; i++) {
            var range = ranges[i];
            if (range.min.group) {
                var parent_2 = range.min.group.parent;
                var entry = classes[parent_2.name];
                if (!entry) {
                    entry = classes[parent_2.name] = {
                        parent: parent_2,
                        ranges: []
                    };
                }
                entry.ranges.push(range);
            }
            else {
                groupless.push(range);
            }
        }
        return { classes: classes, groupless: groupless };
    };
    Base.prototype.getScaleTo = function (unitValue) {
        var to = Parse_Parse.value(unitValue, Core_Core.getGroup);
        var converted = this.convert(to.unit);
        var scale = to.value / converted.average;
        return scale;
    };
    Base.prototype.output = function (options) {
        var output = Core_Core.globalOutput.extend(options);
        return output.ranges(this.ranges);
    };
    Base.prototype.convert = function (unit) {
        var group = Core_Core.getGroup(unit);
        if (!group) {
            return null;
        }
        var parent = group.parent;
        var ranges = this.ranges;
        var min = new Value_Value(0, 0, 1, unit, group);
        var max = new Value_Value(0, 0, 1, unit, group);
        for (var i = 0; i < ranges.length; i++) {
            var range = ranges[i];
            var rangeGroup = range.min.group;
            if (rangeGroup && rangeGroup.parent === parent) {
                min = min.add(range.min.convertToValue(group));
                max = max.add(range.max.convertToValue(group));
            }
        }
        return new Range_Range(min, max);
    };
    Base.prototype.classes = function () {
        var ranges = this.ranges;
        var classMap = {};
        var classes = [];
        for (var i = 0; i < ranges.length; i++) {
            var range = ranges[i];
            var group = range.min.group;
            if (group) {
                classMap[group.parent.name] = group.parent;
            }
        }
        for (var className in classMap) {
            classes.push(classMap[className]);
        }
        return classes;
    };
    Object.defineProperty(Base.prototype, "hasRanges", {
        get: function () {
            var ranges = this.ranges;
            for (var i = 0; i < ranges.length; i++) {
                if (ranges[i].isRange) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "isValid", {
        get: function () {
            var ranges = this.ranges;
            for (var i = 0; i < ranges.length; i++) {
                if (!ranges[i].isValid) {
                    return false;
                }
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return Base;
}());


// CONCATENATED MODULE: ./src/Parse.ts





/** The class which takes user input and parses it to specific structures. **/
var Parse_Parse = (function () {
    function Parse() {
    }
    /**
     * Parses user input into a base.
     *
     * @param input The input to parse into a Base.
     */
    Parse.base = function (input) {
        if (input instanceof Base_Base) {
            return input;
        }
        return new Base_Base(input);
    };
    Parse.ranges = function (input, groups) {
        if (Functions.isArray(input)) {
            return this.rangesFromArray(input, groups);
        }
        else if (Functions.isString(input)) {
            return this.rangesFromString(input, groups);
        }
        else if (Functions.isRangeDefinition(input)) {
            return this.rangesFromArray([input], groups);
        }
        else if (Functions.isValueDefinition(input)) {
            return this.rangesFromArray([input], groups);
        }
        return [];
    };
    Parse.rangesFromArray = function (input, groups) {
        var ranges = [];
        for (var i = 0; i < input.length; i++) {
            var range = this.range(input[i], groups);
            ranges.push(range);
        }
        return ranges;
    };
    Parse.rangesFromString = function (input, groups) {
        var ranges = input.split(this.REGEX_LIST);
        return this.rangesFromArray(ranges, groups);
    };
    Parse.range = function (input, groups) {
        if (Functions.isString(input)) {
            return this.rangeFromString(input, groups);
        }
        else if (Functions.isRangeDefinition(input)) {
            var range = input;
            var min = this.value(range.min, groups);
            var max = this.value(range.max, groups);
            return new Range_Range(min, max);
        }
        return Range_Range.INVALID;
    };
    Parse.rangeFromString = function (input, groups) {
        var matches = this.REGEX_RANGE.exec(input);
        if (!matches) {
            var fixed = this.valueFromString(input, groups);
            return new Range_Range(fixed, fixed);
        }
        var minInput = matches[1];
        var maxInput = matches[2];
        var minParsed = this.input(minInput);
        var maxParsed = this.input(maxInput);
        if (!minParsed || !maxParsed) {
            return Range_Range.INVALID;
        }
        var minUnit = minParsed.unit || maxParsed.unit;
        var maxUnit = maxParsed.unit || minParsed.unit;
        var min = this.valueFromResult(minParsed, minUnit, groups);
        var max = this.valueFromResult(maxParsed, maxUnit, groups);
        return new Range_Range(min, max);
    };
    Parse.value = function (input, groups) {
        if (Functions.isString(input)) {
            return this.valueFromString(input, groups);
        }
        else if (Functions.isValueDefinition(input)) {
            return this.valueFromValue(input, groups);
        }
        return Value_Value.INVALID;
    };
    Parse.valueFromValue = function (input, groups) {
        var givenValue = Functions.isDefined(input.value) ? input.value : 1;
        var num = Functions.isDefined(input.num) ? input.num : givenValue;
        var den = Functions.isDefined(input.den) ? input.den : 1;
        var parsedValue = Functions.isDefined(input.value) ? input.value : num / den;
        var unit = input.unit || '';
        var group = groups(unit);
        return new Value_Value(parsedValue, num, den, unit, group);
    };
    Parse.valueFromString = function (input, groups) {
        var parsed = this.input(input);
        return parsed ? this.valueFromResult(parsed, parsed.unit, groups) : Value_Value.INVALID;
    };
    Parse.valueFromResult = function (result, unit, groups) {
        var group = groups(unit);
        return new Value_Value(result.value, result.valueNum, result.valueDen, unit, group);
    };
    /**
     * Possible Values:
     * 1tsp
     * 1 tsp
     * 1/2 tsp
     * 1 1/2 tsp
     * 1 - 2 tsp
     * 1 tsp, 1 cup
     * 2/3 - 1 c, 1 lb, 2.45 cats
     */
    Parse.input = function (input) {
        var matches = this.REGEX_PARSE.exec(input);
        var whole = parseInt(matches[1]);
        var hasWhole = isFinite(whole);
        var sign = matches[1].charAt(0) === '-' ? -1 : 1;
        var num = parseInt(matches[3]);
        var den = parseInt(matches[5]);
        var decimal = matches[6];
        var hasDecimal = isFinite(parseFloat(decimal));
        var unit = Functions.trim(matches[7]);
        if (!hasWhole && hasDecimal) {
            whole = 0;
            hasWhole = true;
        }
        if (!hasWhole && !unit) {
            return null;
        }
        var value = 1;
        var valueDen = 1;
        var valueNum = 1;
        if (hasWhole) {
            value = whole;
            valueNum = whole;
            if (isFinite(den)) {
                valueDen = den;
                if (isFinite(num)) {
                    value += (num / den) * sign;
                    valueNum *= den;
                    valueNum += num;
                }
                else {
                    value /= den;
                }
            }
            else if (hasDecimal) {
                var remainder = parseFloat('0.' + decimal);
                value += remainder * sign;
                valueNum += remainder;
            }
            valueNum *= sign;
        }
        return { value: value, valueNum: valueNum, valueDen: valueDen, num: num, den: den, unit: unit };
    };
    /** The regular expression used to split up a string into multiple ranges. **/
    Parse.REGEX_LIST = /\s*,\s*/;
    /** The regular expression used to split up a range string to determine the min and maximum values. **/
    Parse.REGEX_RANGE = /\s*(-?[^-]+)-(.+)/;
    /** The regular expression used to parse a value number or fraction and possible unit from a string. **/
    Parse.REGEX_PARSE = /^\s*(-?\d*)(\s+(\d+))?(\s*\/\s*(\d+)|\.(\d+)|)\s*(.*)\s*$/i;
    return Parse;
}());


// CONCATENATED MODULE: ./src/classes/Weight.ts




var Weight = new Class_Class('Weight')
    .setBaseConversion('mg', 'oz', function (x) { return x * 0.000035274; })
    .setBaseConversion('oz', 'mg', function (x) { return x * 28349.5; })
    .addGroups([
    {
        system: System.METRIC,
        common: true,
        unit: 'mg',
        baseUnit: 'mg',
        denominators: [2, 10],
        units: {
            'mg': Plurality.EITHER,
            'milligram': Plurality.SINGULAR,
            'milligrams': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        common: true,
        unit: 'g',
        relativeUnit: 'mg',
        relativeScale: 1000,
        denominators: [2, 10, 1000],
        units: {
            'g': Plurality.EITHER,
            'gram': Plurality.SINGULAR,
            'grams': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        common: true,
        unit: 'kg',
        relativeUnit: 'g',
        relativeScale: 1000,
        denominators: [2, 10, 1000],
        units: {
            'kg': Plurality.EITHER,
            'kilogram': Plurality.SINGULAR,
            'kilograms': Plurality.PLURAL
        }
    },
    {
        system: System.IMPERIAL,
        common: true,
        unit: 'oz',
        baseUnit: 'oz',
        denominators: [2, 3, 4, 16],
        units: {
            'oz': Plurality.EITHER,
            'ounce': Plurality.SINGULAR,
            'ounces': Plurality.PLURAL
        }
    },
    {
        system: System.IMPERIAL,
        common: true,
        unit: 'lb',
        relativeUnit: 'oz',
        relativeScale: 16,
        denominators: [2, 3, 4, 16],
        units: {
            'lb': Plurality.EITHER,
            'lbs': Plurality.PLURAL,
            'pound': Plurality.SINGULAR,
            'pounds': Plurality.PLURAL
        }
    },
    {
        system: System.IMPERIAL,
        common: true,
        unit: 'ton',
        relativeUnit: 'lb',
        relativeScale: 2000,
        denominators: [2, 3, 4, 10],
        units: {
            'ton': Plurality.EITHER,
            'tons': Plurality.PLURAL,
            'tonnes': Plurality.PLURAL
        }
    }
])
    .setClassScales();

// CONCATENATED MODULE: ./src/classes/Area.ts




var Area = new Class_Class('Area')
    .setBaseConversion('sqin', 'sqmm', function (x) { return x * 645.16; })
    .setBaseConversion('sqmm', 'sqin', function (x) { return x * 0.00155; })
    .addGroups([
    {
        system: System.IMPERIAL,
        common: true,
        unit: 'sqin',
        baseUnit: 'sqin',
        denominators: [2, 4, 8, 16],
        units: {
            'sqin': Plurality.EITHER,
            'sq. in.': Plurality.EITHER,
            'sq in': Plurality.EITHER,
            'in2': Plurality.EITHER,
            'in^2': Plurality.EITHER,
            'in²': Plurality.EITHER,
            'square inch': Plurality.SINGULAR,
            'square inches': Plurality.PLURAL
        }
    },
    {
        system: System.IMPERIAL,
        common: true,
        unit: 'sqft',
        relativeUnit: 'sqin',
        relativeScale: 12 * 12,
        denominators: [2, 4, 8, 16],
        units: {
            'sqft': Plurality.EITHER,
            'sq. ft.': Plurality.EITHER,
            'sq ft': Plurality.EITHER,
            'ft2': Plurality.EITHER,
            'ft^2': Plurality.EITHER,
            'ft²': Plurality.EITHER,
            'square foot': Plurality.SINGULAR,
            'square feet': Plurality.PLURAL
        }
    },
    {
        system: System.IMPERIAL,
        unit: 'sqyd',
        relativeUnit: 'sqft',
        relativeScale: 3 * 3,
        denominators: [2, 3, 4, 8, 9, 16],
        units: {
            'sqyd': Plurality.EITHER,
            'sq. yd.': Plurality.EITHER,
            'sq yd': Plurality.EITHER,
            'yd2': Plurality.EITHER,
            'yd^2': Plurality.EITHER,
            'yd²': Plurality.EITHER,
            'square yard': Plurality.SINGULAR,
            'square yards': Plurality.PLURAL
        }
    },
    {
        system: System.IMPERIAL,
        common: true,
        unit: 'acre',
        relativeUnit: 'sqyd',
        relativeScale: 4840,
        denominators: [2, 3, 4, 8, 10],
        units: {
            'acre': Plurality.EITHER,
            'acres': Plurality.PLURAL
        }
    },
    {
        system: System.IMPERIAL,
        common: true,
        unit: 'sqmi',
        relativeUnit: 'acre',
        relativeScale: 640,
        denominators: [2, 3, 4, 8, 10],
        units: {
            'sqmi': Plurality.EITHER,
            'sq. mi.': Plurality.EITHER,
            'sq mi': Plurality.EITHER,
            'mi2': Plurality.EITHER,
            'mi^2': Plurality.EITHER,
            'mi²': Plurality.EITHER,
            'square mile': Plurality.SINGULAR,
            'square miles': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        common: true,
        unit: 'sqmm',
        baseUnit: 'sqmm',
        denominators: [2, 4, 8, 16],
        units: {
            'sqmm': Plurality.EITHER,
            'sq. mm.': Plurality.EITHER,
            'sq mm': Plurality.EITHER,
            'mm2': Plurality.EITHER,
            'mm^2': Plurality.EITHER,
            'mm²': Plurality.EITHER,
            'square millimeter': Plurality.SINGULAR,
            'square millimeters': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        common: true,
        unit: 'sqcm',
        relativeUnit: 'sqmm',
        relativeScale: 100,
        denominators: [2, 4, 8, 16],
        units: {
            'sqcm': Plurality.EITHER,
            'sq. cm.': Plurality.EITHER,
            'sq cm': Plurality.EITHER,
            'cm2': Plurality.EITHER,
            'cm^2': Plurality.EITHER,
            'cm²': Plurality.EITHER,
            'square centimeter': Plurality.SINGULAR,
            'square centimeters': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        common: true,
        unit: 'sqm',
        relativeUnit: 'sqcm',
        relativeScale: 10000,
        denominators: [2, 4, 8, 16],
        units: {
            'sqm': Plurality.EITHER,
            'sq. m.': Plurality.EITHER,
            'sq m': Plurality.EITHER,
            'm2': Plurality.EITHER,
            'm^2': Plurality.EITHER,
            'm²': Plurality.EITHER,
            'square meter': Plurality.SINGULAR,
            'square meters': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        common: true,
        unit: 'sqkm',
        relativeUnit: 'sqm',
        relativeScale: 1000000,
        denominators: [2, 4, 8, 16],
        units: {
            'sqkm': Plurality.EITHER,
            'sq. km.': Plurality.EITHER,
            'sq km': Plurality.EITHER,
            'km2': Plurality.EITHER,
            'km^2': Plurality.EITHER,
            'km²': Plurality.EITHER,
            'square kilometer': Plurality.SINGULAR,
            'square kilometers': Plurality.PLURAL
        }
    }
])
    .setClassScales();

// CONCATENATED MODULE: ./src/classes/Time.ts




var Time = new Class_Class('Time')
    .addGroups([
    {
        system: System.ANY,
        unit: 'ns',
        baseUnit: 'ns',
        denominators: [10, 100],
        units: {
            'ns': Plurality.EITHER,
            'nanosecond': Plurality.SINGULAR,
            'nanoseconds': Plurality.PLURAL,
            'nano': Plurality.SINGULAR,
            'nanos': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        unit: 'us',
        relativeUnit: 'ns',
        relativeScale: 1000,
        denominators: [10, 100, 1000],
        units: {
            'us': Plurality.EITHER,
            'microsecond': Plurality.SINGULAR,
            'microseconds': Plurality.PLURAL,
            'micro': Plurality.SINGULAR,
            'micros': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        common: true,
        unit: 'ms',
        relativeUnit: 'us',
        relativeScale: 1000,
        denominators: [10, 100, 1000],
        units: {
            'ms': Plurality.EITHER,
            'millisecond': Plurality.SINGULAR,
            'milliseconds': Plurality.PLURAL,
            'milli': Plurality.SINGULAR,
            'millis': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        common: true,
        unit: 's',
        relativeUnit: 'ms',
        relativeScale: 1000,
        denominators: [10, 100, 1000],
        units: {
            's': Plurality.EITHER,
            'second': Plurality.SINGULAR,
            'seconds': Plurality.PLURAL,
            'sec': Plurality.SINGULAR,
            'secs': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        common: true,
        unit: 'min',
        relativeUnit: 's',
        relativeScale: 60,
        denominators: [2, 3, 4, 60],
        units: {
            'min': Plurality.EITHER,
            'minute': Plurality.SINGULAR,
            'minutes': Plurality.PLURAL,
            'mins': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        common: true,
        unit: 'hr',
        relativeUnit: 'min',
        relativeScale: 60,
        denominators: [2, 3, 4, 60],
        units: {
            'hr': Plurality.EITHER,
            'hour': Plurality.SINGULAR,
            'hours': Plurality.PLURAL,
            'hrs': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        common: true,
        unit: 'day',
        relativeUnit: 'hr',
        relativeScale: 24,
        denominators: [2, 3, 4, 6, 24],
        units: {
            'day': Plurality.EITHER,
            'days': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        common: true,
        unit: 'wk',
        relativeUnit: 'day',
        relativeScale: 7,
        denominators: [7],
        units: {
            'wk': Plurality.EITHER,
            'week': Plurality.SINGULAR,
            'weeks': Plurality.PLURAL,
            'wks': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        common: true,
        unit: 'yr',
        relativeUnit: 'day',
        relativeScale: 365.2425,
        denominators: [2, 3, 4, 6, 12, 52],
        units: {
            'yr': Plurality.EITHER,
            'year': Plurality.SINGULAR,
            'years': Plurality.PLURAL,
            'yrs': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        common: true,
        unit: 'score',
        relativeUnit: 'yr',
        relativeScale: 20,
        denominators: [20],
        units: {
            'score': Plurality.EITHER
        }
    }
])
    .setClassScales();

// CONCATENATED MODULE: ./src/classes/Digital.ts




var Digital = new Class_Class('Digital')
    .addGroups([
    {
        system: System.ANY,
        common: true,
        unit: 'b',
        baseUnit: 'b',
        denominators: [],
        units: {
            'b': Plurality.EITHER,
            'bit': Plurality.SINGULAR,
            'bits': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        unit: 'nibble',
        relativeUnit: 'b',
        relativeScale: 4,
        denominators: [],
        units: {
            'nibble': Plurality.EITHER,
            'nibbles': Plurality.PLURAL,
            'nybble': Plurality.EITHER,
            'nyble': Plurality.EITHER,
            'half-byte': Plurality.EITHER,
            'half byte': Plurality.EITHER,
            'tetrade': Plurality.EITHER,
            'semi-octet': Plurality.EITHER,
            'quadbit': Plurality.EITHER,
            'quartet': Plurality.EITHER
        }
    },
    {
        system: System.ANY,
        common: true,
        unit: 'B',
        relativeUnit: 'b',
        relativeScale: 8,
        denominators: [2, 8],
        units: {
            'B': Plurality.EITHER,
            'byte': Plurality.SINGULAR,
            'bytes': Plurality.PLURAL
        }
    }
]);
addDigitalUnits(Digital, 'B', 1000, [2, 4, 5, 10], 'byte', 'bytes', [
    ['kB', 'kilo'],
    ['mB', 'mega'],
    ['gB', 'giga'],
    ['tB', 'tera'],
    ['pB', 'peta'],
    ['eB', 'exa'],
    ['zB', 'zetta'],
    ['yB', 'yotta']
]);
addDigitalUnits(Digital, 'B', 1024, [2, 4, 8, 16], 'byte', 'bytes', [
    ['KB', 'kibi'],
    ['MB', 'mebi'],
    ['GB', 'gibi'],
    ['TB', 'tebi'],
    ['PB', 'pebi'],
    ['EB', 'exbi'],
    ['ZB', 'zebi'],
    ['YB', 'yobi']
]);
addDigitalUnits(Digital, 'b', 1000, [2, 4, 5, 10], 'bit', 'bits', [
    ['kb', 'kilo', 'kbit'],
    ['mb', 'mega', 'mbit'],
    ['gb', 'giga', 'gbit'],
    ['tb', 'tera', 'tbit'],
    ['pb', 'peta', 'pbit'],
    ['eb', 'exa', 'ebit'],
    ['zb', 'zetta', 'zbit'],
    ['yb', 'yotta', 'ybit']
]);
addDigitalUnits(Digital, 'b', 1024, [2, 4, 8, 16], 'bit', 'bits', [
    ['kibit', 'kibi'],
    ['mibit', 'mebi'],
    ['gibit', 'gibi'],
    ['tibit', 'tebi'],
    ['pibit', 'pebi'],
    ['eibit', 'exbi'],
    ['zibit', 'zebi'],
    ['yibit', 'yobi']
]);
Digital.setClassScales();
function addDigitalUnits(parent, relativeTo, relativeScales, denominators, suffixSingular, suffixPlural, unitAndPrefixes) {
    for (var i = 0; i < unitAndPrefixes.length; i++) {
        var _a = unitAndPrefixes[i], unit = _a[0], prefix = _a[1], extra = _a[2];
        var units = {};
        units[unit] = Plurality.EITHER;
        units[prefix + suffixSingular] = Plurality.SINGULAR;
        units[prefix + suffixPlural] = Plurality.PLURAL;
        if (extra) {
            units[extra] = Plurality.EITHER;
        }
        parent.addGroup({
            system: System.ANY,
            common: true,
            unit: unit,
            relativeUnit: relativeTo,
            relativeScale: relativeScales,
            denominators: denominators,
            units: units
        });
        relativeTo = unit;
    }
}

// CONCATENATED MODULE: ./src/classes/Temperature.ts




var _C_ = '\xb0C';
var Temperature = new Class_Class('Temperature')
    .setBaseConversion('F', _C_, function (x) { return ((x - 32) * 5 / 9); })
    .setBaseConversion(_C_, 'F', function (x) { return ((x * 9 / 5) + 32); })
    .setBaseConversion('K', _C_, function (x) { return (x - 273.15); })
    .setBaseConversion('K', 'F', function (x) { return ((x * 9 / 5) - 459.67); })
    .setBaseConversion(_C_, 'K', function (x) { return (x + 273.15); })
    .setBaseConversion('F', 'K', function (x) { return ((x + 459.67) * 5 / 9); })
    .addGroups([
    {
        system: System.IMPERIAL,
        common: true,
        unit: 'F',
        baseUnit: 'F',
        denominators: [],
        units: {
            'F': Plurality.EITHER,
            '\xb0F': Plurality.EITHER,
            'Fahrenheit': Plurality.EITHER
        }
    },
    {
        system: System.METRIC,
        common: true,
        unit: _C_,
        baseUnit: _C_,
        denominators: [],
        units: {
            '\xb0C': Plurality.EITHER,
            'Celsius': Plurality.EITHER
        }
    },
    {
        system: System.METRIC,
        unit: 'K',
        baseUnit: 'K',
        denominators: [],
        units: {
            'K': Plurality.EITHER,
            'kelvin': Plurality.EITHER,
            'kelvins': Plurality.EITHER
        }
    }
])
    .setClassScales();

// CONCATENATED MODULE: ./src/classes/Rotation.ts




var RAD2DEG = 180 / Math.PI;
var DEG2RAD = Math.PI / 180;
var Rotation = new Class_Class('Rotation')
    .setBaseConversion('deg', 'rad', function (x) { return x * DEG2RAD; })
    .setBaseConversion('rad', 'deg', function (x) { return x * RAD2DEG; })
    .addGroups([
    {
        system: System.ANY,
        common: true,
        unit: 'deg',
        baseUnit: 'deg',
        denominators: [],
        units: {
            'deg': Plurality.EITHER,
            '\xb0': Plurality.EITHER,
            'degrees': Plurality.PLURAL,
            'degree': Plurality.SINGULAR
        }
    },
    {
        system: System.ANY,
        common: true,
        unit: 'rad',
        baseUnit: 'rad',
        denominators: [],
        units: {
            'rad': Plurality.EITHER,
            'radians': Plurality.PLURAL,
            'radian': Plurality.SINGULAR
        }
    }
])
    .setClassScales();

// CONCATENATED MODULE: ./src/classes/Volume.ts




System.METRIC;
Plurality.SINGULAR;
var Volume = new Class_Class('Volume')
    .setBaseConversion('deg', 'rad', function (x) { return x * 1; })
    .setBaseConversion('rad', 'deg', function (x) { return x * 2; })
    .addGroups([])
    .setClassScales();

// CONCATENATED MODULE: ./src/classes/Length.ts




var Length = new Class_Class('Length')
    .setBaseConversion('in', 'mm', function (x) { return x * 25.4; })
    .setBaseConversion('mm', 'in', function (x) { return x * 0.039370; })
    .addGroups([
    {
        system: System.IMPERIAL,
        common: true,
        unit: 'in',
        baseUnit: 'in',
        denominators: [2, 4, 8, 16, 32],
        units: {
            'in': Plurality.EITHER,
            'inch': Plurality.SINGULAR,
            'inches': Plurality.PLURAL,
            '"': Plurality.EITHER
        }
    },
    {
        system: System.IMPERIAL,
        common: true,
        unit: 'ft',
        relativeUnit: 'in',
        relativeScale: 12,
        denominators: [2],
        units: {
            'ft': Plurality.EITHER,
            'foot': Plurality.SINGULAR,
            'feet': Plurality.PLURAL,
            '\'': Plurality.EITHER
        }
    },
    {
        system: System.IMPERIAL,
        unit: 'yd',
        relativeUnit: 'ft',
        relativeScale: 3,
        denominators: [],
        units: {
            'yd': Plurality.EITHER,
            'yard': Plurality.SINGULAR,
            'yards': Plurality.PLURAL,
            'yds': Plurality.PLURAL
        }
    },
    {
        system: System.IMPERIAL,
        common: true,
        unit: 'mi',
        relativeUnit: 'ft',
        relativeScale: 5280,
        denominators: [2, 3, 4, 10],
        units: {
            'mi': Plurality.EITHER,
            'mile': Plurality.SINGULAR,
            'miles': Plurality.PLURAL
        }
    },
    {
        system: System.IMPERIAL,
        unit: 'league',
        relativeUnit: 'mi',
        relativeScale: 3,
        denominators: [2, 3, 4, 5, 6, 7, 8, 9, 10],
        units: {
            'league': Plurality.EITHER,
            'leagues': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        common: true,
        unit: 'mm',
        baseUnit: 'mm',
        denominators: [10],
        units: {
            'mm': Plurality.EITHER,
            'millimeter': Plurality.SINGULAR,
            'millimeters': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        common: true,
        unit: 'cm',
        relativeUnit: 'mm',
        relativeScale: 10,
        denominators: [2, 4, 10],
        units: {
            'cm': Plurality.EITHER,
            'centimeter': Plurality.SINGULAR,
            'centimeters': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        unit: 'dc',
        relativeUnit: 'cm',
        relativeScale: 10,
        denominators: [10],
        units: {
            'dc': Plurality.EITHER,
            'decimeter': Plurality.SINGULAR,
            'decimeters': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        common: true,
        unit: 'm',
        relativeUnit: 'cm',
        relativeScale: 100,
        denominators: [2, 3, 4, 5, 10],
        units: {
            'm': Plurality.EITHER,
            'meter': Plurality.SINGULAR,
            'meters': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        common: true,
        unit: 'km',
        relativeUnit: 'm',
        relativeScale: 1000,
        denominators: [2, 3, 4, 5, 6, 7, 8, 9, 10],
        units: {
            'km': Plurality.EITHER,
            'kilometer': Plurality.SINGULAR,
            'kilometers': Plurality.PLURAL
        }
    }
])
    .setClassScales();

// CONCATENATED MODULE: ./src/classes/index.ts










function addDefaults() {
    Core_Core.addClasses(Weight, Area, Time, Digital, Temperature, Rotation, Volume, Length);
}

// CONCATENATED MODULE: ./src/index.ts
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Plurality", function() { return Plurality; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "System", function() { return System; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Functions", function() { return Functions; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Parse", function() { return Parse_Parse; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "OutputUnit", function() { return OutputUnit; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "OutputFormat", function() { return OutputFormat; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Output", function() { return Output_Output; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Transform", function() { return Transform_Transform; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "SortType", function() { return SortType; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Sort", function() { return Sort_Sort; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Core", function() { return Core_Core; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Group", function() { return Group_Group; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Class", function() { return Class_Class; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Value", function() { return Value_Value; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Range", function() { return Range_Range; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "uz", function() { return uz; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Base", function() { return Base_Base; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "addDefaults", function() { return addDefaults; });

// Enums


// Functions


// Secondary



// Core






// Classes



/***/ })
/******/ ]);
});
//# sourceMappingURL=unitz.js.map