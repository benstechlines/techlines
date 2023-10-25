import {
	Tr,
	Td,
	Button,
	VStack,
	Textarea,
	Tooltip,
	Input,
	FormControl,
	Switch,
	FormLabel,
	Text,
	Badge,
	Spacer,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdDriveFolderUpload } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { uploadProduct } from '../redux/actions/adminActions';

const AddNewProduct = () => {
	const dispatch = useDispatch();
	const [brand, setBrand] = useState('');
	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [stock, setStock] = useState('');
	const [price, setPrice] = useState('');
	const [productIsNew, setProductIsNew] = useState('');
	const [description, setDescription] = useState('');
	const [imageOne, setImageOne] = useState('');
	const [subtitle, setSubtitle] = useState('');
	const [stripeId, setStripeId] = useState('');
	const [imageTwo, setImageTwo] = useState('');

	const createNewProduct = () => {
		dispatch(
			uploadProduct({
				brand,
				name,
				category,
				stock,
				price,
				stripeId,
				subtitle,
				images: [`/images/${imageOne}`, `/images/${imageTwo}`],
				productIsNew,
				description,
			})
		);
	};

	return (
		<Tr>
			<Td>
				<Text fontSize='sm'>Image File Name 1</Text>
				<Tooltip label={'Set the name of your first image e.g., iPhone.jpg'} fontSize='sm'>
					<Input size='sm' value={imageOne} onChange={(e) => setImageOne(e.target.value)} />
				</Tooltip>
				<Spacer />
				<Text fontSize='sm'>Image File Name 2</Text>
				<Tooltip label={'Set the name of you second image e.g., iPhone.jpg'} fontSize='sm'>
					<Input size='sm' value={imageTwo} onChange={(e) => setImageTwo(e.target.value)} />
				</Tooltip>
			</Td>
			<Td>
				<Text fontSize='sm'>Description</Text>
				<Textarea
					value={description}
					w='270px'
					h='120px'
					onChange={(e) => setDescription(e.target.value)}
					placeholder='Description'
					size='sm'
				/>
			</Td>
			<Td>
				<Text fontSize='sm'>Brand</Text>
				<Input size='sm' value={brand} onChange={(e) => setBrand(e.target.value)} placeholder='Apple or Samsung et.' />
				<Text fontSize='sm'>Name</Text>
				<Input size='sm' value={name} onChange={(e) => setName(e.target.value)} placeholder='Samsung S23' />
			</Td>
			<Td>
				<Text fontSize='sm'>StripeId</Text>
				<Input size='sm' value={stripeId} onChange={(e) => setStripeId(e.target.value)} />
				<Text fontSize='sm'>Subtitle</Text>
				<Input size='sm' value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder='Samsung S23...' />
			</Td>
			<Td>
				<Text fontSize='sm'>Category</Text>
				<Input size='sm' value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Smartphone' />
				<Text fontSize='sm'>Price</Text>
				<Input size='sm' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='299.99' />
			</Td>

			<Td>
				<Text fontSize='sm'>Stock</Text>
				<Input size='sm' value={stock} onChange={(e) => setStock(e.target.value)} />
				<Text fontSize='sm'>New badge shown on product card</Text>
				<FormControl display='flex' alignItems='center'>
					<FormLabel htmlFor='productIsNewFlag' mb='0' fontSize='sm'>
						Enable
						<Badge rounded='full' px='1' mx='1' fontSize='0.8em' colorScheme='green'>
							new
						</Badge>
						badge?
					</FormLabel>
					<Switch id='productIsNewFlag' onChange={() => setProductIsNew(!productIsNew)} isChecked={productIsNew} />
				</FormControl>
			</Td>
			<Td>
				<VStack>
					<Button variant='outline' w='160px' colorScheme='cyan' onClick={createNewProduct}>
						<Text ml='2'>Save Product</Text>
					</Button>
				</VStack>
			</Td>
		</Tr>
	);
};

export default AddNewProduct;
