import LoginPage from  '../pageobjects/login.page';
import LandingPage from '../pageobjects/landing.page';
import NewEmployeePage from '../pageobjects/new_employee.page';
import applicationRecord from '../model/application_record';
const Client = require('node-rest-client').Client;
const chai = require('chai');
const chaiHttp = require('chai-http');  
const assert = chai.assert;    
chai.use(chaiHttp);

describe('Swimlane application', () => {
    let token;
    let client = new Client();
    let cookies;
    let args;

    before(function (done) {
        const email = "vijay.bhasker";
        const password = "Q^crpXMCD7G5";
        args = {
            data: JSON.stringify({ username: email, password: password }),
            headers: { "Content-Type": "application/json" }
        };
        client.post("https://qa-practical.qa.swimlane.io/api/user/login", args, 
            function (data, response) {
                token = JSON.parse(data).token;
                assert.isNotNull(token,"Token must be present");
                if (parseInt(response.statusCode) === 200) {
                    cookies = response.headers['set-cookie'].pop().split(';')[0];
                    assert.isNotNull(cookies, 'Cookie must be present');
                }
        });
        args = {
            headers: { "Content-Type": "application/json",
            "Authorization": "Bearer " + token, 
            "Cookie": cookies},
        };
    });

    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.login('vijay.bhasker', 'Q^crpXMCD7G5');
        await expect(LandingPage.navigationBar).toBeExisting();
        console.log(await LandingPage.navigationBar.getText());
        await expect(LandingPage.navigationBar).toHaveTextContaining(
            'APPLICATION RECORDS');
    });

    it('should successfully add a new application record', async () => {
        await LandingPage.clickOnNavigationLink('Application Records');
        await LandingPage.newEmployeeSubmissionLink.click();
        await expect(NewEmployeePage.getField('First Name')).toBeExisting();
        await NewEmployeePage.getField('First Name').setValue("Vijay");
        await NewEmployeePage.getField('Last Name').setValue("Bhaskar");
        await NewEmployeePage.getField('Street Address').setValue("Plot No:666,\n Flat No : 302, 3rd Floor,\n Aditya Residency,\n Road No:5/7, \n Matrusri Nagar,\n Hafeezpet, \n, Miyapur, \n,Hyderabad,\n Telangana, \n, 500049");
        await NewEmployeePage.getField('City').setValue("Hyderabad");
        await NewEmployeePage.getField('State').setValue("Telangana");
        await NewEmployeePage.getField('Telephone').setValue("+91-8939742475");
        await NewEmployeePage.getField('Zip').setValue("500049");
        await NewEmployeePage.getField('Email').setValue("vijay.in.vnr@gmail.com");
        await NewEmployeePage.getField('Text').setValue("Sample Text");
        var radiobox = await NewEmployeePage.getField('Full Time');
        await radiobox.click();
        radiobox = await NewEmployeePage.getField('Dental');
        await radiobox.click();
        radiobox = await NewEmployeePage.getField('Marketing');
        await radiobox.click();
        const dropdown = await NewEmployeePage.getField("Favourite Band");
        await dropdown.click();
        NewEmployeePage.selectDropdown("Luke Vibert");
        await NewEmployeePage.getField("Notes").setValue("This is sample comments from automation");
        await NewEmployeePage.getField("Post Comment").click();
        await NewEmployeePage.getField("Save").click();
        await NewEmployeePage.getField("Time Spent").click();
        await NewEmployeePage.getField("Record Saved").waitForExist({ timeout: 5000 });
        await NewEmployeePage.getField("Record Saved").click();
        await browser.saveScreenshot('/Users/vijaym/Desktop/screenshot.png');
        
    });


    it('Swimlane API- fetch application by recordId', async() =>{
        const id=1234;
        const record_id = 5678;
        chai.request("https://qa-practical.qa.swimlane.io")
            .get("/api/app/"+id+"/record/"+ record_id)
            .set(args)
            .end((err, res) => {
                if(err) done(err);
                rest_response = res;
                rest_body = res.body;
                expect(res).to.have.status(200);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
            done();
          });
    });

    it('Swimlane API- Post recordId', async() =>{
        const id=1234;
        chai.request("https://qa-practical.qa.swimlane.io")
            .post("/api/app/"+id+"/record/")
            .set(args)
            .send(applicationRecord)
            .end((err, res) => {
                if(err) done(err);
                rest_response = res;
                rest_body = res.body;
                expect(res).to.have.status(200);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
            done();
          });
    });

    it('Swimlane API- Delete recordId', async() =>{
        const id=123411;
        const record_id = 567822;
        chai.request("https://qa-practical.qa.swimlane.io")
            .delete("/api/app/"+id+"/record/"+ record_id)
            .set(args)
            .end((err, res) => {
                if(err) done(err);
                rest_response = res;
                rest_body = res.body;
                expect(res).to.have.status(200);
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
            done();
          });
    });
});



