import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorites } from '../redux/actions/productActions';

const Header = () => {
	const dispatch = useDispatch();
	const { favoritesToggled } = useSelector((state) => state.product);

	return (
		<>
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
		</>
	);
};

export default Header;
