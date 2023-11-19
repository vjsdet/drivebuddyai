Install Node.js from below URL.
https://nodejs.org/en/download/

Open the commnad prompt in root directory.

Run the **"npm install"** command to install the dependencies.

In **cypress.env.json** file located in the root directory of the project specify api url and app url

Run one of the below command to run the tests in the open-mode.

**npx cypress open --env "EMAIL=User_Email,PASSWORD=User_Password"**

**npx cypress open --env "APIKEY=User_ApiKey"**


Run the below command to run the tests in the run-mode.

**npx cypress run --env "EMAIL=User_Email,PASSWORD=User_Password"**

**npx cypress run --env "APIKEY=User_ApiKey"**

Once execution is completed then in the **"cypress/reports"*** directory ***index.html** report file will be generated. To view it open it in any browser.

