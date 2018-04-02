import { eSHOPPage } from './app.po';

describe('eshop App', () => {
  let page: eSHOPPage;

  beforeEach(() => {
    page = new eSHOPPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
