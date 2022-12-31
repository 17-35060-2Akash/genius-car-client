import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { FaGoogle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { setAuthToken } from '../../../api/auth';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext);

    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithGoogle(provider)
            .then(result => {
                const user = result.user;
                console.log(user);

                setAuthToken(user);


            })
            .catch(error => console.error(error));
    }

    return (
        <div>
            <p className='text-center'>New to Genius Car?
                <Link className='text-orange-600 font-semibold' to='/signup'> Sign Up</Link>
            </p>
            <div className='mx-10 mt-6 '>
                <p className='text-center py-5 font-semibold text-xl'>or</p>
                <button onClick={handleGoogleSignIn} className='btn btn-outline w-full py-2'><FaGoogle className='text-2xl mr-2 text-blue-500'></FaGoogle> Sign In with Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;