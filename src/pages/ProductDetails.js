import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Card from '../Components/Card';
import { getProductFromId } from '../services/api';
import EvaluationForm from '../Components/EvaluationForm';

class ProductDetails extends React.Component {
  state= {
    product: [],
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const products = await getProductFromId(id);
    products.qtd = 1;
    this.setState(
      (prevState) => ({
        product: [...prevState.product, products],
      }), () => this.addItemToCart,
    );
  }

  addItemToCart = () => {
    const { product } = this.state;
    localStorage.setItem('cartItems', JSON.stringify(product));
  }

  render() {
    const { product } = this.state;
    console.log(product);
    return (
      <div>
        {product.length > 0 && (
          <div data-testid="product-detail-name">
            <p>{ product[0].title }</p>
            <p>{ product[0].price }</p>
            <img src={ product[0].thumbnail } alt="imagem do produto" />
            <button
              data-testid="product-detail-add-to-cart"
              type="button"
              onClick={ this.addItemToCart }
            >
              Adicione ao carrinho

            </button>
            <Link
              to={ { pathname: '/cart', state: product } }
              data-testid="shopping-cart-button"
            >
              <button type="button">Veja Seu carrinho</button>
            </Link>
          </div>
        )}
        <EvaluationForm />

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
