import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { assets } from '../assets/assets';

const Login = () => {
    const {setShowUserLogin, setUser, axios, navigate} = useAppContext()
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmitHandler = async (event)=>{
        try {
            event.preventDefault();
            const {data} = await axios.post(`/api/user/${state}`,{
                name, email, password
            });
            if (data.success){
                navigate('/')
                setUser(data.user)
                setShowUserLogin(false)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div 
            onClick={()=> setShowUserLogin(false)} 
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
        >
            <div 
                onClick={(e)=> e.stopPropagation()} 
                className='bg-white w-full max-w-md mx-4 rounded-2xl overflow-hidden'
            >
                <div className="p-8">
                    <div className="flex justify-center mb-8">
                        <img src={assets.logo} alt="logo" className="h-12" />
                    </div>

                    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg mb-8">
                        <button 
                            onClick={()=> setState("login")}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                                state === "login" 
                                    ? "bg-white text-gray-900 shadow-sm" 
                                    : "text-gray-500 hover:text-gray-900"
                            }`}
                        >
                            Login
                        </button>
                        <button 
                            onClick={()=> setState("register")}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                                state === "register" 
                                    ? "bg-white text-gray-900 shadow-sm" 
                                    : "text-gray-500 hover:text-gray-900"
                            }`}
                        >
                            Register
                        </button>
                    </div>

                    <form onSubmit={onSubmitHandler} className="space-y-4">
                        {state === "register" && (
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input 
                                    type="text" 
                                    id="name"
                                    required 
                                    value={name}
                                    onChange={(e)=> setName(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                                    placeholder="Enter your name"
                                />
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                id="email"
                                required 
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input 
                                type="password" 
                                id="password"
                                required 
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button 
                            type="submit"
                            className="w-full py-2.5 bg-green-300 text-black text-sm font-medium rounded-lg hover:bg-primary-dull transition-colors cursor-pointer"
                        >
                            {state === "register" ? "Create Account" : "Login"}
                        </button>
                    </form>
                </div>

                <div className="p-4 bg-gray-50 text-center">
                    <p className="text-sm text-gray-600">
                        {state === "register" ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button 
                            onClick={() => setState(state === "register" ? "login" : "register")}
                            className="text-black font-medium hover:underline cursor-pointer"
                        >
                            {state === "register" ? "Login" : "Register"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
