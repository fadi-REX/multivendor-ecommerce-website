import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/allusers").then((response) => {
      setUsers(response.data);
    });
  }, []);

  let arow = [];


  users.map((user) => {
    
    const arowLigne = {
      id: user._id,
      col1: user.name,
      col2: user.email,
      col3: user.idcard,
      col4: user.number,
    };

    arow.push(arowLigne);
    
  });




  // function dellete user 
  async function deleteUser(e,row){
    
    await axios.post('/deleteuser/'+row.id)
    setUsers([...users.filter((item) => item._id !== row.id)]);
    
  }







  const rows = arow;
  const columns = [
    { field: "id", headerName: "ID", width: 100,  },
    { field: "col1", headerName: "Name", width: 200 },
    { field: "col2", headerName: "Email", width: 200, },
    { field: "col3", headerName: "ID card ", width: 200, },
    { field: "col4", headerName: "Phone number ", width: 200,  },
    {
      field: "col5",
      headerName: "Active ",
      width: 300,
      renderCell: (params) => {
        return (
          <button
            onClick={(e) => deleteUser(e, params.row)}
            variant="contained"
            className=" bg-slate-300 rounded-xl px-3"
          >
            X Delete
          </button>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}

export default AdminUsersPage;
