import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Components/Card';
import { getProductFromId } from '../services/api';

class ProductDetails extends React.Component {
  state= {
    product: {},
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const products = await getProductFromId(id);
    this.setState({
      product: products,
    });
  }

  render() {
    const { product } = this.state;
    return (
      <div data-testid="product-detail-name">
        <Card
          id={ product.id }
          title={ product.title }
          price={ product.price }
          image={ product.thumbnail }
        />
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.string.isRequired,
};

export default ProductDetails;
