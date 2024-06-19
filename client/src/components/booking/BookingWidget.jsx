import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from "date-fns"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext"

export default function BookingWidget({listing}){
    const navigate = useNavigate();
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [numberOfGuests, setNumbeOfGuests] = useState(1);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user){
            setName(user.name)
        }
    }, [user])

    let numberOfNights = 0;
    if (checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function handleBook(){
        const response = await axios.post("/bookings", { 
            checkIn, checkOut, numberOfGuests, name, phone, 
            price: numberOfNights * listing.price,
            listing: listing._id
        });
        const bookingId = response.data._id;
        navigate(`/account/bookings/${bookingId}`)
    }

    return (
        <div className="bg-white border p-4 mt-10 rounded-md shadow-lg max-w-md">
            <div>
                <span className="font-semibold text-lg">{listing.price} INR</span> NIGHT
            </div>
            <div className="border rounded-md mt-2">
                <div className="flex">
                    <div className="py-3 px-4">
                        <label className="text-xs">CHECK-IN"</label>
                        <input type="date"
                            value={checkIn}
                            onChange={e => setCheckIn(e.target.value)}
                            />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label className="text-xs">CHECK-OUT</label>
                        <input type="date" 
                            value={checkOut}
                            onChange={e => setCheckOut(e.target.value)}
                            />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                <label className="text-xs">GUESTS</label>
                <input type="number"
                        value={numberOfGuests}
                        onChange={e => setNumbeOfGuests(e.target.value)}
                        min="1"
                        max={listing.maxGuests}
                        />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label className="text-xs">FULL NAME</label>
                        <input type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}                        
                            />
                        <label className="text-xs">PHONE NUMBER</label>
                        <input type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                ) }
            </div>
            <button onClick={handleBook} className="bg-primary w-full mt-4 py-2 rounded-md">
            Book
            </button>
            {checkIn && checkOut && (
                <div className="flex justify-between my-2">
                    <p className="underline">{listing.price} INR x {numberOfNights} {numberOfNights > 1 ? "nætter" : "nat"}</p>
                    <p>{numberOfNights * listing.price} INR</p>
                </div>
                )}
        </div>
    )
}