import { Link  } from "react-router-dom";
import AccountNavigation from "../components/acccountNavigation";
import { useEffect, useState } from "react";
import axios from 'axios'
import Image from "../components/image"



export default function Mycars() {
   const [cars,setCars] = useState([])
   useEffect(() => {
    axios.get('/mycars').then(({data}) => {
          
           setCars(data)
    })
   }, [])


 
    return (
      <div>
        <AccountNavigation />

        <div className="text-center">
          <Link
            className="bg-primary text-white py-2 px-6 rounded-full inline-flex gap-1"
            to={"/account/cars/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new car
          </Link>
        </div>

        <div className=" mt-4 mx-72   ">
          {cars.length > 0 &&
            cars.map((car, index) => (
              <Link
                to={"/account/cars/" + car._id}
                key={index}
                className=" bg-gray-100 my-4 p-4 rounded-2xl flex gap-4 font-semibold  cursor-pointer relative"
              >
                <div className="flex  w-52 h-52 bg-gray-300 shrink-1  ">
                  {car.photos.length > 0 && (
                    <Image
                      src={car.photos[0]}
                      className=" object-cover aspect-square  "
                    />
                  )}
                </div>
                <div className=" grow-1 shrink ">
                  <h2 className="text-xl ">{car.title}</h2>
                  <p className="text-sm mt-2 max-w-96 text-gray-600  ">
                    {car.description}
                  </p>
                </div>
                <div className=" absolute top-3 right-3 text-sm">
                  {car.verified && (
                    <div className="flex text-green-500 gap-1 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                      Verified
                    </div>
                  )}

                  {!car.verified && (
                    <div className="flex text-gray-500 gap-1 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                      waiting for verification
                    </div>
                  )}
                </div>
              </Link>
            ))}
        </div>
      </div>
    );

}

