const LoginPage = require('../pageobjects/login.page')
const SecurePage = require('../pageobjects/secure.page')
const {shared} = require("../resources/testdata");

describe("Login Page - Task 1", () => {
    it("Verify user is able to Login", async () => {
        await LoginPage.open(); // open login page
        // 1) Enter the username and password to log in.
        await LoginPage.login(shared.username, shared.password);
        // 2) Validate you have logged in
        await SecurePage.verifyUserLoggedIn(shared.loginSuccessMessage, shared.welcomeMessage);
    });

    it("Verify user is able to Logout", async () => {
        await LoginPage.open();
        await LoginPage.login(shared.username, shared.password);
        // 3) Log out
        // 4) Validate you’ve logged out
        await SecurePage.verifyUserLoggedOut(shared.logoutSuccessMessage, shared.loginPageHeader);
    });
});

