describe('Alarming', function() {

  beforeEach(function() {
    browser.get('http://localhost:8100');
  });

  function setInput(val, input) {
    var scr = "var ipt = document.getElementById('" + input + "'); " +
    "ipt.value = '" + val + "';" +
    "angular.element(ipt).scope().$apply(function(s) { s.createForm[ipt.name].$setViewValue('" + val + "'); });";
    browser.executeScript(scr);
  }

  function signin() {
    element(by.id('signin')).click();
    element(by.model('user.email')).sendKeys('harry@gmail.com');
    element(by.model('user.password')).sendKeys('harry');
    element(by.id('button')).click();
    browser.driver.wait(function() {
      return browser.driver.getCurrentUrl().then(function(url) {
        return (/my-events/).test(url);
      });
    });
  }

  it('has a title', function() {
    expect(browser.getTitle()).toEqual('Welcome to Alarming');
  });

  // it('has a sign up page', function() {
  //   element(by.id('signup')).click();
  //   element(by.model('user.email')).sendKeys('testing123@protractor.com');
  //   element(by.model('user.password')).sendKeys('testingtesting123');
  //   element(by.id('button')).click();
  //   browser.driver.wait(function() {
  //     return browser.driver.getCurrentUrl().then(function(url) {
  //       return (/my-events/).test(url);
  //     });
  //   });
  //   var results = element.all(by.repeater('(key, event) in MyEventsCtrl.userEvents'));
  //   results.then(function(result) {
  //     expect(result.length).toBeLessThan(1);
  //     expect(browser.getTitle()).toEqual('My-Events');
  //   });
  // })

  it('allows you to sign in', function() {
    signin();
    expect(browser.getTitle()).toEqual('My-Events');
  });

  it('allows you do sign in and create an event', function() {
    signin();
    // element(by.xpath('//a[@class="tab-item"][1]')).click();
    // element(by.model('eventTitle')).sendKeys('testevent');
    // element(by.model('description')).sendKeys('testdescription');
    // setInput('2015-11-11', 'date');
    // setInput('12:00:00', 'time');
    // element(by.css(':button')).click();
    // browser.pause();

    //element.all(by.repeater('(key, user) in createEventCtrl.usersHash')).get(1).click();
    // element(by.xpath('//button[@class="button.button-full.button-positive"][0]')).click();
    //element(by.xpath('//button[@class="button" and contains(., "Create Event")][0]')).click();
    // element(by.buttonText('Create event')).click();
    // console.log(element(by.id('create-button')));
    // browser.executeScript('window.scrollTo(0,10000);').then(function () {
    //   var button = ($('[ng-click="CreateEventCtrl.createEvent(eventTitle, description, eventDate, eventTime)"].button.button-full.button-positive'));
    //   button.click();
    // });
    // browser.driver.wait(function() {
    //   return browser.driver.getCurrentUrl().then(function(url) {
    //     return (/my-events/).test(url);
    //   });
    // });
    // browser.pause();
    // expect(browser.getTitle()).toEqual('My-Events');

  });

//   it('allows you to see your individual events page', function() {
//     element(by.id('signin')).click();
//     element(by.model('user.email')).sendKeys('harry@gmail.com');
//     element(by.model('user.password')).sendKeys('harry');
//     element(by.id('button')).click()
//     browser.driver.wait(function() {
//       return browser.driver.getCurrentUrl().then(function(url) {
//         return (/my-events/).test(url);
//       });
//     });
//   });
});
