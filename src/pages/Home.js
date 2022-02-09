import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import CategoryList from '../Components/CategoryList';

class Home extends React.Component {
  state = {
    resultCategory: [],
  }

  async componentDidMount() {
    await this.getCategory();
  }

  getCategory = async () => {
    const result = await getCategories();
    this.setState({
      resultCategory: result,
    });
    console.log(result);
  }

  render() {
    const { resultCategory } = this.state;
    return (
      <div>
        {resultCategory.map(({ id, name }) => (
          <CategoryList key={ id } id={ id } name={ name } />
        ))}
        <input type="text" />
        <Link to="/cart" data-testid="shopping-cart-button">
          <button type="button">Adicionar ao carrinho</button>
        </Link>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default Home;
