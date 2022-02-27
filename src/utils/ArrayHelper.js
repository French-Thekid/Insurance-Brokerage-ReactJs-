/**
 * Helpful array methods
 */
export class ArrayHelper {
  /**
   * find a list of attributes duplicated in an array of objects
   * @param {array} arr - array containing objects
   * @param {string} atr - attribute to find duplicates on
   */
  static ArrayObjectDuplicateAttribute = (arr, atr) => {
    /*First pass is to get the name of each attribute */
    let firstPass = arr.map((fp) => {
      return fp[atr]
    })

    let secondPass = firstPass.reduce(function (obj, b) {
      obj[b] = ++obj[b] || 1
      return obj
    }, {})

    /*Third pass takes in secound pass and returns names of values counted above 1 */
    const duplicates = (dict) => Object.keys(dict).filter((a) => dict[a] > 1)

    return duplicates(secondPass)
  }

  /**
   * find an item using an id
   * @param {array} arr - array
   * @param {string} atr - attribute to find array
   */
  static findArrayById(array, id) {
    if (array && id) return array.find((n) => n.id === id)
  }

  /**
   * find an object item from array using an attribute and the attribute value
   * @param {array} arr - array to search
   * @param {string} atr - attribute to look at for value
   * @param {any} value - value of attribute to search
   */
  static findObjectByAttributeValue(arr, atr, value) {
    if (arr === null) arr = []
    var result = arr.filter((o) => {
      return o[atr] === value
    })
    return result
  }

  /**
   * find a field's index
   * @param {array} array - array to search
   * @param {string} value - value to find by use field object
   */
  static fieldIndex(array, value) {
    return array.indexOf(value)
  }

  /**
   * information about a field's index
   * @param {array} array - array to search
   * @param {string} index - Index of element to return information about
   */
  static fieldDetails(array, index) {
    let details = {}
    details.length = array.length
    details.index = index
    details.lastIndex = array.length - 1
    if (index === 0) {
      details.previousIndex = null
    } else if (index === details.lastIndex && array.length > 1) {
      details.previousIndex = index - 1
    } else {
      details.previousIndex = index - 1
    }
    if (index === details.lastIndex) {
      details.nextIndex = null
    } else if (index === 0 && array.length > 1) {
      details.nextIndex = index + 1
    } else {
      details.nextIndex = index + 1
    }
    return details
  }
}
