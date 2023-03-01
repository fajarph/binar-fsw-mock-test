import React, { useState } from 'react'
import { useSelector } from "react-redux"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("")
    const [pin, setPin] = useState("")
    const navigate = useNavigate()
    const {isLoading} = useSelector(
        (state) => state.auth
    );

    const saveUser = async(e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/users', {
                name: name,
                pin: pin
            })
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <div className='container min-vh-100 d-flex justify-content-center align-items-center'>
            <form onSubmit={saveUser}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Name'
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Pin</label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={pin} 
                        onChange={(e) => setPin(e.target.value)}
                        placeholder='Pin'
                    />
                </div>
                <p className="text-dark mt-3">You have an account?<a href="/login">Sign In</a></p>
                <button type="submit" className="btn btn-dark">{isLoading ? 'Loading...' : "Register"}</button>
            </form>
        </div>
    </>
  )
}

export default Register