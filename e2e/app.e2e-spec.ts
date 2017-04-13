import { TpsprosPage } from './app.po';

describe('tpspros App', () => {
  let page: TpsprosPage;

  beforeEach(() => {
    page = new TpsprosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
