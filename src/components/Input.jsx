import React, { Component } from 'react';
import './Input.css'
class Input extends Component {
    constructor(props) {
        super(props)
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            gender: null,
            birthDate: null,
            phoneNumber: '',
            emailAddress: '',
            profession: '',
            emailValid: 'poxos',
            firstNameValid: 'poxos',
            formValid: false
        }
    }
    handleUserInput(event) {
        const name = event.target.name;
        const value = event.target.value
        this.setState({ [name]: value },
            console.log(this.state)
        )
    }

    validateForm(cb) {
        let {
            firstNameValid,
            emailValid,
            firstName,
            emailAddress
        } = this.state
        emailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailAddress);
        firstNameValid = firstName.length >= 6;

        this.setState({
            emailValid: emailValid,
            firstNameValid: firstNameValid,
            formValid: emailValid && firstNameValid
        }, cb);
    }

        handleAddUser(e) {
            e.preventDefault();
            const value = this.state
            const cb = () => {
                if (this.state.formValid) {
                    this.props.changeUsers(value);
                    // this.props.addLocalStorage();
                    this.setState({
                        firstName: '',
                        lastName: '',
                        gender: '',
                        birthDate: '',
                        phoneNumber: '',
                        emailAddress: '',
                        profession: '',
                        emailValid: 'poxos',
                        firstNameValid: 'poxos',
                        formValid: false
                    })

                }
            }
            this.validateForm(cb)
        }
    render() {
        const { editableUser: { item, index }, changeEditableUser, updateUser,addLocalStorage } = this.props
        const itemObject = index !== null ? item : this.state
        const change = index !== null ? changeEditableUser : this.handleUserInput

        return (
            <div>
                <form action="handler.php" className='registrationForm'>

                    <label className='headingLabel'>
                            FirstName:
                        <input 
                        value={itemObject.firstName} 
                        name='firstName'
                        placeholder='Write your FirstName' 
                        title='FirstName' onChange={change} 
                        type='text'/>
                        {!this.state.firstNameValid && <p> not valid</p>}
                    </label>
                        
                        <label className='headingLabel'>
                            LastName:
                        <input name='lastName' 
                        value={itemObject.lastName} 
                        type='text' placeholder='Write your FirstName' 
                        title='LastName' onChange={change} />
              
                        </label>

                    <label className='headingLabel'>
                            Gender:
                            
                        <select value={itemObject.gender} name='gender' className='gender' title='Gender' onChange={change}>
                            <option selected hidden>Choose here</option>
                            <option title='Male'>Male</option>
                            <option title='Female'>Female</option>
                        </select>
                    </label>

                        <label className='headingLabel'>
                            BirthDate:
                        <input 
                            value={itemObject.birthDate} id='birthDate'
                            name='birthDate' type='date'
                            min="1970-01-01" max="2020-01-01"
                            title='BirthDate' 
                            onChange={change} />
                    </label>

                    <label className='headingLabel'>
                           PhoneNumber:
                        <input value={itemObject.phoneNumber} 
                        name='phoneNumber' 
                        type='text' 
                        defaultValue='(+374)'
                         title='PhoneNumber' 
                         onChange={change} />
                    </label>

                    <label className='headingLabel'>                 
                            EmailAddress:              
                        <input 
                        value={itemObject.emailAddress}
                         name='emailAddress' 
                         type='email' 
                         title='EmailAddress' 
                         placeholder='Email' 
                         onChange={change} />
                        {!this.state.emailValid && <p> not valid</p>}
                    </label>

                    <label className='headingLabel'>
                            Profession:                      
                        <select value={itemObject.profession} name='profession' className='profession' title='Profession' onChange={change}>
                            <option selected hidden>Choose here</option>
                            <option>Full Stack Developer</option>
                            <option>Front End Developer</option>
                            <option>Back End Developer</option>
                        </select>
                    </label>

                    {index === null ? (
                        <div className='addButton'>
                            <button type='submit' className='addUser' onClick={this.handleAddUser} >Add</button>
                        </div>
                    ) : (
                            <div className='addButton'>
                                <button type='submit' className='addUser' onClick={updateUser } >Update</button>
                            </div>
                        )}

                </form>
            </div>)
    }

}
export default Input
