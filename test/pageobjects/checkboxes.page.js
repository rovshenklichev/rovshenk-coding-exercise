const Page = require("./page");
const {$$} = require("@wdio/globals");
const {Wait} = require("../utils/constants");

class CheckboxesPage extends Page{
    get checkboxesLocator(){
        return "input[type='checkbox']";
    }

    open () {
        return super.open('checkboxes');
    }

    /**
     * Clicks on all checkboxes a random number of times
     */
    async checkboxesClick() {
        const elements = await $$(this.checkboxesLocator);
        for (let i = 0; i < elements.length; i++) {
            const randomClicks = Math.floor(Math.random() * 10) + 1;

            for (let j = 1; j <= randomClicks; j++) {
                await elements[i].waitForClickable({timeout:Wait.VERY_LOW_WAIT});
                await elements[i].click();
                await browser.pause(Wait.SUPER_LOW_WAIT);
            }
        }
    }
}

module.exports = new CheckboxesPage();