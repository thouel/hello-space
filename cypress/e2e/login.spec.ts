describe.skip('Social logins verification', () => {
  before(() => {
    cy.task('db:teardown')

    cy.log('Visiting ', Cypress.env('LOCAL_URL'))
    cy.visit('/')
  })

  afterEach(() => {
    // Logout
    cy.visit('/api/auth/signout')
    cy.get('form').submit()
  })
  it('should succeed logging the user in when using GitHub social account', () => {
    cy.session(`github-${Cypress.env('GITHUB_USER')}`, () => {
      const username = Cypress.env('GITHUB_USER')
      const password = Cypress.env('GITHUB_PW')
      const loginUrl = `${Cypress.env('SITE_NAME')}/auth/login`
      const cookieName = Cypress.env('COOKIE_NAME')
      const socialLoginOptions = {
        username,
        password,
        loginUrl,
        headless: true,
        logs: true,
        isPopup: false,
        loginSelector: 'button[data-test="github"]',
        postLoginSelector: 'h1[data-test="title"]',
      }

      return cy
        .task('GitHubSocialLogin', socialLoginOptions)
        .then(({ cookies }) => {
          cy.clearCookies()

          const cookie = cookies
            .filter((cookie) => cookie.name === cookieName)
            .pop()

          if (cookie) {
            cy.debug().setCookie(cookie.name, cookie.value, {
              domain: cookie.domain,
              expiry: cookie.expires,
              httpOnly: cookie.httpOnly,
              path: cookie.path,
              secure: cookie.secure,
            })

            cy.visit('/s/profile').debug()
            cy.get('h1').then((el) => {
              expect(el.text()).to.contain('Welcome')
            })
          }
        })
    })
  })
})
