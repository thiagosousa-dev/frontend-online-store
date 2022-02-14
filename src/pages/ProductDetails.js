import React from 'react';
import PropTypes from 'prop-types';
import { getProductFromId } from '../services/api';
import EvaluationForm from '../Components/EvaluationForm';
import Header from '../Components/Hearder';
import Footer from '../Components/Footer';
import './ProductDetails.css';

class ProductDetails extends React.Component {
  state= {
    product: [],
    listCart: [],
    counterListCart: 0,
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const product = await getProductFromId(id);
    product.qtd = 1;
    this.setState({
      product,
    }, () => this.addItemToCart);
  }

  addNewProduct = (productInfo) => {
    this.setState((prevState) => ({
      listCart: [...prevState.listCart, productInfo],
      counterListCart: prevState.counterListCart + 1,
    }), () => {
      const { listCart } = this.state;
      localStorage.setItem('cartItems', JSON.stringify(listCart));
    });
  }

  incrementQTD = (list, productInfo) => {
    const newList = list.map((item) => {
      if (item.id === productInfo.id) {
        item.qtd += 1;
      }
      return item;
    });
    this.setState((prevState) => ({
      listCart: newList,
      counterListCart: prevState.counterListCart + 1,
    }),
    () => {
      localStorage.setItem('cartItems', JSON.stringify(newList));
    });
  }

  addItemToCart = () => {
    const { product } = this.state;
    const localStorageItems = localStorage.getItem('cartItems');
    const list = localStorageItems ? JSON.parse(localStorageItems) : [];
    this.setState({ listCart: list });
    if (list.some(({ id }) => id === product.id)) {
      this.incrementQTD(list, product);
    } else {
      this.addNewProduct(product);
    }
  }

  render() {
    const { product, counterListCart } = this.state;
    console.log(product);
    return (
      <div>
        <Header
          counterListCart={ counterListCart }
        />
        <div data-testid="product-detail-name" className="product-detail-container">
          <img src={ product.thumbnail } alt="imagem do produto" />
          <div>
            <h1 className="product-description">{ product.title }</h1>
            <p className="product-price">
              { Number(product.price)
                .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
            </p>
            <p>
              <strong>à vista</strong>
              {' '}
              ou em 12x s/juros no
              {' '}
              <strong>cartão de crédito</strong>
            </p>
            <button
              data-testid="product-detail-add-to-cart"
              type="button"
              onClick={ this.addItemToCart }
              className="btn-add-cart-detail"
            >
              Adicione ao carrinho

            </button>
          </div>
          {/* <Link
            to={ { pathname: '/cart' } }
            data-testid="shopping-cart-button"
          >
            <button type="button">Veja Seu carrinho</button>
          </Link> */}
        </div>

        <EvaluationForm />
        <Footer />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ProductDetails;
