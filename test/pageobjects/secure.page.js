const { $, expect} = require('@wdio/globals')
const Page = require('./page');
const {Wait} = require("../utils/constants");

/**
 * subpage containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    /**
     * define selectors using getter methods
     */
    get flashAlert () {
        return "#flash";
    }

    async verifyUserLoggedIn(exceptedMessage){
        await $(this.flashAlert).waitForDisplayed({timeout: Wait.LOW_WAIT})
        expect(await $(this.flashAlert)).toBeExisting();
        expect(await $(this.flashAlert)).toHaveTextContaining(exceptedMessage);
    }
}

module.exports = new SecurePage();
