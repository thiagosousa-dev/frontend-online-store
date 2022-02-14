import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddCartButton from './AddCartButton';

class Card extends Component {
  render() {
    const { id, title, price, thumbnail, addItemToCart } = this.props;
    const NUMBER_LENGTH = 40;
    return (

      <div data-testid="product" className="card-product">
        <Link
          data-testid="product-detail-link"
          key={ id }
          to={ `/productdetails/${id}` }
          className="Link-card"
        >
          <div className="card-image-wrapper">
            <img src={ thumbnail } alt="imagem do produto" />
          </div>
          <p className="card-title">
            {title.length > NUMBER_LENGTH ? `${title.slice(0, NUMBER_LENGTH)}...` : title}
          </p>
          <p className="card-price">
            {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
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
