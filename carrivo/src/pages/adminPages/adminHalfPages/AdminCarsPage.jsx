import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";


function AdminCarsPage() {
  const [cars, setCars] = useState([]);
  const [rowId, setRowID] = useState(null);

  useEffect(() => {
    axios.get("/allcars").then((response) => {
      setCars(response.data);
    });
  }, []);

  let arow = [];

  cars.map((car) => {
    const arowLigne = {
      id: car._id,
      col1: car.owner,
      col2: car.title,
      col4: car.verified,
      col5: car.listingDate,
      col6: car.location,
      col7: car.car_model,
      col8: car.mileage,
      col9: car.fuelType,
      col10: car.price,
    };

    arow.push(arowLigne);
  });


  const rows = arow;

  // function dellete car
  async function deleteCar(e, row) {
    await axios.post("/deletecar/" + row.id);
    setCars([...cars.filter((item) => item._id !== row.id)]);
  }

  // function open a link to view the car car
  async function openCarLink(e, row) {
   window.open("/car/"+row.id, "_blank");
  }



   // function open a link to view the car car
  async function VerifieCar(e, row) {
    if (!row.col4) {
      await axios.put("/verifiecar/" + row.id);
      const singlecar = cars.filter((item) => item._id === row.id);
      singlecar[0].verified = true;
      
      const newcars = [...cars.filter((item) => item._id !== row.id)];
      newcars.push(singlecar[0]);
      setCars(newcars);
     
    }
   
  }


  


 





  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "col1", headerName: "Owner ID", width: 100 },
    { field: "col2", headerName: "Title", width: 150 },
    {
      field: "col3",
      headerName: "Link ",
      width: 120,
      renderCell: (params) => {
        return (
          <button
            onClick={(e) => openCarLink(e, params.row)}
            variant="contained"
            className="  bg-blue-400 rounded-xl px-3 text-white"
          >
            View Car
          </button>
        );
      },
    },

    {
      field: "col4",
      headerName: "verification",
      width: 120,
      renderCell: (params) => {
        return (
          <button
            onClick={(e) => VerifieCar(e, params.row)}
            variant="contained"
            className={
              params.row.col4
                ? "bg-green-500  rounded-xl px-3 w-20 text-white"
                : "bg-red-400 rounded-xl px-3 w-20 text-white"
            }
          >
            {params.row.col4 &&   " Verified"}
            {!params.row.col4 && "verify"}
          </button>
        );
      },
    },
    { field: "col5", headerName: "Listing Date ", width: 100 },
    { field: "col6", headerName: "location ", width: 100 },
    { field: "col7", headerName: "Car Model ", width: 100 },
    { field: "col8", headerName: "Mileage ", type:"number", width: 80 },
    { field: "col9", headerName: "Fuel Type ", width: 80 },
    { field: "col10", headerName: "Price ", type:"number", width: 80 },

    {
      field: "col11",
      headerName: "Active ",
      width: 120,
      renderCell: (params) => {
        return (
          <button
            onClick={(e) => deleteCar(e, params.row)}
            variant="contained"
            className=" bg-gray-400 rounded-xl px-3 text-white"
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

export default AdminCarsPage;
