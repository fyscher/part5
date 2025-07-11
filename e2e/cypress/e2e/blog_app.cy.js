describe('Blog app', function()
{
  beforeEach(function()
  {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    
    const user = 
    {
      name: 'fyscher',
      username: 'fyscher',
      password: 'test2'
    }
    
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
      .its('body')
      .as('firstUser')
    
    const user2 =
    {
      name: 'fysch',
      username: 'fysch',
      password: 'test3'
    }
    
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
      .its('body')
      .as('secondUser')
    
    cy.visit('')
  })
  
  describe('Logging in', function()
  {
    it('login fails with incorrect username', function()
    {
      cy.get('[data-cy="username"]').type('WHOOPS')
      cy.get('[data-cy="password"]').type('test2')
      cy.get('[data-cy="submit"]').click()

      cy.get('[data-cy="error"').contains('Wrong Credentials')
    })

    it('login fails with incorrect password', function()
    {
      cy.get('[data-cy="username"]').type('fyscher')
      cy.get('[data-cy="password"]').type('test')
      cy.get('[data-cy="submit"]').click()
      
      cy.get('[data-cy="error"').contains('Wrong Credentials')
    })

    it('login fails with blank username', function()
    {
      cy.get('[data-cy="password"]').type('test2')
      cy.get('[data-cy="submit"]').click()
      
      cy.get('[data-cy="error"').contains('Wrong Credentials')
    })

    it('login fails with blank password', function()
    {
      cy.get('[data-cy="username"]').type('fyscher')
      cy.get('[data-cy="submit"]').click()
      
      cy.get('[data-cy="error"').contains('Wrong Credentials')
    })

    it('login succeeds with correct credentials', function ()
    {
      cy.get('[data-cy="username"]').type('fyscher')
      cy.get('[data-cy="password"]').type('test2')
      cy.get('[data-cy="submit"]').click()
      
      cy.contains('fyscher currently logged in')

    })
  })

  describe('Blogs', function()
  {
    it('a new blog can be created', function()
    {
      cy.login({
        username: 'fyscher',
        password: 'test2'
      })      
    })

    it('user can like a blog', function()
    {
      cy.login({
        username: 'fyscher',
        password: 'test2'
      })    
      
      cy.contains('New Blog').click()
      cy.get('[data-cy="title"]').type('Newer Title')
      cy.get('[data-cy="author"]').type('Newer Author')
      cy.get('[data-cy="url"]').type('Newer URL')
      cy.contains('Create').click()
      
      cy.contains('Blogs').click()
      cy.contains('View').click()
      cy.get('[data-cy="Like"]').click()

      cy.contains('Likes: 1')
    })

    it('delete button can only be seen by blog creator', function()
    {
      cy.login({
        username: 'fyscher',
        password: 'test2'
      })

      cy.createBlog({
        title: 'NEW TITLE',
        author: 'NEW AUTHOR',
        url: 'NEW URL'
      })

      cy.contains('Log Out').click()

      cy.login({
        username: 'fysch',
        password: 'test3'
      })

      cy.contains('Blogs').click()

      cy.get('html').should('not.contain', 'Delete')
      cy.get('html').should('contain', 'View')

    })

    it('a blog can be deleted', function()
    {
      cy.login({
        username: 'fyscher',
        password: 'test2'
      })    

      cy.createBlog({
        title: 'NEWER TITLE',
        author: 'NEWER AUTHOR',
        url: 'NEWER URL'
      })

      cy.contains('Blogs').click()
      cy.contains('Delete').click()
      cy.on('window:confirm', () => true)

      cy.get('html').should('contain', 'NEWER TITLE has been deleted!')
    })
  })
})
