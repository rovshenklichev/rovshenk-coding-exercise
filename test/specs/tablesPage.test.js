const TablesPage = require("../pageobjects/tables.page");
const {shared} = require("../resources/testdata");
const { expect } = require('chai');

describe("Tables Page - Task 2 - Sortable Tables", () => {

    it("Verify user landed on Tables page", async () => {
        await TablesPage.open();
        await TablesPage.verifyTablesPageHeader(shared.tablesPageHeader);
        const currentUrl = await browser.getUrl();
        expect(currentUrl).to.include("tables");
    });

    it("Verify that the table contains the expected headers", async () => {
        await TablesPage.open();
        const listOfTableHeaders = TablesPage.listOfTable1Headers; // Replace with your element selector
        const table1ListOfExpectedHeaders = [
            shared.lastNameTxt,
            shared.firstNameTxt,
            shared.emailTxt,
            shared.dueTxt,
            shared.websiteTxt,
            shared.actionTxt
        ];
        await TablesPage.getTextContentsOfElements(listOfTableHeaders, table1ListOfExpectedHeaders);
    });

    it("Verify count of columns", async () => {
        await TablesPage.open();
        await TablesPage.verifyCountOfColumns(shared.countOfTable1Headers);
    });

    it("Verify that the table data is sorted correctly", async () => {
        const testDataColumn1Table1 = [
            shared.lastName1Table1,
            shared.lastName2Table1,
            shared.lastName3Table1,
            shared.lastName4Table1
            ]; // 1st column data
        const testDataColumn2Table1 = [
            shared.firstName1Table1,
            shared.firstName2Table1,
            shared.firstName3Table1,
            shared.firstName4Table1
        ]; // 2nd column data
        const testDataColumn3Table1 = [
            shared.emit1Table1,
            shared.emit2Table1,
            shared.emit3Table1,
            shared.emit4Table1
            ]; // 3rd column data
        const testDataColumn4Table1 = [
            shared.dueTag1Table1,
            shared.dueTag2Table1,
            shared.dueTag3Table1,
            shared.dueTag4Table1
            ]; // 4th column data
        const testDataColumn5Table1 = [
            shared.website1Table1,
            shared.website2Table1,
            shared.website3Table1,
            shared.website4Table1
            ]; // 5th column data
        await TablesPage.open();
        await TablesPage.verifyDataSortingInColumn(TablesPage.firstColumnIdentifier, testDataColumn1Table1); // 1st column
        await TablesPage.verifyDataSortingInColumn(TablesPage.secondColumnIdentifier, testDataColumn2Table1); // 2nd column
        await TablesPage.verifyDataSortingInColumn(TablesPage.thirdColumnIdentifier, testDataColumn3Table1); // 3rd column
        await TablesPage.verifyDataSortingInColumn(TablesPage.fourthColumnIdentifier, testDataColumn4Table1); // 4th column
        await TablesPage.verifyDataSortingInColumn(TablesPage.fifthColumnIdentifier, testDataColumn5Table1); // 5th column
    });

    it("Verify all the delete buttons are clickable", async () => {
        await TablesPage.open();
        const areClickable = await TablesPage.verifyListOfButtonsAreClickable(TablesPage.listOfDeleteButtons);
        expect(areClickable).to.be.true;
    });

    it("Verify all the edit buttons are clickable", async () => {
        await TablesPage.open();
        const areClickable = await TablesPage.verifyListOfButtonsAreClickable(TablesPage.listOfEditButtons);
        expect(areClickable).to.be.true;
    });

    it("Verify clicking on delete row - correct deletion action is performed", async () => {
        await TablesPage.open();
        await TablesPage.verifyDeleteRow(TablesPage.firstRowIdentifier, 0, shared.lastName1Table1);
    });

    it("Verify all the edit buttons are clickable", async () => {
        await TablesPage.open();
        const areClickable = await TablesPage.verifyListOfButtonsAreClickable(TablesPage.listOfEditButtons);
        expect(areClickable).to.be.true;
    });

    it("Verify editing the first row's due amount", async () => {
        const newDueAmount = shared.editDueTo60; // Specify the new due amount you want to set

        await TablesPage.open();

        // Call the verifyEdit1stDueAmount method to edit the first row's due amount
        const result = await TablesPage.verifyEdit1stDueAmount(0, newDueAmount);

        // Verify that the previous and updated amounts match the expected values
        expect(result.previousAmount).to.equal(shared.dueTag1Table1);
        expect(result.updatedAmount).to.equal(newDueAmount);
    });
});