
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Admincontext } from "../../admincontext";
export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [logfalse, setLogfalse] = useState(false);

  const { admin, setadmin } = useContext(Admincontext);

  async function hundelLogin(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/adminlogin", { email, password });
      setadmin(data);
      setRedirect(true);
    } catch (error) {
      setLogfalse(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/admin"} />;
  }

  if (admin) {
    return <Navigate to={"/admin"} />;
  }

  

  return (
    <div className=" grow flex items-center justify-around mt-52">
      <div className="">
        <h1 className="text-4xl text-center mb-4 font-bold">Login</h1>
        <div className="flex pb-2 justify-center font-semibold">Administrative space</div>
        <form className="max-w-md mx-auto" onSubmit={hundelLogin}>
          <input
            type="email"
            placeholder={"your@gmail.com"}
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>

          {logfalse && (
            <div className="flex justify-center mt-4 font-semibold text-red-400">
              wrong username or password
            </div>
          )}
        </form>
      </div>
    </div>
  );
}