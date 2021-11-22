

import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LandingPage extends Page {
    /**
     * define selectors using getter methods
     */
    get navigationBar() {
        return $('div.nav-menu');
    }

    get newEmployeeSubmissionLink(){
        return $("//span[text()='New Employee Submission']/parent::a/following-sibling::node()[contains(@class,'app-buttons')]/a");
    }

    navigationLink(linkName){
        return $("//span[@class='nav-label' and contains(text(),'" + linkName +"')]/parent::node()[contains(@class,'nav-item')]");   
    }

    async clickOnNavigationLink(linkName){
        if(! await this.isNavigationLinkExpanded(linkName)){
            await this.navigationLink(linkName).click();
        }
    }

    async isNavigationLinkExpanded(linkName){
        var webElement = this.navigationLink(linkName);
        var expandedEle = await webElement.$("../child::node()[@class='ng-star-inserted']");
        var isExisting = await expandedEle.isExisting();
        return isExisting;
    }

}

export default new LandingPage();
