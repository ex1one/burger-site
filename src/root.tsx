import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { PAGES } from "./consts";
import { Layout } from "./features";

import {
  ForgotPassword,
  Home,
  NotFound,
  Profile,
  ResetPassword,
  SignIn,
  SignUp,
  Feed,
  OrdersHistory,
  ProfileLayout,
  FeedItemsDetails,
} from "@src/pages";
import {
  IngredientDetailsModal,
  OrderSuccessModal,
  OrderInformationModal,
  ProtectedRoute,
} from "@src/components";

const Root = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path={PAGES.HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path={PAGES.SIGN_IN}
            element={<ProtectedRoute element={<SignIn />} isAnonymous />}
          />
          <Route
            path={PAGES.SIGN_UP}
            element={<ProtectedRoute element={<SignUp />} isAnonymous />}
          />
          <Route
            path={PAGES.FORGOT_PASSWORD}
            element={
              <ProtectedRoute element={<ForgotPassword />} isAnonymous />
            }
          />
          <Route
            path={PAGES.RESET_PASSWORD}
            element={<ProtectedRoute element={<ResetPassword />} isAnonymous />}
          />
          <Route
            path={PAGES.PROFILE}
            element={<ProtectedRoute element={<ProfileLayout />} />}
          >
            <Route index element={<Profile />} />
            <Route path={PAGES.PROFILE_ORDERS} element={<OrdersHistory />} />
          </Route>

          <Route path={PAGES.NOT_FOUND} element={<NotFound />} />

          <Route path={PAGES.INGREDIENT} element={<IngredientDetailsModal />} />
          <Route path={PAGES.ORDERS_FEED} element={<Feed />} />

          <Route path={PAGES.ORDER_FEED} element={<FeedItemsDetails />} />
          <Route
            path={PAGES.PROFILE_ORDER}
            element={<ProtectedRoute element={<FeedItemsDetails />} />}
          />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path={PAGES.INGREDIENT} element={<IngredientDetailsModal />} />
          <Route path={PAGES.ORDER_FEED} element={<OrderInformationModal />} />
          <Route
            path={PAGES.PROFILE_ORDER}
            element={<ProtectedRoute element={<OrderInformationModal />} />}
          />
        </Routes>
      )}

      <OrderSuccessModal />
      <OrderInformationModal />

      <ToastContainer
        position="top-center"
        limit={3}
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnHover={false}
        pauseOnFocusLoss
        theme="dark"
      />
    </>
  );
};

export default Root;
