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
                webElement = $("//div[@class='ql-editor']");
                break;
        }
        return webElement;
    }

}

export default new NewEmployeePage();