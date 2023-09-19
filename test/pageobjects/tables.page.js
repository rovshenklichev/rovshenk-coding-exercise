const Page = require('./page');
const { expect } = require('chai');
const { $, $$} = require('@wdio/globals');
const {Wait} = require("../utils/constants");

class TablesPage extends Page{

    get tablesPageHeader(){
        return "//h3[contains(text(),'Data Tables')]";
    }

    get tables1Header(){
        return "//*[@id='table1']/thead/tr";
    }

    get listOfTable1Headers(){
        return "//*[@id='table1']//th[@class='header']";
    }

    get firstColumnIdentifier() {
        return "//table[@id='table1']/tbody/tr/td[1]";
    }

    get secondColumnIdentifier() {
        return "//table[@id='table1']/tbody/tr/td[2]";
    }

    get thirdColumnIdentifier() {
        return "//table[@id='table1']/tbody/tr/td[3]";
    }

    get fourthColumnIdentifier() {
        return "//table[@id='table1']/tbody/tr/td[4]";
    }

    get fifthColumnIdentifier() {
        return "//table[@id='table1']/tbody/tr/td[5]";
    }

    get firstRowIdentifier() {
        return "//table[@id='table1']/tbody/tr[1]";
    }

    get listOfDeleteButtons(){
        return "//table[@id='table1']//a[@href='#delete']";
    }

    get listOfEditButtons(){
        return "//table[@id='table1']//a[@href='#edit']";
    }

    get firstCellUnderDueColumn(){
        return "//table[@id='table1']/tbody/tr[1]/td[4]";
    }

    /**
     * this method is used to open the table page
     */
    open () {
        return super.open('tables');
    }

    /**
     * This method is used to verify the table contains the expected headers
     * @param countOfTable1Headers
     */
    async verifyCountOfColumns(countOfTable1Headers){
        await $(this.tables1Header).waitForDisplayed({timeout: Wait.LOW_WAIT});
        const elements = await $$(this.listOfTable1Headers);
        expect(elements.length).to.equal(countOfTable1Headers);
    }

    /**
     * This method is used to verify the data in the column
     * @param columnSelector
     * @param expectedData
     */
    async verifyDataSortingInColumn(columnSelector, expectedData) {
        await $(columnSelector).waitForDisplayed({timeout: Wait.LOW_WAIT});
        const columnData = await $$(columnSelector);
        const data = await Promise.all(columnData.map((element) => element.getText()));

        for (let i = 0; i < data.length; i++) {
            expect(data[i]).to.equal(expectedData[i]);
        }
    }

    /**
     * This method is used to verify the Delete action on the specified row
     * @param rowElementToDelete
     * @param rowIndexOfDeleteNum
     * @param expectedData
     */
    async verifyDeleteRow(rowElementToDelete, rowIndexOfDeleteNum, expectedData) {
        await $(rowElementToDelete).waitForDisplayed({ timeout: Wait.LOW_WAIT });
        // Get the initial text of the row before deletion
        const initialText = await $(rowElementToDelete).getText();

        // Click the deleted button for the specified row
        const deleteButtons = await $$(this.listOfDeleteButtons);
        if (deleteButtons.length > rowIndexOfDeleteNum) {
            await $$(this.listOfDeleteButtons)[0].waitForClickable({timeout: Wait.LOW_WAIT});
            await deleteButtons[rowIndexOfDeleteNum].click();
        }

        // Verify that the row text no longer contains the expected data
        const currentText = await $(rowElementToDelete).getText();
        expect(currentText).to.not.include(expectedData);

        // Verify that the row text is different from the initial text
        expect(currentText).to.not.equal(initialText);
    }

    /**
     * This method is used to verify that all the buttons in the list are clickable
     * @param listOfButtonsLocator
     */
    async verifyListOfButtonsAreClickable(listOfButtonsLocator) {
        const deleteButtons = await $$(listOfButtonsLocator);

        for (const button of deleteButtons) {
            await button.waitForClickable({timeout: Wait.LOW_WAIT});
            if (!(await button.isClickable())) {
                return false; // If any button is not clickable, return false
            }
        }

        return true; // All buttons are clickable
    }

    /**
     * This method is used to verify the Edit action on the Due Column 1st row
     * @param rowIndexOfEditNum
     * @param newInputForDue1stRow
     */
    /**
     * This method is used to verify the Edit action on the Due Column 1st row
     * @param rowIndexOfEditNum
     * @param newInputForDue1stRow
     */
    async verifyEdit1stDueAmount(rowIndexOfEditNum, newInputForDue1stRow) {
        await $(this.firstCellUnderDueColumn).waitForDisplayed({ timeout: Wait.LOW_WAIT });
        const editButtons = await $$(this.listOfEditButtons);

        if (editButtons.length > rowIndexOfEditNum) {
            const currentAmount = await $(this.firstCellUnderDueColumn).getText();

            await editButtons[0].waitForClickable({ timeout: Wait.LOW_WAIT });
            await editButtons[rowIndexOfEditNum].click();

            // Clear the input field and enter the new amount
            await $(this.firstCellUnderDueColumn).click(); // Click to focus the input
            await $(this.firstCellUnderDueColumn).clearValue();
            await $(this.firstCellUnderDueColumn).setValue(newInputForDue1stRow);

            // Press Enter to save the new amount
            await $(this.firstCellUnderDueColumn).keys('Enter');

            // Wait for the cell to update
            await browser.waitUntil(async () => {
                const updatedAmount = await $(this.firstCellUnderDueColumn).getText();
                return updatedAmount === newInputForDue1stRow;
            }, {
                timeout: 5000,
                timeoutMsg: 'The cell value did not update to the new amount.'
            });

            // Check if the cell text equals the new amount
            const updatedAmount = await $(this.firstCellUnderDueColumn).getText();
            expect(updatedAmount).to.equal(newInputForDue1stRow);

            // Return the previous and updated amounts for reference
            return {
                previousAmount: currentAmount,
                updatedAmount: newInputForDue1stRow
            };
        }
    }

}

module.exports = new TablesPage();