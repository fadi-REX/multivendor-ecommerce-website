
import { Link } from "react-router-dom"
import { Usercontext } from "../usercontext"
import { useContext } from "react"

 function Header(){
  const {user}= useContext(Usercontext)

   return(
     <header className='p-3 flex justify-between   w-full z-10 shadow-sm sticky top-0 '>
        <Link to={'/'} className='flex items-center gap-1' >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8  h-8 ">
           <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
           <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
          </svg>
          <span className='font-bold text-xl text-primary'>Carrivo</span>
        </Link>
      

        <div className="flex justify-between gap-8">  
        <Link to={'/adminlogin'} className="flex mt-2 font-bold text-primary">Admin</Link>
        <Link to={'/aboutus'} className="flex mt-2 font-bold text-primary">About Us</Link>
        <Link to={'/products'} className="flex mt-2 font-bold text-primary">Products</Link>
        <Link to={user?'/account/cars/new':'/login' } className="flex mt-2 font-bold text-primary ">Sell your Car</Link>
        <Link to={user?'/account':'/login'} className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
          {!!user && (
            <div>
              {user.name}
            </div>
          )}
        </Link>
        

        </div>




      </header>
   )

}


export default Header