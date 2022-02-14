import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdOutlineDeleteForever } from 'react-icons/md';

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
      <div className="items-cart-container">
        <button
          type="button"
          onClick={ removeProduct }
          name="remove-item"
          className="btn-items-cart remove"
        >
          <MdOutlineDeleteForever size="1.5rem" color="rgb(102, 102, 102)" />
        </button>
        <div className="cart-img">
          <img src={ image } alt="imagem do produto" />
        </div>
        <p data-testid="shopping-cart-product-name" className="cart-name">{title}</p>
        <div className="btn-increment-wrapper">
          <button
            type="button"
            onClick={ addQtd }
            name="increase"
            data-testid="product-increase-quantity"
            className="btn-items-cart"
          >
            <MdAddCircleOutline size="1.5rem" color="rgb(102, 102, 102)" />
          </button>
          <p data-testid="shopping-cart-product-quantity">{ itemCounter }</p>
          <button
            type="button"
            onClick={ subQtd }
            name="decrease"
            data-testid="product-decrease-quantity"
            className="btn-items-cart"
          >
            <MdRemoveCircleOutline size="1.5rem" color="rgb(102, 102, 102)" />
          </button>
        </div>
        <p className="cart-price">
          {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
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
