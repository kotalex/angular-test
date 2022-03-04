import { $, browser, ElementFinder, logging, protractor } from 'protractor';

let emailInput: ElementFinder;
let passwordInput: ElementFinder;
let submitButton: ElementFinder;
const EC = protractor.ExpectedConditions;

describe('Angular App', function() {
  it('should redirect to login page', async () => {
    browser.get(browser.baseUrl);

    const elem = $('h2');
    browser.wait(EC.textToBePresentInElement(elem, 'Login Page'));
    
    const text = await elem.getText();
    expect(text).toBe('Login Page');
  });

  it('should validate login form', async () => {
    browser.sleep(1000);

    submitButton = $('button[color="primary"]');
    submitButton.click();

    const errorMessage: string = await $('mat-error').getText();

    expect(errorMessage).toBe('Email is required');
  });

  it('should show invalid credentials toast', async () => {
    browser.sleep(1000);

    emailInput = $('#email');
    passwordInput = $('#password');
    
    emailInput.sendKeys('wrong@mail.com');
    passwordInput.sendKeys('wrongpassword');
    
    submitButton = $('button[color="primary"]');
    submitButton.click();

    const invalidCredsSnackBar = $('simple-snack-bar');
    expect(invalidCredsSnackBar.isPresent()).toBeTruthy();

    const invalidCredsMessage = await invalidCredsSnackBar.getText();
    expect(invalidCredsMessage).toContain('Invalid credentials');
  });

  it('should login user', async (done) => {
    browser.sleep(1000);

    await emailInput.clear();
    await passwordInput.clear();

    browser.sleep(1000);

    emailInput.sendKeys('admin@user.com');
    passwordInput.sendKeys('test1234');
    submitButton.click();

    const adminTitle = $('h1');
    browser.wait(EC.textToBePresentInElement(adminTitle, 'Welcome, Admin'));
    done();

    browser.sleep(3000);
  });
}); 