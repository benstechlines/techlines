import {
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Flex,
	Spacer,
	Spinner,
	Stack,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Textarea,
	Th,
	Thead,
	Tr,
	Wrap,
	useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeReview } from '../redux/actions/adminActions';
import { getProducts } from '../redux/actions/productActions';

const ReviewsTab = () => {
	const dispatch = useDispatch();
	const { error, loading } = useSelector((state) => state.admin);
	const { products, reviewRemoval } = useSelector((state) => state.product);
	const toast = useToast();

	useEffect(() => {
		dispatch(getProducts());
		if (reviewRemoval) {
			toast({
				description: 'Review has been removed.',
				status: 'success',
				isClosable: true,
			});
		}
	}, [toast, dispatch, reviewRemoval, loading]);

	const onRemoveReview = (productId, reviewId) => {
		console.log(reviewRemoval);
		dispatch(removeReview(productId, reviewId));
	};

	return (
		<Box>
			{error && (
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle>Upps!</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			{loading ? (
				<Wrap justify='center'>
					<Stack direction='row' spacing='4'>
						<Spinner mt='20' thickness='2px' speed='0.65s' emptyColor='gray.200' color='cyan.500' size='xl' />
					</Stack>
				</Wrap>
			) : (
				<Box>
					{products.length > 0 &&
						products.map((product) => (
							<Box key={product._id}>
								<Accordion allowToggle>
									<AccordionItem>
										<h2>
											<AccordionButton>
												<Box flex='1'>
													<Flex>
														<Text mr='8px' fontWeight='bold'>
															{product.name}
														</Text>
														<Spacer />
														<Text mr='8px' fontWeight='bold'>
															({product.reviews.length} Reviews)
														</Text>
													</Flex>
												</Box>
											</AccordionButton>
										</h2>
										<AccordionPanel pb='4'>
											<TableContainer>
												<Table size='sm'>
													<Thead>
														<Tr>
															<Th>Username</Th>
															<Th>Rating</Th>
															<Th>Title</Th>
															<Th>Comment</Th>
															<Th>Created</Th>
														</Tr>
													</Thead>
													<Tbody>
														{product.reviews.map((review) => (
															<Tr key={review._id}>
																<Td>{review.name}</Td>
																<Td>{review.rating}</Td>
																<Td>{review.title}</Td>
																<Td>
																	<Textarea isDisabled value={review.comment} size='sm' />
																</Td>
																<Td>{new Date(review.createdAt).toDateString()}</Td>
																<Td>
																	<Button
																		variant='outline'
																		colorScheme='red'
																		onClick={() => onRemoveReview(product._id, review._id)}>
																		Remove Review
																	</Button>
																</Td>
															</Tr>
														))}
													</Tbody>
												</Table>
											</TableContainer>
										</AccordionPanel>
									</AccordionItem>
								</Accordion>
							</Box>
						))}
				</Box>
			)}
		</Box>
	);
};

export default ReviewsTab;
