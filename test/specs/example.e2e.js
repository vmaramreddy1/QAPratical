// import LoginPage from  '../pageobjects/login.page';
// import LandingPage from '../pageobjects/landing.page';
// import NewEmployeePage from '../pageobjects/new_employee.page';
var Client = require('node-rest-client').Client;

describe('Swimlane application', () => {
    // it('should login with valid credentials', async () => {
    //     await LoginPage.open();
    //     await LoginPage.login('vijay.bhasker', 'Q^crpXMCD7G5');
    //     await expect(LandingPage.navigationBar).toBeExisting();
    //     console.log(await LandingPage.navigationBar.getText());
    //     await expect(LandingPage.navigationBar).toHaveTextContaining(
    //         'APPLICATION RECORDS');
    // });

    // it('should successfully add a new application record', async () => {
    //     await LandingPage.clickOnNavigationLink('Application Records');
    //     await LandingPage.newEmployeeSubmissionLink.click();
    //     await expect(NewEmployeePage.getField('First Name')).toBeExisting();
    //     await NewEmployeePage.getField('First Name').setValue("Vijay");
    //     await NewEmployeePage.getField('Last Name').setValue("Bhaskar");
    //     await NewEmployeePage.getField('Street Address').setValue("Plot No:666,\n Flat No : 302, 3rd Floor,\n Aditya Residency,\n Road No:5/7, \n Matrusri Nagar,\n Hafeezpet, \n, Miyapur, \n,Hyderabad,\n Telangana, \n, 500049");
    //     await NewEmployeePage.getField('City').setValue("Hyderabad");
    //     await NewEmployeePage.getField('State').setValue("Telangana");
    //     await NewEmployeePage.getField('Telephone').setValue("+91-8939742475");
    //     await NewEmployeePage.getField('Zip').setValue("500049");
    //     await NewEmployeePage.getField('Email').setValue("vijay.in.vnr@gmail.com");
    //     //browser.moveToObject(NewEmployeePage.getField('Text'));
    //     await NewEmployeePage.getField('Text').setValue("Sample Text");
    //     var radiobox = await NewEmployeePage.getField('Full Time');
    //     await radiobox.click();
    //     radiobox = await NewEmployeePage.getField('Dental');
    //     await radiobox.click();
    //     radiobox = await NewEmployeePage.getField('Marketing');
    //     await radiobox.click();
    //     var dropdown = await NewEmployeePage.getField("Favourite Band");
    //     await dropdown.click();
    //     NewEmployeePage.selectDropdown("Luke Vibert");
    //     await NewEmployeePage.getField("Notes").setValue("This is sample comments from automation");
    //     await NewEmployeePage.getField("Post Comment").click();
    //     await NewEmployeePage.getField("Save").click();
    //     await NewEmployeePage.getField("Time Spent").click();
    //     await NewEmployeePage.getField("Record Saved").waitForExist({ timeout: 5000 });
    //     await NewEmployeePage.getField("Record Saved").click();
    //     await browser.saveScreenshot('/Users/vijaym/Desktop/screenshot.png');
        
    // });


    it('Swimlane API- fetch application by recordId', async() =>{
        var client = new Client();
        var email = "vijay.bhasker";
        var password = "Q^crpXMCD7G5";
        var args = {
            data: JSON.stringify({ username: email, password: password }),
            headers: { "Content-Type": "application/json" }
        };
        var request = client.post("https://qa-practical.qa.swimlane.io/api/user/login", args, 
            function (data, response) {
                // parsed response body as js object
                //console.log('Data is '+ JSON.parse(data).token);
                token = JSON.parse(data).token;
                //console.log(response.statusCode);
                if (parseInt(response.statusCode) === 200) {
                   console.log("Res is"+response.data['token']);
                }
            });

        console.log("Token is "+  token);
        var args = {
            path: { "id": 1234 },
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token},
            strictSSL: false
        };
        console.log('Sending the API request');
        var req  = client.get("https://qa-practical.qa.swimlane.io/api/app/${id}/record", args,
        function (data, response) {
            // parsed response body as js object
            console.log('Data is '+ data);
            // raw response
            console.log('Response is ' + response);
        });

        req.on('error', function (err) {
            console.log('request error', err);
        });



    });
});


