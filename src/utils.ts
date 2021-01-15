import { register, registerComponent } from "ele-mint";

export default {
  $,
  $$,
};

function $(query) {
  return document.querySelector(query);
}

function $$(query) {
  return Array.from(document.querySelectorAll(query));
}

export function isIOS() {
  return ["iPhone", "iPad", "iPod"].includes(navigator.platform);
}

/**
 * Gets all the indexes that match in the
 * logic taken from
 * -- https://stackoverflow.com/a/25084764
 *
 * @export
 * @param {string} str
 * @param {RegExp} regex
 * @returns
 */
export function indexesOf(str, regex) {
  let match,
    indexes = [];

  while ((match = regex.exec(str))) {
    if (indexes[0] === match.index) {
      // we have an endless loop, get out,
      throw new Error(
        "Incorrect usage of indexesOf, Did you forget to use the global for the regex"
      );
    }
    indexes.push(match.index);
  }
  return indexes;
}

export function formatDateShort(date) {
  if (typeof date === "string" || typeof date === "number") {
    date = new Date(date);
  }
  const formatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleDateString("en-US", formatOptions);
}

/**
 *
 *
 * @export
 * @param {Object} objA
 * @param {Object} objB
 * @param {string} propName
 */
export function sortAlphabetically(objA, objB, propName) {
  // ignore upper and lowercase
  const nameA = (objA[propName] || "").toUpperCase();
  const nameB = (objB[propName] || "").toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}

export const delay = (func, time) => setTimeout(() => func(), time || 0);

/**
 * combines classes
 *
 * @param {string} main
 * @param {string|string[]} [additional]
 * @returns {string}
 */
export const combineClasses = (
  main: string,
  additional?: string | string[]
): string => {
  if (!additional) {
    return main;
  }
  const addArray = !Array.isArray(additional) ? [additional] : additional;
  return [main].concat(addArray).join(" ");
};

/**
 * Registers component with default classes
 */
export const registerWithDefaultClasses = (
  elementName: string,
  defaultClasses: string
) => {
  const element = register<any>(elementName);
  const comp = (data: any) => {
    return element({
      ...data,
      className: combineClasses(defaultClasses, data.className),
    });
  };
  return registerComponent(comp);
};

/**
 * Gets a random integer between 0 and the input max
 *
 * @param {number} max
 * @returns {number}
 */
export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const objectKeys = (obj) => {
  const keys = Object.keys(obj || {});
  return {
    keys: keys,
    values: keys.map((x) => obj[x]),
    iterator: () => {
      return keys.map((x) => {
        return {
          key: x,
          value: obj[x],
        };
      });
    },
  };
};
export const isType = (type) => (val) => typeof val === type;
export const isString = isType("string");
export const isBool = isType("boolean");
export const isFunction = isType("function");
export const isObject = isType("object");
export const isUndefined = isType("undefined");
export const isArray = (val) => Array.isArray(val);
export const isNull = (val) => val == null;
export const capitalCase = (str) =>
  str.slice(0, 1).toUpperCase() + str.slice(1);

export function assign() {
  return Object.assign.apply(null, Array.from(arguments));
}

export function error(message) {
  throw new Error(message);
}

export function arrayAtLength(length: number): any[] {
  return new Array(length).join(",").split(",");
}
