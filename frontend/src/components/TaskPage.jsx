import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"  
import { useNavigate } from "react-router-dom"
import { LogOut, reset } from "../features/authSlice"

const TaskPage = () => {
    const [tasks, setTask] = useState([])
    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`)
        setTask(response.data);
    }

    const saveTask = async(e) => {
        e.preventDefault()
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, {
                title: title,
                summary: summary
            })
            
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    const finishTask = async(e, id) => {
        e.preventDefault()

        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/tasks/${id}`)

            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    const logout = () => {
        dispatch(LogOut())
        dispatch(reset())
        navigate("/")
    }

  return (
    <div>
        <div className='container'>
            <div className='mt-5'>
                <div className='row'>
                    <div className='col'>
                        <h1 className='title fw-bold'>My Tasks</h1>
                    </div>
                    <div className='col d-flex justify-content-end mb-3'>
                        <button onClick={logout} type="button" className="btn btn-dark">Logout</button>
                    </div>
                </div>
                <div>
                    <h2 className='subtitle'>Welcome Back <strong>{user && user.name}</strong></h2>
                </div>
                <div className='py-3'>
                    {tasks.map((task) => (
                        <div key={task.id} className="py-1">
                            <div className='border border-1 container rounded'>
                                <div className='row'>
                                    <div className='col'>
                                        <p className='fw-bold mt-3'>{task.title}</p>
                                    </div>
                                    <div className='col d-flex justify-content-end'>
                                        <button onClick={e => finishTask(e, task.id)} type="button" className="btn btn-dark mt-3 bi bi-check-circle"></button>
                                    </div>
                                </div>
                                <div className=''>
                                    <p className=''>{task.summary}</p>
                                </div>
                            </div> 
                        </div>
                    ))}
                </div>
                <div>
                    <div className='row'>
                        <button type="button" className="btn btn-dark mb-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            New Task
                        </button>
                    </div>

                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="container">
                                    <p className="modal-title fs-5 mt-4" id="exampleModalLabel">New Taks</p>
                                    <form onSubmit={saveTask}>
                                        <div className="mb-3 mt-4">
                                            <label className="form-label fw-bold">Title</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                value={title} 
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder='Task Title'
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-bold">Summary</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                value={summary} 
                                                onChange={(e) => setSummary(e.target.value)}
                                                placeholder='Task Summary'
                                            />
                                        </div>
                                        <div className='d-flex mb-4'>
                                            <button type="submit" className="btn btn-light fw-bold" data-bs-dismiss="modal">Cancel</button>
                                            <button type="submit" className="btn btn-dark ms-auto ">Submit</button>
                                        </div>
                                    </form>
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

export default TaskPage