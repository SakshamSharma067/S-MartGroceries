import React from 'react'
import { Link } from 'react-router-dom'
import { assets, categories, features } from '../assets/assets'
import BestSeller from '../components/BestSeller'

const Home = () => {
  return (
    <div className='space-y-20'>
      {/* Hero Section */}
      <section className="relative mt-6">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1 px-6">
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>
              Fresh Groceries <span className="text-primary">Delivered</span> to Your Doorstep
            </h1>
            <p className='mt-6 text-lg text-gray-600 max-w-xl'>
              Experience the convenience of shopping for fresh, high-quality groceries from the comfort of your home.
            </p>
            <div className='flex flex-wrap items-center gap-4 mt-8'>
              <Link 
                to="/products" 
                className='px-8 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dull transition-colors'
              >
                Shop Now
              </Link>
              <Link 
                to="/products" 
                className='px-8 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:border-primary hover:text-primary transition-colors'
              >
                View Offers
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-12">
              {[
                { number: '10k+', label: 'Happy Customers' },
                { number: '5k+', label: 'Products Available' },
                { number: '99%', label: 'Customer Satisfaction' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl font-bold text-primary">{stat.number}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <img 
              src={assets.main_banner_bg} 
              alt="banner" 
              className='w-full aspect-[4/3] object-cover rounded-3xl'
            />
            <div className="absolute inset-0 bg-black/20 rounded-3xl" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Why Choose Us</h2>
            <p className="mt-4 text-gray-600">Experience the best online grocery shopping with our premium services</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <img src={feature.icon} alt={feature.title} className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-3 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Shop by Category</h2>
              <p className="mt-2 text-gray-600">Find your favorite products in our curated categories</p>
            </div>
            <Link 
              to="/products" 
              className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline"
            >
              View All
              <img src={assets.arrow_right_icon_colored} alt="arrow" className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products/${category.path.toLowerCase()}`}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 flex-shrink-0 w-[200px]"
              >
                <div className="aspect-square rounded-xl bg-gray-50 flex items-center justify-center p-4 mb-4">
                  <img 
                    src={category.image} 
                    alt={category.text} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                  />
                </div>
                <h3 className="font-medium text-gray-900 text-center">{category.text}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Best Sellers</h2>
              <p className="mt-2 text-gray-600">Our most popular products that customers love</p>
            </div>
            <Link 
              to="/products" 
              className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline"
            >
              View All
              <img src={assets.arrow_right_icon_colored} alt="arrow" className="w-4 h-4" />
            </Link>
          </div>
          <BestSeller />
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="relative rounded-2xl overflow-hidden group">
            <img 
              src={assets.bottom_banner_image} 
              alt="Fresh Vegetables" 
              className="w-full aspect-[16/9] object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white">Fresh Vegetables</h3>
              <p className="mt-2 text-white/90">Up to 30% off on organic vegetables</p>
              <Link 
                to="/products/vegetables" 
                className="mt-6 px-6 py-2 bg-white text-primary font-medium rounded-xl w-max hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group">
            <img 
              src={assets.bottom_banner_image_sm} 
              alt="Fresh Fruits" 
              className="w-full aspect-[16/9] object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white">Fresh Fruits</h3>
              <p className="mt-2 text-white/90">Get the best deals on fresh fruits</p>
              <Link 
                to="/products/fruits" 
                className="mt-6 px-6 py-2 bg-white text-primary font-medium rounded-xl w-max hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  )
}

export default Home
