const DropdownPage = require("../pageobjects/dropdown.page");
const {shared} = require("../resources/testdata");
const {Wait} = require("../utils/constants");

describe("Dropdown Page - Task 5", () => {
    it('load the page and randomly select an option from the list', async () => {
        try {
            await DropdownPage.open();
            await expect(browser).toHaveUrl(shared.mainURL+"dropdown");
            await browser.pause(Wait.SUPER_LOW_WAIT);
            await DropdownPage.dropdownListSelection();
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            // close browser after test
            await browser.pause(Wait.SUPER_LOW_WAIT);
            console.log('Test Completed');
        }
    });
});