import { useTracker } from 'meteor/react-meteor-data'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ContactsList = () => {
    const navigate = useNavigate()
    const [contacts, setUsers] = useState([])

    useEffect(() => {
        Meteor.callAsync('getCounterList').then((result) => {
            setUsers(result)
        })
    }, [])

    return (
        <div>
            <div className="user-list-container">
                <h1 className="user-list-title">Contact  List</h1>
                <table className="user-list-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts?.map((contact, i) => (
                            <tr key={contact._id}>
                                <td>{++i}</td>
                                <td>{contact?.name}</td>
                                <td>{contact?.email}</td>
                                <td>{contact?.message}</td>
                                {/* <td>
                                    <div className="button-group">
                                        <button className="edit-button" onClick={() => navigate(`/admin/contacts/${contact._id}`)}>Edit</button>
                                        <button className="delete-button" onClick={() => handleDelete(contact._id)}>Delete</button>
                                    </div>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ContactsList