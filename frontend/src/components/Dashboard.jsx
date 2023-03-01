import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"  
import { useNavigate} from "react-router-dom"
import { LogOut, reset } from "../features/authSlice"

const Dashboard = () => {
    const {user} = useSelector((state) => state.auth)
    const [tasks, setTask] = useState([])
    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = async () => {
        const response = await axios.get('http://localhost:5000/tasks')
        setTask(response.data);
    }

    const saveTask = async(e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/tasks', {
                title: title,
                summary: summary
            })
            navigate("/dashboard")
        } catch (error) {
            console.log(error);
        }
    }

    // const deleteUser = async(userId) => {
    //     await axios.delete(`http://localhost:5000/tasks/${userId}`)
    //     getTasks()
    // }

    const logout = () => {
        dispatch(LogOut())
        dispatch(reset())
        navigate("/")
    }

  return (
    <div>

        <div className='container-fluid'>
            <div className='container mt-5'>
            <button onClick={logout} type="button" class="btn btn-dark">Dark</button>
                <div className=''>
                    <div>
                        <h1 className='title'>My Tasks</h1>
                        <h2 className='subtitle'>Welcome Back <strong>{user && user.name}</strong></h2>
                    </div>
                    <div>
                        {tasks.map((task) => (
                            <div key={task.id}>
                                <div className='d-flex'>
                                    <h5>{task.title}</h5>
                                    <button type="button" className="btn btn-danger">Danger</button>
                                </div>
                                <h5>{task.summary}</h5>
                            </div>
                        ))}
                        
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        New Task
                        </button>

                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                            <div className="container">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">New Taks</h1>
                                <form onSubmit={saveTask}>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            value={title} 
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder='Task Title'
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Summary</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            value={summary} 
                                            onChange={(e) => setSummary(e.target.value)}
                                            placeholder='Task Summary'
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary d-flex justify-content-end">Submit</button>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard