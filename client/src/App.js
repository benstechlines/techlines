import { ChakraProvider } from '@chakra-ui/react';
import ProductsScreen from './screens/ProductsScreen';

function App() {
	return (
		<ChakraProvider>
			<ProductsScreen />
		</ChakraProvider>
	);
}

export default App;
