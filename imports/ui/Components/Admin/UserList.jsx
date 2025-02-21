import { useTracker } from 'meteor/react-meteor-data'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserList = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])

    useEffect(() => {
        Meteor.callAsync('getAllUsersWithRoles').then((result) => {
            setUsers(result)
        })
    }, [])

    const handleDelete = (_id) => Meteor.callAsync('removeUser', _id)

    return (
        <div>
            <div className="user-list-container">
                <h1 className="user-list-title">User  List</h1>
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
                        {users.map((user, i) => (
                            <tr key={user._id}>
                                <td>{++i}</td>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>
                                    <div className="button-group">
                                        <button className="edit-button" onClick={() => navigate(`/admin/users/${user._id}`)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(user._id)}>Delete</button>
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

export default UserList