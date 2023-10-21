import { Center, Text, Box, Button } from '@chakra-ui/react';
import { BsBoxSeamFill } from 'react-icons/bs';
import { Link as ReactLink } from 'react-router-dom';

const CancelScreen = () => {
	return (
		<Center height='100vh' flexDirection='column'>
			<Text fontSize={{ base: 'md', md: 'xl', lg: '4xl' }}>You have canceled the payment process.</Text>
			<Box m='2'>
				<BsBoxSeamFill size='50px' mt='2' />
			</Box>

			<Text>But we have saved your cart, just in case.</Text>
			<Button as={ReactLink} to='/cart' mt='2'>
				Go to your cart
			</Button>
		</Center>
	);
};

export default CancelScreen;
