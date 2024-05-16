import { Link, useLocation, } from "react-router-dom"
export default function AccountNavigation() {
     const {pathname} = useLocation();
     let subpage = pathname.split('/')?.[2]
     if (subpage === undefined) {
        subpage = 'profile';
     }
     // button function on cars and profile using classes to make it appear good 
    function linkClass(type = null) {
      
      let classes = 'inline-flex gap-1 py-2 px-6 rounded-full '
      if (type === subpage) {
        classes +=  'bg-primary text-white '
      }
      else {
        classes += 'bg-gray-200'
      }
      return classes
    }
    return(
        <nav className="w-full flex justify-center mt-8 gap-10 mb-9 font-semibold">
                <Link className={linkClass('profile')} to = {'/account'}> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>

                My profile
                </Link>
                <Link className={linkClass('cars')} to = {'/account/cars'}>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
                 </svg>

                 My own cars
                </Link>
            </nav>
    )
}