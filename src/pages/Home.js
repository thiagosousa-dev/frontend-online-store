import React from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import CategoryList from '../Components/CategoryList';
import Card from '../Components/Card';

class Home extends React.Component {
  state = {
    resultCategory: [],
    searchValue: '',
    results: [],
    isLength: false,
    listCart: [],
    counterListCart: 0,
  }

  async componentDidMount() {
    await this.getCategory();
  }

  getCategory = async () => {
    const result = await api.getCategories();
    this.setState({
      resultCategory: result,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleClick = async ({ target }) => {
    let value;
    const { searchValue } = this.state;
    const { results } = await api.getProductsFromAndQuery(searchValue);
    const categoryResultById = await api.getProductsFromCategory(target.id);
    if (target.type === 'button') {
      value = results;
    } else if (target.type === 'radio') {
      value = categoryResultById;
    }
    this.setState({
      results: value,
      isLength: true,
    });
  }

  addItemToCart = (productInfo) => {
    const prevState = this.state;
    const listCart = [...prevState.listCart, productInfo];
    this.setState((prev) => ({
      listCart,
      counterListCart: prev.counterListCart + 1,
    }));
    localStorage.setItem('cartItems', JSON.stringify(listCart));
  }

  render() {
    const { resultCategory,
      results,
      isLength,
      counterListCart,
      listCart,
    } = this.state;
    return (
      <div>
        {resultCategory.map(({ id, name }) => (
          <CategoryList
            key={ id }
            id={ id }
            name={ name }
            handleClick={ this.handleClick }
          />
        ))}

        <input
          type="text"
          data-testid="query-input"
          name="searchValue"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleClick }
        >
          Search
        </button>

        <Link
          to={ { pathname: '/cart', state: listCart } }
          data-testid="shopping-cart-button"
        >
          <button type="button">Veja Seu carrinho</button>
        </Link>

        <span>{counterListCart}</span>

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        {isLength ? (
          <div>
            { results.length > 0 ? (
              <div>
                {results.map(({ id, title, price, thumbnail }) => (
                  <Card
                    key={ id }
                    id={ id }
                    title={ title }
                    price={ price }
                    image={ thumbnail }
                    addItemToCart={ this.addItemToCart }
                  />
                ))}
              </div>
            ) : <p>Nenhum produto foi encontrado</p>}
          </div>
        ) : ''}
      </div>
    );
  }
}

export default Home;
