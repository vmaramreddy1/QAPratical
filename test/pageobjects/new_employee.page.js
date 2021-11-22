import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class NewEmployeePage extends Page {

    async getRadioBox(fieldName){
        let radioList = await browser.$$("//input[@type='radio']/parent::label");
        console.log("Radio list size is " + radioList.length);
        for(let i=0; i<radioList.length; i++){
            let text = await radioList[i].getText();
            console.log('Text is :'+ text);
            if(text===fieldName){
                console.log("inside if loop");
                var radioLabel = radioList[i];
                return await radioLabel.$('./input');
            }
        }
    }

    async selectDropdown(dropdownValue){
        let option = await browser.$("//li[@role='option']//div[contains(text(),'"+ dropdownValue +"')]");
        await option.waitForExist({ timeout: 5000 });
        await option.click();
    }



    
    getField(fieldName){
        var webElement = null;
        switch(fieldName){
            case 'First Name':
            case 'Last Name':
            case 'City':
            case 'State':
            case 'Telephone':
            case 'Zip':
            case 'Email':
            case 'Employee ID':
            case 'Text':
                webElement = $("//span[text()='"+fieldName+"']/ancestor::label/following-sibling::node()"+
                "/child::node()[contains(@ng-switch,'field.fieldType')]//input");
                break;
            case 'Street Address':
                webElement = $("//span[text()='"+fieldName+"']/ancestor::label/following-sibling::node()"+
                "/child::node()[contains(@ng-switch,'field.fieldType')]//textarea");
                break;
            case 'Full Time':
            case 'Part Time':
            case 'Intern':
            case '401(k)':
            case 'Medical':
            case 'Dental':
            case 'Vision':
            case 'Engineering':
            case 'Sales':
            case 'Accounting':
            case 'Products':
            case 'Custodial':
            case 'HR':
            case 'Marketing':
            case 'Other':
                webElement = this.getRadioBox(fieldName);    
                break;
            case 'Favourite Band':
                webElement = $("//*[contains(text(),'Favourite Band')]/ancestor::label/following-sibling::node()//a");
                break;
            case 'Notes':
                webElement = $("//div[contains(@class,'ql-editor')]");
                break;
            case 'Post Comment':
                webElement = $("//span[contains(text(),'Post Comment')]");
                break;
            case 'Save':
                webElement = $("//span[@ng-show='tool.icon']//following-sibling::span[text()='Save']");
                break;
            case 'Time Spent':
                webElement = $("//div[@class='modal-dialog']//button");
                break;
            case 'Record Saved':
                webElement = $("//div[@class='ng-notification-content animated']/span[text()='Record saved']");
                break;
        }
        return webElement;
    }

}

export default new NewEmployeePage();