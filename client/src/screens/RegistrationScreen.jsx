import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Container,
	FormControl,
	HStack,
	Heading,
	Stack,
	Text,
	useBreakpointValue,
	useToast
} from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import PasswordField from '../components/PasswordField';
import TextField from '../components/TextField';
import { googleLogin, register } from '../redux/actions/userActions';

const RegistrationScreen = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const redirect = '/products';
	const toast = useToast();
	const { loading, error, userInfo } = useSelector((state) => state.user);
	const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
	const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
			toast({
				description: userInfo.firstLogin ? 'Account created. Welcome aboard.' : `Welcome back ${userInfo.name}`,
				status: 'success',
				isClosable: true,
			});
		}
	}, [userInfo, redirect, error, navigate, toast]);

	const handleGoogleLogin = useGoogleLogin({
		onSuccess: async (response) => {
			const userInfo = await axios
				.get('https://www.googleapis.com/oauth2/v3/userinfo', {
					headers: { Authorization: `Bearer ${response.access_token}` },
				})
				.then((res) => res.data);
			const { sub, email, name, picture } = userInfo;
			dispatch(googleLogin(sub, email, name, picture));
		},
	});

	return (
		<Formik
			initialValues={{ email: '', password: '', name: '' }}
			validationSchema={Yup.object({
				name: Yup.string().required('A name is required.'),
				email: Yup.string().email('Invalid email').required('This email address is required.'),
				password: Yup.string()
					.min(1, 'Password is too short - must contain at least 1 character.')
					.required('Password is required.'),
				confirmPassword: Yup.string()
					.min(1, 'Password is too short - must contain at least 1 character.')
					.required('Password is required.')
					.oneOf([Yup.ref('password'), null], 'Passwords must match'),
			})}
			onSubmit={(values) => {
				dispatch(register(values.name, values.email, values.password));
			}}>
			{(formik) => (
				<Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
					<Stack spacing='8'>
						<Stack spacing='6'>
							<Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
								<Heading size={headingBR}>Create an account.</Heading>
								<HStack spacing='1' justify='center'>
									<Text color='muted'>Already a user?</Text>
									<Button as={ReactLink} to='/login' variant='link' colorScheme='cyan'>
										Sign in
									</Button>
								</HStack>
							</Stack>
						</Stack>
						<Box
							py={{ base: '0', md: '8' }}
							px={{ base: '4', md: '10' }}
							bg={{ boxBR }}
							boxShadow={{ base: 'none', md: 'xl' }}>
							<Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
								{error && (
									<Alert
										status='error'
										flexDirection='column'
										alignItems='center'
										justifyContent='center'
										textAlign='center'>
										<AlertIcon />
										<AlertTitle>We are sorry!</AlertTitle>
										<AlertDescription>{error}</AlertDescription>
									</Alert>
								)}
								<Stack spacing='5'>
									<FormControl>
										<TextField type='text' name='name' placeholder='Your first and last name.' label='Full name' />
										<TextField type='text' name='email' placeholder='you@example.com' label='Email' />
										<PasswordField type='password' name='password' placeholder='Your password' label='Password' />
										<PasswordField
											type='password'
											name='confirmPassword'
											placeholder='Confirm your new password'
											label='Confirm your password'
										/>
									</FormControl>
								</Stack>
								<Stack spacing='6'>
									<Button colorScheme='cyan' size='lg' fontSize='md' isLoading={loading} type='submit'>
										Sign up
									</Button>
									<Button
										colorScheme='cyan'
										size='lg'
										fontSize='md'
										isLoading={loading}
										onClick={() => handleGoogleLogin()}>
										<FcGoogle size={30} />
										Sign up with Google
									</Button>
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</Container>
			)}
		</Formik>
	);
};

export default RegistrationScreen;
