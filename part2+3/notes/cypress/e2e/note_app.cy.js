describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Jason Liu',
      username: 'jasonliu1114',
      password: 'jason141118',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2023'
    )
  })

  it('login form can be opened', () => {
    cy.contains('log in').click()
  })

  it('login fails with wrong credential', () => {
    cy.contains('log in').click()
    cy.get('#username').type('wrongusername')
    cy.get('#password').type('wrongpassword')
    cy.get('#login-button').click()
    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'logged in')
  })

  it('user can log in', function () {
    cy.contains('log in').click()
    cy.get('#username').type('jasonliu1114')
    cy.get('#password').type('jason141118')
    cy.get('#login-button').click()
    cy.contains('Jason Liu logged in')
  })

  describe('when logged in', () => {
    beforeEach(function () {
      cy.login({ username: 'jasonliu1114', password: 'jason141118' })
    })

    it('a new note can be created', () => {
      cy.contains('new note').click()
      cy.get('input:first').type(
        'testing if a new note can be created --cypress'
      )
      cy.contains('save').click()
      cy.contains('testing if a new note can be created --cypress')
    })

    describe('and several notes exist', () => {
      beforeEach(function () {
        cy.createNote({ content: 'note 2 by cypress', importance: false })
        cy.createNote({ content: 'note 3 by cypress', importance: false })
        cy.createNote({ content: 'note 4 by cypress', importance: false })
      })

      it('can be made unimportant', function () {
        cy.contains('note 2 by cypress').contains('make important').click()
        cy.contains('note 2 by cypress').contains('make not important')
      })
    })
  })
})
