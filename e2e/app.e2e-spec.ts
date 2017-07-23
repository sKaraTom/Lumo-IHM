import { LumoIHMPage } from './app.po';

describe('lumo-ihm App', () => {
  let page: LumoIHMPage;

  beforeEach(() => {
    page = new LumoIHMPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
