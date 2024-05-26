import { useEffect, useState } from "react";
import axios from 'axios'
import { Navigate, useParams } from "react-router-dom";
import Image from "../components/image";



export default function Carsformpage(){
   const {id} = useParams();
   const [title,setTitle] = useState('')
   const [location ,setLocation] = useState('')
   const [addedPhotos,setAddedPhotos] = useState([])
   const [description,setDescription] = useState('')
   const [types,setTypes] = useState([]);
   const [contactInfo,setContactInfo] = useState('');
   const [price,setPrice] = useState('');
   const [redirect,setRedirect] = useState(false);
   const [carModel,setCarModel] = useState('')
   const [carMileage, setcarMileage] = useState("");
   const [fuelType, setfuelType] = useState("");

   


   useEffect(()=>{
    if(!id) {
        return;
    }
    axios.get('/uniquecar/'+ id).then( response =>{
        const {data} = response ;
        setTitle(data.title)
        setLocation(data.location)
        setAddedPhotos(data.photos)
        setDescription(data.description)
        setTypes(data.carType)
        setContactInfo(data.contactInfo)
        setPrice(data.price)
        setfuelType(data.fuelType);
        setCarModel(data.car_model);
        setcarMileage(data.mileage);

        
    });
   }, [id]);

   

   function inputHeader(text){
    return(
        <h2 className="text-2xl mt-4">{text}</h2>
    )
   }

   function inputDescription(text){
    return (
        <p className="text-gray-500 text-sm">{text} </p>
    )
   }

   function preInput(header,description) {
    return (
        <>
        {inputHeader(header)}
        {inputDescription(description)}
        </>
    )
   }

   function  hundletypeclick(ev) {
        const {checked,name} = ev.target;
        if (checked){
            setTypes([...types,name])
            
        }
        else {
            setTypes([...types.filter(selectedName => selectedName !== name )])
            
        }
    }


  
    function uploadPhoto(ev){
    const files =  ev.target.files 
    const data = new FormData();
    for(let i = 0; i < files.length; i++) {
       data.append('photos',files[i])
    }
    
     axios.post('/upload',data, {
        headers : {'Content-Type':'multipart/form-data'}
    }).then(response => {
        const {data:fileNames} = response;
        setAddedPhotos(prev => {
        return [...prev,...fileNames];
    });
    })
   }

   async function saveCar(ev){
     ev.preventDefault();
     if(id){
        // update
        
        const cardata = {id,title,location, addedPhotos,description,types,contactInfo,price,carModel,carMileage,fuelType}
      await axios.put('/addcar',cardata)

      setRedirect(true);
     }
     else {
        //new car
        const verified = false;
        const d = new Date();
        const month = d.getMonth() + 1;
        const listingdate = d.getDate() + "/" + month + "/" + d.getFullYear();
      const cardata = {
        title,
        location,
        addedPhotos,
        description,
        types,
        contactInfo,
        price,
        carModel,
        carMileage,
        fuelType,
        verified,
        listingdate
      };
      await axios.post('/addcar',cardata)

      setRedirect(true);
     }
     
   }



   function removePhoto(ev,fileName){
    ev.preventDefault() 
    setAddedPhotos([...addedPhotos.filter(photo => photo !== fileName)])
   }


   function selectMainPhoto(ev,fileName){
       ev.preventDefault() 
       const addedPhotoswithoutselected = addedPhotos.filter(photo => photo !== fileName)
       const newaddedphotos = [fileName,...addedPhotoswithoutselected]
       setAddedPhotos(newaddedphotos)
   }



   async function  deleteFunction() {
    await axios.post('/deletecar/'+id)
    setRedirect(true)
   
   }

   
   if(redirect){
    return <Navigate to={'/account/cars'} />
   }


    return (
      <div className=" px-11 font-semibold">
        <form onSubmit={saveCar}>
          {preInput(
            "Title",
            "Put the car models and how long has it been used"
          )}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          {preInput("State location", "The state location of you car")}
          <input
            type="text"
            placeholder="state location"
            value={location}
            onChange={(ev) => setLocation(ev.target.value)}
          />
          {preInput("Car Model", "put the model of your car")}
          <input
            type="text"
            placeholder="Car Model"
            value={carModel}
            onChange={(ev) => setCarModel(ev.target.value)}
          />
          {preInput(
            "Car Mileage",
            "put the Mileage of your car in km (if new car put 0)"
          )}
          <input
            type="text"
            placeholder="Car Mileage"
            value={carMileage}
            onChange={(ev) => setcarMileage(ev.target.value)}
          />

          {preInput("Photos", "The more the better - make sure the images are big enough to fit")}

          <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 mt-2">
            {addedPhotos.length > 0 &&
              addedPhotos.map((link) => (
                <div className=" h-32 flex relative " key={link}>
                  <Image
                    className=" rounded-2xl w-full object-cover"
                    src={link}
                  />
                  <button
                    onClick={(ev) => removePhoto(ev, link)}
                    className=" absolute bottom-1 right-1 text-white bg-black py-2 px-3 bg-opacity-50 rounded-2xl cursor-pointer "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(ev) => selectMainPhoto(ev, link)}
                    className=" absolute bottom-1 left-1 text-white bg-black py-2 px-3 bg-opacity-50 rounded-2xl cursor-pointer "
                  >
                    {link === addedPhotos[0] && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {link !== addedPhotos[0] && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              ))}

            <label className=" h-32 cursor-pointer flex items-center gap-2 justify-center border bg-transparent font-semibold rounded-2xl p-2 text-2xl text-gray-600">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={uploadPhoto}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
              Upload
            </label>
          </div>

          {preInput("Description", "description of the car")}
          <textarea
            rows={"7"}
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          {preInput(
            "Car Fuel Type",
            "select select the specific fuel of your car"
          )}

          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center">
              <input
                type="radio"
                name="fuelType"
                value="Electric"
                onChange={(ev) => setfuelType(ev.target.value)}
                checked={fuelType == "Electric" && "checked"}
              />
              <span>Electric</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="radio"
                name="fuelType"
                value="Petrol"
                onChange={(ev) => setfuelType(ev.target.value)}
                checked={fuelType == "Petrol" && "checked"}
              />
              <span>Petrol</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="radio"
                name="fuelType"
                value="Diesel"
                onChange={(ev) => setfuelType(ev.target.value)}
                checked={fuelType == "Diesel" && "checked"}
              />
              <span>Diesel</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="radio"
                name="fuelType"
                value="Gasoline"
                onChange={(ev) => setfuelType(ev.target.value)}
                checked={fuelType == "Gasoline" && "checked"}
              />
              <span>Gasoline</span>
            </label>
          </div>

          {preInput("Car Type", "select all the types that match your car")}

          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-7 ">
            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center">
              <input
                type="checkbox"
                checked={types.includes("Sports car")}
                name="Sports car"
                onChange={hundletypeclick}
              />
              <span>Sports car</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="checkbox"
                checked={types.includes("everyday life car")}
                name="everyday life car"
                onChange={hundletypeclick}
              />
              <span>everyday life car</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="checkbox"
                checked={types.includes("4x4")}
                name="4x4"
                onChange={hundletypeclick}
              />
              <span>4x4</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="checkbox"
                checked={types.includes("Luxury car")}
                name="Luxury car"
                onChange={hundletypeclick}
              />
              <span>Luxury car</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="checkbox"
                checked={types.includes("Used")}
                name="Used"
                onChange={hundletypeclick}
              />
              <span>Used</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="checkbox"
                checked={types.includes("Brand new car")}
                name="Brand new car"
                onChange={hundletypeclick}
              />
              <span>Brand new car</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="checkbox"
                checked={types.includes("Convertible")}
                name="Convertible"
                onChange={hundletypeclick}
              />
              <span>Convertible</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="checkbox"
                checked={types.includes("SUV")}
                name="SUV"
                onChange={hundletypeclick}
              />
              <span>SUV</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="checkbox"
                checked={types.includes("Truck")}
                name="Truck"
                onChange={hundletypeclick}
              />
              <span>Truck</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="checkbox"
                checked={types.includes("Minivan")}
                name="Minivan"
                onChange={hundletypeclick}
              />
              <span>Minivan</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="checkbox"
                checked={types.includes("Automatic transmission")}
                name="Automatic transmission"
                onChange={hundletypeclick}
              />
              <span>Automatic transmission</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="checkbox"
                checked={types.includes("Electric vehicle")}
                name="Electric vehicle"
                onChange={hundletypeclick}
              />
              <span>Electric vehicle</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="checkbox"
                checked={types.includes("Manual transmission")}
                name="Manual transmission"
                onChange={hundletypeclick}
              />
              <span>Manual transmission</span>
            </label>

            <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2">
              <input
                type="checkbox"
                checked={types.includes("Jeep")}
                name="Jeep"
                onChange={hundletypeclick}
              />
              <span>Jeep</span>
            </label>
          </div>

          {preInput(
            "Contact info",
            "here put all the ways the buyer can reach you with"
          )}
          <textarea
            rows={"4"}
            value={contactInfo}
            onChange={(ev) => setContactInfo(ev.target.value)}
          />

          <div>
            {preInput("Price", "Price in tunisian million: 1M = 1 000 DT")}
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>

          <div className="">
            <button className="primary my-4">Save</button>
          </div>
        </form>

        {id && (
          <button
            onClick={() => deleteFunction()}
            className=" bg-red-400 w-full p-2 text-white rounded-2xl "
          >
            Delete
          </button>
        )}
      </div>
    );
}