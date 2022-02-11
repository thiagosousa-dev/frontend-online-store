import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddCartButton from './AddCartButton';

class Card extends Component {
  render() {
    const { id, title, price, thumbnail, addItemToCart } = this.props;
    return (

      <div data-testid="product">
        <Link
          data-testid="product-detail-link"
          key={ id }
          to={ `/productdetails/${id}` }
        >

          <img src={ thumbnail } alt="imagem do produto" />
          <p>{price}</p>
          <p>{title}</p>
        </Link>
        <AddCartButton
          id={ id }
          addItemToCart={ () => addItemToCart({ id, title, price, thumbnail, qtd: 1 }) }
        />
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  addItemToCart: PropTypes.func,
  id: PropTypes.string,
};

Card.defaultProps = {
  title: '',
  price: 0,
  thumbnail: '',
  addItemToCart: () => {},
  id: '',
};

export default Card;
