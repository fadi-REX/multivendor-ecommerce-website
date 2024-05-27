import { useContext } from "react";
import { Admincontext } from "../../../admincontext";

export default function AdminProfilePage() {
  const { admin, ready } = useContext(Admincontext);

  if (!ready) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
   
    
        <div className="px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Admin Profile</h1>
          <div className="mb-4">
            <label className="text-gray-600 font-semibold">Name:</label>
            <p className="text-gray-800">{admin.name}</p>
          </div>
          <div className="mb-4">
            <label className="text-gray-600 font-semibold">Email:</label>
            <p className="text-gray-800">{admin.email}</p>
          </div>
        </div>
   
  
  );
}
