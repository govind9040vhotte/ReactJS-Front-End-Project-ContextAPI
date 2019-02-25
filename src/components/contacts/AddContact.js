import React, { Component } from "react";
import { Consumer } from "../../context";
// import uuid from "uuid";
import TextInputGroup from "../layout/TextInputGroup";
import axios from 'axios';

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };
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

    
    const newContact = {
      name,
      email,
      phone
    };
  
    axios.post('https://jsonplaceholder.typicode.com/users',newContact)
    .then(res => dispatch({ type: "Add_Contact", payload: res.data }));

    // const res = await axios.post('https://jsonplaceholder.typicode.com/users',newContact);
    //  dispatch({ type: "Add_Contact", payload: res.data });
    

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

  // onNameChange = (e) => this.setState({name: e.target.value});
  // onEmailChange = (e) => this.setState({email: e.target.value});
  // onPhoneChange = (e) => this.setState({phone: e.target.value});

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
                  {/* <div className="form-group">
                    <label htmlFor="name">Name :</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-lg"
                      placeholder="Enter your name"
                      value={name}
                      onChange={this.onChange}

                      // onChange={this.onNameChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">E-mail :</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      value={email}
                      onChange={this.onChange}

                      // onChange={this.onEmailChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone No. :</label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control form-control-lg"
                      placeholder="Enter phone number"
                      value={phone}
                      onChange={this.onChange}

                      // onChange={this.onPhoneChange}
                    />
                  </div> */}
                  <input
                    type="submit"
                    value="Add Contact"
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
export default AddContact;
