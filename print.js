var pjson = require('./package.json');

module.exports  = {
  /**
   * Prints number of products found.
   * @param {number}
   */
  count: function(productCount) {
    if (productCount > 0) {
      console.log('Total Products found: ', productCount)
    } else {
      console.log('Sorry, No products found.')
    }
  },
  /**
   * Prints message to console when supplied with invalid arguments.
   */
  invalidArgs: function() {
    console.log('Please enter keyword or keyword and page. Use ' + pjson.name +
      ' --help for examples')
  },
  /**
   * Prints details of the products found.
   * @param {!Array<!Object<string, string>>}
   */
  results: function(products) {
    if (products.length > 0) {
      console.log(products)
    } else {
      console.log('Sorry, No products found.')
    }
  }
}