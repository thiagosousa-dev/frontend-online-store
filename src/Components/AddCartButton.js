import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddCartButton extends Component {
  render() {
    const { id, addItemToCart } = this.props;
    return (
      <div>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ addItemToCart }
          id={ id }
          className="btn-add-cart"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

AddCartButton.propTypes = {
  addItemToCart: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default AddCartButton;
