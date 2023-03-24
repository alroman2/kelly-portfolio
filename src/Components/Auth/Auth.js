import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { login } from '../../App/Slices/userSlice';
import { auth } from '../../firebase';
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle your login or signup logic here
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
        if (isLogin) {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch(login(user));
            })
            .catch((error) => {
                
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
        } else {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                dispatch(login(user));
                // ...
            })
            .catch((error) => {
                console.log(error);
        
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
                // ..
            });
        }
    }
    catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white border rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-black focus:border-black"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-black focus:border-black"
              placeholder="Password"
              required
            />
          </div>
          <p className='text-red-700 text-center'>
                {errorMessage}
            </p>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="text-center">
            
          <button
            type="button"
            className="text-sm text-gray-600 underline hover:text-black"
            onClick={toggleForm}
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
