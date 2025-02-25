import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminsList = () => {
    const navigate = useNavigate()
    const [admins, setAdmins] = useState([])

    useEffect(() => {
        Meteor.callAsync('getAllAdminsWithRoles').then((result) => {
            setAdmins(result)
        })
    }, [])

    const handleDelete = (_id) => Meteor.callAsync('removeUser', _id)

    return (
        <div>
            <div className="user-list-container">
                <h1 className="user-list-title">Admins  List</h1>
                <table className="user-list-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin, i) => (
                            <tr key={admin._id}>
                                <td>{++i}</td>
                                <td>{admin?.name}</td>
                                <td>{admin?.email}</td>
                                <td>
                                    <div className="button-group">
                                        <button className="edit-button" onClick={() => navigate(`/admin/list/${admin._id}`)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(admin._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminsList