import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("")
    const [pin, setPin] = useState("")
    const navigate = useNavigate()

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
        <div className='container-fluid'>
            <div className='container'>
                <div className='d-flex justify-content-center'>
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register