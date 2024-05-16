import { useContext } from "react"
import { Usercontext } from "../usercontext"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import Mycars from "./mycarsPage"
import AccountNavigation from "../components/acccountNavigation"

export default function AccountPage(){
    const [redirect,setRedirect] = useState(null)
    const {user,ready,setUser} =  useContext(Usercontext)
    let {subpage} = useParams()

    
    if (subpage === undefined) {
        subpage = 'profile';
    }


    //log out function 
     async function logout(){
       await  axios.post('/logout')
       setUser(null)
       setRedirect('/')
    }

    // redirect after log out
    if(redirect) {
      return <Navigate to = {redirect} />
    }


    if(!ready) {
        return 'loeading'
    }
   // return user to login if he dosnt have an account 
    if(ready && !user){
        return <Navigate to={'/login'} />
    }

   

    



    return(
        <div>
            <AccountNavigation/>
            
            {subpage === 'profile' &&(
                <div className="text-center max-w-lg mx-auto">
                    logged in as {user.name} ({user.email}) 
                    <br />
                    <button onClick={logout} className="primary max-w-sm mt-3 mb-5">logout</button>
                    <div>
                    <br />
                    Id Card      : {user.idcard}
                    <br />
                    phone number : {user.number}
                    </div>
                </div>
            )}
            {subpage === 'cars' && (
                <div>
                    <Mycars />
                </div>
            )}
        </div>
    )
}


// py-2 px-6 bg-primary text-white rounded-full