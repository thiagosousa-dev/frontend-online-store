import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
  render() {
    const { counterListCart } = this.props;
    return (
      <div className="header-container">
        <div className="logo-header">
          <img src="../logo.svg" alt="logo" />
          <h1>trybeStore</h1>
        </div>
        <Link
          to={ { pathname: '/cart' } }
          data-testid="shopping-cart-button"
          className="link-cart"
        >
          <button type="button" className="btn-cart">
            <BsCart3 size={ 25 } color="white" />
          </button>
          <span className="count-cart">{counterListCart}</span>
        </Link>

      </div>

    );
  }
}

Header.propTypes = {
  counterListCart: PropTypes.number.isRequired,
};

export default Header;
