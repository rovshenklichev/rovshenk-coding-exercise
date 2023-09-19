const { $, $$} = require('@wdio/globals');
const Page = require("./page");
const {Wait} = require("../utils/constants");
const { expect } = require('chai');
const {browser} = require("@wdio/globals");

class HoversPage extends Page{

    get hoversPageHeader(){
        return "//h3[contains(text(),'Hovers')]";
    }

    get listOfFigures(){
        return "//div[@class='figure']";
    }

    get listOfUsersToHover(){
        return "//div[@class='figure']//a[contains(@href, 'users')]";
    }

    get listOfUserName(){
        return "//h5[contains(text(), 'name: user')]";
    }

    open() {
        return super.open('hovers');
    }

    async verifyHoversPageHeader(hoversPageHeaderTxt){
        await $(this.hoversPageHeader).waitForDisplayed({timeout: Wait.LOW_WAIT});
        const hoversPageHeaderElementTxt = await $(this.hoversPageHeader).getText();
        expect(hoversPageHeaderElementTxt).to.equal(hoversPageHeaderTxt);
    }

    async navigateToUserProfile(userIndex, ) {
        const userFigures = await $$(this.listOfFigures);
        await $$(this.listOfFigures)[0].waitForDisplayed({ timeout: Wait.LOW_WAIT });

        if (userIndex < userFigures.length) {
            const userFigureProfile = userFigures[userIndex];

            // Wait for the specific user figure to be displayed
            await userFigureProfile.waitForDisplayed({ timeout: Wait.LOW_WAIT });

            // Hover over the user figure
            await userFigureProfile.moveTo();

            const userNamesPromise = $$(this.listOfUserName)[userIndex];
            const userNames = await userNamesPromise;
            const userNameText = await userNames.getText();
            expect(userNameText).to.have.string(`user${userIndex + 1}`);
            console.log(userNameText + "========================");

            // Find the "View profile" link within the user figure and click it
            const viewProfileLink = await userFigureProfile.$$(this.listOfUsersToHover)[userIndex];
            await viewProfileLink.click();

            // Wait for the target page to load and verify the URL
            await browser.waitUntil(async () => {
                const currentUrl = await browser.getUrl();
                return currentUrl.includes(`/users/${userIndex + 1}`);
            }, {
                timeout: Wait.LOW_WAIT,
                timeoutMsg: 'The target page did not load as expected.'
            });

            const currentUrl = await browser.getUrl();
            expect(currentUrl).to.include(`/users/${userIndex + 1}`);
        }
    }

}

module.exports = new HoversPage();