describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      username: 'yoshi',
      name: 'Yoshi Tester',
      password: '1234',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('log in to application');
    cy.contains('username');
    cy.get('#username');
    cy.contains('password');
    cy.get('#password');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('yoshi');
      cy.get('#password').type('1234');
      cy.get('#login-button').click();
      cy.get('.notification.success')
        .should('contain', 'Welcome back, Yoshi Tester!')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
      cy.contains('Yoshi Tester logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('yoshi');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();
      cy.get('.notification.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'yoshi', password: '1234' });
    });

    it('A blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#title').type('testTitle');
      cy.get('#author').type('testAuthor');
      cy.get('#url').type('http://testurl.dev');
      cy.get('#create-blog-button').click();
      cy.get('.notification.success')
        .should('contain', 'a new blog testTitle by testAuthor added')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
      cy.contains('testTitle testAuthor');
      cy.get('[data-testid=blog-item]').should('have.length', 1);
    });

    it('Users page can be visited', function () {
      cy.get('[data-testid=menu]').contains('users').click();
      cy.get('[data-testid=users-table]').should('exist');
    });

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'Cypress',
          url: 'http://testblog.dev',
        });
        cy.createBlog({
          title: 'second blog',
          author: 'Cypress',
          url: 'http://testblog.dev',
        });
        cy.createBlog({
          title: 'my test blog',
          author: 'Cypress',
          url: 'http://testblog.dev',
        });
      });

      it('A blog can be liked', function () {
        cy.contains('my test blog Cypress').click();
        cy.get('[data-testid=like-btn]').click();
        cy.get('[data-testid=blog]').should('contain', '1 likes');
      });

      it('A blog can be removed by user who created it', function () {
        cy.contains('my test blog Cypress').click();
        cy.get('[data-testid=remove-btn]').click();
        cy.get('.notification.success')
          .should('contain', 'Removed my test blog successfully')
          .and('have.css', 'color', 'rgb(0, 128, 0)');
        cy.get('[data-testid=blog-item]').should('have.length', 2);
      });

      it("A blog can't be removed by other users", function () {
        cy.contains('logout').click();
        const otherUser = {
          username: 'otherUser',
          name: 'Other User',
          password: '1234',
        };
        cy.request('POST', 'http://localhost:3003/api/users', otherUser);
        cy.login({ username: 'otherUser', password: '1234' });
        cy.contains('my test blog Cypress').click();
        cy.get('[data-testid=remove-btn]').should('not.exist');
      });

      it('A blog can be commented', function () {
        cy.contains('my test blog Cypress').click();
        cy.get('#content').type('a test comment');
        cy.get('#add-comment-button').click();
        cy.contains('a test comment');
      });

      it('A user can be visited', function () {
        cy.get('[data-testid=menu]').contains('users').click();
        cy.get('[data-testid=user-link]').click();
        cy.get('[data-testid=user-blog]').should('have.length', 3);
      });
    });
  });
});
