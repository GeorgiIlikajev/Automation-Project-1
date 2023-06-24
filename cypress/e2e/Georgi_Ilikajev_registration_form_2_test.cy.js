beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        cy.get('#username').type('JJBro')
        cy.get('#email').type('wtfisgoingon@gmail.com')
        cy.get('input[data-cy="name"]').type('Georgi')
        cy.get('#lastName').type('Ilikajev')
        cy.get('[data-testid="phoneNumberTestId"]').type('123123')
        cy.get('[name="password"]').type('159487')
        cy.get('[name="confirm"]').type('159487')
        cy.get('body').click(10, 10);
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
      
      
        // I follow the stages of LMS assignment, so in the beginning this test was checking if error message is shown when passwords don't match.
        // Now it is changed according to LMS, but it will ne similar with some others. I hope it's OK and i understood assignment correctly.
    })
    
    it('User can submit form with all fields added', ()=>{
        cy.get('#username').type('JJBro')
        cy.get('#email').type('wtfisgoingon@gmail.com')
        cy.get('input[data-cy="name"]').type('Georgi')
        cy.get('#lastName').type('Ilikajev')
        cy.get('[data-testid="phoneNumberTestId"]').type('123123')
        cy.get('[name="password"]').type('159487')
        cy.get('[name="confirm"]').type('159487')
        cy.get('body').click(10, 10);
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
        
        // Add test steps for filling in ALL fields
        // Assert that submit button is enabled
        // Assert that after submitting the form system show successful message
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        cy.get('#username').type('JJBro')
        cy.get('#email').type('wtfisgoingon@gmail.com')
        cy.get('input[data-cy="name"]').type('Georgi')
        cy.get('#lastName').type('Ilikajev')
        cy.get('[data-testid="phoneNumberTestId"]').type('123123')
        cy.get('[name="password"]').type('159487')
        cy.get('[name="confirm"]').type('159487')
        cy.get('body').click(10, 10);
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })


        // Clear one of the fields to check if possible to submit registration without it

        it('User cannot submit without all mandatory fields filled it', ()=>{
        cy.get('#username').clear()
        cy.get('#email').type('wtfisgoingon@gmail.com')
        cy.get('input[data-cy="name"]').type('Georgi')
        cy.get('#lastName').type('Ilikajev')
        cy.get('[data-testid="phoneNumberTestId"]').type('123123')
        cy.get('[name="password"]').type('159487')
        cy.get('[name="confirm"]').type('159487')
        cy.get('body').click(10, 10);
        cy.get('.submit_button').should('be.disabled')

        })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('#logo').invoke('css', 'height').should('eq', '178px')
        // get element and check its parameter height, to be equal 178
        
    })

    // Create similar test for checking second picture
    
    it('Check that second picture is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('[data-cy=cypress_logo]').invoke('css', 'height').should('eq', '178px')
        
    })
    

    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking second link to Cerebrum Hub homepage
    // Check that URL to Cerebrum Hub page is correct and clickable

    it('Check navigation part 2', () => {
        
        // Get navigation element (2), find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'https://cerebrumhub.com/')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', 'https://cerebrumhub.com/')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript').and('not.be.checked')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP').and('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one

    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('.checkbox.vehicles').should('have.length', 3)
        cy.get('#vehicle1').next().eq(0).should('have.text','I have a bike').and('not.be.checked')
        cy.get('#vehicle2').next().eq(0).should('have.text','I have a car').and('not.be.checked')
        cy.get('#vehicle3').next().eq(0).should('have.text','I have a boat').and('not.be.checked')

        cy.get('#vehicle1').click()
        cy.get('#vehicle1').should('be.checked')
        cy.get('#vehicle2').click()
        cy.get('#vehicle2').should('be.checked')
        cy.get('#vehicle1').should('be.checked')
    })


    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    // Create test similar to previous one

    it('Animal dropdown is correct', () => {
        cy.get('#animal').select(1).screenshot('Animals drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#animal').find('option').should('have.length', 6)
        

        //Checking, if text is similar to the requirements - using different approach from "values", since they are messy.
        const expectedOptions = ['Dog', 'Cat', 'Snake', 'Hippo', 'Cow', 'Horse'];
        cy.get('#animal > option').then(($options) => {
        const actualOptions = $options.map((index, option) => Cypress.$(option).text()).get();
        expect(actualOptions).to.deep.eq(expectedOptions);
    })
    })


})

function inputValidData() {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Something')
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}