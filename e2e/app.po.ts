import { browser, element, by } from 'protractor';

export class TpsprosPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ps-root h1')).getText();
  }
}
