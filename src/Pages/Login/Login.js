import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from 'firebase/auth';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const { logIn, signInWithGoogle } = useContext(AuthContext);

    const provider = new GoogleAuthProvider();

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        logIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                const currentUser = {
                    email: user.email
                }
                console.log(currentUser)

                //get jwt token
                fetch('https://genius-car-server-xi.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        //save to local storage
                        localStorage.setItem('genius-token', data.token)
                        navigate(from, { replace: true })

                    })

            })
            .catch(error => console.error(error))

    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(provider)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(from, { replace: true })
            })
            .catch(error => console.error(error))
    }


    return (
        <div className="hero w-full my-24">
            <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left ">
                    <img className='w-3/4 mx-auto' src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                    <h1 className="text-5xl text-center font-bold pt-5">Login</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            {/* <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label> */}
                        </div>
                        <div className="form-control mt-6">
                            <input type='submit' className="btn btn-primary" value="Login" />
                        </div>
                    </form>
                    {/* <p className='text-center'>New to Genius Car?
                        <Link className='text-orange-600 font-semibold' to='/signup'> Sign Up</Link>
                    </p>
                    <div className='mx-10 mt-6 '>
                        <p className='text-center py-5 font-semibold text-xl'>or</p>
                        <button onClick={handleGoogleSignIn} className='btn btn-outline w-full py-2'><FaGoogle className='text-2xl mr-2 text-blue-500'></FaGoogle> Sign In with Google</button>
                    </div> */}
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;