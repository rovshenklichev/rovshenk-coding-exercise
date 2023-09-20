const { exec } = require('child_process');
const task4 = 'wdio run ./wdio.conf.js --spec test/specs/checkboxesPage.test.js';
const task5 = 'wdio run ./wdio.conf.js --spec test/specs/dropdownPage.test.js';

class MyScript {
    // method task 4
    async task4() {
        exec(task4, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return;
            }
            console.log(`Stdout: ${stdout}`);
        });
        console.log("Task 4 completed");
    }

    // method task 5
    async task5() {
        exec(task5, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return;
            }
            console.log(`Stdout: ${stdout}`);
        });
        console.log("Task 5 completed");
    }
}

const command = process.argv[2];
const myScript = new MyScript();

    (async () => {
            if (command === "checkboxTest") {
                await myScript.task4();
            } else if (command === "dropdownTest") {
                await myScript.task5();
            } else {
                console.log("input 'node my_script.js task4' or 'node my_script.js task5'");
            }
    })();