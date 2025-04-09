import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages';
import { Provider } from 'react-redux';
import { store } from './store';

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}
