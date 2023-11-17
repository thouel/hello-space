describe('Test the /api/feed route', () => {
  it('should fail giving feed without TOKEN, startDate and endDate', () => {
    cy.request({
      method: 'POST',
      url: '/api/feed',
      body: JSON.stringify({}),
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).equals(401)
      expect(body.error).not.to.be.undefined
      expect(body.error.message).eq('Not authorized')
      expect(body.data).to.be.empty
    })
  })
  it('should fail giving feed with unauthorized TOKEN, without startDate and endDate', () => {
    cy.request({
      method: 'POST',
      url: '/api/feed',
      body: JSON.stringify({ token: 'toto' }),
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).equals(401)
      expect(body.error).not.to.be.undefined
      expect(body.error.message).eq('Not authorized')
      expect(body.data).to.be.empty
    })
  })
  it('should fail giving feed with authorized TOKEN, without startDate and endDate', () => {
    cy.request({
      method: 'POST',
      url: '/api/feed',
      body: JSON.stringify({ token: Cypress.env('APP_TOKEN') }),
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).equals(400)
      expect(body.error).not.to.be.undefined
      expect(body.error.message).eq('No dates found')
      expect(body.data).to.be.empty
    })
  })
  it('should fail giving feed with authorized TOKEN, with startDate being after endDate', () => {
    const endDate = new Date() //Now
    const startDate = new Date() // Now + 10days
    startDate.setDate(endDate.getDate() + 10)

    cy.request({
      method: 'POST',
      url: '/api/feed',
      body: JSON.stringify({
        token: Cypress.env('APP_TOKEN'),
        startDate: startDate,
        endDate: endDate,
      }),
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).equals(400)
      expect(body.error).not.to.be.undefined
      expect(body.error.message).eq('Dates are messed up')
      expect(body.data).to.be.empty
    })
  })
  it('should succeed giving feed with authorized TOKEN, with startDate being before endDate', () => {
    const endDate = new Date() //Now
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - 1)

    cy.request({
      method: 'POST',
      url: '/api/feed',
      body: JSON.stringify({
        token: Cypress.env('APP_TOKEN'),
        startDate: startDate,
        endDate: endDate,
      }),
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).equals(200)
      expect(body.error).not.to.be.undefined
      expect(body.error.message).to.be.empty
      expect(body.data).lengthOf(2)
    })
  })
})

// describe('Test the /api/trends/[showType] route with showType = pinned shows', () => {
//   before(() => {
//     Cypress.session.clearAllSavedSessions()
//     cy.task('db:teardown')
//     cy.task('db:init')
//   })
//   beforeEach(() => {
//     // Sign in the user, so we can get his pinned shows
//     cy.signInByAPI(Cypress.env('TEST_MAIL'))
//   })
//   it('should fail if asking for pinned shows without giving a userId', () => {
//     cy.request({
//       method: 'POST',
//       url: '/api/trends/p-shows',
//       // body is not set, so there is no userId to extract
//       failOnStatusCode: false,
//     }).then(({ status, body }) => {
//       expect(status).equals(400)
//       expect(body.error?.message).equals('User not provided')
//     })
//   })

//   it('should succeed giving user s pinned shows when asked for (with user that has no pinned shows)', () => {
//     var userId

//     // Call the endpoint to get the logged in user information
//     cy.request({
//       method: 'GET',
//       url: '/api/user/me',
//       failOnStatusCode: true,
//     })
//       .then(({ status, body }) => {
//         expect(status).equals(200)
//         expect(body.user).not.to.be.undefined
//         expect(body.user.email).equals(Cypress.env('TEST_MAIL'))
//         expect(body.user.id).not.to.be.undefined

//         // Get the userId
//         userId = body.user.id
//       })
//       .then(() => {
//         // Call the endpoint to get the logged in user pinned shows
//         cy.request({
//           method: 'POST',
//           url: '/api/trends/p-shows',
//           body: JSON.stringify({ userId: userId }),
//           failOnStatusCode: false,
//         }).then((res) => {
//           expect(res.status).equals(200)
//           expect(res.body.shows).lengthOf(0)
//           expect(res.body.error).not.to.exist
//           expect(res.body.error?.message).not.to.exist
//         })
//       })
//   })

//   it('should succeed giving user s pinned shows when asked for (with user that has 2 pinned shows)', () => {
//     var user = {}
//     var shows = []

//     // Call the endpoint to get the logged in user information
//     cy.request({
//       method: 'GET',
//       url: '/api/user/me',
//       failOnStatusCode: true,
//     })
//       .then(({ status, body }) => {
//         cy.log('body', { body })
//         expect(status).equals(200)
//         expect(body.user).not.to.be.undefined
//         expect(body.user.email).equals(Cypress.env('TEST_MAIL'))
//         expect(body.user.id).not.to.be.undefined

//         // Get the userId
//         user = body.user
//       })
//       .then(() => {
//         // Add some shows to the user s profile

//         // First, add the marvels (movie)
//         cy.fixture('api/show-themarvels-test_mail.fix')
//           .then((payload) => {
//             payload.user.email = user.email
//             payload.user.id = user.id
//             payload.user.name = user.name
//           })
//           .as('body')

//         cy.get('@body').then((body) => {
//           cy.request({
//             method: 'POST',
//             url: '/api/show',
//             body: body,
//             failOnStatusCode: true,
//           }).then(({ status, body }) => {
//             expect(status).equals(200)
//             expect(body.show).not.to.be.undefined
//             expect(body.user).not.to.be.undefined

//             shows.push(body.show)
//           })
//         })

//         // Second, add invincible (tvshow)
//         cy.fixture('api/show-invincible-test_mail.fix')
//           .then((payload) => {
//             payload.user.email = user.email
//             payload.user.id = user.id
//             payload.user.name = user.name
//           })
//           .as('body')

//         cy.get('@body').then((body) => {
//           cy.request({
//             method: 'POST',
//             url: '/api/show',
//             body: body,
//             failOnStatusCode: true,
//           }).then(({ status, body }) => {
//             expect(status).equals(200)
//             expect(body.show).not.to.be.undefined
//             expect(body.user).not.to.be.undefined

//             shows.push(body.show)
//           })
//         })

//         // Call the endpoint to get the logged in user pinned shows
//         cy.request({
//           method: 'POST',
//           url: '/api/trends/p-shows',
//           body: JSON.stringify({ userId: user.id }),
//           failOnStatusCode: false,
//         }).then((res) => {
//           expect(res.status).equals(200)
//           expect(res.body.shows).lengthOf(2)
//           expect(res.body.error).not.to.exist
//           expect(res.body.error?.message).not.to.exist
//         })
//       })
//   })
// })
