describe("Тестирование конструктора", () => {
  const ingredientItemBunSelector = '[data-cy="ingredient-item-bun"]';
  const ingredientItemSauceSelector = '[data-cy="ingredient-item-sauce"]';
  const burgerConstructorSelector = '[data-cy="burger-constructor"]';
  const burgerConstructorTopBunSelector =
    '[data-cy="burger-constructor-top-bun"]';
  const burgerConstructorDownBunSelector =
    '[data-cy="burger-constructor-down-bun"]';
  const burgerConstructorIngredientSelector =
    '[data-cy="burger-constructor-ingredient"]';

  const baseUrl = "http://localhost:8080";
  const ingredientDetailModalSelector = '[data-cy="ingredient-detail-modal"]';
  const buttonModalCloseSelector = '[data-cy="button-modal-close"]';

  describe("Перетаскивание ингредиентов в конструктор", () => {
    beforeEach(() => {
      cy.visit("/");
    });

    context("Когда перетаскивают булку", () => {
      it("Должен добавлять верхнюю и нижнюю булку в конструктор", () => {
        cy.get(ingredientItemBunSelector).first().trigger("dragstart");
        cy.get(burgerConstructorSelector).trigger("drop");

        cy.get(burgerConstructorTopBunSelector).should("exist");
        cy.get(burgerConstructorDownBunSelector).should("exist");
      });
    });

    context("Когда перетаскивают соус или начинки", () => {
      it("Должен добавлять ингредиент в блок конструктора", () => {
        cy.get(ingredientItemSauceSelector).first().trigger("dragstart");
        cy.get(burgerConstructorSelector).trigger("drop");

        cy.get(burgerConstructorIngredientSelector).should("exist");
      });
    });
  });

  describe("Тестирование модального окна с описанием ингредиента", () => {
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

      cy.get(ingredientDetailModalSelector).should("be.visible");

      cy.url().should("eq", `${baseUrl}/ingredients/${ingredientId}`);

      cy.get(buttonModalCloseSelector).click();

      cy.url().should("eq", baseUrl);
    });

    it("Должно открывать модальное окно с ингредиентом при переходе по ссылке в новой вкладке и после возвращать на главную страницу", () => {
      cy.visit(`${baseUrl}/ingredients/${ingredientId}`);

      cy.get(ingredientDetailModalSelector).should("be.visible");

      cy.url().should("eq", `${baseUrl}/ingredients/${ingredientId}`);

      cy.url().should("eq", baseUrl);
    });
  });

  describe("Тестирование модального окна с данными о заказе", () => {
    const checkoutButtonSelector = '[data-cy="checkout-button"]';
    const orderSuccessModalSelector = '[data-cy="order-success-modal"]';

    beforeEach(() => {
      cy.visit("/");
    });

    it("Должно перенаправлять неавторизованного пользователя на страницу входа, затем после авторизации возвращать на главную и после нажатия на кнопку 'Оформить заказ' открывать модалку", () => {
      const ingredientItemBunSelector = '[data-cy="ingredient-item-bun"]';
      const ingredientItemSauceSelector = '[data-cy="ingredient-item-sauce"]';

      cy.get(ingredientItemBunSelector).first().trigger("dragstart");
      cy.get(burgerConstructorSelector).trigger("drop");

      cy.get(ingredientItemSauceSelector).first().trigger("dragstart");
      cy.get(burgerConstructorSelector).trigger("drop");

      cy.get(checkoutButtonSelector).click();

      cy.url().should("include", "/sign-in");

      cy.get('input[name="email"]').type(Cypress.env("EMAIL"));
      cy.get('input[name="password"]').type(Cypress.env("PASSWORD"));

      cy.get('button[type="submit"]').click();

      cy.url().should("eq", "http://localhost:8080/");

      cy.get(checkoutButtonSelector).click();

      cy.get(orderSuccessModalSelector).should("be.visible");
    });

    it("Должно перенаправлять неавторизованного пользователя на страницу входа, затем после авторизации возвращать на главную и после нажатия на кнопку 'Оформить заказ' открывать модалку и после закрытия модалки очищать выбранный бургер", () => {
      const ingredientItemBunSelector = '[data-cy="ingredient-item-bun"]';
      const ingredientItemSauceSelector = '[data-cy="ingredient-item-sauce"]';

      cy.get(ingredientItemBunSelector).first().trigger("dragstart");
      cy.get(burgerConstructorSelector).trigger("drop");

      cy.get(ingredientItemSauceSelector).first().trigger("dragstart");
      cy.get(burgerConstructorSelector).trigger("drop");

      cy.get(checkoutButtonSelector).click();

      cy.url().should("include", "/sign-in");

      cy.get('input[name="email"]').type(Cypress.env("EMAIL"));
      cy.get('input[name="password"]').type(Cypress.env("PASSWORD"));

      cy.get('button[type="submit"]').click();

      cy.url().should("eq", "http://localhost:8080/");

      cy.get(checkoutButtonSelector).click();

      cy.get(orderSuccessModalSelector).should("be.visible");

      cy.get(buttonModalCloseSelector).click();

      cy.get(burgerConstructorSelector)
        .children()
        .should("have.length", 3)
        .then(($elements) => {
          expect($elements[0]).to.contain.text("Выберите верхнюю булку");
          expect($elements[1]).to.contain.text("Выберите ингредиенты");
          expect($elements[2]).to.contain.text("Выберите нижнюю булку");
        });
    });
  });
});
