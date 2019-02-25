import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context'
import {Link} from 'react-router-dom';
import axios from 'axios';

class Contact extends Component {
    state = {
        showContactInfo: false
    };

 
    // onDeleteClick = async (id, dispatch) => {
    //     await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    //     dispatch({ payload:id, type: 'Delete_Contact'});
       
    // };
    onDeleteClick =(id, dispatch) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then( res=>  dispatch({ payload:id, type: 'Delete_Contact'}))
       
    };

    render() {
        const {id, name, email, phone } = this.props.contact;
        return (
            <Consumer>
              {value =>{
                const { dispatch } = value; 
                return(
                  <div className="card card-body mb-3">
                      <h5>{name}{' '}
                      <i
                      onClick={this.onDeleteClick.bind(this, id, dispatch)} 
                      className="fas fa-trash-alt"
                      style={{cursor:'pointer', float:'right',marginLeft:'1%', color:'#ef5350'}}></i>
                    
                      <Link to={`contact/edit/${id}`}>
                       <i
                      className="fas fa-pen-square " 
                      style={{cursor:'pointer',float:'right', marginLeft:'1%', color:'#4caf50'}}></i>
                      </Link>

                      <i
                      onClick={this.onShowClick=()=>{this.setState({ showContactInfo: !this.state.showContactInfo })}}
                      className="fas fa-chevron-circle-down" 
                      style={{cursor:'pointer', float:'right', color:'#42a5f5'}}></i>

                      </h5>
                      {this.state.showContactInfo ? (<ul className="list-group fadeIn">
                          <li className="list-group-item">Email : {email}</li>
                          <li className="list-group-item">Phone : {phone}</li>
                      </ul>) : null}

                  </div>
                );
              }}
            </Consumer>
        );
    }
}
Contact.propTypes = {
    contact : PropTypes.object.isRequired,
}

export default Contact;
