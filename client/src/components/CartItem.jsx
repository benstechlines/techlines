import { CloseButton, Flex, Image, Select, Spacer, Text, VStack, useColorModeValue as mode } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addCartItem, removeCartItem } from '../redux/actions/cartActions';

const CartItem = ({ cartItem }) => {
	const { name, image, price, stock, qty, id, brand } = cartItem;
	const dispatch = useDispatch();

	return (
		<Flex minWidth='300px' borderWidth='1px' rounded='lg' align='center'>
			<Image rounded='lg' w='120px' h='120px' fit='cover' src={image} fallbackSrc='https://via.placeholder.com/150' />
			<VStack p='2' w='100%' spacing='4' align='stretch'>
				<Flex alignItems='center' justify='space-between'>
					<Text fontWeight='medium'>
						{brand} {name}
					</Text>
					<Spacer />
					<CloseButton onClick={() => dispatch(removeCartItem(id))} />
				</Flex>
				<Spacer />
				<Flex alignItems='center' justify='space-between'>
					<Select
						maxW='68px'
						focusBorderColor={mode('cyan.500', 'cyan.200')}
						value={qty}
						onChange={(e) => {
							dispatch(addCartItem(id, e.target.value));
						}}>
						{[...Array(stock).keys()].map((item) => (
							<option key={item + 1} value={item + 1}>
								{item + 1}
							</option>
						))}
					</Select>
					<Text fontWeight='bold'>${price}</Text>
				</Flex>
			</VStack>
		</Flex>
	);
};

export default CartItem;
