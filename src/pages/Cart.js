import React from 'react';
import { Link } from 'react-router-dom';
import ItemsCart from '../Components/ItemsCart';

class Cart extends React.Component {
  state = {
    totalCartValue: 0,
    results: [],
  }

  componentDidMount() {
    this.getProductsLocalStorage();
  }

  getProductsLocalStorage = () => {
    const localStorageItems = localStorage.getItem('cartItems');
    this.setState({
      results: localStorageItems ? JSON.parse(localStorageItems) : [],
    }, () => { this.calculateTotalCartValue(); });
  }

  calculateTotalCartValue = () => {
    const { results } = this.state;
    const totalCartValue = results
      .reduce((prev, { price, qtd }) => prev + price * qtd, 0);
    this.setState({ totalCartValue });
  }

  addQtd = (productId) => {
    const { results } = this.state;
    const newList = results.map((item) => {
      if (item.id === productId) {
        item.qtd += 1;
      }
      return item;
    });
    this.setState({ results: newList },
      () => {
        localStorage.setItem('cartItems', JSON.stringify(results));
        this.calculateTotalCartValue();
      });
  }

  subQtd = (productId) => {
    const { results } = this.state;
    const newList = results.map((item) => {
      if (item.id === productId && item.qtd > 1) {
        item.qtd -= 1;
      }
      return item;
    });
    this.setState({ results: newList },
      () => {
        localStorage.setItem('cartItems', JSON.stringify(results));
        this.calculateTotalCartValue();
      });
  }

  removeProduct = (productId) => {
    const { results } = this.state;
    const newList = results.filter(({ id }) => id !== productId);
    this.setState({ results: newList },
      () => {
        localStorage.setItem('cartItems', JSON.stringify(newList));
        this.calculateTotalCartValue();
      });
  }

  render() {
    const { results, totalCartValue } = this.state;
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
                addQtd={ () => this.addQtd(id) }
                subQtd={ () => this.subQtd(id) }
                removeProduct={ () => this.removeProduct(id) }
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
