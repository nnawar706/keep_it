"use client"

import { useState } from 'react'
import { z } from "zod"

import { AuthFormProps, FormType } from '@/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';

const authFormSchema = (formType: FormType) => {
    return z.object({
        email: z.string().email(),
        name: formType === 'sign-up' ? z.string().min(5) : z.string().optional()
    });
};

const AuthForm = ({ type }: AuthFormProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [accountId, setAccountId] = useState<string | null>(null);

    const formSchema = authFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: ''
        },
    });
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <div>
            <Form { ...form }>
                <form onSubmit={form.handleSubmit(onSubmit)} className='auth-form'>
                    <h1 className='form-title'>
                        {type === 'sign-in' ? "Sign In" : "Sign Up"}
                    </h1>
                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <div className='shad-form-item'>
                                    <FormLabel className='shad-form-label'>Email</FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="Your Email Address"
                                            className="shad-input"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>

                                <FormMessage className='shad-form-message'/>
                            </FormItem>
                        )}
                    />
                    {type === 'sign-up' && (
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <div className='shad-form-item'>
                                        <FormLabel className='shad-form-label'>Name</FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder="Your Full Name"
                                                className="shad-input"
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>

                                    <FormMessage className='shad-form-message'/>
                                </FormItem>
                            )}
                        />
                    )}

                    {errorMessage && <p className='error-message'>*{errorMessage}</p>}

                    <Button type='submit' className='form-submit-button' disabled={isLoading}>
                        {isLoading && (
                            <Image src={"/assets/icons/loader.svg"} alt='loader' height={18} width={18}/>
                        )}
                        {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                    </Button>

                    <div className='body-2 flex justify-center'>
                        <p className='text-light-100'>
                            {type === 'sign-in' ? "Don't have an account?" : "Already have an account?"}
                        </p>
                        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='ml-1 font-medium text-brand'>
                            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default AuthForm
