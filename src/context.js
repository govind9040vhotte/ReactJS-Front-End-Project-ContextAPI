import React, { Component } from "react";
import axios from 'axios';

const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "Delete_Contact":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case "Add_Contact":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };

    case "Update_Contact":
      return {
        ...state,
        contacts: state.contacts.map(contact => contact.id === action.payload.id ?
            (contact= action.payload): contact)
      }
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  // async componentDidMount(){
  //   const res = await axios.get('https://jsonplaceholder.typicode.com/users')
  //   this.setState({contacts : res.data});
  // }
  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => this.setState({contacts : res.data}));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
export const Consumer = Context.Consumer;
