import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class NewEmployeePage extends Page {

    clickRadioBox(fieldName){
        browser.execute(function (fieldName) {
            console.log("fiedld Name is :" + fieldName);
            var radioBoxElements = this.document.getElementsByClassName("radio field-radio");
            for(let i=0; i<radioBoxElements.length; i++){
                var labelEle = radioBoxElements[i].getElementsByTagName('label')[0];
                labelEle.scrollIntoView();
                if(labelEle.innerText === fieldName){
                    radioBoxElements[i].getElementsByTagName('input')[0].click();
                }
            }
        },fieldName);    
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