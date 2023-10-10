import React from 'react';
import { useForm } from 'react-hook-form';

import {
    Box,
    FormControl,
    Input,
    Button,
    InputGroup,
    InputRightAddon,
    InputRightElement
} from '@chakra-ui/react'

import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

import { Container } from './style';

export function Login() {

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);


    const {
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    function onSubmit() {

    }

    return (
        <Container className='flex'>
            <Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <InputGroup size='lg' my={4}>
                            <Input placeholder='Meu e-mail' />
                            <InputRightAddon children='@acesse.net.br' />
                        </InputGroup>
                        <InputGroup size='lg'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Minha senha'
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? <FiEyeOff /> : <FiEye />}
                                </Button>
                            </InputRightElement>
                            </InputGroup>
                    </FormControl>
                    <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                        Submit
                    </Button>
                </form>
            </Box>
            
        </Container>
        
    )
}