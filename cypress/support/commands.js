Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', '/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBloglistUser', JSON.stringify(body));
    cy.visit('/');
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    method: 'POST',
    url: '/api/blogs',
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBloglistUser')).token
      }`,
    },
  });

  cy.visit('/');
});
