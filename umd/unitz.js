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

var EPSILON = 0.00001;
function isZero(x) {
    return abs(x) < EPSILON;
}
function isEqual(a, b) {
    return abs(a - b) < EPSILON;
}
function isWhole(x) {
    return abs(Math.floor(x) - x) < EPSILON;
}
function isSingular(x) {
    return isNumber(x) && abs(abs(x) - 1) < EPSILON;
}
function isPlural(x) {
    return x !== 1 && x !== -1;
}
function isNumber(x) {
    return isFinite(x);
}
function gcd(a, b) {
    if (!isWhole(a) || !isWhole(b)) {
        return 1;
    }
    var x = a < b ? a : b;
    var y = a < b ? b : a;
    x = abs(x);
    y = abs(y);
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}
function abs(x) {
    return x < 0 ? -x : x;
}
function sign(x) {
    return x < 0 ? -1 : (x === 0 ? 0 : 1);
}
function appendTo(array, input) {
    if (input instanceof Array) {
        array.push.apply(array, input);
    }
    else if (input) {
        array.push(input);
    }
    return array;
}
function isGroupDefinition(input) {
    return !!(input && input.system && input.unit && input.denominators && input.units);
}
function isValueDefinition(input) {
    return !!(input && (input.value || input.unit || input.num || input.den));
}
function isRangeDefinition(input) {
    return !!(input && input.min && input.max);
}
function isArray(input) {
    return input instanceof Array;
}
function isString(input) {
    return typeof (input) === 'string';
}
function isDefined(input) {
    return typeof (input) !== 'undefined';
}
function coalesce(a, b) {
    return isDefined(a) ? a : b;
}

// CONCATENATED MODULE: ./src/Range.ts

var Range = (function () {
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
    Range.prototype.normalize = function (transform) {
        var min = this.min.normalize(transform);
        var max = this.max.normalize(transform);
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
    Range.fromFixed = function (fixed) {
        return new Range(fixed, fixed);
    };
    Range.SEPARATOR = ' - ';
    return Range;
}());


// CONCATENATED MODULE: ./src/Value.ts


var Value_Value = (function () {
    function Value(value, num, den, unit, group) {
        var divisor = gcd(num, den);
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
            return abs(this.error);
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
    Value.prototype.copy = function () {
        return new Value(this.value, this.num, this.den, this.unit, this.group);
    };
    Value.prototype.zero = function () {
        return new Value(0, 0, 1, this.unit, this.group);
    };
    Value.prototype.floored = function () {
        return new Value(this.floor, this.floor, 1, this.unit, this.group);
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
    Value.prototype.normalize = function (transform) {
        var closest = this;
        var closestString = this.asString;
        this.conversions(transform, false, function (convert) {
            var convertString = convert.asString;
            if (convertString.length <= closestString.length) {
                closest = convert;
                closestString = convertString;
            }
        });
        return closest;
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
            var distance = abs(value - actual);
            if (closestDistance === -1 || distance < closestDistance) {
                closestDistance = distance;
                closestDenominator = den;
            }
        }
        if (closestDistance > EPSILON) {
            return new Value(value, value, 1, unit, group);
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
            var distance = abs(value - actual);
            if (closestDistance === -1 || distance < closestDistance) {
                closestDistance = distance;
                closestDenominator = den;
            }
        }
        if (closestDistance > EPSILON) {
            return new Value(value, value, 1, unit, group);
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


// CONCATENATED MODULE: ./src/Parse.ts




var REGEX_RANGE = /\s*(-?[^-]+)-(.+)/;
var REGEX_LIST = /\s*,\s*/;
var REGEX_PARSE = /^\s*(-?\d*)(\s+(\d+))?(\s*\/\s*(\d+)|\.(\d+)|)\s*(.*)\s*$/i;
function parseRanges(input, groups) {
    if (isArray(input)) {
        return parseRangesFromArray(input, groups);
    }
    else if (isString(input)) {
        return parseRangesFromString(input, groups);
    }
    else if (isRangeDefinition(input)) {
        return parseRangesFromArray([input], groups);
    }
    else if (isValueDefinition(input)) {
        return parseRangesFromArray([input], groups);
    }
    return [];
}
function parseRangesFromArray(input, groups) {
    var ranges = [];
    for (var i = 0; i < input.length; i++) {
        var range = parseRange(input[i], groups);
        ranges.push(range);
    }
    return ranges;
}
function parseRangesFromString(input, groups) {
    var ranges = input.split(REGEX_LIST);
    return parseRangesFromArray(ranges, groups);
}
function parseRange(input, groups) {
    if (isString(input)) {
        return parseRangeFromString(input, groups);
    }
    else if (isRangeDefinition(input)) {
        var range = input;
        var min = parseValue(range.min, groups);
        var max = parseValue(range.max, groups);
        return new Range(min, max);
    }
    return null;
}
function parseRangeFromString(input, groups) {
    var matches = REGEX_RANGE.exec(input);
    if (!matches) {
        var fixed = parseValueFromString(input, groups);
        return new Range(fixed, fixed);
    }
    var minInput = matches[1];
    var maxInput = matches[2];
    var minParsed = parseInput(minInput);
    var maxParsed = parseInput(maxInput);
    var minUnit = minParsed.unit || maxParsed.unit;
    var maxUnit = maxParsed.unit || minParsed.unit;
    var min = parseValueFromResult(minParsed, minUnit, groups);
    var max = parseValueFromResult(maxParsed, maxUnit, groups);
    return new Range(min, max);
}
function parseValue(input, groups) {
    if (isString(input)) {
        return parseValueFromString(input, groups);
    }
    else if (isValueDefinition(input)) {
        return parseValueFromValue(input, groups);
    }
    return null;
}
function parseValueFromValue(input, groups) {
    var givenValue = isDefined(input.value) ? input.value : 1;
    var num = isDefined(input.num) ? input.num : givenValue;
    var den = isDefined(input.den) ? input.den : 1;
    var parsedValue = isDefined(input.value) ? input.value : num / den;
    var unit = input.unit || '';
    var group = groups(unit);
    return new Value_Value(parsedValue, num, den, unit, group);
}
function parseValueFromString(input, groups) {
    var parsed = parseInput(input);
    return parseValueFromResult(parsed, parsed.unit, groups);
}
function parseValueFromResult(result, unit, groups) {
    var group = groups(unit);
    return new Value_Value(result.value, result.valueNum, result.valueDen, unit, group);
}
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
function parseInput(input) {
    var matches = REGEX_PARSE.exec(input);
    var whole = parseInt(matches[1]);
    var hasWhole = isFinite(whole);
    var sign = matches[1].charAt(0) === '-' ? -1 : 1;
    var num = parseInt(matches[3]);
    var den = parseInt(matches[5]);
    var decimal = parseInt(matches[6]);
    var unit = matches[7];
    if (!hasWhole && isFinite(decimal)) {
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
        else if (isFinite(decimal)) {
            var remainder = parseFloat('0.' + decimal);
            value += remainder * sign;
            valueNum += remainder;
        }
        valueNum *= sign;
    }
    return { value: value, valueNum: valueNum, valueDen: valueDen, num: num, den: den, unit: unit };
}

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
        this.significant = 2;
        if (isDefined(input)) {
            this.set(input);
        }
    }
    Output.prototype.set = function (input) {
        this.unit = coalesce(input.unit, this.unit);
        this.format = coalesce(input.format, this.format);
        this.repeatUnit = coalesce(input.repeatUnit, this.repeatUnit);
        this.unitSpacer = coalesce(input.unitSpacer, this.unitSpacer);
        this.rangeSpacer = coalesce(input.rangeSpacer, this.rangeSpacer);
        this.fractionSpacer = coalesce(input.fractionSpacer, this.fractionSpacer);
        this.mixedSpacer = coalesce(input.mixedSpacer, this.mixedSpacer);
        this.delimiter = coalesce(input.delimiter, this.delimiter);
        this.significant = coalesce(input.significant, this.significant);
        return this;
    };
    Output.prototype.extend = function (input) {
        var extended = this;
        if (isDefined(input)) {
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
            if (i > 0) {
                out += this.delimiter;
            }
            out += this.range(ranges[i]);
        }
        return out;
    };
    Output.prototype.range = function (range) {
        var out = '';
        if (range.isFixed) {
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
        if (this.isFraction(value)) {
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
            var valueString = value.value + '';
            var valueSignificant = value.value
                .toFixed(this.significant)
                .replace(/0*$/, '')
                .replace(/\.$/, '');
            out += valueSignificant.length < valueString.length ? valueSignificant : valueString;
        }
        if (this.unit !== OutputUnit.NONE && showUnit) {
            var group = value.group;
            out += this.unitSpacer;
            if (this.isLongUnit(value)) {
                out += isSingular(value.value) ? group.getSingularLong() : group.getPluralLong();
            }
            else if (this.isShortUnit(value)) {
                out += isSingular(value.value) ? group.getSingularShort() : group.getPluralShort();
            }
            else {
                out += value.unit;
            }
        }
        return out;
    };
    Output.prototype.isFraction = function (value) {
        return value.isFraction && this.format !== OutputFormat.NUMBER;
    };
    Output.prototype.isMixed = function (value) {
        return value.mixedWhole !== 0 && this.format === OutputFormat.MIXED;
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
        if (isDefined(input)) {
            this.set(input);
        }
    }
    Transform.prototype.set = function (input) {
        this.common = coalesce(input.common, this.common);
        this.system = coalesce(input.system, this.system);
        return this;
    };
    Transform.prototype.extend = function (input) {
        var extended = this;
        if (isDefined(input)) {
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
    return Transform;
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
        for (var unit in units) {
            this.units[unit] = units[unit];
        }
        this.updateUnits();
        return this;
    };
    Group.prototype.addDenominator = function (denominators) {
        appendTo(this.denominators, denominators);
        return this;
    };
    Group.prototype.setDenominators = function (denominators) {
        this.denominators = denominators;
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
            var groups = this.parent.groups;
            var matched = 0;
            var start = reverse ? groups.length - 1 : 0;
            var stop_1 = reverse ? -1 : groups.length;
            var increment = reverse ? -1 : 1;
            for (var i = start; i !== stop_1; i += increment) {
                var group = groups[i];
                if (matchesGroup(transform.system, group, this) && (group.common || !transform.common)) {
                    callback(group, matched++);
                }
            }
        }
    };
    return Group;
}());

function matchesGroup(desired, group, givenGroup) {
    switch (desired) {
        case System.METRIC:
            return group.system === System.METRIC;
        case System.IMPERIAL:
            return group.system === System.IMPERIAL;
        case System.NONE:
            return false;
        case System.ANY:
            return true;
        case System.GIVEN:
            return givenGroup && group.baseUnit === givenGroup.baseUnit;
    }
    return false;
}

// CONCATENATED MODULE: ./src/Class.ts


var Class_Class = (function () {
    function Class(name, groups) {
        this.name = name;
        this.groupMap = {};
        this.groups = [];
        this.bases = {};
        this.converters = {};
        this.mapping = {};
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
        var relativeUnit = group.relativeUnit, units = group.units;
        if (relativeUnit) {
            group.baseScale = group.relativeScale * this.converters[relativeUnit];
            group.baseUnit = this.bases[relativeUnit];
        }
        for (var alias in units) {
            this.converters[alias] = group.baseScale;
            this.bases[alias] = group.baseUnit;
            this.groupMap[alias] = group;
        }
        this.groups.push(group);
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
                else if (group.baseUnit in this.mapping) {
                    group.classScale = this.mapping[group.baseUnit][first.baseUnit](group.baseScale);
                }
            }
        }
        return this;
    };
    Class.prototype.setBaseConversion = function (fromUnit, toUnit, converter) {
        var mapping = this.mapping;
        mapping[fromUnit] = mapping[fromUnit] || {};
        mapping[fromUnit][toUnit] = converter;
        return this;
    };
    Class.prototype.convert = function (value, from, to) {
        if (from === to || !from || !to) {
            return value;
        }
        var converted = value * from.baseScale;
        if (from.baseUnit !== to.baseUnit) {
            var converter = this.mapping[from.baseUnit][to.baseUnit];
            converted = converter(converted);
        }
        return converted / to.baseScale;
    };
    return Class;
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
        if (isDefined(input)) {
            this.set(input);
        }
    }
    Sort.prototype.set = function (input) {
        this.ascending = coalesce(input.ascending, this.ascending);
        this.type = coalesce(input.type, this.type);
        if (isDefined(input.classes)) {
            for (var className in input.classes) {
                this.classes[className] = input.classes[className];
            }
        }
        return this;
    };
    Sort.prototype.extend = function (input) {
        var extended = this;
        if (isDefined(input)) {
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
        return sign(a.min.classScaled - b.min.classScaled);
    };
    Sort.prototype.getMaxComparison = function (a, b) {
        return sign(a.max.classScaled - b.max.classScaled);
    };
    Sort.prototype.getAverageComparison = function (a, b) {
        var avg = (a.min.classScaled + a.max.classScaled) * 0.5;
        var bvg = (b.min.classScaled + b.max.classScaled) * 0.5;
        return sign(avg - bvg);
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


// CONCATENATED MODULE: ./src/Global.ts




var classMap = {};
var Global_classes = [];
var unitToClass = {};
var globalOutput = new Output_Output();
var globalTransform = new Transform_Transform();
var globalSort = new Sort_Sort();
function getGroupForUnit(unit) {
    var normalizedUnit = (unit || '').toLowerCase();
    var parent = unitToClass[normalizedUnit];
    return parent ? parent.groupMap[normalizedUnit] : null;
}
function addClass(parent) {
    classMap[parent.name] = parent;
    Global_classes.push(parent);
    for (var unit in parent.converters) {
        unitToClass[unit] = parent;
    }
}
function addClasses() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    for (var i = 0; i < classes.length; i++) {
        addClass(classes[i]);
    }
}

// CONCATENATED MODULE: ./src/Base.ts





// TODO filter (out certain classes or groups)
// TODO preferred () converts units to preferredUnits if available
function uz(input) {
    return new Base_Base(input);
}
function parseBase(input) {
    if (input instanceof Base_Base) {
        return input;
    }
    return new Base_Base(input);
}
var Base_Base = (function () {
    function Base(input, ranges) {
        this.input = input;
        this.ranges = ranges || parseRanges(input, getGroupForUnit);
    }
    // 1c, 2.3m SCALE BY 2 = 2c, 4.6m
    Base.prototype.scale = function (amount) {
        return this.mutate(function (r) { return r.mul(amount); });
    };
    // 1c, 3m SCALE TO 1/2c = 1/2c, 1.5m
    Base.prototype.scaleTo = function (unitValue) {
        return this.scale(this.getScaleTo(unitValue));
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
    // 1 - 3c = 3c
    Base.prototype.max = function () {
        return this.mutate(function (r) { return r.maxd(); });
    };
    // 1 - 3c = 1c
    Base.prototype.min = function () {
        return this.mutate(function (r) { return r.mind(); });
    };
    // 1.5pt = 3c
    Base.prototype.normalize = function (options) {
        var transform = globalTransform.extend(options);
        return this.mutate(function (r) { return r.normalize(transform); });
    };
    // 1c, 1pt = 1.5pt
    Base.prototype.compact = function (options) {
        var compacted = [];
        var transform = globalTransform.extend(options);
        var _a = this.groupByClass(), classes = _a.classes, groupless = _a.groupless;
        for (var className in classes) {
            var entry = classes[className];
            var ranges = entry.ranges;
            var parent_1 = entry.parent;
            var minGroupChosen = null;
            var maxGroupChosen = null;
            var minSum = 0;
            var maxSum = 0;
            for (var i = 0; i < ranges.length; i++) {
                var range = ranges[i];
                var minGroup = range.min.group;
                var maxGroup = range.max.group;
                if (!minGroupChosen || ((minGroup.common || !transform.common) && minGroup.baseScale > minGroupChosen.baseScale)) {
                    minSum = parent_1.convert(minSum, minGroupChosen, minGroup);
                    minGroupChosen = minGroup;
                }
                if (!maxGroupChosen || ((maxGroup.common || !transform.common) && maxGroup.baseScale > maxGroupChosen.baseScale)) {
                    maxSum = parent_1.convert(maxSum, maxGroupChosen, maxGroup);
                    maxGroupChosen = maxGroup;
                }
                minSum += range.min.convertTo(minGroupChosen);
                maxSum += range.max.convertTo(maxGroupChosen);
            }
            var min = Value_Value.fromNumberForGroup(minSum, minGroupChosen);
            var max = Value_Value.fromNumberForGroup(maxSum, maxGroupChosen);
            compacted.push(new Range(min, max));
        }
        if (groupless.length) {
            var minSum = new Value_Value(0, 0, 1, '', null);
            var maxSum = new Value_Value(0, 0, 1, '', null);
            for (var i = 0; i < groupless.length; i++) {
                minSum = minSum.add(groupless[i].min);
                maxSum = maxSum.add(groupless[i].max);
            }
            compacted.push(new Range(minSum, maxSum));
        }
        return new Base(this.input, compacted);
    };
    // 1.5pt = 1c, 1pt
    Base.prototype.expand = function (options) {
        var transform = globalTransform.extend(options);
        var compacted = this.compact(transform);
        var ranges = compacted.ranges;
        var expanded = [];
        var _loop_1 = function (i) {
            var range = ranges[i];
            var min = range.min;
            var minGroup = min.group;
            if (minGroup) {
                minGroup.matches(transform, true, function (group) {
                    if (min.value > 0) {
                        var transformed = min.convertToValue(group);
                        if (group.isBase) {
                            expanded.push(Range.fromFixed(transformed));
                        }
                        else if (transformed.value > 1) {
                            var floored = transformed.floored();
                            var scaled = group.baseScale / minGroup.baseScale;
                            min = min.sub(floored, scaled);
                            expanded.push(Range.fromFixed(floored));
                        }
                    }
                });
            }
            else {
                expanded.push(range);
            }
        };
        for (var i = 0; i < ranges.length; i++) {
            _loop_1(i);
        }
        return new Base(this.input, expanded);
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
    Base.prototype.add = function (input, scale) {
        if (scale === void 0) { scale = 1; }
        return this.operateMatches(input, function (a, b) {
            return a.add(b, scale);
        });
    };
    Base.prototype.sub = function (input, scale) {
        if (scale === void 0) { scale = 1; }
        return this.operateMatches(input, function (a, b) {
            return a.sub(b, scale);
        });
    };
    Base.prototype.operateMatches = function (input, operate) {
        var ranges = this.ranges;
        var output = [];
        var other = parseBase(input);
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
    Base.prototype.transform = function (options) {
        var transform = globalTransform.extend(options);
        return this.mutate(function (r) {
            var min = null;
            var max = null;
            r.min.conversions(transform, false, function (transformed) {
                if (!min || transformed.asString.length < min.asString.length) {
                    min = transformed;
                }
            });
            r.max.conversions(transform, false, function (transformed) {
                if (!max || transformed.asString.length < max.asString.length) {
                    max = transformed;
                }
            });
            return new Range(min, max);
        });
    };
    Base.prototype.getScaleTo = function (unitValue) {
        var to = parseValue(unitValue, getGroupForUnit);
        var converted = this.convert(to.unit);
        var scale = to.value / converted.average;
        return scale;
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
    Base.prototype.output = function (options) {
        var output = globalOutput.extend(options);
        return output.ranges(this.ranges);
    };
    Base.prototype.convert = function (unit) {
        var group = getGroupForUnit(unit);
        if (!group) {
            return null;
        }
        var parent = group.parent;
        var ranges = this.ranges;
        var min = new Value_Value(0, 0, 1, group.unit, group);
        var max = new Value_Value(0, 0, 1, group.unit, group);
        for (var i = 0; i < ranges.length; i++) {
            var range = ranges[i];
            var rangeGroup = range.min.group;
            if (rangeGroup && rangeGroup.parent === parent) {
                var rangeScale = rangeGroup.baseScale / group.baseScale;
                min = min.add(range.min, rangeScale);
                max = max.add(range.max, rangeScale);
            }
        }
        return new Range(min, max);
    };
    Base.prototype.sort = function (options) {
        var sort = globalSort.extend(options);
        var ranges = this.ranges.slice();
        ranges.sort(sort.getSorter());
        return new Base(this.input, ranges);
    };
    return Base;
}());


// CONCATENATED MODULE: ./src/index.ts
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Plurality", function() { return Plurality; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "System", function() { return System; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "EPSILON", function() { return EPSILON; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isZero", function() { return isZero; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isEqual", function() { return isEqual; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isWhole", function() { return isWhole; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isSingular", function() { return isSingular; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isPlural", function() { return isPlural; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "gcd", function() { return gcd; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "abs", function() { return abs; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "sign", function() { return sign; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "appendTo", function() { return appendTo; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isGroupDefinition", function() { return isGroupDefinition; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isValueDefinition", function() { return isValueDefinition; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isRangeDefinition", function() { return isRangeDefinition; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "isDefined", function() { return isDefined; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "coalesce", function() { return coalesce; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "REGEX_RANGE", function() { return REGEX_RANGE; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "REGEX_LIST", function() { return REGEX_LIST; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "REGEX_PARSE", function() { return REGEX_PARSE; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "parseRanges", function() { return parseRanges; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "parseRange", function() { return parseRange; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "parseValue", function() { return parseValue; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "parseInput", function() { return parseInput; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "OutputUnit", function() { return OutputUnit; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "OutputFormat", function() { return OutputFormat; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Output", function() { return Output_Output; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Transform", function() { return Transform_Transform; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Group", function() { return Group_Group; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "matchesGroup", function() { return matchesGroup; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Class", function() { return Class_Class; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Value", function() { return Value_Value; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Range", function() { return Range; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "uz", function() { return uz; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "parseBase", function() { return parseBase; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Base", function() { return Base_Base; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "classMap", function() { return classMap; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "classes", function() { return Global_classes; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "unitToClass", function() { return unitToClass; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "globalOutput", function() { return globalOutput; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "globalTransform", function() { return globalTransform; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "globalSort", function() { return globalSort; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "getGroupForUnit", function() { return getGroupForUnit; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "addClasses", function() { return addClasses; });

// Enums


// Functions


// Secondary


// Core





// Global



/***/ })
/******/ ]);
});
//# sourceMappingURL=unitz.js.map