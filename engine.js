var osmosis = require('osmosis');
var Q = require('q');

module.exports = {
  /**
   * Base URL for scraping data.
   * @type {string}
   */
  baseUrl: 'http://www.shopping.com/products?KW=',
  /**
   * Product container css selector
   * @type {string}
   */
  itemSelector: '.gridBox',
  /**
   * Product data css selectors
   * @type {!Object<string, string>}
   */
  itemDataSelectors: {
    title: '.gridItemBtm > h2 > a',
    price: '.gridItemBtm .productPrice',
    mechant: '.gridItemBtm .newMerchantName',
    // Disabled for clear output on terminal
    // img: '.gridItemTop img@src',
    // url: '.gridItemTop a@href'
  },
  /**
   * Gets the count of products on page scraped using provided keyword. 
   * @param  {string}
   * @return {!Promise<number>}
   */
  getCount(keyword) {
    var deferred = Q.defer();
    osmosis
    .get(this.baseUrl + keyword)
    .set('total', osmosis.find('span.numTotalResults'))
    .then(function(context, data) {
      let regExp = /Results\s\d+\s-\s(\d+)\sof\s\d+/
      let matches = String(data.total).match(regExp)
      if (matches && matches.length && matches[1]) {
        deferred.resolve(matches[1]);
      }
      deferred.resolve(0)
    })
    return deferred.promise
  },
  /**
   * Gets the results on page scraped using provided keyword and page number.
   * @param  {string}
   * @param  {number}
   * @return {!Promise<!Array<Object<string, string>>>}
   */
  getResults(keyword, page) {
    var deferred = Q.defer()
    osmosis
    .get(this.baseUrl + keyword + 'page=' + page)
    .set({
      products: [osmosis.find(this.itemSelector).set(this.itemDataSelectors)]
    })
    .then(function(context, data) {
      deferred.resolve(data.products)
    })
    return deferred.promise;
  }
  
}

