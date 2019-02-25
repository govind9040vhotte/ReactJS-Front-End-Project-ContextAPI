import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const Header = (props) => {
  const { branding } = props
  return (
    <div className='navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0'>
      <div className="container">
      <img style={{'height':'40px', 'width': '200',}}  src={require('./logo.svg')} alt="logo" />

        <a href="/" className="navbar-brand"><h3>{branding}</h3></a>
        <div>
          <ul className='navbar-nav mr-auto'>
            <li className="nav-item">
              <Link to="/" className='nav-link'>
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact/add" className='nav-link'>
              <i className="fas fa-plus"></i> Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className='nav-link'>
              <i className="fas fa-question"></i> About
              </Link>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}
Header.defaultProps ={
  branding:'My App'
};
Header.propTypes ={
  Branding : PropTypes.string.isRequired
};
export default Header;
