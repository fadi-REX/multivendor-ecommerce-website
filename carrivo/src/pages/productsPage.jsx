import axios from "axios"

import { useEffect, useState } from "react"

export default function ProductsPage(){
    
    const [cars,setcars] = useState([])

    useEffect(()=>{
        axios.get('/allcars').then(response =>{
           setcars(response.data ) 
        })
    },[])


    return(
        
     <div className=" mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cars.length > 0 && cars.map((car,index) =>(
            <div key={index}>
                <div className=" bg-gray-500 mb-2 rounded-2xl flex">
                {car.photos?.[0] && (
                    <img className="rounded-2xl object-cover aspect-square " src={'http://localhost:4000/uploads/'+ car.photos?.[0]} />
                )}
                </div>
                 
                
                <h2 className=" text-2xl truncate font-bold ">{car.title}</h2>
                <h3 className="  text-gray-500"> {car.location}</h3>
                <div className=" mt-1">
                    <span className=" font-bold text-2xl">{car.price} </span> 
                    
                     million DT
                </div>
            </div>
        ))}
     </div>
    )
}