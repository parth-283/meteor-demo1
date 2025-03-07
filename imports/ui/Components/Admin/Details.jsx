import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingPage from '../LoadingPage'

const Details = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [editedData, setEditedData] = useState({ name: '' })
    const [isEdit, setIsEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        Meteor.callAsync('getUserByID', id).then((result) => {
            setIsLoading(false)
            setEditedData(result)
            setUser(result)
        })
    }, [isEdit])

    const handleSaveEdit = () => {
        let editValue = { name: editedData.name }
        Meteor.callAsync('updateUserProfile', id, editValue).then((result) => {
            setIsEdit(false)
        })
    }

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='center-container'>
            <div className="user-detail-container">
                <h2 className="user-detail-title">{user.isAdmin ? "Admin" : "User"}  Details</h2>
                {isEdit ? (
                    <div className="login-form">
                        <div>
                            <label htmlFor="username">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="username"
                                value={editedData.name}
                                onChange={(e) => setEditedData({ ...editedData, [e.target.name]: e.target.value })}
                            />
                        </div>
                        <div className="button-group">
                            <button className="save-button" onClick={handleSaveEdit}>Save</button>
                            <button className="cancel-button" onClick={() => setIsEdit(false)}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="user-info">
                        <div className='user-editable-info'> <p><strong>Username:</strong> {user.name}</p> <Link to="javascript:void(0)" className="edit-span" onClick={() => setIsEdit(true)}>Edit</Link></div>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Roles:</strong> {user.roles?.join(', ')}</p>

                        <div className="button-group right-align">
                            <button className="cancel-button" onClick={() => navigate(`/admin/${user.roles?.includes('admin') ? 'list' : 'users'}`)}>Back</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Details