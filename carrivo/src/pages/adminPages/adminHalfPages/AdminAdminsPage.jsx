
import { DataGrid} from "@mui/x-data-grid";
import axios from 'axios';
import { useEffect, useState } from 'react';

function AdminAdminsPage() {



   const [admins, setAdmins] = useState([]);

   useEffect(() => {
     axios.get("/alladmins").then((response) => {
       setAdmins(response.data);
     });
   }, []);

    let arow = []
   
    admins.map((admin)=>{
       
       const arowLigne = {
         id: admin._id,
         col1: admin.name,
         col2: admin.email
       };

       arow.push(arowLigne);
    })
      


      

   
  



  const rows= arow
  const columns = [
    { field: "id", headerName: "ID", width: 150  },
    { field: "col1", headerName: "Name", width: 200 },
    { field: "col2", headerName: "Email", width: 400 },
  ];

  return (
    <div>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}

export default AdminAdminsPage