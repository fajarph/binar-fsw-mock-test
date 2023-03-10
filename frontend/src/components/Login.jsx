import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { LoginUser, reset } from "../features/authSlice"

const Login = () => {
    const [pin, setPin] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, isSuccess, isError, isLoading, message} = useSelector(
        (state) => state.auth
    );
    
    useEffect(() => {
        if(user || isSuccess){
            navigate("/dashboard")
        }
        dispatch(reset())
    },[user, isSuccess, dispatch, navigate])

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({pin}))
    }

  return (
    <>
        <div className='container min-vh-100 d-flex justify-content-center align-items-center'>
            <form onSubmit={Auth}>
                {isError && <p className='has-text-centered'>{message}</p>}
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
                <p className="text-dark mt-3">Don't have an account?<a href="/" className='signin'>Sign Up</a></p>
                <button 
                    type="submit" 
                    className="btn btn-dark"
                >
                    {isLoading ? 'Loading...' : "Login"}
                </button>
            </form>
        </div>
    </>
  )
}

export default Login