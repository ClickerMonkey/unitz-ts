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

/**
 * An enumeration which specifies whether a unit represents a singular value (1),
 * a plural value, or might represent either.
 */
var Plurality;
(function (Plurality) {
    /**
     * The unit is only a singular representation.
     */
    Plurality[Plurality["SINGULAR"] = 0] = "SINGULAR";
    /**
     * The unit is only a plural representation.
     */
    Plurality[Plurality["PLURAL"] = 1] = "PLURAL";
    /**
     * The unit can be used as singular and plural.
     */
    Plurality[Plurality["EITHER"] = 2] = "EITHER";
})(Plurality = Plurality || (Plurality = {}));

// CONCATENATED MODULE: ./src/System.ts

/**
 * An enumeration which specifies what system of measurement a unit belongs to
 * or specifies which system a user desires for output or conversions.
 *
 * @see [[Group]]
 * @see [[Transform]]
 */
var System;
(function (System) {
    /**
     * The Metrix System of Measurement.
     */
    System[System["METRIC"] = 0] = "METRIC";
    /**
     * The US "traditional systems of weights and measures". Also known as
     * "Standard", "Customary", or, erroneously: "Imperial", or "English".
     */
    System[System["US"] = 1] = "US";
    /**
     * A value for groups when the unit does not belong to a system.
     */
    System[System["NONE"] = 2] = "NONE";
    /**
     * A value for transforms which specify that the user or developer are looking
     * to get results in any system.
     */
    System[System["ANY"] = 3] = "ANY";
    /**
     * A value for transforms which specify that the user or developer are looking
     * to get results in the same system that is already being used for a range.
     * If a current system cannot be determined then any system is returned.
     */
    System[System["GIVEN"] = 4] = "GIVEN";
})(System = System || (System = {}));

// CONCATENATED MODULE: ./src/Functions.ts

/**
 * The class which contains commonly used functions by the library. These
 * functions and variables exist in a class so they may be overridden if
 * desired.
 */
var Functions = (function () {
    function Functions() {
    }
    /**
     * Determines if the given number is zero.
     *
     * @param x The number to test.
     * @return True if the number is zero, otherwise false.
     * @see [[Functions.EPSILON]]
     */
    Functions.isZero = function (x) {
        return this.abs(x) < this.EPSILON;
    };
    /**
     * Determines if the given number is equal to another.
     *
     * @param a The first number to compare.
     * @param b The second number to compare.
     * @return True if the two numbers are equal.
     * @see [[Functions.EPSILON]]
     */
    Functions.isEqual = function (a, b) {
        return this.abs(a - b) < this.EPSILON;
    };
    /**
     * Determines if the given number is a whole number (integer).
     *
     * @param x The number to test.
     * @return True if the number is whole, otherwise false.
     * @see [[Functions.EPSILON]]
     */
    Functions.isWhole = function (x) {
        return this.abs(Math.floor(x) - x) < this.EPSILON;
    };
    /**
     * Determines if the given number is singular. A singular number is 1 or -1.
     *
     * @param x The number to test.
     * @return True if the number is singular, otherwise false.
     * @see [[Functions.EPSILON]]
     */
    Functions.isSingular = function (x) {
        return this.isNumber(x) && this.abs(this.abs(x) - 1) < this.EPSILON;
    };
    /**
     * Determines if the given number is valid. A valid number is finite and not
     * NaN or Infinity.
     *
     * @param x The number to test.
     * @return True if the input is finite number.
     */
    Functions.isNumber = function (x) {
        return isFinite(x);
    };
    /**
     * Trims the given input if its a string.
     *
     * @param x The string to remove space from the beginning and end.
     * @return A trimmed string.
     */
    Functions.trim = function (x) {
        return x ? x.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') : x;
    };
    /**
     * Calculates the greatest common denominator between the two numbers. If
     * either of the numbers are not whole (integers) then 1 is immediately
     * returned.
     *
     * @param a The first number.
     * @param b The second number.
     * @return The greatest common denominator between the two numbers.
     */
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
    /**
     * Determines the absolute value of the given number.
     *
     * @param x The number to return the positive version of.
     * @return The absolute value of x.
     */
    Functions.abs = function (x) {
        return x < 0 ? -x : x;
    };
    /**
     * Determines the sign of the given number. One of three values will be
     * returned: 1, 0, or -1.
     *
     * @param x The number to determine the sign of.
     * @return The sign of the given number.
     */
    Functions.sign = function (x) {
        return x < 0 ? -1 : (x > 0 ? 1 : 0);
    };
    /**
     * Appends an element or array of elements to the end of the given array.
     *
     * @param array The array to append values to the end of.
     * @param input The element or array of elements to append to the end.
     * @return The reference to the `array` given.
     */
    Functions.appendTo = function (array, input) {
        if (input instanceof Array) {
            array.push.apply(array, input);
        }
        else if (input) {
            array.push(input);
        }
        return array;
    };
    /**
     * Determines whether the given input looks like a [[GroupDefinition]].
     *
     * @param input The variable to inspect.
     * @return True if the variable appears to be a [[GroupDefinition]].
     */
    Functions.isGroupDefinition = function (input) {
        return !!(input && input.system && input.unit && input.denominators && input.units);
    };
    /**
     * Determines whether the given input looks like a [[ValueDefinition]].
     *
     * @param input The variable to inspect.
     * @return True if the variable appears to be a [[ValueDefinition]].
     */
    Functions.isValueDefinition = function (input) {
        return !!(input && (input.value || input.unit || input.num || input.den));
    };
    /**
     * Determines whether the given input looks like a [[RangeDefinition]].
     *
     * @param input The variable to inspect.
     * @return True if the variable appears to be a [[RangeDefinition]].
     */
    Functions.isRangeDefinition = function (input) {
        return !!(input && input.min && input.max);
    };
    /**
     * Determines whether the given input is an array.
     *
     * @param input The variable to test.
     * @return True if the variable is an array, otherwise false.
     */
    Functions.isArray = function (input) {
        return input instanceof Array;
    };
    /**
     * Determines whether the given input is a string.
     *
     * @param input The variable to test.
     * @return True if the variable is a string, otherwise false.
     */
    Functions.isString = function (input) {
        return typeof (input) === 'string';
    };
    /**
     * Determines whether the given input is defined.
     *
     * @param input The variable to test.
     * @return True if the variable is defined, otherwise false.
     */
    Functions.isDefined = function (input) {
        return typeof (input) !== 'undefined';
    };
    /**
     * Returns the first argument which is defined.
     *
     * @param a The first argument to look at.
     * @param b The second argument to look at.
     * @return The first defined argument.
     * @see [[Functions.isDefined]]
     */
    Functions.coalesce = function (a, b) {
        return this.isDefined(a) ? a : b;
    };
    /**
     * The maximum distance a number can be from another to be considered
     * equivalent. This is to compensate for floating point precision issues.
     */
    Functions.EPSILON = 0.00001;
    return Functions;
}());


// CONCATENATED MODULE: ./src/Group.ts



/**
 * A unit and its aliases as well as their plurality.
 *
 * A group is relative to a base group or is a base group itself. As unit
 * aliases are added to the group it determines the appropriate plural and
 * singular long and short versions given the unit aliases in this group.
 */
var Group_Group = (function () {
    /**
     * Creates a new instance of Group given a definition and the parent class.
     *
     * @param definition The definition of the group.
     * @param parent The class which contains this group.
     */
    function Group(definition, parent) {
        /**
         * The scale of this group relative to the base group. This is used for
         * conversions of values with the same base group.
         */
        this.baseScale = 1;
        /**
         * The scale of this group relative to the first base group added to the
         * class. This is used to compare numbers of the same class across all bases.
         */
        this.classScale = 0;
        /**
         * Whether this group was dynamically created by user input having units
         * not mapped to groups by the developer.
         */
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
        /**
         * True if this group is a base group, otherwise false.
         */
        get: function () {
            return this.unit === this.baseUnit;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets the dynamic flag of this group.
     *
     * @param dynamic Whether this group is dynamic or not.
     * @return The reference to this instance.
     */
    Group.prototype.setDynamic = function (dynamic) {
        if (dynamic === void 0) { dynamic = true; }
        this.dynamic = dynamic;
        return this;
    };
    /**
     * Adds a denominator or array of denominators to this group.
     *
     * @param denominators A denominator or an array of denominators to add.
     * @return The reference to this instance.
     */
    Group.prototype.addDenominator = function (denominators) {
        Functions.appendTo(this.denominators, denominators);
        return this;
    };
    /**
     * Sets the denominators of this group.
     *
     * @param denominators The new denominators for this group.
     * @return The reference to this instance.
     * @see [[Group.denominators]]
     */
    Group.prototype.setDenominators = function (denominators) {
        this.denominators = denominators;
        return this;
    };
    /**
     * Sets the common flag of this group.
     *
     * @param common Whether this group is common or not.
     * @return The reference to this instance.
     * @see [[Group.common]]
     */
    Group.prototype.setCommon = function (common) {
        if (common === void 0) { common = true; }
        this.common = common;
        return this;
    };
    /**
     * Sets the preferred unit of this group.
     *
     * @param unit The preferred unit of this group.
     * @return The reference to this instance.
     * @see [[Group.preferredUnit]]
     */
    Group.prototype.setPreferred = function (unit) {
        this.preferredUnit = unit;
        return this;
    };
    /**
     * Adds the given unit aliases to this group and the parent class.
     *
     * @param units The units to add to the group and class.
     * @return The reference to this instance.
     * @see [[Class.addGroupUnit]]
     */
    Group.prototype.addUnits = function (units) {
        var parent = this.parent;
        for (var unit in units) {
            this.units[unit] = units[unit];
            parent.addGroupUnit(unit, this);
        }
        this.updateUnits();
        return this;
    };
    /**
     * Removes the given unit aliases from this group and the parent class.
     *
     * @param units The array of unit aliases to remove.
     * @return The reference to this instance.
     * @see [[Class.removeGroupUnit]]
     */
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
    /**
     * Updates the singular and plural long and short form units for this group.
     *
     * @return The reference to this instance.
     */
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
    /**
     * Invokes a callback for each group in the parent class that are visible
     * based on the given transform relative to this group.
     *
     * @param transform The transform which decides what groups are visible.
     * @param reverse If the groups of the class should be iterated in reverse.
     * @param callback A function to invoke with all visible groups found and the
     *  index of that group in the set of visible groups. If `false` is returned
     *  by the function iteration of visible groups ceases.
     * @param callback.group The current visible group.
     * @param callback.index The index of the current visible group.
     * @see [[Transform.isVisibleGroup]]
     */
    Group.prototype.matches = function (transform, reverse, callback) {
        if (this.parent) {
            this.parent.getVisibleGroups(transform, reverse, this, callback);
        }
    };
    return Group;
}());


// CONCATENATED MODULE: ./src/Class.ts


/**
 * A collection of groups and their units with the logic on how to convert
 * between groups with differing base units.
 *
 * A class is essentially something like "Length" where base units are "inches"
 * and "millimeters" and there are various other groups based off of these
 * base groups like "feet", "centimeters", and "meters".
 *
 * A class is responsible for being the sole place where conversion is done
 * between different groups in the same class.
 *
 * @see [[Class.convert]]
 */
var Class_Class = (function () {
    /**
     * Creates a new instance of Class given the name of the class and optionally
     * the groups of the class.
     *
     * @param name The unique name of the class.
     * @param groups The optional list of groups to populate the class with.
     */
    function Class(name, groups) {
        this.name = name;
        this.groupMap = {};
        this.groups = [];
        this.converters = {};
        if (groups) {
            this.addGroups(groups);
        }
    }
    /**
     * Adds the group definitions to this class.
     *
     * @param definitions The array of group definitions.
     * @return The reference to this instance.
     * @see [[Class.addGroup]]
     */
    Class.prototype.addGroups = function (definitions) {
        for (var i = 0; i < definitions.length; i++) {
            this.addGroup(definitions[i]);
        }
        return this;
    };
    /**
     * Adds a group definition to this class. If the group is relative to another
     * group the [[Group.baseScale]] and [[Group.baseUnit]] are set to appropriate
     * values.
     *
     * @param definition The group definition.
     * @return The instance of the group created from the definition.
     * @see [[Class.addGroupUnit]]
     */
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
    /**
     * Adds the unit to this class for the given group. If the lowercase version
     * of the unit has not been mapped yet it will be mapped to the given group.
     *
     * @param unit The unit to map to the group.
     * @param group The group which has the unit.
     * @return The reference to this instance.
     */
    Class.prototype.addGroupUnit = function (unit, group) {
        var lower = unit.toLowerCase();
        this.groupMap[unit] = group;
        if (!this.groupMap[lower]) {
            this.groupMap[lower] = group;
        }
        return this;
    };
    /**
     * Removes the given unit associated to the given group from the class. If the
     * group is not mapped to this unit then this has no effect.
     *
     * @param unit The unit to remove from this class.
     * @param group The group which has the unit.
     * @return The reference to this instance.
     */
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
    /**
     * Determines the first group in this class which is a base group.
     *
     * @see [[Group.isBase]]
     */
    Class.prototype.getFirstBase = function () {
        var groups = this.groups;
        for (var i = 0; i < groups.length; i++) {
            var group = groups[i];
            if (group.isBase) {
                return group;
            }
        }
        return null;
    };
    /**
     * Updates the [[Group.classScale]] value in each group in this class so that
     * there is a baseline for comparing one group to another no matter the base
     * unit. For comparing in the same base, you can use [[Group.baseScale]].
     *
     * @return The reference to this instance.
     */
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
    /**
     * Sets the conversion function between the two base units.
     *
     * @param fromUnit The base unit to convert from.
     * @param toUnit The base unit to convert to.
     * @param converter The function to pass the value to convert.
     * @return The reference to this instance.
     */
    Class.prototype.setBaseConversion = function (fromUnit, toUnit, converter) {
        var converters = this.converters;
        converters[fromUnit] = converters[fromUnit] || {};
        converters[fromUnit][toUnit] = converter;
        return this;
    };
    /**
     * Determines which groups in this class are visible according to the given
     * transform. The groups can be iterated in reverse and can optionally take
     * a related group into consideration (when the system is GIVEN, we want to
     * return the groups with the same system).
     *
     * @param transform The transform which decides what groups are visible.
     * @param reverse If the groups of this class should be iterated in reverse.
     * @param relatedGroup A related group which may be used for visibility if the
     *  [[Transform.system]] is [[System.GIVEN]].
     * @param callback A function to invoke with all visible groups found and the
     *  index of that group in the set of visible groups. If `false` is returned
     *  by the function iteration of visible groups ceases.
     * @param callback.group The current visible group.
     * @param callback.index The index of the current visible group.
     * @see [[Transform.isVisibleGroup]]
     */
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
    /**
     * Converts the given number from a given group to a given group. If the two
     * groups are the same or one or both of the groups are not provided then the
     * `value` provided is returned. If the two groups have differing base units
     * the [[Class.converters]] map is used to convert the `value` over to the
     * proper base. If the [[Class.converters]] map is missing a base conversion
     * zero is returned. This might happen if a group is passed to this function
     * which does not belong to this class OR if the user has impromperly setup
     * their own classes.
     *
     * @param value The number to convert.
     * @param from The group of the number to convert from.
     * @param to The group to convert to.
     * @return The converted number or zero if a base conversion could not be found.
     */
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


/**
 * The enumeration which decides what unit to use when converting to a string.
 */
var OutputUnit;
(function (OutputUnit) {
    /**
     * This value will keep units from being displayed.
     */
    OutputUnit[OutputUnit["NONE"] = 0] = "NONE";
    /**
     * This value will ensure the unit exactly as the user entered it is used in
     * the output no matter whether the value's plurality matches the given
     * unit's plurality.
     *
     * @see [[Value.unit]]
     */
    OutputUnit[OutputUnit["GIVEN"] = 1] = "GIVEN";
    /**
     * This value will force the short versions of the unit to be used.
     *
     * @see [[Group.singularShort]]
     * @see [[Group.pluralShort]]
     */
    OutputUnit[OutputUnit["SHORT"] = 2] = "SHORT";
    /**
     * This value will force the long versions of the unit to be used.
     *
     * @see [[Group.singularLong]]
     * @see [[Group.pluralLong]]
     */
    OutputUnit[OutputUnit["LONG"] = 3] = "LONG";
})(OutputUnit = OutputUnit || (OutputUnit = {}));
/**
 * The enumeration which decides how a value will be converted to a string.
 */
var OutputFormat;
(function (OutputFormat) {
    /**
     * The format of the user input will be used if possible.
     */
    OutputFormat[OutputFormat["GIVEN"] = 0] = "GIVEN";
    /**
     * All values will be displayed using their decimal representation.
     */
    OutputFormat[OutputFormat["NUMBER"] = 1] = "NUMBER";
    /**
     * All values will be displayed as a mixed fraction if the value is a fraction.
     * A mixed fraction has a whole number followed by a fraction where the
     * numerator is smaller than the denominator.
     *
     * @see [[Value.isFraction]]
     */
    OutputFormat[OutputFormat["MIXED"] = 2] = "MIXED";
    /**
     * All values will be displayed as an improper fraction if the value is a
     * fraction and the numerator is larger than the denoninator.
     *
     * @see [[Value.isFraction]]
     */
    OutputFormat[OutputFormat["IMPROPER"] = 3] = "IMPROPER";
})(OutputFormat = OutputFormat || (OutputFormat = {}));
/**
 * The class which converts Unitz objects to strings.
 */
var Output_Output = (function () {
    /**
     * Creates a new instance of Output with an optional set of options to
     * override the default values.
     *
     * @param input The options to apply to the new instance.
     */
    function Output(input) {
        /**
         * The option that specifies which units are chosen.
         */
        this.unit = OutputUnit.GIVEN;
        /**
         * The option that specifies how values are displayed.
         */
        this.format = OutputFormat.GIVEN;
        /**
         * Whether or not a unit should be displayed for the minimum and maximum of a
         * range when they have the same group.
         */
        this.repeatUnit = false;
        /**
         * The spacing used between the value and the unit.
         */
        this.unitSpacer = '';
        /**
         * The spacing used between the minimum and maximum values in a range.
         */
        this.rangeSpacer = ' - ';
        /**
         * The spacing used to separate the numerator and denominator of a fraction.
         */
        this.fractionSpacer = '/';
        /**
         * The spacing used to seperate a mixed number from the fraction.
         */
        this.mixedSpacer = ' ';
        /**
         * The delimiter used to separate ranges.
         */
        this.delimiter = ', ';
        /**
         * An option used to restrict numbers from displaying large decimal numbers.
         * When this value is set to -1 numbers are displayed fully. If the value is
         * set to zero all numbers will be truncated to the whole version.
         */
        this.significant = -1;
        if (Functions.isDefined(input)) {
            this.set(input);
        }
    }
    /**
     * Overrides values in this instance with ones specified in input.
     *
     * @param input The values to override.
     * @return The reference to this instance.
     */
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
    /**
     * Returns an Output instance which matches the desired options. If no options
     * are specified the reference to this instance is returned. If the options
     * are already an instance of Output its returned. If options are specified
     * a new instance is created with the options of this instance, and the given
     * options applied with [[Output.set]].
     *
     * @param input The options desired.
     * @return An instance of this class which matches the desired options.
     */
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
    /**
     * Converts the list of ranges to a string. If a range is not valid it is
     * skipped.
     *
     * @param ranges The list of ranges to convert.
     * @return The string representation of the input.
     */
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
    /**
     * Converts the range to a string.
     *
     * @param ranges The range to convert.
     * @return The string representation of the input.
     */
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
    /**
     * Converts the value to the string optionally showing or hiding the unit.
     *
     * @param value The value to convert.
     * @param showUnit Whether or not the unit should be added to the string.
     * @return The string representation of the input.
     */
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
        if (showUnit && this.unit !== OutputUnit.NONE && value.isValid) {
            var group = value.group;
            out += this.unitSpacer;
            if (this.isLongUnit(value)) {
                out += Functions.isSingular(value.value) ? group.singularLong : group.pluralLong;
            }
            else if (this.isShortUnit(value) || (group && group.dynamic)) {
                out += Functions.isSingular(value.value) ? group.singularShort : group.pluralShort;
            }
            else {
                out += value.unit;
            }
        }
        return out;
    };
    /**
     * Converts the number to a string.
     *
     * @param x The number to convert.
     * @return The string representation of the input.
     */
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
    /**
     * Determines whether the value should be displayed as a fraction.
     *
     * @param value The value to look at.
     * @return True if the value should be displayed as a fraction, otherwise false.
     */
    Output.prototype.isFraction = function (value) {
        return value.isFraction && this.format !== OutputFormat.NUMBER;
    };
    /**
     * Determines whether the value should be displayed as a number.
     *
     * @param value The value to look at.
     * @return True if the value should be displayed as a number, otherwise false.
     */
    Output.prototype.isNumber = function (value) {
        return value.isValid && !this.isFraction(value);
    };
    /**
     * Determines whether the value should be displayed as a mixed fraction. This
     * assumes [[Output.isFraction]] was already checked and returned true.
     *
     * @param value The value to look at.
     * @return True if the value should be displayed as a mixed fraction, otherwise false.
     */
    Output.prototype.isMixed = function (value) {
        return value.mixedWhole !== 0 && this.format !== OutputFormat.IMPROPER;
    };
    /**
     * Determines whether the short unit should be displayed.
     *
     * @param value The value to look at.
     * @return True if the short unit should be displayed, otherwise false.
     */
    Output.prototype.isShortUnit = function (value) {
        return value.group && this.unit === OutputUnit.SHORT;
    };
    /**
     * Determines whether the long unit should be displayed.
     *
     * @param value The value to look at.
     * @return True if the short unit should be displayed, otherwise false.
     */
    Output.prototype.isLongUnit = function (value) {
        return value.group && this.unit === OutputUnit.LONG;
    };
    return Output;
}());


// CONCATENATED MODULE: ./src/Transform.ts



/**
 * THe class which controls which units and values are acceptable when
 * transforming a set of ranges.
 *
 * @see [[Base.normalize]]
 * @see [[Base.compact]]
 * @see [[Base.expand]]
 * @see [[Base.conversions]]
 * @see [[Base.filter]]
 */
var Transform_Transform = (function () {
    /**
     * Creates a new instance of Transform with an optional set of options to
     * override the default values.
     *
     * @param input The options to apply to the new instance.
     */
    function Transform(input) {
        /**
         * The option which determines whether only common or any group are valid.
         * To only include common units this value must be `true` and to include
         * common and uncommon this value must be `false`.
         */
        this.common = true;
        /**
         * The desired system for the transformation.
         */
        this.system = System.GIVEN;
        /**
         * The mimimum allowed value for the transformation.
         */
        this.min = -Number.MAX_VALUE;
        /**
         * The maximum allowed value for the transformation.
         */
        this.max = Number.MAX_VALUE;
        /**
         * Whether the minimum or maximum value of a range is used when producing
         * conversions.
         */
        this.convertWithMax = true;
        /**
         * Whether ranges without units are considered valid for the transformation.
         */
        this.groupless = true;
        if (Functions.isDefined(input)) {
            this.set(input);
        }
    }
    /**
     * Overrides values in this instance with ones specified in input.
     *
     * @param input The values to override.
     * @return The reference to this instance.
     */
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
    /**
     * Returns a Transform instance which matches the desired options. If no
     * options are specified the reference to this instance is returned. If the
     * options are already an instance of Transform its returned. If options are
     * specified a new instance is created with the options of this instance, and
     * the given options applied with [[Transform.set]].
     *
     * @param input The options desired.
     * @return An instance of this class which matches the desired options.
     */
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
    /**
     * Determines whether the given range is valid according to this instance.
     *
     * @param range The range to test.
     * @return True if the range matches this transform, otherwise false.
     */
    Transform.prototype.isValidRange = function (range) {
        if (range.max.value < this.min) {
            return false;
        }
        if (range.min.value > this.max) {
            return false;
        }
        var group = this.convertWithMax ? range.max.group : range.min.group;
        return this.isVisibleGroup(group);
    };
    /**
     * Determines whether the given group (and optionally a current group) is
     * valid or visible according to this instance.
     *
     * @param group The group to test.
     * @param givenGroup The current group if available.
     * @return True if the group matches this transform, otherwise false.
     */
    Transform.prototype.isVisibleGroup = function (group, givenGroup) {
        if (!group) {
            return this.groupless;
        }
        return this.isCommonMatch(group) &&
            this.isSystemMatch(group, givenGroup) &&
            this.isUnitMatch(group) &&
            this.isClassMatch(group.parent);
    };
    /**
     * Determines whether the given group matches the common option on this
     * instance.
     *
     * @param group The group to test.
     * @return True if the group matches the common option, otherwise false.
     */
    Transform.prototype.isCommonMatch = function (group) {
        return !this.common || group.common;
    };
    /**
     * Determines whether the given group (and optionally a current group)
     * matches the system option on this instance.
     *
     * @param group The group to test.
     * @param givenGroup The current group if available.
     * @return True if the group matches ths system option, otherwise false.
     */
    Transform.prototype.isSystemMatch = function (group, givenGroup) {
        switch (this.system) {
            case System.METRIC:
                return group.system === System.METRIC || group.system === System.ANY;
            case System.US:
                return group.system === System.US || group.system === System.ANY;
            case System.NONE:
                return false;
            case System.ANY:
                return true;
            case System.GIVEN:
                return !givenGroup || group.baseUnit === givenGroup.baseUnit;
        }
        return false;
    };
    /**
     * Determines whether the given class matches the classes options on this
     * instance.
     *
     * @param parent The class to test.
     * @return True if the class matches the classes options, otherwise false.
     */
    Transform.prototype.isClassMatch = function (parent) {
        if (this.onlyClasses) {
            return this.onlyClasses.indexOf(parent.name) !== -1;
        }
        if (this.notClasses) {
            return this.notClasses.indexOf(parent.name) === -1;
        }
        return true;
    };
    /**
     * Determines whether the given group matches the unit options on this
     * instance.
     *
     * @param group The group to test.
     * @return True if the group matches the unit options, otherwise false.
     */
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


/**
 * The enumeration which decides what value in a range should be used when
 * sorting between ranges with differing minimum and maximum values.
 */
var SortType;
(function (SortType) {
    /**
     * This value will use the minimum of the ranges to sort by.
     */
    SortType[SortType["MIN"] = 0] = "MIN";
    /**
     * This value will use the maximum of the ranges to sort by.
     */
    SortType[SortType["MAX"] = 1] = "MAX";
    /**
     * This value will use the average of the ranges to sort by.
     */
    SortType[SortType["AVERAGE"] = 2] = "AVERAGE";
})(SortType = SortType || (SortType = {}));
/**
 * The class which determines how to sort ranges.
 */
var Sort_Sort = (function () {
    /**
     * Creates a new instance of Sort with an optional set of options to override
     * the default values.
     *
     * @param input The options to apply to the new instance.
     */
    function Sort(input) {
        /**
         * If the ranges should be in ascending order (small values followed by large
         * values). The default value is in descending order.
         */
        this.ascending = false;
        /**
         * How ranges should be compared when the minimum and maximum values differ.
         */
        this.type = SortType.MAX;
        /**
         * This object describes how ranges of different classes should be sorted by
         * given each class a priority. If a class is not defined here the priority
         * assumed is zero.
         */
        this.classes = {};
        if (Functions.isDefined(input)) {
            this.set(input);
        }
    }
    /**
     * Overrides values in this instance ith ones specified in the input. If class
     * sorting options are specified they are merged into this instance as opposed
     * to a complete overwrite.
     *
     * @param input The values to override.
     * @return The reference to this instance.
     */
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
    /**
     * Returns a Sort instance which matches the desired options. If no options
     * are specified the reference to this instance is returned. If the options
     * are already an instance of Sort its returned. If options are specified
     * a new instance is created with the options of this instance, and the given
     * options applied with [[Sort.set]].
     *
     * @param input The options desired.
     * @return An instance of this class which matches the desired options.
     */
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
    /**
     * Returns a function which can sort ranges based on the options in this
     * instance. Comparison is first done by class, and followed by type.
     */
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
    /**
     * A sort function between two ranges which look at the range minimums.
     *
     * @param a The first range.
     * @param b The second range.
     * @see [[Sorter]]
     */
    Sort.prototype.getMinComparison = function (a, b) {
        return Functions.sign(a.min.classScaled - b.min.classScaled);
    };
    /**
     * A sort function between two ranges which look at the range maximums.
     *
     * @param a The first range.
     * @param b The second range.
     * @see [[Sorter]]
     */
    Sort.prototype.getMaxComparison = function (a, b) {
        return Functions.sign(a.max.classScaled - b.max.classScaled);
    };
    /**
     * A sort function between two ranges which look at the range averages.
     *
     * @param a The first range.
     * @param b The second range.
     * @see [[Sorter]]
     */
    Sort.prototype.getAverageComparison = function (a, b) {
        var avg = (a.min.classScaled + a.max.classScaled) * 0.5;
        var bvg = (b.min.classScaled + b.max.classScaled) * 0.5;
        return Functions.sign(avg - bvg);
    };
    /**
     * A sort function between two ranges which look at the range classes.
     *
     * @param a The first range.
     * @param b The second range.
     * @see [[Sorter]]
     */
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







/**
 * The global class which keeps track of all unit mappings and global options.
 *
 * This class is also responsible for creating dynamic classes and groups based
 * on approximation when a desired unit is not defined by the developer.
 */
var Core_Core = (function () {
    function Core() {
    }
    /**
     * Returns a [[Group]] instance mapped by the given unit. If no unit is given
     * `null` is returned. If the unit isn't mapped to a group a dynamic group
     * match is looked at and if none are found and `createDynamic` is true a new
     * dynamic group is created.
     *
     * @param unit The unit of the group to get.
     * @param createDynamic If creating a dynamic group should be created if an
     *  existing group could not be found.
     * @return The group matched to the unit or null if none was found.
     * @see [[Core.getDynamicMatch]]
     * @see [[Core.addDynamicUnit]]
     * @see [[Core.newDynamicGroup]]
     */
    Core.getGroup = function (unit, createDynamic) {
        if (createDynamic === void 0) { createDynamic = true; }
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
        if (!createDynamic) {
            return null;
        }
        var dynamicUnit = Core.getDynamicMatch(unit);
        var dynamicGroup = Core.dynamicMatches[dynamicUnit];
        if (dynamicGroup) {
            return Core.addDynamicUnit(unit, dynamicGroup);
        }
        return Core.newDynamicGroup(unit);
    };
    /**
     * Sets the given unit as the preferred unit for the group it belongs to. If a
     * group is not found then this has no affect.
     *
     * @param unit The unit to mark as the preferred unit.
     * @see [[Core.getGroup]]
     */
    Core.setPreferred = function (unit) {
        var group = this.getGroup(unit, false);
        if (group) {
            group.setPreferred(unit);
        }
    };
    /**
     * Sets whether the group associated with the given unit is common. A common
     * group is one a user is familiar with and would be okay seeing values
     * represented in. If a group is not found then this has no affect.
     *
     * @param unit The unit of a group to set the common flag.
     * @param common Whether the associated group should be common.
     * @see [[Core.getGroup]]
     */
    Core.setCommon = function (unit, common) {
        if (common === void 0) { common = true; }
        var group = this.getGroup(unit, false);
        if (group) {
            group.setCommon(common);
        }
    };
    /**
     * Sets the denominators for the group associated to the given unit.
     * Denominators are useful for calculating a fraction from a value.
     *
     * @param unit The unit of a group to set the denominators of.
     * @param denominators The new denominators for the group.
     * @see [[Core.getGroup]]
     */
    Core.setDenominators = function (unit, denominators) {
        var group = this.getGroup(unit, false);
        if (group) {
            group.setDenominators(denominators);
        }
    };
    /**
     * Adds the given class and all groups and units to the global state. If there
     * are units mapped to other groups they are overwritten by the units in the
     * given class.
     *
     * @param parent The class to add to the global state.
     */
    Core.addClass = function (parent) {
        this.classMap[parent.name] = parent;
        this.classes.push(parent);
        var groups = parent.groupMap;
        for (var unit in groups) {
            this.unitToGroup[unit] = groups[unit];
        }
    };
    /**
     * Adds an array of classes to the global state.
     *
     * @see [[Core.addClass]]
     */
    Core.addClasses = function () {
        var classes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            classes[_i] = arguments[_i];
        }
        for (var i = 0; i < classes.length; i++) {
            this.addClass(classes[i]);
        }
    };
    /**
     * Adds the unit to the given dynamic group. This function also updates the
     * plurality of all the units currently in the group.
     *
     * @param unit The unit to add to the given group.
     * @param group The dynamically created group.
     * @return The instance of the given group.
     */
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
    /**
     * Creates a dynamic class & group based on the given unit and adds it to the
     * global state. By default the group is marked with [[System.ANY]], is
     * common, and has the valid denominators 2, 3, 4, 5, 6, 8, 10.
     *
     * @param unit The initial unit of the group to use as the name of the class
     *  and the base unit of the group.
     * @return An instance of a new Group with a new parent Class.
     */
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
    /**
     * The function which takes a unit and generates a string which should be used
     * to mark similarly spelled units under the same dynamic group.
     *
     * @param unit The unit to build a key from.
     * @return The key which identifies the dynamic group.
     */
    Core.getDynamicMatch = function (unit) {
        return unit.substring(0, this.dynamicMatchLength).toLowerCase();
    };
    /**
     * The function which takes to values and determines which one is more
     * "normal" or "human friendly".
     *
     * @param fromValue The most normal value found so far.
     * @param toValue The value to compare to.
     * @param transform The transformation rules to guide the function to choose
     *  the more normal value.
     * @param forOutput The output options to guide the function to choose the
     *  more normal value.
     * @return True if `toValue` appears more normal than `fromValue`.
     */
    // @ts-ignore
    Core.isMoreNormal = function (fromValue, toValue, transform, forOutput) {
        var fromString = forOutput.value(fromValue);
        var toString = forOutput.value(toValue);
        return toString.length <= fromString.length;
    };
    /**
     * The map of defined classes by their name.
     */
    Core.classMap = {};
    /**
     * An array of the defined classes.
     */
    Core.classes = [];
    /**
     * A map of groups by their acceptable units.
     */
    Core.unitToGroup = {};
    /**
     * A list of dynamically created groups based on units specified by a user
     * which are not defined by the developer.
     */
    Core.dynamicGroups = [];
    /**
     * A map of the dynamically created groups by a key determined by
     * [[Core.getDynamicMatch]].
     */
    Core.dynamicMatches = {};
    /**
     * Dynamic groups are mapped together (by default) by looking at the first few
     * characters.
     *
     * @see [[Core.getDynamicMatch]]
     */
    Core.dynamicMatchLength = 3;
    /**
     * The global options used for outputting [[Base]], [[Range]], and [[Value]]s
     * which may be overridden by specifying any number of options.
     *
     * @see [[Base.output]]
     * @see [[Range.output]]
     * @see [[Value.output]]
     */
    Core.globalOutput = new Output_Output();
    /**
     * The global transform options used for transforming a [[Base]] instance
     * by specifying what sort of units/groups are visible to the user.
     *
     * @see [[Base.normalize]]
     * @see [[Base.compact]]
     * @see [[Base.expand]]
     * @see [[Base.conversions]]
     * @see [[Base.filter]]
     */
    Core.globalTransform = new Transform_Transform();
    /**
     * The global sort options used for ordering ranges in a [[Base]] instance.
     *
     * @see [[Base.sort]]
     */
    Core.globalSort = new Sort_Sort();
    return Core;
}());


// CONCATENATED MODULE: ./src/Value.ts



/**
 * A class which contains a parsed number or fraction.
 */
var Value_Value = (function () {
    /**
     * Creates a new instance of Value given the value, possible numerator and
     * denominator, and the unit and it's group.
     *
     * @param value [[Value.value]]
     * @param num [[Value.num]]
     * @param den [[Value.den]]
     * @param unit [[Value.unit]]
     * @param group [[Value.group]]
     */
    function Value(value, num, den, unit, group) {
        var divisor = Functions.gcd(num, den);
        this.value = value;
        this.num = num / divisor;
        this.den = den / divisor;
        this.unit = unit;
        this.group = group;
    }
    Object.defineProperty(Value.prototype, "isValid", {
        /**
         * Returns true if this value was successfully parsed from some input.
         */
        get: function () {
            return isFinite(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "isFraction", {
        /**
         * Returns true if this value is a fraction with a numerator and denoninator.
         */
        get: function () {
            return this.den !== 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "isDecimal", {
        /**
         * Returns true if this value is a number and not a fraction.
         */
        get: function () {
            return this.den === 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "isZero", {
        /**
         * Returns true if this value is zero.
         */
        get: function () {
            return Functions.isZero(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "isSingular", {
        /**
         * Returns true if this value is singular.
         *
         * @see [[Functions.isSingular]]
         */
        get: function () {
            return Functions.isSingular(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "scaled", {
        /**
         * Returns the number of this value relative to the base unit.
         */
        get: function () {
            return this.group ? this.value * this.group.baseScale : this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "classScaled", {
        /**
         * Returns the number of this value relative to the first base unit of it's
         * class.
         */
        get: function () {
            return this.group ? this.value * this.group.classScale : this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "calculated", {
        /**
         * Returns the number which represents the fraction in the value. There may
         * be a difference between this value and the number when the fraction is
         * calculated from the denominators of the group.
         */
        get: function () {
            return this.num / this.den;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "mixedWhole", {
        /**
         * Returns the whole number for the mixed fraction of this value. If this
         * value is not a fraction 0 is returned.
         */
        get: function () {
            return this.den !== 1 ? Math.floor(this.num / this.den) : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "mixedNum", {
        /**
         * Returns the numerator for the mixed fraction of this value. If this value
         * is not a fraction then the numerator is returned.
         */
        get: function () {
            return this.den !== 1 ? this.num % this.den : this.num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "floor", {
        /**
         * Returns the floor of the number in this value.
         */
        get: function () {
            return Math.floor(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "ceil", {
        /**
         * Returns the ceiling of the number in this value.
         */
        get: function () {
            return Math.ceil(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "truncate", {
        /**
         * Returns the truncated number in this value taking into account it's sign.
         */
        get: function () {
            return this.value < 0 ? this.ceil : this.floor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "remainder", {
        /**
         * Returns the fractional part of the number in this value.
         */
        get: function () {
            return this.value - this.floor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "error", {
        /**
         * Returns the signed distance the number of this value is from the fraction
         * numerator and denominator determined. If this value is not a fraction then
         * this should return zero.
         */
        get: function () {
            return this.calculated - this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Value.prototype, "distance", {
        /**
         * Returns the absolute distance the number of this value is from the fraction
         * numerator and denominator determined. If this value is not a fraction then
         * this should return zero.
         */
        get: function () {
            return Functions.abs(this.error);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a version of this value with the preferred unit.
     *
     * @return A new value or the reference to this instance if it's groupless.
     * @see [[Group.preferredUnit]]
     */
    Value.prototype.preferred = function () {
        return this.group ? new Value(this.value, this.num, this.den, this.group.preferredUnit, this.group) : this;
    };
    /**
     * Returns a copy of this value.
     *
     * @return A new value.
     */
    Value.prototype.copy = function () {
        return new Value(this.value, this.num, this.den, this.unit, this.group);
    };
    /**
     * Returns a value equivalent to zero with the unt and group of this instance.
     *
     * @return A new value.
     */
    Value.prototype.zero = function () {
        return new Value(0, 0, 1, this.unit, this.group);
    };
    /**
     * Returns the truncated version of this value. That's a value where the
     * number is a whole number.
     *
     * @return A new value.
     */
    Value.prototype.truncated = function () {
        return new Value(this.truncate, this.truncate, 1, this.unit, this.group);
    };
    /**
     * Returns a version of this value as a fraction.
     *
     * @return A new value or the reference to this instance if it's a fraction.
     */
    Value.prototype.fractioned = function () {
        if (this.isFraction) {
            return this;
        }
        if (this.group) {
            return Value.fromNumberWithDenominators(this.value, this.group.denominators, this.unit, this.group);
        }
        return this;
    };
    /**
     * Returns a version of this value as a number.
     *
     * @return A new value or the reference to this instance if it's a number.
     */
    Value.prototype.numbered = function () {
        if (this.isFraction) {
            return new Value(this.value, this.value, 1, this.unit, this.group);
        }
        return this;
    };
    /**
     * Converts this value to the given group and returns the result.
     *
     * @param to The group to convert to.
     * @return The converted value or the number of this value if there's no group.
     */
    Value.prototype.convertTo = function (to) {
        var group = this.group;
        return group ? group.parent.convert(this.value, group, to) : this.value;
    };
    /**
     * Converts this value to the given group and returns a new value. The new
     * value will attempted to be converted to a fraction.
     *
     * @param group The group to convert to.
     * @return A new value.
     */
    Value.prototype.convertToValue = function (group) {
        return Value.fromNumberForGroup(this.convertTo(group), group);
    };
    /**
     * Determines the available conversions of this value for all groups
     * that are valid for the given transform.
     *
     * @param transform Transform which controls the units and values acceptable.
     * @param reverse Whether to iterate from largest units to smallest units
     *  (`true`), or from smallest to largest (`false`).
     * @param callback The function to invoke for each valid conversion.
     * @param callback.transformed The conversion calculated.
     * @param callback.index The index of the conversion during iteration.
     * @see [[Group.matches]]
     */
    Value.prototype.conversions = function (transform, reverse, callback) {
        var _this = this;
        if (this.group) {
            this.group.matches(transform, reverse, function (group, index) {
                callback(_this.convertToValue(group), index);
            });
        }
    };
    /**
     * Returns a value based on this value with the unit that best represents the
     * value. What is best is typically related to the magnitude of the value.
     * Really small and really large values are harder for people to comprehend so
     * the unit which results in the most normal looking value is determined.
     *
     * @param transform Transform which controls the units and values acceptable.
     * @param forOutput The output that may be used so the most normal looking
     *  value can be determined.
     * @return The most normal value found.
     * @see [[Value.conversions]]
     * @see [[Core.isMoreNormal]]
     */
    Value.prototype.normalize = function (transform, forOutput) {
        var closest;
        this.conversions(transform, false, function (convert) {
            var acceptable = !forOutput.isNumber(convert);
            if (!acceptable) {
                var number = forOutput.number(convert.value);
                acceptable = number !== '0';
            }
            if (acceptable) {
                if (!closest || Core_Core.isMoreNormal(closest, convert, transform, forOutput)) {
                    closest = convert;
                }
            }
        });
        return closest || this;
    };
    /**
     * Calculates the sum of this value and the given addend scaled by some
     * factor. This is equivalent to `result = this + (addend * scale)`.
     *
     * @param addend The value to add to this.
     * @param scale The factor to scale the addend by before adding it to this.
     * @return A new instance.
     */
    Value.prototype.add = function (addend, scale) {
        if (scale === void 0) { scale = 1; }
        var num = this.num * addend.den + addend.num * this.den * scale;
        var den = this.den * addend.den;
        var result = this.value + addend.value * scale;
        return new Value(result, num, den, this.unit, this.group);
    };
    /**
     * Calculates the difference between this value and the subtrahend scaled by
     * some factor. This is equivalent to `result = this - (subtrahend * scale)`.
     *
     * @param subtrahend The value to subtract from this.
     * @param scale The factor to scale the subtrahend by before subtraction.
     * @return A new instance.
     */
    Value.prototype.sub = function (subtrahend, scale) {
        if (scale === void 0) { scale = 1; }
        var num = this.num * subtrahend.den - subtrahend.num * this.den * scale;
        var den = this.den * subtrahend.den;
        var result = this.value - subtrahend.value * scale;
        return new Value(result, num, den, this.unit, this.group);
    };
    /**
     * Calculates a new value by multiplying this by a given factor. This is
     * equivalent to `result = this * scale`.
     *
     * @param scale The factor to scale this instance by.
     * @return A new instance.
     */
    Value.prototype.scale = function (scale) {
        return new Value(this.value * scale, this.num * scale, this.den, this.unit, this.group);
    };
    /**
     * Calculates a new value by multiplying this by a given value. This is
     * equivalent to `result = this * scale`.
     *
     * @param scale The value to scale this instance by.
     * @return A new instance.
     */
    Value.prototype.mul = function (scale) {
        return new Value(this.value * scale.value, this.num * scale.num, this.den * scale.den, this.unit, this.group);
    };
    /**
     * Converts this value to a string with the given output options taking into
     * account the global options.
     *
     * @param options The options to override the global output options.
     * @return The string representation of this instance.
     * @see [[Output]]
     */
    Value.prototype.output = function (options) {
        var output = Core_Core.globalOutput.extend(options);
        return output.value(this);
    };
    /**
     * Returns a Value instance which is a number with the optional unit and group.
     *
     * @param value The number.
     * @param unit The unit, if any, of the number.
     * @param group The group which matches the unit.
     * @return A new instance.
     */
    Value.fromNumber = function (value, unit, group) {
        if (unit === void 0) { unit = ''; }
        if (group === void 0) { group = null; }
        return new Value(value, value, 1, unit, group);
    };
    /**
     * Returns a Value instance which tries to be a fraction given a range of
     * denominators. If the number is already whole or a fraction close
     * enough to the number cannot be found a value which is a number is returned.
     *
     * @param value The number to try to find a fraction for.
     * @param unit The unit, if any, of the number.
     * @param group The group which matches the unit.
     * @param minDen The starting denominator to inclusively try.
     * @param maxDen The last denominator to inclusively try.
     * @return A new instance.
     */
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
    /**
     * Returns a Value instance which tries to be a fraction based on the
     * denominators of the group. If a valid fraction could not be found then the
     * instance returned will be a number value. Since a unit is not passed here,
     * the preferred unit of the group is used as the unit of the value.
     *
     * @param value The number to try to find a fraction for.
     * @param group The group for the unit and also the denominators to try.
     * @return A new instance.
     */
    Value.fromNumberForGroup = function (value, group) {
        return this.fromNumberWithDenominators(value, group.denominators, group.preferredUnit, group);
    };
    /**
     * Returns a Value instance which tries to be a fraction based on the
     * denominators of the group. If a valid fraction could not be found then the
     * instance returned will be a number value.
     *
     * @param value The number to try to find a fraction for.
     * @param denominators The array of denominators to try.
     * @param unit The unit, if any, of the number.
     * @param group The group which matches the unit.
     * @return A new instance.
     */
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
    /**
     * Returns a Value instance for a given fraction specified by a numerator and
     * denominator.
     *
     * @param num The numerator of the fraction.
     * @param den The denominator of the fraction.
     * @param unit The unit, if any, of the fraction.
     * @param group The group which matches the unit.
     * @return A new instance.
     */
    Value.fromFraction = function (num, den, unit, group) {
        if (unit === void 0) { unit = ''; }
        if (group === void 0) { group = null; }
        return new Value(num / den, num, den, unit, group);
    };
    /**
     * A value instance which contains invalid numbers.
     */
    Value.INVALID = new Value(Number.NaN, Number.NaN, 1, '', null);
    return Value;
}());


// CONCATENATED MODULE: ./src/Range.ts




/**
 * A pair of minimum and maximum values. A range can be fixed which means the
 * minimum and maximum are equivalent - in which case the range behaves like
 * a [[Value]].
 */
var Range_Range = (function () {
    /**
     * Creates a new instance of Range given the minimum and maximum values.
     *
     * @param min The minimum value for the range.
     * @param max The maximum value for the range.
     */
    function Range(min, max) {
        this.min = min.value < max.value ? min : max;
        this.max = max.value > min.value ? max : min;
    }
    Object.defineProperty(Range.prototype, "isValid", {
        /**
         * True if the min and max are both valid.
         */
        get: function () {
            return this.min.isValid && this.max.isValid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "isFraction", {
        /**
         * True if the min or max are a fraction.
         */
        get: function () {
            return this.min.isFraction || this.max.isFraction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "isDecimal", {
        /**
         * True if the min and max are decimal.
         */
        get: function () {
            return this.min.isDecimal && this.max.isDecimal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "isRange", {
        /**
         * True if the min and max are not the same value.
         */
        get: function () {
            return this.min.value !== this.max.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "isFixed", {
        /**
         * True if the min and max are the same value.
         */
        get: function () {
            return this.min.value === this.max.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "isZero", {
        /**
         * True if the min and max are both equal to zero.
         */
        get: function () {
            return this.min.isZero && this.max.isZero;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "isSingular", {
        /**
         * True if the min and max are both singular (1 or -1).
         */
        get: function () {
            return this.min.isSingular && this.max.isSingular;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "average", {
        /**
         * The average number between the min and max.
         */
        get: function () {
            return (this.min.value + this.max.value) * 0.5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "value", {
        /**
         * The minimum value of this range.
         */
        get: function () {
            return this.min.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "minimum", {
        /**
         * The minimum value of this range.
         */
        get: function () {
            return this.min.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "maximum", {
        /**
         * The maximum value of this range.
         */
        get: function () {
            return this.max.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Range.prototype, "unit", {
        /**
         * The unit which identifies the group of the minimum value or `null` if the
         * minimum value does not have a group.
         */
        get: function () {
            return this.min.group ? this.min.group.unit : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Determines if the given range matches this range enough to provide a
     * mathematical operation between the two ranges.
     *
     * @param range The range to test.
     * @return True if the groups of the given range match this range.
     */
    Range.prototype.isMatch = function (range) {
        return this.min.group === range.min.group &&
            this.max.group === range.max.group;
    };
    /**
     * @return A range which has the min and max converted to their preferred units.
     * @see [[Value.preferred]]
     */
    Range.prototype.preferred = function () {
        var min = this.min.preferred();
        var max = this.max.preferred();
        return new Range(min, max);
    };
    /**
     * @return A range which has only positive values. If the range is entirely
     *  negative then `null` is returned.
     */
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
    /**
     * @return A range which has only negative values. If the range is entirely
     *  positive then `null` is returned.
     */
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
    /**
     * @return A range which has a non-zero min and max. If both are equial to
     *  zero then `null` is returned.
     */
    Range.prototype.nonzero = function () {
        var minZero = Functions.isZero(this.min.value);
        var maxZero = Functions.isZero(this.max.value);
        if (minZero && maxZero) {
            return null;
        }
        var min = this.min.copy();
        var max = this.max.copy();
        return new Range(min, max);
    };
    /**
     * @return A range with only the maximum value from this range.
     */
    Range.prototype.maxd = function () {
        var fixed = this.max.copy();
        return new Range(fixed, fixed);
    };
    /**
     * @return A range with only the minimum value from this range.
     */
    Range.prototype.mind = function () {
        var fixed = this.min.copy();
        return new Range(fixed, fixed);
    };
    /**
     * Creates a range with with units that best represent the values. This may
     * cause the minimum and maximum values to have different units.
     *
     * @param transform Options to control which units and values are acceptable.
     * @param forOutput The output options that should be used to determine which
     *  value & unit is best.
     * @return A new range.
     * @see [[Value.normalize]]
     */
    Range.prototype.normalize = function (transform, forOutput) {
        var min = this.min.normalize(transform, forOutput);
        var max = this.max.normalize(transform, forOutput);
        return new Range(min, max);
    };
    /**
     * Adds this range and a given range (optionally scaled by a factor) together.
     *
     * @param addend The range to add to this instance.
     * @param scale The factor to multiply the addend by when added it to this
     *  instance.
     * @return a new range.
     * @see [[Value.add]]
     */
    Range.prototype.add = function (addend, scale) {
        if (scale === void 0) { scale = 1; }
        var min = this.min.add(addend.min, scale);
        var max = this.max.add(addend.max, scale);
        return new Range(min, max);
    };
    /**
     * Subtracts a given range (optionally scaled by a factor) from this range.
     *
     * @param subtrahend The range to remove from this instance.
     * @param scale The factor to multiply the subtrahend by when subtracting it
     *  from this instance.
     * @return A new range.
     * @see [[Value.sub]]
     */
    Range.prototype.sub = function (subtrahend, scale) {
        if (scale === void 0) { scale = 1; }
        var min = this.min.sub(subtrahend.min, scale);
        var max = this.max.sub(subtrahend.max, scale);
        return new Range(min, max);
    };
    /**
     * Multiplies this range by a scalar factor.
     *
     * @param scale The amount to multiply the range by.
     * @return A new range.
     * @see [[Value.scale]]
     */
    Range.prototype.scale = function (scale) {
        var min = this.min.scale(scale);
        var max = this.max.scale(scale);
        return new Range(min, max);
    };
    /**
     * Multiplies this range by a scale value.
     *
     * @param scale The amount to multiply the range by.
     * @return A new range.
     * @see [[Value.mul]]
     */
    Range.prototype.mul = function (scale) {
        var min = this.min.mul(scale);
        var max = this.max.mul(scale);
        return new Range(min, max);
    };
    /**
     * Returns a range which is coerced into being represented by fractions if a
     * valid fraction can be determined from the units valid denominators.
     *
     * @return A new range if the minimum and maximum are not fractions, otherwise
     *  the reference to this range is returned.
     * @see [[Value.fractioned]]
     */
    Range.prototype.fractioned = function () {
        if (this.min.isFraction && this.max.isFraction) {
            return this;
        }
        var min = this.min.fractioned();
        var max = this.max.fractioned();
        return new Range(min, max);
    };
    /**
     * Returns a range which has any fraction values converted to numbers.
     *
     * @return A new range if the mimimum or maximum are fractions, otherwise the
     *  the reference to this range is returned.
     * @see [[Value.numbered]]
     */
    Range.prototype.numbered = function () {
        if (!this.min.isFraction && !this.max.isFraction) {
            return this;
        }
        var min = this.min.numbered();
        var max = this.max.numbered();
        return new Range(min, max);
    };
    /**
     * Converts this range to a string with the given output options taking into
     * account the global options.
     *
     * @param options The options to override the global output options.
     * @return The string representation of this instance.
     * @see [[Output]]
     */
    Range.prototype.output = function (options) {
        var output = Core_Core.globalOutput.extend(options);
        return output.range(this);
    };
    /**
     * Creates a fixed range from a given value. A fixed range behaves essentially
     * as a value since the minimum and maximum are equivalent.
     *
     * @param fixed The value to be used as the min and max of the range.
     * @return A new fixed range.
     */
    Range.fromFixed = function (fixed) {
        return new Range(fixed, fixed);
    };
    /**
     * A range instance which contains invalid values.
     */
    Range.INVALID = new Range(Value_Value.INVALID, Value_Value.INVALID);
    return Range;
}());


// CONCATENATED MODULE: ./src/Base.ts






/**
 * Takes user input and returns a new instance of [Base].
 */
function uz(input) {
    return new Base_Base(input);
}
/**
 * The main class which contains a list of ranges and the user input.
 */
var Base_Base = (function () {
    /**
     * Creates a new instance of Base given some user input to parse or an
     * existing list of ranges to use instead.
     *
     * @param input The input to parse if ranges is not provided.
     * @param ranges The already parsed ranges to use for this instance.
     */
    function Base(input, ranges) {
        this.input = input;
        this.ranges = ranges || Parse_Parse.ranges(input, Core_Core.getGroup);
    }
    /**
     * Scales the ranges in this instance by the given factor and returns a
     * new instance.
     *
     * *For example:*
     * ```javascript
     * uz('1c, 2.3m').scale(2); // '2c, 4.6m'
     * ```
     *
     * @param amount The factor to scale the ranges in this instance by.
     * @return A new instance.
     * @see [[Range.scale]]
     * @see [[Base.mutate]]
     */
    Base.prototype.scale = function (amount) {
        return this.mutate(function (r) { return r.scale(amount); });
    };
    /**
     * Scales the ranges in this instance by the given value and returns a
     * new instance.
     *
     * *For example:*
     * ```javascript
     * uz('1c, 3/5m').scale(Value.fromFraction(2, 3)); // '2/3c, 6/15m'
     * ```
     *
     * @param amount The value to scale the ranges in this instance by.
     * @return A new instance.
     * @see [[Range.mul]]
     * @see [[Base.mutate]]
     */
    Base.prototype.mul = function (amount) {
        return this.mutate(function (r) { return r.mul(amount); });
    };
    // 1c, 3m SCALE TO 1/2c = 1/2c, 1.5m
    /**
     * Scales the ranges in this instance up to some value with a unit and returns
     * a new instance. Because this instance might contain ranges, a rangeDelta
     * can be specified to instruct on which value (min or max) to use when
     * calculating how much to scale by.
     *
     * *For example:*
     * ```javascript
     * uz('1m, 2 - 3c').scaleTo('6c'); // '2m, 4 - 6c'
     * uz('1m, 2 - 3c').scaleTo('6c', 0); // '3m, 6 - 9c'
     * uz('1m, 2 - 3c').scaleTo('6c', 0.5); // '2.4m, 4.8 - 6c'
     * ```
     *
     * @param unitValue A value & unit pair to scale the ranges in this instance to.
     * @param rangeDelta When this instance contains ranges this value instructs
     *  how the scale factor is calculated. A value of 0 means it looks at the
     *  minimum, 1 is the maximum, and 0.5 is the average.
     * @return A new instance.
     * @see [[Base.getScaleTo]]
     * @see [[Base.scale]]
     */
    Base.prototype.scaleTo = function (unitValue, rangeDelta) {
        if (rangeDelta === void 0) { rangeDelta = 1.0; }
        return this.scale(this.getScaleTo(unitValue, rangeDelta));
    };
    /**
     * Changes the units used on each of the ranges in this instance to the
     * preferred unit for each group.
     *
     * *For example:*
     * ```javascript
     * uz('5 kilos').preferred(); // '5 kg'
     * ```
     *
     * @return A new instance.
     * @see [[Core.setPreferred]]
     * @see [[Range.preferred]]
     * @see [[Base.mutate]]
     */
    Base.prototype.preferred = function () {
        return this.mutate(function (r) { return r.preferred(); });
    };
    /**
     * Drops negative ranges and modifies partially negative ranges so that all
     * values are greater than or equal to zero.
     *
     * *For example:*
     * ```javascript
     * uz('0c, 2tbsp, -4tbsp').positive(); // '0c, 2tbsp'
     * uz('-2 - 3 in').positive(); // '0 - 3in'
     * ```
     *
     * @return A new instance.
     * @see [[Range.positive]]
     * @see [[Base.mutate]]
     */
    Base.prototype.positive = function () {
        return this.mutate(function (r) { return r.positive(); });
    };
    /**
     * Drops positive ranges and modifies partially positive ranges so that all
     * values are less than zero.
     *
     * *For example:*
     * ```javascript
     * uz('0c, 2tbsp, -4tbsp').negative(); // '-4tbsp'
     * uz('-2 - 3 in').negative(); // '-2 - 0in'
     * ```
     *
     * @return A new instance.
     * @see [[Range.negative]]
     * @see [[Base.mutate]]
     */
    Base.prototype.negative = function () {
        return this.mutate(function (r) { return r.negative(); });
    };
    /**
     * Drops ranges that are equal to zero.
     *
     * *For example:*
     * ```javascript
     * uz('0c, 2tbsp').negative(); // '2tbsp'
     * ```
     *
     * @return A new instance.
     * @see [[Range.nonzero]]
     * @see [[Base.mutate]]
     */
    Base.prototype.nonzero = function () {
        return this.mutate(function (r) { return r.nonzero(); });
    };
    /**
     * Converts each range to fractions if a denominator for the specified units
     * yields a fraction close enough to the original value.
     *
     * *For example:*
     * ```javascript
     * uz('1/2 cup').fractions(); // '1/2 cup'
     * uz('0.3cm').fractions(); // '3/10 cm'
     * uz('0.33 decades').fractions(); // '0.33 decades' closest is 3/10 but that's not close enough
     * ```
     *
     * @return A new instance.
     * @see [[Range.fractioned]]
     * @see [[Base.mutate]]
     */
    Base.prototype.fractions = function () {
        return this.mutate(function (r) { return r.fractioned(); });
    };
    /**
     * Converts each range to numbers if they are fractions.
     *
     * *For example:*
     * ```javascript
     * uz('1/2 cup').fractions(); // '0.5 cup'
     * uz('0.3cm').fractions(); // '0.3 cm'
     * ```
     *
     * @return A new instance.
     * @see [[Range.numbered]]
     * @see [[Base.mutate]]
     */
    Base.prototype.numbers = function () {
        return this.mutate(function (r) { return r.numbered(); });
    };
    /**
     * Flattens any ranges to their maximum values.
     *
     * *For example:*
     * ```javascript
     * uz('1 - 3c, 5m').max(); // '3c, 5m'
     * ```
     *
     * @return A new instance or this if this instance has no ranges.
     * @see [[Range.maxd]]
     * @see [[Base.mutate]]
     */
    Base.prototype.max = function () {
        return this.hasRanges ? this.mutate(function (r) { return r.maxd(); }) : this;
    };
    /**
     * Flattens any ranges to their minimum values.
     *
     * *For example:*
     * ```javascript
     * uz('1 - 3c, 5m').max(); // '1c, 5m'
     * ```
     *
     * @return A new instance or this if this instance has no ranges.
     * @see [[Range.mind]]
     * @see [[Base.mutate]]
     */
    Base.prototype.min = function () {
        return this.hasRanges ? this.mutate(function (r) { return r.mind(); }) : this;
    };
    /**
     * Converts each range to units that best represent the value.
     *
     * *For example:*
     * ```javascript
     * uz('1.5pt, 12in, 3.14159rad').normalize(); // '3c, 1ft, 180deg'
     * ```
     *
     * @param options Options to control which units and values are acceptable.
     * @param forOutput The output options that should be used to determine which
     *  value & unit is best.
     * @return A new instance.
     * @see [[Transform]]
     * @see [[Output]]
     * @see [[Core.isMoreNormal]]
     * @see [[Core.globalTransform]]
     * @see [[Core.globalOutput]]
     * @see [[Range.normalize]]
     * @see [[Base.mutate]]
     */
    Base.prototype.normalize = function (options, forOutput) {
        var output = Core_Core.globalOutput.extend(forOutput);
        var transform = Core_Core.globalTransform.extend(options);
        return this.mutate(function (r) { return r.normalize(transform, output); });
    };
    /**
     * Joins all ranges of the same classes together and uses the largest unit
     * to represent the sum for the class.
     *
     * *For example:*
     * ```javascript
     * uz('1c, 1pt').compact(); // '1.5pt'
     * ```
     *
     * @param options Options to control which units and values are acceptable.
     * @return A new instance.
     * @see [[Transform]]
     * @see [[Core.globalTransform]]
     */
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
                    if (i !== 0) {
                        minSum = parent_1.convert(minSum, minGroupChosen, minGroup);
                    }
                    minGroupChosen = minGroup;
                }
                if (maxGroup.classScale > maxGroupChosen.classScale && transform.isVisibleGroup(maxGroup)) {
                    if (i !== 0) {
                        maxSum = parent_1.convert(maxSum, maxGroupChosen, maxGroup);
                    }
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
    /**
     * Joins all ranges of the same classes together and then separates them
     * into whole number ranges for better readability.
     *
     * *For example:*
     * ```javascript
     * uz('1.5pt').expand(); // '1pt, 1c'
     * uz('53in').expand(); // '4ft, 5in'
     * uz('2ft, 29in').expand(); // '4ft, 5in'
     * uz('6543mm').expand(); // '6 m, 54 cm, 3 mm'
     * ```
     *
     * @param options Options to control which units and values are acceptable.
     * @return A new instance.
     * @see [[Transform]]
     * @see [[Core.globalTransform]]
     */
    Base.prototype.expand = function (options) {
        var transform = Core_Core.globalTransform.extend(options);
        var compacted = this.compact(transform);
        var ranges = compacted.ranges;
        var expanded = [];
        var _loop_2 = function (i) {
            var range = ranges[i];
            var value = transform.convertWithMax ? range.max : range.min;
            var valueGroup = value.group;
            var valueSign = Functions.sign(value.value);
            if (valueGroup) {
                valueGroup.matches(transform, true, function (group) {
                    if (!Functions.isZero(value.value)) {
                        var transformed = value.convertToValue(group);
                        if (group.isBase) {
                            value = value.zero();
                            expanded.push(Range_Range.fromFixed(transformed));
                        }
                        else if (Functions.abs(transformed.value) >= 1 && Functions.sign(transformed.value) === valueSign) {
                            var truncated = transformed.truncated();
                            value = value.sub(truncated.convertToValue(valueGroup));
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
    /**
     * Adds the ranges of this instance and the given input together. When the
     * ranges use the same units they are added together, otherwise they are
     * added to the end of the range list.
     *
     * *For example:*
     * ```javascript
     * uz('1pt').add('2pt, 1c'); // '3pt, 1c'
     * uz('1pt').add('2pt, 1c', 2); // '5pt, 2c'
     * ```
     *
     * @param input An instance or input which can be parsed into an instance.
     * @param scale A number to multiple the input by when adding it to this instance.
     * @return A new instance.
     * @see [[Base.operate]]
     * @see [[Range.add]]
     * @see [[Range.scale]]
     */
    Base.prototype.add = function (input, scale) {
        if (scale === void 0) { scale = 1; }
        return this.operate(input, function (a, b) { return a.add(b, scale); }, function (a) { return a.scale(scale); });
    };
    /**
     * Subtracts the given input from the ranges of this instance. When the ranges
     * use the same units they are subtracted, otherwise they are added to the
     * end of the range list and negated.
     *
     * *For example:*
     * ```javascript
     * uz('3pt').sub('2pt, 1c'); // '1pt, -1c'
     * uz('1pt').add('2pt, 1c', 2); // '-3pt, -2c'
     * ```
     *
     * @param input An instance or input which can be parsed into an instance.
     * @param scale A number to multiple the input by when subtracting it from this instance.
     * @return A new instance.
     * @see [[Base.operate]]
     * @see [[Range.sub]]
     * @see [[Range.scale]]
     */
    Base.prototype.sub = function (input, scale) {
        if (scale === void 0) { scale = 1; }
        return this.operate(input, function (a, b) { return a.sub(b, scale); }, function (a) { return a.scale(-scale); });
    };
    /**
     * Subtracts the given input from the ranges of this instance. When the ranges
     * use the same units they are subtracted, otherwise they are added to the
     * end of the range list and negated.
     *
     * *For example:*
     * ```javascript
     * uz('3pt').sub('2pt, 1c'); // '1pt, -1c'
     * uz('1pt').add('2pt, 1c', 2); // '-3pt, -2c'
     * ```
     *
     * @param input An instance or input which can be parsed into an instance.
     * @param operate A function to call when matching ranges are found and an
     *  operation should be performed between them. The range returned by this
     *  function ends up in the result.
     * @param operate.a The first range to operate on.
     * @param operate.b The second range to operate on.
     * @param remainder A function to call on a range that did not have a match
     *  in this instance where the range returned is added to the result.
     * @param remainder.a The remaining range to operate on.
     * @return A new instance.
     * @see [[Range.isMatch]]
     */
    Base.prototype.operate = function (input, operate, remainder) {
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
                output.push(remainder(otherRanges[k]));
            }
        }
        return new Base(this.input, output);
    };
    /**
     * Joins all ranges of the same classes together and then calculates all
     * equivalent ranges for each range for each valid group according to the
     * given options.
     *
     * *For example:*
     * ```javascript
     * uz('1.5pt').conversions(); // '3/16gal, 3/4qt, 1 1/2pt, 3c, 24floz, 48tbsp, 144tsp'
     * uz('20celsius, 45deg'); // '68F, 20celsius, 45deg, 0.785rad'
     * ```
     *
     * @param options Options to control which units and values are acceptable.
     * @return A new instance.
     * @see [[Transform]]
     * @see [[Core.globalTransform]]
     * @see [[Value.conversions]]
     */
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
    /**
     * Executes the given function on each range in this instance and if the
     * function returns a valid range its added to the result.
     *
     * *For example:*
     * ```javascript
     * uz('1.5pt').mutate(r => r.scale(2)); // '3pt'
     * ```
     *
     * @param mutator The function which may return a range.
     * @return A new instance.
     */
    Base.prototype.mutate = function (mutator) {
        var ranges = [];
        var source = this.ranges;
        for (var i = 0; i < source.length; i++) {
            var mutated = mutator(source[i]);
            if (mutated && mutated.isValid) {
                ranges.push(mutated);
            }
        }
        return new Base(this.input, ranges);
    };
    /**
     * Removes the ranges from this instance that aren't valid according to the
     * transform options provided taking into account the global options.
     *
     * *For example:*
     * ```javascript
     * uz('1in, 2m').filter({system: Unitz.System.METRIC}); // '2m'
     * ```
     *
     * @param options Options to control which units and values are acceptable.
     * @return A new instance.
     * @see [[Transform]]
     * @see [[Core.globalTransform]]
     * @see [[Transform.isValidRange]]
     */
    Base.prototype.filter = function (options) {
        var transform = Core_Core.globalTransform.extend(options);
        var ranges = this.ranges;
        var filtered = [];
        for (var i = 0; i < ranges.length; i++) {
            var range = ranges[i];
            if (transform.isValidRange(range)) {
                filtered.push(range);
            }
        }
        return new Base(this.input, filtered);
    };
    /**
     * Sorts the ranges in this instance based on the options provided taking into
     * account the global options.
     *
     * *For example:*
     * ```javascript
     * uz('1in, 3ft, 1.3yd, 1m').sort(); // 1.3yd, 1m, 3ft, 1in
     * uz('1in, 3ft, 1.3yd, 1m').sort({ascending: true}); // 1in, 3ft, 1m, 1.3yd
     * uz('1-3cups, 2-2.5cups, 4in').sort({
     *  type: Unitz.SortType.MIN,
     *  classes: {
     *   Volume: 1,
     *   Length: 2
     *  }
     * }); // 4in, 2 - 2.5cups, 1 - 3cups
     * ```
     *
     * @param options Options to control how sorting is done.
     * @return A new instance.
     * @see [[Sort]]
     * @see [[Core.globalSort]]
     */
    Base.prototype.sort = function (options) {
        var sort = Core_Core.globalSort.extend(options);
        var ranges = this.ranges.slice();
        ranges.sort(sort.getSorter());
        return new Base(this.input, ranges);
    };
    /**
     * Returns the ranges in this instance grouped by their class. All groupless
     * ranges are added to their own list.
     */
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
    /**
     * Calculates what this instance would need to be scaled by so that the given
     * value & unit pair is equal to the sum of ranges in this instance of the
     * same class. If there are no ranges with the same class then zero is
     * returned. If the sum of ranges with the same class results in an actual
     * range (where min != max) then you can specify how to pick a value from the
     * range with rangeDetla. A value of 0 uses the min, 1 uses the max, and 0.5
     * uses the average between them.
     *
     * *For example:*
     * ```javascript
     * uz('1m, 2 - 3c').getScaleTo('6c'); // 2
     * uz('1m, 2 - 3c').getScaleTo('6c', 0); // 3
     * uz('1m, 2 - 3c').getScaleTo('6c', 0.5); // 2.4
     * uz('1m, 2 - 3c').getScaleTo('45deg'); // 0
     * ```
  
     * @param unitValue A value & unit pair to scale the ranges in this instance to.
     * @param rangeDelta When this instance contains ranges this value instructs
     *  how the scale factor is calculated. A value of 0 means it looks at the
     *  minimum, 1 is the maximum, and 0.5 is the average.
     * @return A value to scale by or zero if this instance cannot match the input.
     * @see [[Base.convert]]
     * @see [[Parse.value]]
     */
    Base.prototype.getScaleTo = function (unitValue, rangeDelta) {
        if (rangeDelta === void 0) { rangeDelta = 1.0; }
        var to = Parse_Parse.value(unitValue, Core_Core.getGroup);
        if (!to.isValid) {
            return 0;
        }
        var converted = this.convert(to.unit);
        if (!converted || !converted.isValid) {
            return 0;
        }
        var convertedValue = (converted.maximum - converted.minimum) * rangeDelta + converted.minimum;
        var scale = to.value / convertedValue;
        return scale;
    };
    /**
     * Converts the ranges in this instance to a string with the given output
     * options taking into account the global options.
     *
     * @param options The options to override the global output options.
     * @return The string representation of this instance.
     * @see [[Output]]
     */
    Base.prototype.output = function (options) {
        var output = Core_Core.globalOutput.extend(options);
        return output.ranges(this.ranges);
    };
    /**
     * Converts the appropriate ranges in this instance into the desired unit
     * and returns their converted sum. If the given unit does not map to a group
     * then null is returned. If there are no ranges in this instance in the same
     * class then the range returned is equivalent to zero.
     *
     * *For example:*
     * ```javascript
     * uz('1in, 1m, 1ft').convert('cm'); // '133.02 cm'
     * ```
     *
     * @param unit The unit to calculate the sum of.
     * @return A new range which is the sum of ranges in the same class converted
     *  to the desired unit.
     * @see [[Core.getGroup]]
     * @see [[Range.isZero]]
     */
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
    /**
     * Iterates over each range in this instance in order or reversed and passes
     * each one to the given iterate function. If the iterate function returns
     * false the iteration will stop.
     *
     * @param iterate The function to invoke with each range and it's index.
     * @param iterate.range The current range being iterated.
     * @param iterate.index The index of the current range in this instance.
     * @param reverse Whether the iteration should be done forward or backward.
     * @return The reference to this instance.
     */
    Base.prototype.each = function (iterate, reverse) {
        if (reverse === void 0) { reverse = false; }
        var ranges = this.ranges;
        var start = reverse ? ranges.length - 1 : 0;
        var end = reverse ? -1 : ranges.length;
        var move = reverse ? -1 : 1;
        for (var i = start; i !== end; i += move) {
            if (iterate(ranges[i], i) === false) {
                break;
            }
        }
        return this;
    };
    /**
     * Returns an array of the classes represented in this instance. If there are
     * no classes in this instance then an empty array is returned.
     *
     * @return An array of the classes in this instance.
     */
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
        /**
         * Returns whether this instance has actual ranges. An actual range is where
         * the minimum and maximum values differ.
         *
         * @see [[Range.isRange]]
         */
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
        /**
         * Returns whether this instance only has valid ranges. If any of the ranges
         * in this instance are not valid false is returned, otherwise true.
         *
         * @see [[Range.isValid]]
         */
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
    Object.defineProperty(Base.prototype, "length", {
        /**
         * Returns the number of ranges in this instance.
         */
        get: function () {
            return this.ranges.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "isFixed", {
        /**
         * Returns true if this instance has a single fixed value.
         *
         * @see [[Range.isFixed]]
         */
        get: function () {
            return this.ranges.length === 1 && this.ranges[0].isFixed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base.prototype, "isRange", {
        /**
         * Returns true if this instance has a single range.
         *
         * @see [[Range.isRange]]
         */
        get: function () {
            return this.ranges.length === 1 && this.ranges[0].isRange;
        },
        enumerable: true,
        configurable: true
    });
    return Base;
}());


// CONCATENATED MODULE: ./src/Translations.ts




/**
 * Creates a [[Translator]] which matches against a regular expression and when
 * the user input matches the regular expression another handler function is
 * called to translate the input. Optionally a constant value can be passed
 * to this function and down to the translator.
 *
 * @param regex The regular expression to match against user input.
 * @param handler The function to call if the input matched the expression.
 * @param vars The constant value to pass to the [[RegexTranslator]].
 * @return A [[Translator]] function.
 */
function newRegexTranslator(regex, handler, vars) {
    return function (x, groups) {
        var matches = x.match(regex);
        if (matches) {
            x = handler(matches, groups, vars);
        }
        return x;
    };
}
/**
 * The class which holds [[Translator]]s to manipulate user input into something
 * more understandable to the [[Parse]] class.
 */
var Translations_Translations = (function () {
    function Translations() {
    }
    /**
     * Adds all translators in the library to be available when parsing.
     */
    Translations.addDefaults = function () {
        this.addTranslator(this.Quantity);
        this.addTranslator(this.NumberWords);
        this.addTranslator(this.FractionOfNumber);
        this.addTranslator(this.AndFraction);
        this.addTranslator(this.QuantityValue);
    };
    /**
     * Adds the given translator to the list of registered translators. This
     * translator will be called last.
     *
     * @param translator The function which translates user input.
  
     */
    Translations.addTranslator = function (translator) {
        this.registered.push(translator);
    };
    /**
     * Translates the user input based on the registered translators and returns
     * the final string ready to be parsed.
     *
     * @param input The input to translate.
     * @param groups The factory which converts units to group.
     * @return The translated string.
     */
    Translations.translate = function (input, groups) {
        var registered = this.registered;
        for (var i = 0; i < registered.length; i++) {
            input = registered[i](input, groups);
        }
        return input;
    };
    /**
     * An array of translators that have been registered.
     *
     * @see [[Translations.addTranslator]]
     */
    Translations.registered = [];
    /**
     * A translator which takes a word which represents a number and converts it
     * the respective number.
     *
     * *Examples:*
     * - one [unit]
     * - dozen [unit]
     * - an eleven [unit]
     */
    Translations.NumberWords = newRegexTranslator(/^(an?\s+|)(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|dozen|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|fourty|fifty|sixty|seventy|eighty|ninety)\s+(.*)/i, 
    // @ts-ignore
    function (matches, groups, vars) {
        var wordName = matches[2];
        var remaining = matches[3];
        return vars[wordName] + ' ' + remaining;
    }, {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9',
        ten: '10',
        eleven: '11',
        twelve: '12',
        dozen: '12',
        thirteen: '13',
        fouteen: '14',
        fifteen: '15',
        sixteen: '16',
        seventeen: '17',
        eighteen: '18',
        nineteen: '19',
        twenty: '20',
        thirty: '30',
        fourty: '40',
        fifty: '50',
        sixty: '60',
        seventy: '70',
        eighty: '80',
        ninety: '90'
    });
    /**
     * A translator which takes a word which represents a fraction and multiplies
     * it by the following value.
     *
     * *Examples:*
     * - a third of an acre
     * - half a dozen eggs
     * - a seventh of a mile
     */
    Translations.FractionOfNumber = newRegexTranslator(/^(an?\s+|one|)(half|third|fourth|fifth|sixth|seventh|eighth|nineth|tenth)\s+(a\s+|an\s+|of\s+an?\s+|of\s+)(.*)/i, function (matches, groups, vars) {
        var remaining = matches[4];
        var parsed = Parse_Parse.valueFromString(remaining, groups);
        var fractionName = matches[2].toLowerCase();
        var fraction = vars[fractionName];
        return parsed.mul(fraction).output(Core_Core.globalOutput);
    }, {
        half: Value_Value.fromFraction(1, 2),
        third: Value_Value.fromFraction(1, 3),
        fourth: Value_Value.fromFraction(1, 4),
        fifth: Value_Value.fromFraction(1, 5),
        sixth: Value_Value.fromFraction(1, 6),
        seventh: Value_Value.fromFraction(1, 7),
        eighth: Value_Value.fromFraction(1, 8),
        nineth: Value_Value.fromFraction(1, 9),
        tenth: Value_Value.fromFraction(1, 10)
    });
    /**
     * A translator which takes a word which represents a fraction and multiplies
     * it by the following value.
     *
     * *Examples:*
     * - 23 and a half eggs
     * - one and a half acres
     * - 23 and a third
     * - 12 and one fourth
     */
    Translations.AndFraction = newRegexTranslator(/^(.*)\s+and\s+(an?|one)\s+(half|third|fourth|fifth|sixth|seventh|eighth|nineth|tenth)\s*(.*)/i, function (matches, groups, vars) {
        var prefix = matches[1];
        var units = matches[4];
        var value = Parse_Parse.valueFromString(prefix + units, groups);
        var fractionName = matches[3].toLowerCase();
        var fraction = vars[fractionName];
        return value.add(fraction).output(Core_Core.globalOutput);
    }, {
        half: Value_Value.fromFraction(1, 2),
        third: Value_Value.fromFraction(1, 3),
        fourth: Value_Value.fromFraction(1, 4),
        fifth: Value_Value.fromFraction(1, 5),
        sixth: Value_Value.fromFraction(1, 6),
        seventh: Value_Value.fromFraction(1, 7),
        eighth: Value_Value.fromFraction(1, 8),
        nineth: Value_Value.fromFraction(1, 9),
        tenth: Value_Value.fromFraction(1, 10)
    });
    /**
     * A translator which takes the amount in parenthesis and moves it out.
     *
     * *Examples:*
     * - (one and a half) acre
     * - (12) tacos
     */
    Translations.Quantity = newRegexTranslator(/^\((.*)\)(.*)$/, function (matches) {
        var quantity = matches[1];
        var unit = matches[2];
        return quantity + unit;
    });
    /**
     * A translator which takes the amount in parenthesis and moves it out.
     *
     * *Examples:*
     * - 1 (6 ounce)
     * - 5 (3 liter)
     */
    Translations.QuantityValue = newRegexTranslator(/^\s*((-?\d*)(\s+(\d+))?(\s*\/\s*(\d+)|\.(\d+)|))\s*\(\s*((-?\d*)(\s+(\d+))?(\s*\/\s*(\d+)|\.(\d+)|)\s*(.*))\s*\)\s*$/i, function (matches, groups) {
        var quantityInput = matches[1];
        var quantity = Parse_Parse.valueFromString(quantityInput, groups);
        var alternativeInput = matches[8];
        var alternative = Parse_Parse.valueFromString(alternativeInput, groups);
        return alternative.mul(quantity).output(Core_Core.globalOutput);
    });
    return Translations;
}());


// CONCATENATED MODULE: ./src/Parse.ts






/**
 * The class which takes user input and parses it to specific structures.
 */
var Parse_Parse = (function () {
    function Parse() {
    }
    /**
     * Parses user input into a [[Base]] instance.
     *
     * @param input The input to parse into a Base.
     * @return The instance parsed from the input.
     */
    Parse.base = function (input) {
        if (input instanceof Base_Base) {
            return input;
        }
        return new Base_Base(input);
    };
    /**
     * Parses user input into a an array of [[Range]]s.
     *
     * @param input The input to parse.
     * @param groups A function which converts a unit to a [[Group]] instance.
     * @return The instances parsed from the input.
     */
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
    /**
     * Parses user input into a an array of [[Range]]s.
     *
     * @param input The input to parse.
     * @param groups A function which converts a unit to a [[Group]] instance.
     * @return The instances parsed from the input.
     */
    Parse.rangesFromArray = function (input, groups) {
        var ranges = [];
        for (var i = 0; i < input.length; i++) {
            var range = this.range(input[i], groups);
            ranges.push(range);
        }
        return ranges;
    };
    /**
     * Parses user input into a an array of [[Range]]s.
     *
     * @param input The input to parse.
     * @param groups A function which converts a unit to a [[Group]] instance.
     * @return The instances parsed from the input.
     */
    Parse.rangesFromString = function (input, groups) {
        var ranges = input.split(this.REGEX_LIST);
        return this.rangesFromArray(ranges, groups);
    };
    /**
     * Parses user input into a [[Range]].
     *
     * @param input The input to parse.
     * @param groups A function which converts a unit to a [[Group]] instance.
     * @return The instance parsed from the input.
     */
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
    /**
     * Parses user input into a [[Range]].
     *
     * @param input The input to parse.
     * @param groups A function which converts a unit to a [[Group]] instance.
     * @return The instance parsed from the input.
     */
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
    /**
     * Parses user input into a [[Value]].
     *
     * @param input The input to parse.
     * @param groups A function which converts a unit to a [[Group]] instance.
     * @return The instance parsed from the input.
     */
    Parse.value = function (input, groups) {
        if (Functions.isString(input)) {
            return this.valueFromString(input, groups);
        }
        else if (Functions.isValueDefinition(input)) {
            return this.valueFromValue(input, groups);
        }
        return Value_Value.INVALID;
    };
    /**
     * Parses user input into a [[Value]].
     *
     * @param input The input to parse.
     * @param groups A function which converts a unit to a [[Group]] instance.
     * @return The instance parsed from the input.
     */
    Parse.valueFromValue = function (input, groups) {
        var givenValue = Functions.isDefined(input.value) ? input.value : 1;
        var num = Functions.isDefined(input.num) ? input.num : givenValue;
        var den = Functions.isDefined(input.den) ? input.den : 1;
        var parsedValue = Functions.isDefined(input.value) ? input.value : num / den;
        var unit = input.unit || '';
        var group = groups(unit);
        return new Value_Value(parsedValue, num, den, unit, group);
    };
    /**
     * Parses user input into a [[Value]].
     *
     * @param input The input to parse.
     * @param groups A function which converts a unit to a [[Group]] instance.
     * @return The instance parsed from the input.
     */
    Parse.valueFromString = function (input, groups) {
        var translated = Translations_Translations.translate(input, groups);
        var parsed = this.input(translated);
        return parsed ? this.valueFromResult(parsed, parsed.unit, groups) : Value_Value.INVALID;
    };
    /**
     * Parses user input into a [[Value]].
     *
     * @param result The already parsed input.
     * @param unit The unit parsed from the input.
     * @param groups A function which converts a unit to a [[Group]] instance.
     * @return The instance parsed from the input.
     */
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
    /**
     * Parses user input into a [[ParseResult]]. If the input is not valid null
     * is returned.
     *
     * *Examples:*
     * - 1tsp
     * - 1 tsp
     * - 1/2 tsp
     * - 1 1/2 tsp
     * - -2 cups
     * - 2.35"
     *
     * @param input The string to parse a value and unit from.
     * @return The result of the parsing.
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
        var unit = Functions.trim(matches[7]).replace(/\.$/, '');
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
    /**
     * The regular expression used to split up a string into multiple ranges.
     */
    Parse.REGEX_LIST = /\s*,\s*/;
    /**
     * The regular expression used to split up a range string to determine the min
     * and maximum values.
     */
    Parse.REGEX_RANGE = /\s*(-?[^-]+)-(.+)/;
    /**
     * The regular expression used to parse a value number or fraction and
     * possible unit from a string.
     */
    Parse.REGEX_PARSE = /^\s*(-?\d*)(\s+(\d+))?(\s*\/\s*(\d+)|\.(\d+)|)\s*(.*)\s*$/i;
    return Parse;
}());


// CONCATENATED MODULE: ./src/classes/Angle.ts




var RAD2DEG = 180 / Math.PI;
var DEG2RAD = Math.PI / 180;
/**
 * @hidden
 */
var Angle = new Class_Class('Angle')
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

// CONCATENATED MODULE: ./src/classes/Area.ts




/**
 * @hidden
 */
var Area = new Class_Class('Area')
    .setBaseConversion('sqin', 'sqmm', function (x) { return x * 645.16; })
    .setBaseConversion('sqmm', 'sqin', function (x) { return x * 0.00155; })
    .addGroups([
    {
        system: System.US,
        common: true,
        unit: 'sqin',
        baseUnit: 'sqin',
        denominators: [2, 4, 8, 16],
        units: {
            'sqin': Plurality.EITHER,
            'sq. in': Plurality.EITHER,
            'sq in': Plurality.EITHER,
            'in2': Plurality.EITHER,
            'in^2': Plurality.EITHER,
            'in\xb2': Plurality.EITHER,
            'inch2': Plurality.SINGULAR,
            'inch^2': Plurality.SINGULAR,
            'inch\xb2': Plurality.SINGULAR,
            'inches2': Plurality.PLURAL,
            'inches^2': Plurality.PLURAL,
            'inches\xb2': Plurality.PLURAL,
            'square in': Plurality.EITHER,
            'square inch': Plurality.SINGULAR,
            'square inches': Plurality.PLURAL
        }
    },
    {
        system: System.US,
        common: true,
        unit: 'sqft',
        relativeUnit: 'sqin',
        relativeScale: 12 * 12,
        denominators: [2, 4, 8, 16],
        units: {
            'sqft': Plurality.EITHER,
            'sq. ft': Plurality.EITHER,
            'sq ft': Plurality.EITHER,
            'ft2': Plurality.EITHER,
            'ft^2': Plurality.EITHER,
            'ft\xb2': Plurality.EITHER,
            'foot2': Plurality.SINGULAR,
            'foot^2': Plurality.SINGULAR,
            'foot\xb2': Plurality.SINGULAR,
            'feet2': Plurality.PLURAL,
            'feet^2': Plurality.PLURAL,
            'feet\xb2': Plurality.PLURAL,
            'square ft': Plurality.EITHER,
            'square foot': Plurality.SINGULAR,
            'square feet': Plurality.PLURAL
        }
    },
    {
        system: System.US,
        unit: 'sqyd',
        relativeUnit: 'sqft',
        relativeScale: 3 * 3,
        denominators: [2, 3, 4, 8, 9, 16],
        units: {
            'sqyd': Plurality.EITHER,
            'sq. yd': Plurality.EITHER,
            'sq yd': Plurality.EITHER,
            'yd2': Plurality.EITHER,
            'yd^2': Plurality.EITHER,
            'yd\xb2': Plurality.EITHER,
            'yard2': Plurality.SINGULAR,
            'yard^2': Plurality.SINGULAR,
            'yard\xb2': Plurality.SINGULAR,
            'yards2': Plurality.PLURAL,
            'yards^2': Plurality.PLURAL,
            'yards\xb2': Plurality.PLURAL,
            'square yd': Plurality.EITHER,
            'square yard': Plurality.SINGULAR,
            'square yards': Plurality.PLURAL
        }
    },
    {
        system: System.US,
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
        system: System.US,
        common: true,
        unit: 'sqmi',
        relativeUnit: 'acre',
        relativeScale: 640,
        denominators: [2, 3, 4, 8, 10],
        units: {
            'sqmi': Plurality.EITHER,
            'sq. mi': Plurality.EITHER,
            'sq mi': Plurality.EITHER,
            'mi2': Plurality.EITHER,
            'mi^2': Plurality.EITHER,
            'mi\xb2': Plurality.EITHER,
            'mile2': Plurality.SINGULAR,
            'mile^2': Plurality.SINGULAR,
            'mile\xb2': Plurality.SINGULAR,
            'miles2': Plurality.PLURAL,
            'miles^2': Plurality.PLURAL,
            'miles\xb2': Plurality.PLURAL,
            'square mi': Plurality.EITHER,
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
            'sq. mm': Plurality.EITHER,
            'sq mm': Plurality.EITHER,
            'mm2': Plurality.EITHER,
            'mm^2': Plurality.EITHER,
            'mm\xb2': Plurality.EITHER,
            'millimeter2': Plurality.SINGULAR,
            'millimeter^2': Plurality.SINGULAR,
            'millimeter\xb2': Plurality.SINGULAR,
            'millimeters2': Plurality.PLURAL,
            'millimeters^2': Plurality.PLURAL,
            'millimeters\xb2': Plurality.PLURAL,
            'square mm': Plurality.EITHER,
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
            'sq. cm': Plurality.EITHER,
            'sq cm': Plurality.EITHER,
            'cm2': Plurality.EITHER,
            'cm^2': Plurality.EITHER,
            'cm\xb2': Plurality.EITHER,
            'centimeter2': Plurality.SINGULAR,
            'centimeter^2': Plurality.SINGULAR,
            'centimeter\xb2': Plurality.SINGULAR,
            'centimeters2': Plurality.PLURAL,
            'centimeters^2': Plurality.PLURAL,
            'centimeters\xb2': Plurality.PLURAL,
            'square cm': Plurality.EITHER,
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
            'sq. m': Plurality.EITHER,
            'sq m': Plurality.EITHER,
            'm2': Plurality.EITHER,
            'm^2': Plurality.EITHER,
            'm\xb2': Plurality.EITHER,
            'meter2': Plurality.SINGULAR,
            'meter^2': Plurality.SINGULAR,
            'meter\xb2': Plurality.SINGULAR,
            'meters2': Plurality.PLURAL,
            'meters^2': Plurality.PLURAL,
            'meters\xb2': Plurality.PLURAL,
            'square m': Plurality.EITHER,
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
            'sq. km': Plurality.EITHER,
            'sq km': Plurality.EITHER,
            'km2': Plurality.EITHER,
            'km^2': Plurality.EITHER,
            'km\xb2': Plurality.EITHER,
            'kilometer2': Plurality.SINGULAR,
            'kilometer^2': Plurality.SINGULAR,
            'kilometer\xb2': Plurality.SINGULAR,
            'kilometers2': Plurality.PLURAL,
            'kilometers^2': Plurality.PLURAL,
            'kilometers\xb2': Plurality.PLURAL,
            'square km': Plurality.EITHER,
            'square kilometer': Plurality.SINGULAR,
            'square kilometers': Plurality.PLURAL
        }
    }
])
    .setClassScales();

// CONCATENATED MODULE: ./src/classes/Digital.ts




/**
 * @hidden
 */
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

// CONCATENATED MODULE: ./src/classes/Length.ts




/**
 * @hidden
 */
var Length = new Class_Class('Length')
    .setBaseConversion('in', 'mm', function (x) { return x * 25.4; })
    .setBaseConversion('mm', 'in', function (x) { return x * 0.039370; })
    .addGroups([
    {
        system: System.US,
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
        system: System.US,
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
        system: System.US,
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
        system: System.US,
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
        system: System.US,
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

// CONCATENATED MODULE: ./src/classes/Temperature.ts




var _C_ = '\xb0C';
/**
 * @hidden
 */
var Temperature = new Class_Class('Temperature')
    .setBaseConversion('F', _C_, function (x) { return ((x - 32) * 5 / 9); })
    .setBaseConversion('F', 'K', function (x) { return ((x + 459.67) * 5 / 9); })
    .setBaseConversion(_C_, 'F', function (x) { return ((x * 9 / 5) + 32); })
    .setBaseConversion(_C_, 'K', function (x) { return (x + 273.15); })
    .setBaseConversion('K', _C_, function (x) { return (x - 273.15); })
    .setBaseConversion('K', 'F', function (x) { return ((x * 9 / 5) - 459.67); })
    .addGroups([
    {
        system: System.US,
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
            'kelvin': Plurality.SINGULAR,
            'kelvins': Plurality.PLURAL
        }
    }
])
    .setClassScales();

// CONCATENATED MODULE: ./src/classes/Time.ts




/**
 * @hidden
 */
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
    },
    {
        system: System.ANY,
        common: true,
        unit: 'decade',
        relativeUnit: 'yr',
        relativeScale: 10,
        denominators: [10],
        units: {
            'decade': Plurality.EITHER,
            'decades': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        unit: 'biennium',
        relativeUnit: 'yr',
        relativeScale: 2,
        denominators: [],
        units: {
            'biennium': Plurality.EITHER,
            'bienniums': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        unit: 'triennium',
        relativeUnit: 'yr',
        relativeScale: 3,
        denominators: [],
        units: {
            'triennium': Plurality.EITHER,
            'trienniums': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        unit: 'quadrennium',
        relativeUnit: 'yr',
        relativeScale: 4,
        denominators: [],
        units: {
            'quadrennium': Plurality.EITHER,
            'quadrenniums': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        unit: 'lustrum',
        relativeUnit: 'yr',
        relativeScale: 5,
        denominators: [],
        units: {
            'lustrum': Plurality.EITHER,
            'lustrums': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        common: true,
        unit: 'decade',
        relativeUnit: 'yr',
        relativeScale: 10,
        denominators: [2, 10],
        units: {
            'decade': Plurality.EITHER,
            'decades': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        common: true,
        unit: 'century',
        relativeUnit: 'yr',
        relativeScale: 100,
        denominators: [2, 10],
        units: {
            'century': Plurality.EITHER,
            'centurys': Plurality.PLURAL,
            'centuries': Plurality.PLURAL
        }
    },
    {
        system: System.ANY,
        common: true,
        unit: 'millennium',
        relativeUnit: 'yr',
        relativeScale: 1000,
        denominators: [2, 3, 4],
        units: {
            'millennium': Plurality.EITHER,
            'millenniums': Plurality.PLURAL,
            'millennia': Plurality.PLURAL,
            'millennias': Plurality.PLURAL
        }
    }
])
    .setClassScales();

// CONCATENATED MODULE: ./src/classes/Volume.ts




/**
 * @hidden
 */
var Volume = new Class_Class('Volume')
    .setBaseConversion('tsp', 'ml', function (x) { return x * 4.92892; })
    .setBaseConversion('tsp', 'mm3', function (x) { return x * 4928.92; })
    .setBaseConversion('tsp', 'in3', function (x) { return x * 0.300781; })
    .setBaseConversion('ml', 'tsp', function (x) { return x * 0.202884; })
    .setBaseConversion('ml', 'mm3', function (x) { return x * 1000; })
    .setBaseConversion('ml', 'in3', function (x) { return x * 0.0610237; })
    .setBaseConversion('mm3', 'tsp', function (x) { return x * 0.000202884; })
    .setBaseConversion('mm3', 'ml', function (x) { return x * 0.001; })
    .setBaseConversion('mm3', 'in3', function (x) { return x * 0.0000610237; })
    .setBaseConversion('in3', 'tsp', function (x) { return x * 3.32468; })
    .setBaseConversion('in3', 'ml', function (x) { return x * 16.3871; })
    .setBaseConversion('in3', 'mm3', function (x) { return x * 16387.1; })
    .addGroups([
    {
        system: System.US,
        common: true,
        unit: 'tsp',
        baseUnit: 'tsp',
        denominators: [2, 3, 4],
        units: {
            'tsp': Plurality.EITHER,
            'ts': Plurality.EITHER,
            'tsps': Plurality.PLURAL,
            'teaspoon': Plurality.SINGULAR,
            'teaspoons': Plurality.PLURAL
        }
    },
    {
        system: System.US,
        common: true,
        unit: 'tbsp',
        relativeUnit: 'tsp',
        relativeScale: 3,
        denominators: [2, 3, 4],
        units: {
            'tbsp': Plurality.EITHER,
            'tbsps': Plurality.PLURAL,
            'tablespoon': Plurality.SINGULAR,
            'tablespoons': Plurality.PLURAL
        }
    },
    {
        system: System.US,
        common: true,
        unit: 'floz',
        relativeUnit: 'tsp',
        relativeScale: 6,
        denominators: [2, 3, 6],
        units: {
            // 'oz': Plurality.EITHER,
            // 'ounce': Plurality.SINGULAR,
            // 'ounces': Plurality.PLURAL,
            'floz': Plurality.EITHER,
            'fl-oz': Plurality.EITHER,
            'fl oz': Plurality.EITHER,
            'fluid ounce': Plurality.SINGULAR,
            'fluid ounces': Plurality.PLURAL,
            'fl. oz': Plurality.EITHER,
            'oz. fl': Plurality.EITHER,
            'oz fl': Plurality.EITHER
        }
    },
    {
        system: System.US,
        common: true,
        unit: 'c',
        relativeUnit: 'floz',
        relativeScale: 8,
        denominators: [2, 3, 4],
        units: {
            'c': Plurality.EITHER,
            'cup': Plurality.SINGULAR,
            'cups': Plurality.PLURAL
        }
    },
    {
        system: System.US,
        common: true,
        unit: 'pt',
        relativeUnit: 'c',
        relativeScale: 2,
        denominators: [2, 4, 8],
        units: {
            'pt': Plurality.EITHER,
            'pint': Plurality.SINGULAR,
            'pints': Plurality.PLURAL
        }
    },
    {
        system: System.US,
        common: true,
        unit: 'qt',
        relativeUnit: 'c',
        relativeScale: 4,
        denominators: [2, 4, 8],
        units: {
            'qt': Plurality.EITHER,
            'quart': Plurality.SINGULAR,
            'quarts': Plurality.PLURAL
        }
    },
    {
        system: System.US,
        common: true,
        unit: 'gal',
        relativeUnit: 'qt',
        relativeScale: 4,
        denominators: [2, 4, 8, 16],
        units: {
            'gal': Plurality.EITHER,
            'gallon': Plurality.SINGULAR,
            'gallons': Plurality.PLURAL,
            'gals': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        common: true,
        unit: 'ml',
        baseUnit: 'ml',
        denominators: [2, 10],
        units: {
            'ml': Plurality.EITHER,
            'millilitre': Plurality.SINGULAR,
            'millilitres': Plurality.PLURAL,
            'milliliter': Plurality.SINGULAR,
            'milliliters': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        unit: 'cl',
        relativeUnit: 'ml',
        relativeScale: 10,
        denominators: [10],
        units: {
            'cl': Plurality.EITHER,
            'centilitre': Plurality.SINGULAR,
            'centilitres': Plurality.PLURAL,
            'centiliter': Plurality.SINGULAR,
            'centiliters': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        common: true,
        unit: 'l',
        relativeUnit: 'ml',
        relativeScale: 1000,
        denominators: [2, 3, 4, 10],
        units: {
            'l': Plurality.EITHER,
            'litre': Plurality.SINGULAR,
            'litres': Plurality.PLURAL,
            'liter': Plurality.SINGULAR,
            'liters': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        unit: 'dl',
        relativeUnit: 'l',
        relativeScale: 10,
        denominators: [10, 100],
        units: {
            'dl': Plurality.EITHER,
            'decalitre': Plurality.SINGULAR,
            'decalitres': Plurality.PLURAL,
            'decaliter': Plurality.SINGULAR,
            'decaliters': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        common: true,
        unit: 'kl',
        relativeUnit: 'l',
        relativeScale: 1000,
        denominators: [10, 100],
        units: {
            'kl': Plurality.EITHER,
            'kilolitre': Plurality.SINGULAR,
            'kilolitres': Plurality.PLURAL,
            'kiloliter': Plurality.SINGULAR,
            'kiloliters': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        unit: 'mm3',
        baseUnit: 'mm3',
        denominators: [2, 4, 8],
        units: {
            'mm3': Plurality.EITHER,
            'mm^3': Plurality.EITHER,
            'mm\xb3': Plurality.EITHER,
            'millimeter3': Plurality.SINGULAR,
            'millimeter^3': Plurality.SINGULAR,
            'millimeter\xb3': Plurality.SINGULAR,
            'millimeters3': Plurality.PLURAL,
            'millimeters^3': Plurality.PLURAL,
            'millimeters\xb3': Plurality.PLURAL,
            'cubic mm': Plurality.EITHER,
            'cubic millimeter': Plurality.SINGULAR,
            'cubic millimeters': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        unit: 'cm3',
        relativeUnit: 'mm3',
        relativeScale: 1000,
        denominators: [2, 4, 8],
        units: {
            'cm3': Plurality.EITHER,
            'cm^3': Plurality.EITHER,
            'cm\xb3': Plurality.EITHER,
            'centimeter3': Plurality.SINGULAR,
            'centimeter^3': Plurality.SINGULAR,
            'centimeter\xb3': Plurality.SINGULAR,
            'centimeters3': Plurality.PLURAL,
            'centimeters^3': Plurality.PLURAL,
            'centimeters\xb3': Plurality.PLURAL,
            'cubic cm': Plurality.EITHER,
            'cubic centimeter': Plurality.SINGULAR,
            'cubic centimeters': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        unit: 'm3',
        relativeUnit: 'cm3',
        relativeScale: 1000000,
        denominators: [2, 4, 8],
        units: {
            'm3': Plurality.EITHER,
            'm^3': Plurality.EITHER,
            'm\xb3': Plurality.EITHER,
            'meter3': Plurality.SINGULAR,
            'meter^3': Plurality.SINGULAR,
            'meter\xb3': Plurality.SINGULAR,
            'meters3': Plurality.PLURAL,
            'meters^3': Plurality.PLURAL,
            'meters\xb3': Plurality.PLURAL,
            'cubic m': Plurality.EITHER,
            'cubic meter': Plurality.SINGULAR,
            'cubic meters': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        unit: 'km3',
        relativeUnit: 'm3',
        relativeScale: 1000000000,
        denominators: [2, 4, 8],
        units: {
            'km3': Plurality.EITHER,
            'km^3': Plurality.EITHER,
            'km\xb3': Plurality.EITHER,
            'kilometer3': Plurality.SINGULAR,
            'kilometer^3': Plurality.SINGULAR,
            'kilometer\xb3': Plurality.SINGULAR,
            'kilometers3': Plurality.PLURAL,
            'kilometers^3': Plurality.PLURAL,
            'kilometers\xb3': Plurality.PLURAL,
            'cubic km': Plurality.EITHER,
            'cubic kilometer': Plurality.SINGULAR,
            'cubic kilometers': Plurality.PLURAL
        }
    },
    {
        system: System.US,
        unit: 'in3',
        baseUnit: 'in3',
        denominators: [2, 4, 8],
        units: {
            'in3': Plurality.EITHER,
            'in^3': Plurality.EITHER,
            'in\xb3': Plurality.EITHER,
            'inch3': Plurality.SINGULAR,
            'inch^3': Plurality.SINGULAR,
            'inch\xb3': Plurality.SINGULAR,
            'inches3': Plurality.PLURAL,
            'inches^3': Plurality.PLURAL,
            'inches\xb3': Plurality.PLURAL,
            'cubic in': Plurality.EITHER,
            'cubic inch': Plurality.SINGULAR,
            'cubic inches': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        unit: 'ft3',
        relativeUnit: 'in3',
        relativeScale: 1728,
        denominators: [2, 4, 8],
        units: {
            'ft3': Plurality.EITHER,
            'ft^3': Plurality.EITHER,
            'ft\xb3': Plurality.EITHER,
            'foot3': Plurality.SINGULAR,
            'foot^3': Plurality.SINGULAR,
            'foot\xb3': Plurality.SINGULAR,
            'feet3': Plurality.PLURAL,
            'feet^3': Plurality.PLURAL,
            'feet\xb3': Plurality.PLURAL,
            'cubic ft': Plurality.EITHER,
            'cubic foot': Plurality.SINGULAR,
            'cubic feet': Plurality.PLURAL
        }
    },
    {
        system: System.METRIC,
        unit: 'yd3',
        relativeUnit: 'ft3',
        relativeScale: 27,
        denominators: [2, 4, 8],
        units: {
            'yd3': Plurality.EITHER,
            'yd^3': Plurality.EITHER,
            'yd\xb3': Plurality.EITHER,
            'yard3': Plurality.SINGULAR,
            'yard^3': Plurality.SINGULAR,
            'yard\xb3': Plurality.SINGULAR,
            'yards3': Plurality.PLURAL,
            'yards^3': Plurality.PLURAL,
            'yards\xb3': Plurality.PLURAL,
            'cubic yd': Plurality.EITHER,
            'cubic yard': Plurality.SINGULAR,
            'cubic yards': Plurality.PLURAL
        }
    }
])
    .setClassScales();

// CONCATENATED MODULE: ./src/classes/Weight.ts




/**
 * @hidden
 */
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
            'kilo': Plurality.SINGULAR,
            'kilos': Plurality.PLURAL,
            'kilogram': Plurality.SINGULAR,
            'kilograms': Plurality.PLURAL
        }
    },
    {
        system: System.US,
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
        system: System.US,
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
        system: System.US,
        common: true,
        unit: 'ton',
        relativeUnit: 'lb',
        relativeScale: 2000,
        denominators: [2, 3, 4, 10],
        units: {
            'ton': Plurality.EITHER,
            'tonne': Plurality.SINGULAR,
            'tons': Plurality.PLURAL,
            'tonnes': Plurality.PLURAL
        }
    }
])
    .setClassScales();

// CONCATENATED MODULE: ./src/Classes.ts










/**
 * The class which keeps a reference to the [[Class]] instances available in
 * this library.
 */
var Classes_Classes = (function () {
    function Classes() {
    }
    /**
     * Adds all classes in the library to be available when parsing units.
     */
    Classes.addDefaults = function () {
        Core_Core.addClasses(Classes.Weight, Classes.Area, Classes.Time, Classes.Digital, Classes.Temperature, Classes.Angle, Classes.Volume, Classes.Length);
    };
    /**
     * The Angle class which contains the following groups.
     *
     * - degree
     * - radian
     */
    Classes.Angle = Angle;
    /**
     * The Area class which contains the following groups:
     *
     * - square inch
     * - square foot
     * - square yard
     * - acre
     * - square mile
     * - square millimeter
     * - square centimeter
     * - square meter
     * - square kilometer
     */
    Classes.Area = Area;
    /**
     * The Digital class which contains the following groups:
     *
     * - bit
     * - nibble
     * - byte
     * - kilo/mego/giga/tera/peta/exa/zetta/yotta byte
     * - kibi/mebi/gibi/tebi/pebi/exbi/zebi/yobi byte
     * - kilo/mego/giga/tera/peta/exa/zetta/yotta bit
     * - ki/mi/gi/ti/pi/ez/zi/yi bit
     */
    Classes.Digital = Digital;
    /**
     * The Length class which contains the following groups.
     *
     * - inch
     * - foot
     * - yard
     * - mile
     * - league
     * - millimeter
     * - centimeter
     * - decimeter
     * - meter
     * - kilometer
     */
    Classes.Length = Length;
    /**
     * The Temperature class which contains the following groups.
     *
     * - celsius
     * - kelvin
     * - fahrenheit
     */
    Classes.Temperature = Temperature;
    /**
     * The Time class which contains the following groups.
     *
     * - nanosecond
     * - microsecond
     * - millisecond
     * - second
     * - hour
     * - day
     * - week
     * - year
     * - score
     * - decade
     * - biennium
     * - triennium
     * - quadrennium
     * - lustrum
     * - decade
     * - centry
     * - millennium
     */
    Classes.Time = Time;
    /**
     * The Volume clas which contains the following groups.
     *
     * - teaspoon
     * - tablespoon
     * - fluid ounce
     * - cup
     * - pint
     * - quart
     * - gallon
     * - milliliter
     * - centiliter
     * - decaliter
     * - kiloliter
     * - cubic millimeter
     * - cubic centimeter
     * - cubic meter
     * - cubic kilometer
     * - cubic inch
     * - cubic foot
     * - cubic yard
     */
    Classes.Volume = Volume;
    /**
     * The Weight clas which contains the following groups.
     *
     * - milligram
     * - gram
     * - kilogram
     * - ounce
     * - pound
     * - ton
     */
    Classes.Weight = Weight;
    return Classes;
}());


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
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Classes", function() { return Classes_Classes; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "newRegexTranslator", function() { return newRegexTranslator; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Translations", function() { return Translations_Translations; });

// Enums


// Functions


// Secondary



// Core






// Classes

// Translations



/***/ })
/******/ ]);
});
//# sourceMappingURL=unitz.js.map