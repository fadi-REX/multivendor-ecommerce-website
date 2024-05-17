import { Link  } from "react-router-dom";
import AccountNavigation from "../components/acccountNavigation";
import { useEffect, useState } from "react";
import axios from 'axios'



export default function Mycars() {
   const [cars,setCars] = useState([])
   useEffect(() => {
    axios.get('/mycars').then(({data}) => {
          
           setCars(data)
    })
   }, [])


 
    return (
        
        <div>
            <AccountNavigation/>
         
         <div className="text-center"> 
        
    
            <Link className="bg-primary text-white py-2 px-6 rounded-full inline-flex gap-1" to={'/account/cars/new'} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

                Add new car
            </Link>
         </div>
         
          <div className=" mt-4 " >
            {cars.length > 0 && cars.map((car,index) =>(
                <Link to={'/account/cars/'+ car._id} key={index} className=" bg-gray-100 p-4 rounded-2xl flex gap-4 font-semibold  cursor-pointer">
                    <div className=" w-64 h-40 bg-gray-300  shrink-0 flex ">
                        {car.photos.length > 0 && (
                            <img src={"http://localhost:4000/uploads/"+car.photos[0]} className=" object-cover"/>
                        )}
                    </div>
                    <div className=" grow-0 shrink ">
                    <h2 className="text-xl ">{car.title}</h2>
                    <p className="text-sm mt-2 ">{car.description}</p>
                    </div>
                    
                </Link>
            ))}
         </div>
         

        </div>
    )

}


/*   
<div className="flex gap-2">
                    <input type="text" placeholder="Add using link ....jpg" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} />
                    <button onClick={addPhotobylink} className=" bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                </div>


    async function addPhotobylink(ev){
    ev.preventDefault();
    const {data: fileName} = await  axios.post('/uploadBylink', {link : photoLink});
    setAddedPhotos(prev => {
        return [...prev,fileName];
    });
    setPhotoLink('')
   }

*/