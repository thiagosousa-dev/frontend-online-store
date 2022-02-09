import React from 'react';
import CategoryList from '../Components/CategoryList';
import { getCategories } from '../services/api';

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
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default Home;
