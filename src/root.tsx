import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ForgotPassword, Home, NotFound, Profile, ResetPassword, SignIn, SignUp } from '@src/pages';
import { IngredientDetailsModal, OrderDetailModal, ProtectedRoute } from '@src/components';

import { PAGES } from './consts';
import { Layout } from './features';

const Root = () => {
	const location = useLocation();
	const background = location.state && location.state.background;

	return (
		<>
			<Routes location={background || location}>
				<Route
					path={PAGES.HOME}
					element={<Layout />}
				>
					<Route
						index
						path={PAGES.HOME}
						element={<Home />}
					/>
					<Route
						path={PAGES.SIGN_IN}
						element={
							<ProtectedRoute
								element={<SignIn />}
								isAnonymous
							/>
						}
					/>
					<Route
						path={PAGES.SIGN_UP}
						element={
							<ProtectedRoute
								element={<SignUp />}
								isAnonymous
							/>
						}
					/>
					<Route
						path={PAGES.FORGOT_PASSWORD}
						element={
							<ProtectedRoute
								element={<ForgotPassword />}
								isAnonymous
							/>
						}
					/>
					<Route
						path={PAGES.RESET_PASSWORD}
						element={
							<ProtectedRoute
								element={<ResetPassword />}
								isAnonymous
							/>
						}
					/>
					<Route
						path={PAGES.PROFILE}
						element={<ProtectedRoute element={<Profile />} />}
					/>
					<Route
						path={PAGES.NOT_FOUND}
						element={<NotFound />}
					/>
					<Route
						path={PAGES.INGREDIENT}
						element={<IngredientDetailsModal />}
					/>
				</Route>
			</Routes>

			{background && (
				<Routes>
					<Route
						path={PAGES.INGREDIENT}
						element={<IngredientDetailsModal />}
					/>
				</Routes>
			)}

			<OrderDetailModal />

			<ToastContainer
				position='top-center'
				limit={3}
				autoClose={2500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnHover={false}
				pauseOnFocusLoss
				theme='dark'
			/>
		</>
	);
};

export default Root;
