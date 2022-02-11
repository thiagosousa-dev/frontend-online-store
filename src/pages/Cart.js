import React from 'react';
import EvaluationForm from '../Components/EvaluationForm';

class Cart extends React.Component {
  render() {
    return (
      <div>
        <EvaluationForm />
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      </div>
    );
  }
}

export default Cart;
