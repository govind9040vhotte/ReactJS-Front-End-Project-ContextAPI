import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from 'axios';

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

async componentDidMount(){
  const{ id } = this.props.match.params;
  const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

 const contact = res.data;

  this.setState({
    name: contact.name,
    email: contact.email,
    phone:contact.phone
  });
}

  onSubmit =  async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    
    //Check for errors
    if(name===''){
      this.setState({errors:{name:'name is required'}});
      return;
    }
    
    if(email===''){
      this.setState({errors:{email:'email is required'}});
      return;
    } 

    if(phone===''){
      this.setState({errors:{phone:'phone no. is required'}});
      return;
    }   

    const updContact = {
      name,email,phone
    }
    const {id } =  this.props.match.params;
    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);
    
    dispatch({type : 'Update_Contact' , payload: res.data});


    // to clear form
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors:{}
    });
    this.props.history.push('/');
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="row">
            <div className="col-md-6">
            <div className="card">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                   label="E-mail"
                   type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone No."
                    type="text"
                    name="phone"
                    placeholder="Phone number"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-info btn-block"
                  />
                </form>
              </div>
            </div>
            </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default EditContact;
