const { $ } = require('@wdio/globals')
const Page = require('./page');
const {Wait} = require("../utils/constants");

/**
 * subpage containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return "#username";
    }

    get inputPassword () {
        return "#password";
    }

    get btnSubmit () {
        return "//button[@type='submit']";
    }

    get flashAlert () {
        return "#flash";
    }

    get loginPageHeader(){
        return "//h2[contains(text(),'Login Page')]";
    }

    /**
     * overwrite specific options to adapt it to a page object
     */
    open () {
        return super.open('login');
    }

    /**
     * a method to encapsulate automation code to interact with the page,
     * e.g., to log in using username and password
     * @param username
     * @param password
     */
    async login (username, password) {
        await $(this.inputUsername).waitForDisplayed({timeout: Wait.LOW_WAIT})
        await $(this.inputUsername).setValue(username);
        await $(this.inputPassword).setValue(password);
        await $(this.btnSubmit).click();
    }

}

module.exports = new LoginPage();
