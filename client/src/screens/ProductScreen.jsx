import { MinusIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Badge,
	Box,
	Button,
	Flex,
	HStack,
	Heading,
	Image,
	SimpleGrid,
	Spinner,
	Stack,
	Text,
	Wrap,
	useToast,
	Textarea,
	Input,
	Tooltip,
} from '@chakra-ui/react';
import { BiCheckShield, BiPackage, BiSupport } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../redux/actions/productActions';
import { useEffect, useState } from 'react';
import { addCartItem } from '../redux/actions/cartActions';
import Star from '../components/Star';
import { createProductReview } from '../redux/actions/productActions';

const ProductScreen = () => {
	const [amount, setAmount] = useState(1);
	const { id } = useParams();
	const dispatch = useDispatch();
	const { loading, error, product, reviewed } = useSelector((state) => state.product);
	const { cartItems } = useSelector((state) => state.cart);
	const toast = useToast();
	const [comment, setComment] = useState('');
	const [rating, setRating] = useState(1);
	const [title, setTitle] = useState('');
	const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
	const { userInfo } = useSelector((state) => state.user);
	const [buttonLoading, setButtonLoading] = useState(false);

	useEffect(() => {
		dispatch(getProduct(id));
		setReviewBoxOpen(false);

		if (reviewed) {
			toast({
				description: 'Product review saved.',
				status: 'success',
				isClosable: 'true',
			});
			setReviewBoxOpen(false);
		}
	}, [dispatch, id, toast, reviewed]);

	const changeAmount = (input) => {
		if (input === 'plus') {
			setAmount(amount + 1);
		}
		if (input === 'minus') {
			setAmount(amount - 1);
		}
	};

	const addItem = () => {
		if (cartItems.some((cartItem) => cartItem.id === id)) {
			cartItems.find((cartItem) => cartItem.id === id);
			dispatch(addCartItem(id, amount));
		} else {
			dispatch(addCartItem(id, amount));
		}
		toast({
			description: 'Item has been added.',
			status: 'success',
			isClosable: true,
		});
	};

	const hasUserReviewed = () => product.reviews.some((item) => item.user === userInfo._id);
	const onSubmit = () => {
		setButtonLoading(true);
		dispatch(createProductReview(product._id, userInfo._id, comment, rating, title));
	};

	return (
		<Wrap spacing='30px' justify='center' minHeight='100vh'>
			{loading ? (
				<Stack direction='row' spacing='4'>
					<Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
				</Stack>
			) : error ? (
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle>We are sorry!</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			) : (
				product && (
					<Box
						maxW={{ base: '3xl', lg: '5xl' }}
						mx='auto'
						px={{ base: '4', md: '8', lg: '12' }}
						py={{ base: '6', md: '8', lg: '12' }}>
						<Stack direction={{ base: 'column', lg: 'row' }} align='flex-start'>
							<Stack pr={{ base: '0', md: 'row' }} flex='1.5' mb={{ base: '12', md: 'none' }}>
								{product.productIsNew && (
									<Badge p='2' rounded='md' w='50px' fontSize='0.8em' colorScheme='green'>
										New
									</Badge>
								)}
								{product.stock === 0 && (
									<Badge rounded='full' w='70px' fontSize='0.8em' colorScheme='red'>
										sold out
									</Badge>
								)}
								<Heading fontSize='2xl' fontWeight='extrabold'>
									{product.brand} {product.name}
								</Heading>
								<Stack spacing='5'>
									<Box>
										<Text fontSize='xl'>${product.price}</Text>
										<Flex>
											<HStack spacing='2px'>
												<Star color='cyan.500' />
												<Star rating={product.rating} star={2} />
												<Star rating={product.rating} star={3} />
												<Star rating={product.rating} star={4} />
												<Star rating={product.rating} star={5} />
											</HStack>
											<Text fontSize='md' fontWeight='bold' ml='4px'>
												{product.numberOfReviews} Reviews
											</Text>
										</Flex>
									</Box>
									<Text>{product.subtitle}</Text>
									<Text>{product.description}</Text>
									<Text fontWeight='bold'>Quantity</Text>
									<Flex w='170px' p='5px' border='1px' borderColor='gray.200' alignItems='center'>
										<Button isDisabled={amount <= 1} onClick={() => changeAmount('minus')}>
											<MinusIcon />
										</Button>
										<Text mx='30px'>{amount}</Text>
										<Button isDisabled={amount >= product.stock} onClick={() => changeAmount('plus')}>
											<SmallAddIcon />
										</Button>
									</Flex>
									<Badge fontSize='lg' width='170px' textAlign='center' colorScheme='gray'>
										In Stock: {product.stock}
									</Badge>
									<Button
										variant='outline'
										isDisabled={product.stock === 0}
										colorScheme='cyan'
										onClick={() => addItem()}>
										Add to cart
									</Button>
									<Stack width='270px'>
										<Flex alignItems='center'>
											<BiPackage size='20px' />
											<Text fontWeight='medium' fontSize='sm' ml='2'>
												Shipped in 2 - 3 days
											</Text>
										</Flex>
										<Flex alignItems='center'>
											<BiCheckShield size='20px' />
											<Text fontWeight='medium' fontSize='sm' ml='2'>
												2 year extended warranty
											</Text>
										</Flex>
										<Flex alignItems='center'>
											<BiSupport size='20px' />
											<Text fontWeight='medium' fontSize='sm' ml='2'>
												We're here for you 24/7
											</Text>
										</Flex>
									</Stack>
								</Stack>
							</Stack>
							<Flex direction='column' align='center' flex='1' _dark={{ bg: 'gray.900' }}>
								<Image
									mb='30px'
									src={product.images[0]}
									alt={product.name}
									fallbackSrc='https://via.placeholder.com/250'
								/>
								<Image
									mb='30px'
									src={product.images[1]}
									alt={product.name}
									fallbackSrc='https://via.placeholder.com/250'
								/>
							</Flex>
						</Stack>

						{userInfo && (
							<>
								<Tooltip label={hasUserReviewed() && 'you have already reviewed this product.'} fontSize='medium'>
									<Button
										isDisabled={hasUserReviewed()}
										my='20px'
										w='140px'
										colorScheme='cyan'
										onClick={() => setReviewBoxOpen(!reviewBoxOpen)}>
										Write a review
									</Button>
								</Tooltip>
								{reviewBoxOpen && (
									<Stack mb='20px'>
										<Wrap>
											<HStack spacing='2px'>
												<Button variant='outline' onClick={() => setRating(1)}>
													<Star />
												</Button>
												<Button variant='outline' onClick={() => setRating(2)}>
													<Star rating={rating} star={2} />
												</Button>
												<Button variant='outline' onClick={() => setRating(3)}>
													<Star rating={rating} star={3} />
												</Button>
												<Button variant='outline' onClick={() => setRating(4)}>
													<Star rating={rating} star={4} />
												</Button>
												<Button variant='outline' onClick={() => setRating(5)}>
													<Star rating={rating} star={5} />
												</Button>
											</HStack>
										</Wrap>
										<Input
											onChange={(e) => {
												setTitle(e.target.value);
											}}
											placeholder='Review title (optional)'
										/>
										<Textarea
											onChange={(e) => {
												setComment(e.target.value);
											}}
											placeholder={`The ${product.brand} ${product.name} is...`}
										/>
										<Button
											isLoading={buttonLoading}
											loadingText='Saving'
											w='140px'
											colorScheme='cyan'
											onClick={() => onSubmit()}>
											Publish review
										</Button>
									</Stack>
								)}
							</>
						)}
						<Stack>
							<Text fontSize='xl' fontWeight='bold'>
								Reviews
							</Text>
							<SimpleGrid minChildWidth='300px' spacingX='40px' spacingY='20px'>
								{product.reviews.map((review) => (
									<Box key={review._id}>
										<Flex spcaing='2px' alignItems='center'>
											<Star color='cyan.500' />
											<Star rating={product.rating} star={2} />
											<Star rating={product.rating} star={3} />
											<Star rating={product.rating} star={4} />
											<Star rating={product.rating} star={5} />
											<Text fontWeight='semibold' ml='4px'>
												{review.title && review.title}
											</Text>
										</Flex>
										<Box py='12px'>{review.comment}</Box>
										<Text fontSize='sm' color='gray.400'>
											by {review.name}, {new Date(review.createdAt).toDateString()}
										</Text>
									</Box>
								))}
							</SimpleGrid>
						</Stack>
					</Box>
				)
			)}
		</Wrap>
	);
};

export default ProductScreen;
