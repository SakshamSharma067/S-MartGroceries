import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const {user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, getWishlistCount, axios} = useAppContext();

    const logout = async ()=>{
      try {
        const { data } = await axios.get('/api/user/logout')
        if(data.success){
          toast.success(data.message)
          setUser(null);
          navigate('/')
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    useEffect(()=>{
      if(searchQuery.length > 0){
        navigate("/products")
      }
    },[searchQuery])

    return (
        <nav className="sticky top-0 z-50">
            <div className="bg-gradient-to-r from-[#4fbf8b] to-[#44ae7c]">
                <div className="max-w-[2000px] mx-auto">
                    <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-3">
                        <NavLink to='/' onClick={()=> setOpen(false)} className="flex items-center">
                            <img className="h-12" src={assets.logo} alt="logo" />
                        </NavLink>

                        <div className="hidden sm:flex items-center gap-8">
                            <NavLink 
                                to='/' 
                                className={({isActive}) => 
                                    `text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 ${
                                        isActive ? 'text-white after:w-full' : 'text-white/90 after:w-0 hover:after:w-full hover:text-white'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                to='/products'
                                className={({isActive}) => 
                                    `text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 ${
                                        isActive ? 'text-white after:w-full' : 'text-white/90 after:w-0 hover:after:w-full hover:text-white'
                                    }`
                                }
                            >
                                All Products
                            </NavLink>
                            <NavLink 
                                to='/contact' 
                                className={({isActive}) => 
                                    `text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 ${
                                        isActive ? 'text-white after:w-full' : 'text-white/90 after:w-0 hover:after:w-full hover:text-white'
                                    }`
                                }
                            >
                                Contact
                            </NavLink>

                            <div className="hidden lg:flex items-center text-sm gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/20 focus-within:bg-white/20 transition-all duration-300">
                                <input 
                                    onChange={(e)=> setSearchQuery(e.target.value)} 
                                    className="w-64 bg-transparent outline-none placeholder-white/60 text-white" 
                                    type="text" 
                                    placeholder="Search products..." 
                                />
                                <img src={assets.search_icon} alt='search' className='w-4 h-4 opacity-60 invert'/>
                            </div>

                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={()=> navigate("/wishlist")} 
                                    className="relative p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                                >
                                    <img src={assets.heart_icon} alt='wishlist' className='w-6 h-6 text-white opacity-90 hover:opacity-100 transition-opacity'/>
                                    {getWishlistCount() > 0 && (
                                        <span className="absolute -top-1 -right-1 text-xs bg-white text-primary w-5 h-5 flex items-center justify-center rounded-full font-medium">
                                            {getWishlistCount()}
                                        </span>
                                    )}
                                </button>

                                <button 
                                    onClick={()=> navigate("/cart")} 
                                    className="relative p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                                >
                                    <img src={assets.nav_cart_icon} alt='cart' className='w-6 invert opacity-90 hover:opacity-100 transition-opacity'/>
                                    {getCartCount() > 0 && (
                                        <span className="absolute -top-1 -right-1 text-xs bg-white text-primary w-5 h-5 flex items-center justify-center rounded-full font-medium">
                                            {getCartCount()}
                                        </span>
                                    )}
                                </button>

                                {!user ? (
                                    <button 
                                        onClick={()=> setShowUserLogin(true)} 
                                        className="px-6 py-2.5 bg-white text-primary text-sm font-medium rounded-lg hover:bg-white/90 transition-all duration-300 cursor-pointer"
                                    >
                                        Login
                                    </button>
                                ) : (
                                    <div className='relative group'>
                                        <button className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white/20 hover:border-white/40 transition-colors cursor-pointer">
                                            <img src={assets.profile_icon} className='w-full h-full object-cover' alt="" />
                                        </button>
                                        <div className='hidden group-hover:block absolute top-full right-0 pt-2'>
                                            <ul className='bg-white shadow-xl border border-gray-100 rounded-lg overflow-hidden min-w-[160px]'>
                                                <li>
                                                    <button 
                                                        onClick={()=> navigate("my-orders")} 
                                                        className='w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-left cursor-pointer'
                                                    >
                                                        My Orders
                                                    </button>
                                                </li>
                                                <li>
                                                    <button 
                                                        onClick={()=> navigate("/wishlist")} 
                                                        className='w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-left cursor-pointer'
                                                    >
                                                        My Wishlist
                                                    </button>
                                                </li>
                                                <li>
                                                    <button 
                                                        onClick={logout} 
                                                        className='w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 text-left cursor-pointer'
                                                    >
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='flex items-center gap-6 sm:hidden'>
                            <button 
                                onClick={()=> navigate("/wishlist")} 
                                className="relative p-2 cursor-pointer"
                            >
                                <img src={assets.heart_icon} alt='wishlist' className='w-6 h-6 text-white opacity-90'/>
                                {getWishlistCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 text-xs bg-white text-primary w-5 h-5 flex items-center justify-center rounded-full font-medium">
                                        {getWishlistCount()}
                                    </span>
                                )}
                            </button>
                            <button 
                                onClick={()=> navigate("/cart")} 
                                className="relative p-2 cursor-pointer"
                            >
                                <img src={assets.nav_cart_icon} alt='cart' className='w-6 invert opacity-90'/>
                                {getCartCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 text-xs bg-white text-primary w-5 h-5 flex items-center justify-center rounded-full font-medium">
                                        {getCartCount()}
                                    </span>
                                )}
                            </button>
                            <button 
                                onClick={() => setOpen(!open)} 
                                aria-label="Menu" 
                                className="p-2 cursor-pointer"
                            >
                                <img src={assets.menu_icon} alt='menu' className="invert"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {open && (
                <div className="fixed inset-0 z-50 sm:hidden">
                    <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />
                    <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-xl">
                        <div className="p-4 border-b">
                            {user ? (
                                <div className="flex items-center gap-3">
                                    <img src={assets.profile_icon} className="w-10 h-10 rounded-full border-2 border-gray-200" alt="" />
                                    <div>
                                        <p className="font-medium text-gray-900">Welcome!</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                            ) : (
                                <button 
                                    onClick={()=> {
                                        setOpen(false);
                                        setShowUserLogin(true);
                                    }} 
                                    className="w-full px-4 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dull transition-colors"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                        <div className="p-4 flex flex-col gap-1">
                            <NavLink 
                                to="/" 
                                onClick={()=> setOpen(false)}
                                className={({isActive}) => 
                                    `px-4 py-2 rounded-lg text-sm font-medium ${
                                        isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                to="/products" 
                                onClick={()=> setOpen(false)}
                                className={({isActive}) => 
                                    `px-4 py-2 rounded-lg text-sm font-medium ${
                                        isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
                                    }`
                                }
                            >
                                All Products
                            </NavLink>
                            {user && (
                                <>
                                    <NavLink 
                                        to="/my-orders" 
                                        onClick={()=> setOpen(false)}
                                        className={({isActive}) => 
                                            `px-4 py-2 rounded-lg text-sm font-medium ${
                                                isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
                                            }`
                                        }
                                    >
                                        My Orders
                                    </NavLink>
                                    <NavLink 
                                        to="/wishlist" 
                                        onClick={()=> setOpen(false)}
                                        className={({isActive}) => 
                                            `px-4 py-2 rounded-lg text-sm font-medium ${
                                                isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
                                            }`
                                        }
                                    >
                                        My Wishlist
                                    </NavLink>
                                </>
                            )}
                            <NavLink 
                                to="/contact" 
                                onClick={()=> setOpen(false)}
                                className={({isActive}) => 
                                    `px-4 py-2 rounded-lg text-sm font-medium ${
                                        isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'
                                    }`
                                }
                            >
                                Contact
                            </NavLink>
                            {user && (
                                <button 
                                    onClick={() => {
                                        logout();
                                        setOpen(false);
                                    }}
                                    className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 text-left mt-2"
                                >
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
