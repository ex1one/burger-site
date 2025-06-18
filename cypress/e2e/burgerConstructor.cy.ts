describe("Перетаскивание ингредиентов в конструктор", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Когда перетаскивают булку", () => {
    it("Должен добавлять верхнюю и нижнюю булку в конструктор", () => {
      cy.get('[data-cy="ingredient-item-bun"]').first().trigger("dragstart");
      cy.get('[data-cy="burger-constructor"]').trigger("drop");

      cy.get('[data-cy="burger-constructor-top-bun"]').should("exist");
      cy.get('[data-cy="burger-constructor-down-bun"]').should("exist");
    });
  });

  context("Когда перетаскивают соус или начинки", () => {
    it("Должен добавлять ингредиент в блок конструктора", () => {
      cy.get('[data-cy="ingredient-item-sauce"]').first().trigger("dragstart");
      cy.get('[data-cy="burger-constructor"]').trigger("drop");

      cy.get('[data-cy="burger-constructor-ingredient"]').should("exist");
    });
  });
});

describe("Тестирование модального окна с описанием ингредиента", () => {
  const baseUrl = "http://localhost:8080";
  let ingredientId;

  beforeEach(async () => {
    cy.visit("/");

    try {
      const id = await cy
        .get('[data-cy="ingredient-item-bun"]')
        .first()
        .invoke("attr", "data-ingredient-id");

      ingredientId = id;
    } catch (error) {
      console.log({ error });
    }
  });

  it("Должно открывать модальное окно и менять URL при клике на ингредиент и после закрытия модального окна возвращать обратно", () => {
    cy.get(`[data-ingredient-id="${ingredientId}"]`).click();

    cy.get('[data-cy="ingredient-detail-modal"]').should("be.visible");

    cy.url().should("eq", `${baseUrl}/ingredients/${ingredientId}`);

    cy.get('[data-cy="button-modal-close"]').click();

    cy.url().should("eq", baseUrl);
  });

  it("Должно открывать модальное окно с ингредиентом при переходе по ссылке в новой вкладке и после возвращать на главную страницу", () => {
    cy.visit(`${baseUrl}/ingredients/${ingredientId}`);

    cy.get('[data-cy="ingredient-detail-modal"]').should("be.visible");

    cy.url().should("eq", `${baseUrl}/ingredients/${ingredientId}`);

    cy.url().should("eq", baseUrl);
  });
});

describe("Тестирование модального окна с данными о заказе", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Должно перенаправлять неавторизованного пользователя на страницу входа, затем после авторизации возвращать на главную и после нажатия на кнопку 'Оформить заказ' открывать модалку", () => {
    cy.get('[data-cy="ingredient-item-bun"]').first().trigger("dragstart");
    cy.get('[data-cy="burger-constructor"]').trigger("drop");

    cy.get('[data-cy="ingredient-item-sauce"]').first().trigger("dragstart");
    cy.get('[data-cy="burger-constructor"]').trigger("drop");

    cy.get('[data-cy="checkout-button"]').click();

    cy.url().should("include", "/sign-in");

    cy.get('input[name="email"]').type(Cypress.env("EMAIL"));
    cy.get('input[name="password"]').type(Cypress.env("PASSWORD"));

    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:8080/");

    cy.get('[data-cy="checkout-button"]').click();

    cy.get('[data-cy="order-success-modal"]').should("be.visible");
  });

  it("Должно перенаправлять неавторизованного пользователя на страницу входа, затем после авторизации возвращать на главную и после нажатия на кнопку 'Оформить заказ' открывать модалку и после закрытия модалки очищать выбранный бургер", () => {
    cy.get('[data-cy="ingredient-item-bun"]').first().trigger("dragstart");
    cy.get('[data-cy="burger-constructor"]').trigger("drop");

    cy.get('[data-cy="ingredient-item-sauce"]').first().trigger("dragstart");
    cy.get('[data-cy="burger-constructor"]').trigger("drop");

    cy.get('[data-cy="checkout-button"]').click();

    cy.url().should("include", "/sign-in");

    cy.get('input[name="email"]').type(Cypress.env("EMAIL"));
    cy.get('input[name="password"]').type(Cypress.env("PASSWORD"));

    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:8080/");

    cy.get('[data-cy="checkout-button"]').click();

    cy.get('[data-cy="order-success-modal"]').should("be.visible");

    cy.get('[data-cy="button-modal-close"]').click();

    cy.get('[data-cy="burger-constructor"]')
      .children()
      .should("have.length", 3)
      .then(($elements) => {
        expect($elements[0]).to.contain.text("Выберите верхнюю булку");
        expect($elements[1]).to.contain.text("Выберите ингредиенты");
        expect($elements[2]).to.contain.text("Выберите нижнюю булку");
      });
  });
});
