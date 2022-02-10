import React from 'react';
import ItemsCart from '../Components/ItemsCart';

class Cart extends React.Component {
  render() {
    const localStorageItems = localStorage.getItem('cartItems');
    const results = JSON.parse(localStorageItems);
    return (
      results ? (
        <div>
          {results.map(({ id, title, price, image, qtd }) => (
            <ItemsCart
              key={ id }
              id={ id }
              title={ title }
              price={ price }
              image={ image }
              itemCounter={ qtd }
            />
          ))}
        </div>
      ) : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );
  }
}

export default Cart;
