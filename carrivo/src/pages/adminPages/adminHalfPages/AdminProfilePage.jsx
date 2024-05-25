import { useContext } from "react";
import { Admincontext } from "../../../admincontext";


export default function AdminProfilePage() {
  const { admin, setadmin, ready } = useContext(Admincontext);
  return (
    <div className=" ">
      <div className=" my-2">Admin Name : {admin.name}</div>
      <div className=" my-2">Admin Email : {admin.email}</div>
      <div className=" my-2">Admin ID : {admin.id}</div>
    </div>
  );
}
