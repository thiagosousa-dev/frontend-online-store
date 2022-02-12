import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemsCart extends Component {
  render() {
    const {
      title,
      price,
      image,
      itemCounter,
      addQtd,
      subQtd,
      removeProduct } = this.props;
    return (
      <div>
        <p data-testid="shopping-cart-product-name">{title}</p>
        <button
          type="button"
          onClick={ addQtd }
          name="increase"
          data-testid="product-increase-quantity"
        >
          +
        </button>
        <button
          type="button"
          onClick={ subQtd }
          name="decrease"
          data-testid="product-decrease-quantity"
        >
          -
        </button>
        <img src={ image } alt="imagem do produto" />
        <p>{price}</p>
        <p data-testid="shopping-cart-product-quantity">{ itemCounter }</p>
        <button
          type="button"
          onClick={ removeProduct }
          name="remove-item"
        >
          X
        </button>
      </div>
    );
  }
}

ItemsCart.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  itemCounter: PropTypes.number.isRequired,
  addQtd: PropTypes.func.isRequired,
  subQtd: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,

};

export default ItemsCart;
