describe('Alarming', function() {

  beforeEach(function() {
    browser.get('http://localhost:8100');
  });

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Logged-out');
  });

  it('has a log in page', function() {
    element(by.id('signin')).click();
    expect(browser.getTitle()).toEqual('Sign-In');
  });

  it('has a sign up page', function() {
    element(by.id('signup')).click();
    expect(browser.getTitle()).toEqual('Sign-Up');
  })

  it('allows you to sign in', function() {
    element(by.id('signin')).click();
    element(by.model('user.email')).sendKeys('harry@gmail.com');
    element(by.model('user.password')).sendKeys('harry');
    element(by.id('button')).click()
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return (/my-events/).test(url);
      })
    })
    expect(browser.getTitle()).toEqual('My-Events');
  });
});
