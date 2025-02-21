import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingPage from '../LoadingPage'

const UserDetail = () => {
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
                <h2 className="user-detail-title">User  Details</h2>
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
                        <p><strong>Username:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Roles:</strong> {user.roles?.join(', ')}</p>

                        <div className="button-group">
                            <button className="edit-button" onClick={() => setIsEdit(true)}>Edit</button>
                            <button className="cancel-button" onClick={() => navigate('/admin/users')}>Back</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserDetail