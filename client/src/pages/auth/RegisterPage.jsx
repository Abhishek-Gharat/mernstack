import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import './LoginPage.css';
import './Register.css';
import './Notify.css';

export default function RegisterPage(){
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notification, setNotification] = useState("");

    const navigate = useNavigate();

    async function registerUser(e){
        e.preventDefault();
        try {
            await axios.post("/register", {
                name,
                lastName,
                birthDate,
                email,
                password
            });
            setNotification("Registration completed.");
            navigate("/login");
        } catch (error) {
            console.error("Registration failed. Please try again later.", error);
            setNotification("Registration failed. Please try again later.");
        }
    }

    return (
        <div className="parent">
            <div className="form-container">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto mb-4" onSubmit={registerUser}>
                    <div className="flex justify-between mb-4">
                        <input type="text" placeholder="Enter Your Name" className="mr-2" value={name} onChange={(e) => setName(e.target.value)}/>
                        <input type="text" placeholder="Last Name" className="ml-2" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    </div>
                
                    <input type="email" placeholder="Your@email.com"  className="mb-5" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password"  className="mb-5" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input type="date" placeholder="Optional" className="mb-3" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}/>
                
                    <button type="submit" className="form2-btn mb-4">Register</button>
                </form>

                <div className="py-2 text-gray-500">Already a member? <Link className="login-up-link" to={"/login"}>Login</Link></div>
                
                {notification && <div className="notification">{notification}</div>}
            </div>
        </div>
    )
}
