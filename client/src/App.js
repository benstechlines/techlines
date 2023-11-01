import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import ProductsScreen from './screens/ProductsScreen';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import LandingScreen from './screens/LandingScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import EmailVerificationScreen from './screens/EmailVerificationScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import axios from 'axios';
import { VStack, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CheckoutScreen from './screens/CheckoutScreen';
import YourOrdersScreen from './screens/YourOrdersScreen';
import CancelScreen from './screens/CancelScreen';
import SuccessScreen from './screens/SuccessScreen';
import AdminConsoleScreen from './screens/AdminConsoleScreen';

function App() {
	const theme = extendTheme({
		styles: {
			global: (props) => ({
				body: {
					bg: props.colorMode === 'light' && '#F7FAFC',
				},
			}),
		},
	});

	const [googleClient, setGoogleClient] = useState(null);
	useEffect(() => {
		const googleKey = async () => {
			const { data: googleId } = await axios.get('/api/config/google');
			setGoogleClient(googleId);
		};
		googleKey();
	}, [googleClient]);

	return (
		<ChakraProvider theme={theme}>
			{!googleClient ? (
				<VStack pt='37vh'>
					<Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
				</VStack>
			) : (
				<GoogleOAuthProvider clientId={googleClient}>
					<Router>
						<Header />
						<main>
							<Routes>
								<Route path='/products' element={<ProductsScreen />} />
								<Route path='/' element={<LandingScreen />} />
								<Route path='/product/:id' element={<ProductScreen />} />
								<Route path='/cart' element={<CartScreen />} />
								<Route path='/login' element={<LoginScreen />} />
								<Route path='/registration' element={<RegistrationScreen />} />
								<Route path='/email-verify/:token' element={<EmailVerificationScreen />} />
								<Route path='/password-reset/:token' element={<PasswordResetScreen />} />
								<Route path='/checkout' element={<CheckoutScreen />} />
								<Route path='/cancel' element={<CancelScreen />} />
								<Route path='/order-history' element={<YourOrdersScreen />} />
								<Route path='/success' element={<SuccessScreen />} />
								<Route path='/admin-console' element={<AdminConsoleScreen />} />
							</Routes>
						</main>
						<Footer />
					</Router>
				</GoogleOAuthProvider>
			)}
		</ChakraProvider>
	);
}

export default App;
