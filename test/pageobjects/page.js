const { browser } = require('@wdio/globals')
const {shared} = require("../resources/testdata");
const mainURL = shared.mainURL;
const { expect } = require('chai');
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

    /**
     * This method is used to get the text contents of the elements
     * and verify against the expected text array if provided
     * @param listOfTableHeaders
     * @param expectedTextArray
     * @returns {Promise<void>}
     */
    async getTextContentsOfElements(listOfTableHeaders, expectedTextArray) {
        const elements = await $$(listOfTableHeaders);
        // Verify against the expected text array if provided
        if (expectedTextArray && elements.length > 0) {
            for (let i = 0; i < expectedTextArray.length; i++) {
                const headerText = await elements[i].getText();
                console.log(headerText + "==========================");
                expect(headerText).to.equal(expectedTextArray[i]);
            }
        }
    }
}

