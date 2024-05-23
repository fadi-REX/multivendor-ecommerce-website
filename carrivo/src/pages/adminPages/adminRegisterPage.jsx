import axios from "axios";
import { useState, useContext } from "react";


export default function AdminRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [registerdone, setRegisterdone] = useState(false);


  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/adminregister", {
        name,
        email,
        password,
      });
     setRegisterdone(true);
    } catch (error) {
      
    }
  }

 
  return (
    <div className=" grow flex items-center justify-around mt-40">
      <div className="">
        <h1 className="text-4xl text-center mb-4 font-semibold">Register</h1>
        <form className="max-w-md mx-auto " onSubmit={registerUser}>
          <input
            type="text"
            placeholder="full name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
         
          <input
            type="email"
            placeholder={"email"}
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Register</button>
          
          {registerdone && (
            <div className="flex justify-center mt-4 font-semibold bg-blue-500">
              Admin added to Data base 
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
