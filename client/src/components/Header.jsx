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
					icon={<MdOutlineFavorite size='20px' onClick={() => dispatch(toggleFavorites(false))} variant='ghost' />}
				/>
			) : (
				<IconButton
					icon={<MdOutlineFavoriteBorder size='20px' onClick={() => dispatch(toggleFavorites(true))} variant='ghost' />}
				/>
			)}
		</>
	);
};

export default Header;
