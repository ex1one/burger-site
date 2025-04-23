import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { PAGES } from './consts';
import { ForgotPassword, Home, NotFound, Profile, ResetPassword, SignIn, SignUp } from '@src/pages';
import { IngredientDetailsModal, OrderDetailModal, ProtectedRoute } from '@src/components';
import { Layout } from './features';

const ContentApp = () => {
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
		</>
	);
};

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<ContentApp />
			</BrowserRouter>
		</Provider>
	);
}
