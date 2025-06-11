export enum PAGES {
  HOME = "/",
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",
  PROFILE = "/profile",
  FORGOT_PASSWORD = "/forgot-password",
  RESET_PASSWORD = "/reset-password",
  PROFILE_ORDERS = "/profile/orders",
  PROFILE_ORDER = `${PAGES.PROFILE_ORDERS}/:orderId`,
  INGREDIENT = "/ingredients/:ingredientId",
  ORDERS_FEED = "/feed",
  ORDER_FEED = `${PAGES.ORDERS_FEED}/:orderId`,
  NOT_FOUND = "*",
}
