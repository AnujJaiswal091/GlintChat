import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase.js';
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore"; 
import { db } from '../../lib/firebase.js';
import upload from '../../lib/upload.js';
import { useUserStore } from '../../lib/userStore.js';


const Login = () => {

    const {fetchUserInfo } = useUserStore();

    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
    });

    const handleAvatar = (e) => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData); 
    
        try {
            await signInWithEmailAndPassword(auth, email, password);
            fetchUserInfo(auth.currentUser.uid);  // Manually fetch user info after successful login
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const formData = new FormData(e.target);
            const { username, email, password } = Object.fromEntries(formData); 
    
            // VALIDATE INPUTS
            if (!username || !email || !password) {
                toast.warn("Please enter inputs!");
                return;
            }
            if (!avatar.file) {
                toast.warn("Please upload an avatar!");
                return;
            }
        
            // VALIDATE UNIQUE USERNAME
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", username));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                toast.warn("Username already taken");
                return;
            }
    
            // Register user and upload avatar
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const imgUrl = await upload(avatar.file);
    
            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: []
            });
    
            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: [],
            });
    
            toast.success("Account created! You can login now!");
    
        } catch (error) {
            console.log('Error registering user:', error);
            toast.error(error.message);
        } finally {
            setLoading(false);  // This will always be called, ensuring the loading state is reset
        }
    };

    return (
        <div className='w-[100%] h-[100%] flex items-center gap-24'> {/* Login */}
            <div className='flex-1 flex flex-col items-center gap-5'> {/* Item */}
                <h2>Welcome Back,</h2>
                <form onSubmit={handleLogin} className='flex flex-col items-center justify-center gap-5 '>
                    <input className='p-5 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-lg' type="text" placeholder='Email' name='email' />
                    <input className='p-5 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-lg' type="password" placeholder='Password' name='password' />
                    <button disabled={loading} className='w-[100%] disabled:cursor-not-allowed disabled:bg-blue-900 p-5 border-none bg-blue-700 text-white rounded-lg cursor-pointer font-semibold hover:bg-blue-800  active:bg-blue-900' type="submit">{loading ? "loading" : "Sign In"}</button>
                </form>
            </div>

            <div className='h-[80%] w-[2px] bg-gray-600'> {/* Separator */}

            </div>

            <div className='flex-1 flex flex-col items-center gap-5'>{/* Item */}
                <h2>Create An Account</h2>
                <form onSubmit={handleRegister} className='flex flex-col items-center justify-center gap-5'>
                    <label className='w-[100%] flex items-center justify-between cursor-pointer underline' htmlFor="file-upload">
                        <img className='w-12 h-12 rounded-lg object-cover opacity-60' src={avatar.url || "./avatar.png"} alt="Avatar Preview" />
                        Upload An Image
                    </label>
                    <input
                        type="file"
                        id="file-upload"
                        name='file'
                        style={{ display: 'none' }}
                        onChange={handleAvatar}
                    />
                    <input className='p-5 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-lg' type="text" placeholder='Username' name='username' />
                    <input className='p-5 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-lg' type="text" placeholder='Email' name='email' />
                    <input className='p-5 border-none outline-none bg-[rgba(17,25,40,0.6)] text-white rounded-lg' type="password" placeholder='Password' name='password' />
                    <button disabled={loading} className='w-[100%] disabled:cursor-not-allowed disabled:bg-blue-900 p-5 border-none bg-blue-700 text-white rounded-lg cursor-pointer font-semibold  hover:bg-blue-800 active:bg-blue-900 ' type="submit">{loading ? "loading" : "Sign Up"}</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
