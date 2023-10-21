import { Center, Text, Box, Button } from '@chakra-ui/react';
import { BsBoxSeamFill } from 'react-icons/bs';
import { Link as ReactLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { resetCart } from '../redux/actions/cartActions';

const SuccessScreen = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetCart());
	}, [dispatch]);

	return (
		<Center height='100vh' flexDirection='column'>
			<Text fontSize={{ base: 'md', md: 'xl', lg: '4xl' }}>Thank you for your order.</Text>
			<Box m='2'>
				<BsBoxSeamFill size='50px' mt='2' />
			</Box>
			<Text>You can see your order in the order history.</Text>
			<Button as={ReactLink} to='/order-history' mt='2'>
				Check your order history
			</Button>
		</Center>
	);
};

export default SuccessScreen;
