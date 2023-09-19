const Page = require("./page");
const {Wait} = require("../utils/constants");

class DropdownPage extends Page {
    get dropdownListLocator() {
        return "#dropdown";
    }

    get optionsLocator() {
        return "//select[@id='dropdown']/option[@value]";
    }

    /**
     * Opens the dropdown page
     */
    open() {
        return super.open('dropdown');
    }

    /**
     * Selects a random option from the dropdown list
     */
    async dropdownListSelection() {
        const optionCount = await $$(this.optionsLocator).length;
        await $(this.dropdownListLocator).waitForDisplayed({timeout: Wait.LOW_WAIT})
        const selectedOption = Math.floor(Math.random() * (optionCount - 1)) + 1;
        await $(this.dropdownListLocator).selectByAttribute('value', selectedOption);
    }
}

module.exports = new DropdownPage();