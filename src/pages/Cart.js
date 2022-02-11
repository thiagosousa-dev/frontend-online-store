import React from 'react';
import { Link } from 'react-router-dom';
import ItemsCart from '../Components/ItemsCart';

class Cart extends React.Component {
  state = {
    totalCartValue: 0,
    results: [],
  }

  componentDidMount() {
    this.calculateTotalCartValue();
  }

  calculateTotalCartValue = () => {
    const localStorageItems = localStorage.getItem('cartItems');
    this.setState({
      results: JSON.parse(localStorageItems),
    }, () => {
      const { results } = this.state;
      const totalCartValue = results.reduce((prev, { price }) => prev + price, 0);
      this.setState({ totalCartValue });
    });
  }

  // const totalCartValue = results.reduce((prev, { price }) => prev + price, 0);
  // localStorage.setItem('totalValueCart', JSON.stringify(totalCartValue));

  render() {
    const { results, totalCartValue } = this.state;
    console.log(results);
    return (
      <section>
        {results.length > 0 ? (
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
            <h3>
              {`Valor total do Carrinho: R$ ${totalCartValue.toFixed(2)}`}
            </h3>
          </div>
        ) : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <div>
          <Link to="./closepurchase">
            <button
              type="button"
              name="go-to-close-purchase"
            >
              Finalizar Compra
            </button>
          </Link>
        </div>

      </section>
    );
  }
}

export default Cart;
