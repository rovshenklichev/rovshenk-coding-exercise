<h1 align="center">Rovshen - Automation Engineer Coding Exercise</h1>
<h2><b>This README includes all the information on how to run test scripts.</b></h2>

<br><br>
<h3>************************ Way to run spec ************************</h3>

1. Hit npx wdio run ./wdio.conf.ts (to run all the spec files)
2. Hit npx wdio run ./wdio.conf.ts --spec filename.ts (to run only particular spec file)
3. Hit npx wdio run ./wdio.conf.ts --suite suitename (suite should be predefined in wdio.conf.ts under specs)
4. Hit npx wdio run ./wdio.conf.ts --mochaOpts.grep "test case description" (to run all the test with matching test description)
5. Hit npx wdio run ./wdio.conf.ts --spec filename.ts --mochaOpts.grep "test case description" (to run particular case in particular spec)


<br>
<h3>************************ Way to install/update/uninstall dependencies ************************</h3>

1. Hit npm install dependencyname --save-dev (to save the dependency under dev of package.json)
2. Hit npm install dependencyname (to install it normally)
3. Hit npm update (to update all the dependencies to most compitable version)
4. Hit npm update dependencyname (to update particular dependency to latest version)
5. Hit npm uninstall dependencyname


<br><br>
<h3>************************ Steps to get in local ************************</h3>

1. Clone the repo
2. Once repo cloned, hit npm install (to install the package.json dependecies)


<h3><b>************************* Enjoy 😃😃😃 ************************</b></h3>
