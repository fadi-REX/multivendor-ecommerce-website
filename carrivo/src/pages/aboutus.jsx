import image1 from "../assets/image1.png";
import { FaGithub } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="container mx-auto mt-8 font overflow-hidden">
      <div className="text-center">
        <h1 className="text-4xl font-bold my-2">About Us</h1>
        <p className="mt-4 text-lg text-gray-700">
          Welcome to Carrivo, your premier destination for buying and selling
          vehicles directly from individuals. We provide a seamless platform for
          peer-to-peer transactions, eliminating the need for intermediaries and
          ensuring a hassle-free experience for both buyers and sellers.
        </p>
      </div>

      <div className="my-20 ">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-4">
          <div className="about-image relative overflow-hidden rounded-xl">
            <img
              className="object-cover w-full h-full transform scale-105 hover:scale-110 transition duration-300"
              src={image1}
              alt="About Us"
            />
          </div>

          <div className="lg:my-3">
            <h2 className="font-semibold text-3xl mb-6">Carrivo</h2>
            <p className="text-lg text-gray-700">
              Carrivo is revolutionizing the way people buy and sell cars
              online. Our intuitive platform connects car enthusiasts with a
              diverse range of high-quality vehicles, ensuring that every buyer
              finds their perfect match. From compact cars to luxury SUVs,
              Carrivo offers a curated selection to suit every taste and budget.
            </p>
            <br />
            <a
              href="https://github.com/fadi-REX/multivendor-ecommerce-website"
              target="_blank"
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-8 inline-flex items-center transition duration-300 hover:bg-blue-600"
            >
              <FaGithub className="mr-2" />
              View Open-source code
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
