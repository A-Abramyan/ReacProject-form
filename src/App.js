import React, { Component } from 'react';
import Input from './components/Input'
import './App.css';
import UserInfo from './components/UserInfo';

class App extends Component {
  constructor(props) {
    super(props)

    this.changeUsers = this.changeUsers.bind(this);
    this.setEditableUsers = this.setEditableUsers.bind(this);
    this.changeEditableUser = this.changeEditableUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deletUser = this.deletUser.bind(this);
    this.deleteSelectUsers = this.deleteSelectUsers.bind(this);
    this.changeSelectedUsers = this.changeSelectedUsers.bind(this);
    this.addLocalStorage = this.addLocalStorage.bind(this);
  }
  state = {
    users: [],
    selectedUsers: [],
    editableUser: {
      item: {},
      index: null
    }
  }

  changeUsers(item) {
    this.setState((state) => ({
      users: [
        ...state.users,
        item
      ]
    }), () => this.addLocalStorage())
  }

  setEditableUsers(item, index) {
    this.setState({
      editableUser: {
        item: item,
        index: index
      }
    })
  }

  changeSelectedUsers(itemId) {
    const newSelectedUsers = [...this.state.selectedUsers]
    const isValueExists = newSelectedUsers.indexOf(itemId)
    if (isValueExists === -1) {
      newSelectedUsers.push(itemId)
    } else {
      newSelectedUsers.splice(isValueExists, 1)
    }
    this.setState({
      selectedUsers: newSelectedUsers
    })
  }
  changeEditableUser(event) {
    const name = event.target.name;
    const value = event.target.value
    this.setState((state) => ({
      editableUser: {
        ...state.editableUser,
        item: {
          ...state.editableUser.item,
          [name]: value
        }
      }     
    }))
  }
  updateUser(e) {
    e.preventDefault();
    const usersList = this.state.users.map((item, index) => {
      if (this.state.editableUser.index === index) {
        return this.state.editableUser.item
      }
      return item
    })
    this.setState({
      users: usersList,

      editableUser: {
        item: {},
        index: null
      }
    })
  }

  deletUser(userIndex) {
    const newUsers = [...this.state.users]
    newUsers.splice(userIndex, 1)
    this.setState({ users: newUsers })

  }
  deleteSelectUsers() {
    const usersList = [...this.state.users]
    const arr = [...this.state.selectedUsers]
    // console.log(arr)
    // console.log(newArr)
    this.setState({
      users: usersList.filter((item, index) => !arr.includes(index)),
      selectedUsers: []
    })
  }

  addLocalStorage() {
    const { users } = this.state
    localStorage.setItem('users', JSON.stringify(users))
  }

  componentDidMount() {
    const users = localStorage.getItem('users');
    if (users) {
      this.setState({users: JSON.parse( users)});
    }
  }

  componentWillUnmount() {
    localStorage.clear()
  }

  render() {
    return (
      <div className='app'>
        <Input
          changeUsers={this.changeUsers}
          index={this.state.editableUser.index}
          editableUser={this.state.editableUser}
          changeEditableUser={this.changeEditableUser}
          updateUser={this.updateUser}
          addLocalStorage={this.addLocalStorage}
        />
        <UserInfo
          users={this.state.users}
          setEditableUsers={this.setEditableUsers}
          deletUser={this.deletUser}
          deleteSelectUsers={this.deleteSelectUsers}
          changeSelectedUsers={this.changeSelectedUsers}
          selectedUsers={this.state.selectedUsers}
        />
      </div>
    )
  }
}

export default App;   
