import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

import Root from './root';

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Root />
			</BrowserRouter>
		</Provider>
	);
}
