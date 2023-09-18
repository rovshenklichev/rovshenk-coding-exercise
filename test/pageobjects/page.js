const { browser } = require('@wdio/globals')
const {shared} = require("../resources/testdata");
const mainURL = shared.mainURL;
/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
    /**
     * Opens a sub-page of the page
     * @param path path of the subpage (e.g., /path/to/page.html)
     */
    open (path) {
        return browser.url(`${mainURL}${path}`)
    }
}

