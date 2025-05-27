import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const SellerLogin = () => {
    const {isSeller, setIsSeller, navigate, axios} = useAppContext()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (event)=>{
        event.preventDefault();
        try {
            setLoading(true);
            const {data} = await axios.post('/api/seller/login', {
                email: email.trim(),
                password: password.trim()
            });
            
            if(data.success){
                toast.success("Login successful!");
                setIsSeller(true);
                navigate('/seller');
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Failed to login. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(isSeller){
            navigate("/seller")
        }
    },[isSeller, navigate])

    return !isSeller && (
        <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
            <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
                <p className='text-2xl font-medium m-auto'><span className="text-primary">Seller</span> Login</p>
                <div className="w-full">
                    <p>Email</p>
                    <input 
                        onChange={(e)=>setEmail(e.target.value)} 
                        value={email}
                        type="email" 
                        placeholder="enter your email" 
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" 
                        required
                    />
                </div>
                <div className="w-full">
                    <p>Password</p>
                    <input 
                        onChange={(e)=>setPassword(e.target.value)} 
                        value={password}
                        type="password" 
                        placeholder="enter your password"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary" 
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-blue-200 text-black w-full py-2 rounded-md cursor-pointer disabled:opacity-70"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </div>
        </form>
    )
}

export default SellerLogin
