import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddCartButton from './AddCartButton';

class Card extends Component {
  render() {
    const { id, title, price, image, addItemToCart } = this.props;
    return (
      <div data-testid="product">
        <img src={ image } alt="imagem do produto" />
        <p>{price}</p>
        <p>{title}</p>
        <AddCartButton
          id={ id }
          addItemToCart={ () => addItemToCart({ id, title, price, image, qtd: 1 }) }
        />
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Card;
