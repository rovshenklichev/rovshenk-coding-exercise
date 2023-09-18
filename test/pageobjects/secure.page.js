const { $} = require('@wdio/globals')
const Page = require('./page');
const {Wait} = require("../utils/constants");
const { expect } = require('chai');
const LoginPage = require('./login.page');

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

    get welcomeMessage(){
        return "//h4[@class='subheader']";
    }

    get btnLogout(){
        return "//a[contains(@class,'button') and @href='/logout']";
    }

    /**
     * this method is used to log out
     */
    async logout(){
        await $(this.btnLogout).waitForDisplayed({timeout: Wait.LOW_WAIT});
        await $(this.btnLogout).click();
        await $(LoginPage.inputUsername).waitForDisplayed({timeout: Wait.LOW_WAIT});
    }

    /**
     * This method is used to verify user logged in successfully
     * @param exceptedLoginMessage
     * @param welcomeMessage
     * @returns {Promise<void>}
     */
    async verifyUserLoggedIn(exceptedLoginMessage, welcomeMessage){
        await $(this.flashAlert).waitForDisplayed({timeout: Wait.LOW_WAIT});
        expect(await $(this.flashAlert)).to.exist;
        expect(await $(this.flashAlert).getText()).to.have.string(exceptedLoginMessage);
        if(await $(this.welcomeMessage).isDisplayed()){
            expect(await $(this.welcomeMessage).getText()).to.have.string(welcomeMessage)
        }
    }

    /**
     * this method is used to log out
     * @param expectedLogoutMsg
     * @param loginPageHeader
     */
    async verifyUserLoggedOut(expectedLogoutMsg, loginPageHeader){
        await this.logout(); // log out
        await expect(await $(LoginPage.flashAlert).getText()).to.have.string(expectedLogoutMsg);
        await expect(await $(LoginPage.inputUsername)).to.exist;
        if (await $(LoginPage.loginPageHeader).isDisplayed()){
            await expect(await $(LoginPage.loginPageHeader).getText()).to.have.string(loginPageHeader);
        }
    }
}

module.exports = new SecurePage();
