module.exports = {
    "Find Fork Execution Environment setting": function (browser) {
        browser
            .login() // Login into the interface
            .closeNotification() // Close all notifications
            .freshWorkflow() // Create a new workflow
            .waitForElementVisible('#accordion-properties') // Wait for the sidebar to be visible
            .assert.elementNotPresent("#simple-form")
            .createTask() // Add a task to the workflow
            .click(".task") // Select the task -- that will show a new sidebar
            .useXpath() // every selector now must be xpath
            .waitForElementVisible('//*[@id=\"Fork Environment\"]') // Check for the Fork Environment tab
            .click('//*[@id=\"Fork Environment\"]') // Click on the Fork Environment tab
            // Wait for the For Execution Environment select to be visible
            .waitForElementVisible('//select[@name=\"Fork Execution Environment\"]')
            .useCss() // we're back to CSS now
            .end(); // That's it done
    },
    "Test that Docker Execution Environment setting is inserted on selection": function (browser) {
        browser
            .login() // Login into the interface
            .closeNotification() // Close all notifications
            .freshWorkflow() // Create a new workflow
            .waitForElementVisible('#accordion-properties') // Wait for the sidebar to be visible
            .assert.elementNotPresent("#simple-form")
            .createTask() // Add a task to the workflow
            .click(".task") // Select the task -- that will show a new sidebar
            .useXpath() // every selector now must be xpath
            .waitForElementVisible('//*[@id=\"Fork Environment\"]') // Check for the Fork Environment tab
            .click('//*[@id=\"Fork Environment\"]') // Click on the Fork Environment tab
            // Wait for the For Execution Environment select to be visible
            .waitForElementVisible('//select[@name=\"Fork Execution Environment\"]')
            // Click in the Fork Execution Enviuronment selector and select 2 (Docker)
            .click('//select[@name=\"Fork Execution Environment\"]/option[2]')
            .pause(2000)
            .getValue('//input[@name=\"Java Home\"]' ,
            function (result) {
                this.assert.equal(typeof result, "object");
                this.assert.equal(result.status, 0);
                this.assert.equal(result.value, "/usr"); // Is set to /usr
            })
            .useCss() // we're back to CSS now
            .end();
    }
}