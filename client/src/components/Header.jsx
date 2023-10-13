import React from 'react';
import {
	IconButton,
	Box,
	Flex,
	HStack,
	Icon,
	Stack,
	Text,
	useColorModeValue as mode,
	useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { BsPhoneFlip } from 'react-icons/bs';
import { Link as ReactLink } from 'react-router-dom';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import NavLink from './NavLink';
import ColorModeToggle from './ColorModeToggle';
import { BiUserCheck } from 'react-icons/bi';
import { toggleFavorites } from '../redux/actions/productActions';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = [
	{ name: 'Products', route: '/products' },
	{ name: 'Hot Deals', route: '/hot-deals' },
	{ name: 'Contact', route: '/contact' },
	{ name: 'Services', route: '/services' },
];

const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const { favoritesToggled } = useSelector((state) => state.product);

	useEffect(() => {}, [favoritesToggled, dispatch]);

	return (
		<Box bg={mode(`cyan.300`, 'gray.900')} px='4'>
			<Flex h='16' alignItems='center' justifyContent='space-between'>
				<Flex display={{ base: 'flex', md: 'none' }} alignItems='center'>
					<IconButton
						bg='parent'
						size='md'
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						onClick={isOpen ? onClose : onOpen}
					/>
				</Flex>
				<HStack spacing='8' alignItems='center'>
					<Box alignItems='center' display='flex' as={ReactLink} to='/'>
						<Icon as={BsPhoneFlip} h='6' w='6' color={mode('black', 'yellow.200')} />
						<Text as='b'>Tech Lines</Text>
					</Box>

					<HStack as='nav' spacing='4' display={{ base: 'none', md: 'flex' }}>
						{Links.map((link) => (
							<NavLink route={link.route} key={link.route}>
								<Text fontWeight='medium'>{link.name}</Text>
							</NavLink>
						))}
						<ColorModeToggle />
						{favoritesToggled ? (
							<IconButton
								onClick={() => dispatch(toggleFavorites(false))}
								icon={<MdOutlineFavorite size='20px' />}
								variant='ghost'
							/>
						) : (
							<IconButton
								onClick={() => dispatch(toggleFavorites(true))}
								icon={<MdOutlineFavoriteBorder size='20px' />}
								variant='ghost'
							/>
						)}
					</HStack>
				</HStack>
				<Flex alignItems='center'>
					<BiUserCheck />
				</Flex>
			</Flex>
			<Box display='flex'>
				{isOpen && (
					<Box pb='4' display={{ md: 'none' }}>
						<Stack as='nav' spacing='4'>
							{Links.map((link) => (
								<NavLink route={link.route} key={link.route}>
									<Text fontWeight='medium'>{link.name}</Text>
								</NavLink>
							))}
						</Stack>
						{favoritesToggled ? (
							<IconButton
								onClick={() => dispatch(toggleFavorites(false))}
								icon={<MdOutlineFavorite size='20px' />}
								variant='ghost'
							/>
						) : (
							<IconButton
								onClick={() => dispatch(toggleFavorites(true))}
								icon={<MdOutlineFavoriteBorder size='20px' />}
								variant='ghost'
							/>
						)}
						<ColorModeToggle />
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default Header;
