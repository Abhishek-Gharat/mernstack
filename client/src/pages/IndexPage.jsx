import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [listings, setListings] = useState([]);
  
  useEffect(() => {
    axios.get("/listings").then(response => {
      setListings([...response.data]);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {listings.length > 0 &&
          listings.map((listing, index) => (
            <Link
              to={"/listing/" + listing._id}
              key={index}
              className="bg-white border rounded-lg flex flex-col"
            >
              <div className="flex-shrink-0 overflow-hidden">
              {listing.images?.[0] && (
  <img
    className="object-cover w-full h-96 rounded-lg"
    src={"http://localhost:4000/uploads/" + listing.images?.[0]}
    alt=""
  />
)}

              </div>
              <div className="p-4 flex-grow">
                <h2 className="font-bold text-lg">{listing.title}</h2>
                <p className="text-gray-500 text-sm truncate">{listing.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-lg">{listing.price} $</span>
                  <span className="text-gray-500 text-sm">per night</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
