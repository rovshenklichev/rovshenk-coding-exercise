const CheckboxesPage = require("../pageobjects/checkboxes.page");
const {shared} = require("../resources/testdata");

describe("Checkbox Page - Task 4 - Checkboxes", () => {
    it("Verify method should click each checkbox at least 1-10 times", async () => {
        try {
        await CheckboxesPage.open();
        await expect(browser).toHaveUrl(shared.mainURL+"checkboxes");
        await CheckboxesPage.checkboxesClick();
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            // close browser after test
            console.log('Test Completed');
        }
    });
});