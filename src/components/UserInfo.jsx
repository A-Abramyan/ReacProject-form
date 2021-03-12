import { Component } from 'react';
import './UserInfo.css'

class UserInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { users, setEditableUsers, deletUser, changeSelectedUsers, deleteSelectUsers } = this.props

        return (

            <div className='users'>
                {this.props.selectedUsers.length > 0 && <button type='button' onClick={deleteSelectUsers} className='deleteAll'>Delete All</button>}

                <table className='userInfo'>
                    <thead>
                        <tr>
                            <th className='Heading' >Select</th>
                            <th className='Heading'>FirstName</th>
                            <th className='Heading'>lastName</th>
                            <th className='Heading'>Gender</th>
                            <th className='Heading'>BirthDate</th>
                            <th className='Heading'>phoneNumber</th>
                            <th className='Heading'>EmailAddress</th>
                            <th className='Heading'>Profession</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? users.map((item, index) => (
                            <tr className='itemRow'>
                                <td>
                                    <input onChange={() => changeSelectedUsers(index)} className='checkboxInput' type='checkbox' />
                                </td>
                                <td className='itemName'>{item.firstName}</td>
                                <td className='itemName'>{item.lastName}</td>
                                <td className='itemName'>{item.gender}</td>
                                <td className='itemName'>{item.birthDate}</td>
                                <td className='itemName'>{item.phoneNumber}</td>
                                <td className='itemName'>{item.emailAddress}</td>
                                <td className='itemName'>{item.profession}</td>
                                <td className='buttonDiv'>
                                    <button className='edit' onClick={() => setEditableUsers(item, index)}>Edit</button>
                                </td>
                                <td className='buttonDiv'><button className='delete' onClick={() => deletUser(index)}>X</button></td>
                            </tr>

                        )) : 'No added users'}
                    </tbody>
                </table>



            </div >
        )
    }
}

export default UserInfo;
