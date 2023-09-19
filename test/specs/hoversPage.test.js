const { expect } = require('chai');
const HoverPage = require('../pageobjects/hovers.page');
const {shared} = require("../resources/testdata");
const {browser} = require("@wdio/globals");
const {Wait} = require("../utils/constants");

describe('Hovers Page - Task 3', () => {

    it("Verify user landed on Hovers page", async () => {
        await HoverPage.open();
        await HoverPage.verifyHoversPageHeader(shared.hoversPageHeader);
        const currentUrl = await browser.getUrl();
        expect(currentUrl).to.include("hovers");
    });

    it("Verify navigating to user profile by hover and click", async () => {
        await HoverPage.open();
        const userFigures = await $$(HoverPage.listOfFigures);

        for (let userIndex = 0; userIndex < userFigures.length; userIndex++) {
            await HoverPage.navigateToUserProfile(userIndex);
            await browser.back();
            await $(HoverPage.hoversPageHeader).waitForDisplayed({ timeout: Wait.NOR_WAIT });
        }
    });
});