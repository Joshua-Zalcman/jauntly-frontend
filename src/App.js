import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import { GlobalProvider } from './context/GlobalState';

function App() {
	return (
		<GlobalProvider>
			<div style={{ backgroundColor: 'whitesmoke', minHeight: '100vh' }}>
				<Header />

				<Main />
			</div>
		</GlobalProvider>
	);
}

export default App;
