describe('TODO api testing', () => {
  let todoItem;
  let useremail = 'api-demo@test.com';
  it('fetches Todo items - GET', () => {
    cy.request(`/todos/${useremail}`).as('todoRequest');
    cy.get('@todoRequest').then((todos) => {
      console.log(todoItem);
      expect(todos.status).to.eq(200);
      assert.isObject(todos.body, 'Todos Response is an object');
    });
  });

  it('deletes Todo items - DELETE', () => {
    cy.request('DELETE', `/todos/${useremail}/1`).as('todoRequest');
    cy.get('@todoRequest').then((todos) => {
      expect(todos.status).to.eq(204);
      assert.isString(todos.body, 'todo deleted!');
    });
  });

  it('Adds Todo item - POST', () => {
    cy.request('POST', `/todos`, {
      data: {
        user_email: 'api-demo@test.com',
        title: 'Test Todo',
        description: 'Posting from cypress.',
      },
    }).as('todoRequest');
    // adds new Todo item by defining Todo name
    cy.get('@todoRequest').then((todos) => {
      expect(todos.status).to.eq(201);
      cy.wrap(todos.body).should('deep.include', {
        data: {
          todo_id: 1341,
          user_email: 'api-demo@test.com',
          title: 'Test Todo',
          description: 'Posting from cypress.',
          date: null,
          completed: false,
        },
      });
    });
  });
});
