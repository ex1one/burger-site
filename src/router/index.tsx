import { PAGES } from '@src/consts';
import { createBrowserRouter } from 'react-router-dom';

import { IngredientDetailsModal, ProtectedRouteElement } from '@src/components';
import { ForgotPassword, Home, NotFound, Profile, ResetPassword, SignIn, SignUp } from '@src/pages';
import { store } from '@src/store';
import { fetchIngredients } from '@src/services/ingredients/thunks';

const loadStore = () =>
	new Promise((resolve) => {
		setTimeout(() => resolve(store), 0);
	});

export const router = createBrowserRouter([
	{
		path: PAGES.HOME,
		element: <Home />,
		loader: () => {
			loadStore().then(() => {
				store.dispatch(fetchIngredients());
			});

			return null;
		},
	},
	{
		path: PAGES.SIGN_IN,
		element: (
			<ProtectedRouteElement
				element={<SignIn />}
				isPublicRoute
			/>
		),
	},
	{
		path: PAGES.SIGN_UP,
		element: (
			<ProtectedRouteElement
				element={<SignUp />}
				isPublicRoute
			/>
		),
	},

	{
		path: PAGES.FORGOT_PASSWORD,
		element: (
			<ProtectedRouteElement
				element={<ForgotPassword />}
				isPublicRoute
			/>
		),
	},
	{
		path: PAGES.RESET_PASSWORD,
		element: (
			<ProtectedRouteElement
				element={<ResetPassword />}
				isPublicRoute
			/>
		),
	},
	{ path: PAGES.PROFILE, element: <ProtectedRouteElement element={<Profile />} /> },
	{ path: PAGES.NOT_FOUND, element: <NotFound /> },
	/*
		TODO: Посмотреть альтернативно ли использование такого кода с этим:

		const location = useLocation();
		const navigate = useNavigate();
		const background = location.state && location.state.background;

		const handleModalClose = () => {
			// Возвращаемся к предыдущему пути при закрытии модалки
			navigate(-1);
		};

		{background && (
				<Routes>
					<Route
						path='/ingredients/:ingredientId'
						element={
							<Modal onClose={handleModalClose}>
								<IngredientsDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
	*/
	{
		path: PAGES.INGREDIENT,
		element: <IngredientDetailsModal />,
	},
]);
