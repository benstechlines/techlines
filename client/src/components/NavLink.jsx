import { IconButton } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

const NavLink = ({ children, route }) => (
	<IconButton as={ReactLink} px='2' py='1' rounded='md' variant='ghost' to={route}>
		{children}
	</IconButton>
);

export default NavLink;
