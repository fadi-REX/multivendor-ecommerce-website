import axios from 'axios'
import Image from "../components/image"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



export default function SingleCarPage(){
    const {id} = useParams()
    const [car,setCar] = useState(null)
    const [showallphotos,setShowallphotos] = useState(false)


    useEffect(()=>{
        if (!id) {return}
        axios.get(/uniquecar/+id).then( response => {
          setCar(response.data)
        })


    },[id])





  if(!car) return '';

  if(showallphotos) {
    return(
        <div className=' absolute inset-0 bg-white min-h-screen lg:mx-96  mt-24'>
            <div className='grid gap-4'>
              <div>
                    
                    <button onClick={()=> setShowallphotos(false)} className=' fixed  flex mt-4 gap-1 py-2 px-4 rounded-2xl bg-gray-500 text-white shadow shadow-gray-500
                     bottom-2 right-2 lg:mx-96'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                        Close photos
                    </button>
              </div>
              {car?.photos?.length > 0 && car.photos.map((photo,index) =>(
                <div key={index}>
                    <Image src={photo } alt="" />
                </div>
              ))}

            </div>
            
        </div>
    )
  }


    return (
        <div className=" mt-4 bg-slate-200 py-4 px-6 lg:mx-96 rounded-3xl ">
           <h1 className=' text-4xl font-bold'>{car.title}</h1>
           <a className='  block font-semibold underline' target='_blank' href={"https://maps.google.com/?q="+ car.location}>{car.location}</a>

           <div className=' relative mt-10'>
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden ">
            <div >
                {car.photos?.[0] && (
                    <div>
                          <Image onClick={()=> setShowallphotos(true)} className='aspect-square cursor-pointer  object-cover ' src={ car.photos[0]} alt="" />
                    </div>
                   
                )}
                
            </div>

            <div className='grid '>
                 {car.photos?.[1] && (
                    <Image onClick={()=> setShowallphotos(true)} className='aspect-square cursor-pointer  object-cover  ' src={car.photos[1]} alt="" />
                )}
                <div>
                 {car.photos?.[2] && (
                    <Image onClick={()=> setShowallphotos(true)} className='aspect-square cursor-pointer  object-cover relative top-2 ' src={car.photos[2]} alt="" />
                )}
                </div>
                 
            </div>
            
           </div>

            <button onClick={()=> setShowallphotos(true)} className=' flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                </svg>

                Show more photos
            </button>



           
           </div>

           <div className=' my-7'>
            <h2 className=' font-semibold text-2xl mb-2 '>Description</h2>
            {car.description}
            </div>
            <div className=' my-7'>
            <h2 className=' font-semibold text-2xl mb-1'>ContactInfo</h2>
            {car.contactInfo}
            </div>


             <div className=' my-7'>
            <h2 className=' font-semibold text-2xl mb-1'>Price</h2>
            {car.price}  M 
            </div>


            
           
        </div>
    )
}