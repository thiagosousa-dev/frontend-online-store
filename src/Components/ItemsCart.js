import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ItemsCart extends Component {
  render() {
    const { title, price, image, itemCounter } = this.props;
    return (
      <div>
        <p data-testid="shopping-cart-product-name">{title}</p>
        <img src={ image } alt="imagem do produto" />
        <p>{price}</p>
        <p data-testid="shopping-cart-product-quantity">{ itemCounter }</p>
      </div>
    );
  }
}

ItemsCart.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  itemCounter: PropTypes.number.isRequired,
};

export default ItemsCart;
