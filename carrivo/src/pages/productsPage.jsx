import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../components/image";

export default function ProductsPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get("/allverifiedcars").then((response) => {
      setCars(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {cars.map((car, index) => (
          <Link key={index} to={`/car/${car._id}`} className="group">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition duration-300">
              {car.photos?.[0] && (
                <Image
                  className="object-cover w-full h-48 md:h-56"
                  src={car.photos?.[0]}
                  alt={`Car ${index}`}
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition duration-300 truncate">
                  {car.title}
                </h2>
                <p className="text-sm text-gray-600">{car.location}</p>
                <div className="mt-2">
                  <span className="text-xl font-semibold text-blue-600">
                    {car.price}
                  </span>
                  <span className="text-sm text-gray-600 ml-1">million DT</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
