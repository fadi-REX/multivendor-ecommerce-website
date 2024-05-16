import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom"



export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [idcard, setID] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [registerfalse, setRegisterfalse] = useState(false);
    async function registerUser(ev){
        ev.preventDefault();
        try {
         await axios.post('/register',{
         name,
         email,
         password,
         idcard,
         number,
        });
        
        window.location.href = "/login"
        
        } catch (error) {
         setRegisterfalse(true)
         
        }



        
        

    }
    
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-61">
             <h1 className="text-4xl text-center mb-4 font-semibold">Register</h1>
             <form className="max-w-md mx-auto " onSubmit={registerUser} >
                <input type="text" 
                   placeholder="full name"
                   value={name}
                   onChange={ev => setName(ev.target.value)}
                />
                <input type="text" 
                   placeholder="ID card"
                   value={idcard}
                   onChange={ev => setID(ev.target.value)}
                />
                <input type="number" 
                   placeholder="Tunisian number"
                   value={number}
                   onChange={ev => setNumber(ev.target.value)}
                />
                <input type="email" 
                   placeholder={'email'}
                   value={email}
                   onChange={ev => setEmail(ev.target.value)}
                />
                <input type="password" 
                   placeholder="password"
                   value={password}
                   onChange={ev => setPassword(ev.target.value)}
                />
                <button className="primary">Register</button>
                <div className="flex py-2 justify-between">
                     Allready a member ?
                     <Link to={'/login'} className="underline font-semibold">Login now</Link>
                </div>
                {registerfalse && (
            <div className="flex justify-center mt-4 font-semibold text-red-400">
               email already exists or invalid input 
            </div>
          )}
             </form>
            </div>
            
        </div>
    )
}