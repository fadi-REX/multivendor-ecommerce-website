import axios from "axios"
import { createContext, useEffect, useState } from "react"




export const Usercontext = createContext({})



// eslint-disable-next-line react/prop-types
export function UsercontextProvide({children}){
    const [user, setUser] = useState(null)
    const [ready,setReady] = useState(false)
    useEffect( () => {
        if(!user) {
         axios.get('/profile').then(({data}) => {
           setUser(data)
           setReady(true)
         })
          
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <Usercontext.Provider value={{user,setUser,ready}}>
    {children}
    </Usercontext.Provider>
  )
}