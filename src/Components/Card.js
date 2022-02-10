import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  render() {
    const { title, price, image } = this.props;
    return (
      <div data-testid="product">
        <p>{title}</p>
        <img src={ image } alt="imagem do produto" />
        <p>{price}</p>
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default Card;
