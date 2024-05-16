
import { useContext, useState } from "react"
import { Link, Navigate} from "react-router-dom"
import axios from "axios";
import { Usercontext } from "../usercontext";
export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [logfalse, setLogfalse] = useState(false);

    const {setUser}= useContext(Usercontext)

    async function hundelLogin(ev){
      ev.preventDefault();
      try {
        const {data} = await axios.post('/login',{email,password});
        setUser(data);
        setRedirect(true);
      } catch (error) {
        setLogfalse(true)
      } 
    }

    if (redirect) {
        return (<Navigate to= {'/products'} />)
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-60">
             <h1 className="text-4xl text-center mb-4 font-semibold">Login</h1>
             <form className="max-w-md mx-auto" onSubmit={hundelLogin}>
                <input type="email" placeholder={'your@gmail.com'} value={email} onChange={ev =>setEmail(ev.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={ev =>setPassword(ev.target.value)}/>
                <button className="primary">Login</button>
                <div className="flex py-2 justify-between">
                     Dont have an account yet ?
                     <Link to={'/register'} className="underline font-semibold">Register now</Link>
                </div>
                {logfalse && (
            <div className="flex justify-center mt-4 font-semibold text-red-400">
              wrong username or password
            </div>
          )}
             </form>
            </div>
            
        </div>
    )
}