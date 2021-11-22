import LoginPage from  '../pageobjects/login.page';
import LandingPage from '../pageobjects/landing.page';
import NewEmployeePage from '../pageobjects/new_employee.page';

describe('Swimlane application', () => {
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
        //browser.moveToObject(NewEmployeePage.getField('Text'));
        await NewEmployeePage.getField('Text').setValue("Sample Text");
        NewEmployeePage.clickRadioBox('Intern');
        browser.pause(2000);
        NewEmployeePage.clickRadioBox('Dental');
        browser.pause(2000);
        NewEmployeePage.clickRadioBox('Marketing');        
        // await NewEmployeePage.getField('Employee ID').setValue("N095267");
        // await NewEmployeePage.getField('Favourite Band').click();
        // await NewEmployeePage.getField('Notes').setValue("Hello , this is notes by automation");
        await browser.saveScreenshot('/Users/vijaym/Desktop/screenshot.png');
        
    });
});


