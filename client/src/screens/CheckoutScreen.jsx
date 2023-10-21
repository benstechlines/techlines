import { Box, Heading, Stack, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary';
import ShippingInformation from '../components/ShippingInformation';

const CheckoutScreen = () => {
	const { userInfo } = useSelector((state) => state.user);
	const location = useLocation();

	return userInfo ? (
		<Box
			minH='100vh'
			maxW={{ base: '3xl', lg: '7xl' }}
			mx='auto'
			px={{ base: '4', md: '8', lg: '12' }}
			py={{ base: '6', md: '8', lg: '12' }}>
			<Stack spacing='8' direction={{ base: 'column', lg: 'row' }} align={{ base: 'revert', lg: 'flex-start' }}>
				<Stack spacing={{ base: '8', md: '10' }} flex='1.5' mb={{ base: '12', md: 'none' }}>
					<Heading fontSize='2xl' fontWeight='extrabold'>
						Shipping Information
					</Heading>
					<Stack>
						<ShippingInformation />
					</Stack>
				</Stack>
				<Flex direction='column' align='center' flex='1'>
					<OrderSummary checkoutSreen={true} />
				</Flex>
			</Stack>
		</Box>
	) : (
		<Navigate to='/login' replace={true} state={{ from: location }} />
	);
};

export default CheckoutScreen;
