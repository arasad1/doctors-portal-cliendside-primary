import React from 'react';
import auth from '../../firebase.init';
import { useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [createUserWithEmailAndPassword, user, loading, error,] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate();

    let signInError;

    if (gLoading || loading || updating) {
        return <Loading></Loading>
    }

    if (error || gError || updateError) {
        signInError = <p className='text-red-500 mb-2' > {error?.message || gError?.message
        }</p >
    }

    if (user || gUser) {
        console.log(user || gUser)
    }

    const onSubmit = async (data) => {
        console.log(data)
        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName: data.name });
        console.log('update done');
        navigate('/appointment');

    };
    return (
        <div className='flex h-screen justify-center items-center' >
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-xl font-bold text-center">Sign Up</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label >
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: 'Name is Required'
                                    }
                                })
                                }
                            />
                            < label className="label" >
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500"> {errors.name.message}</span>}

                            </label >
                        </div >

                        <div className="form-control w-full max-w-xs" >
                            <label className="label" >
                                <span className="label-text" > Email</span >
                            </label >
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a valid Email'
                                    }
                                })
                                }
                            />
                            < label className="label" >
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500"> {errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500" > {errors.email.message}</span >}

                            </label >
                        </div >
                        <div className="form-control w-full max-w-xs" >
                            <label className="label" >
                                <span className="label-text" > Password</span >
                            </label >
                            <input
                                type="password"
                                placeholder="Your Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer'
                                    }
                                })
                                }
                            />
                            < label className="label" >
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500"> {errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500" > {errors.password.message}</span >}

                            </label >
                        </div >
                        {signInError}
                        < input className='btn w-full max-w-xs text-white' type="submit" value='Sign Up' />
                    </form >
                    <p>Already have an account? <Link to='/login'><small className='text-secondary'>Please login</small></Link></p>

                    <div className="divider" > OR</div >
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline" > Continue With Google</button >
                </div >
            </div >
        </div >
    );
};

export default Signup;