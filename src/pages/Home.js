import React from 'react';
import * as api from '../services/api';
import CategoryList from '../Components/CategoryList';
import Card from '../Components/Card';
import './Home.css';
import Header from '../Components/Hearder';
import Footer from '../Components/Footer';
import InputSearch from '../Components/InputSearch';

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

  addItemToCart = (productInfo) => {
    const localStorageItems = localStorage.getItem('cartItems');
    const list = localStorageItems ? JSON.parse(localStorageItems) : [];
    this.setState({ listCart: list });
    if (list.some(({ id }) => id === productInfo.id)) {
      this.incrementQTD(list, productInfo);
    } else {
      this.addNewProduct(productInfo);
    }
  }

  render() {
    const {
      resultCategory,
      results,
      isLength,
      counterListCart,
    } = this.state;
    return (
      <div className="home-container">
        <Header
          counterListCart={ counterListCart }
        />
        <div className="home-main">
          <div className="home-category">
            <h3>Categorias</h3>
            {resultCategory.map(({ id, name }) => (
              <CategoryList
                key={ id }
                id={ id }
                name={ name }
                handleClick={ this.handleClick }
              />
            ))}
          </div>
          <div className="home-card-container">
            <InputSearch
              onChange={ this.handleChange }
              onClick={ this.handleClick }
            />
            <p data-testid="home-initial-message" className="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
            {isLength ? (
              <div>
                { results.length > 0 ? (
                  <div className="home-card-wrapper">
                    {results.map(({ id, title, price, thumbnail }) => (
                      <Card
                        key={ id }
                        id={ id }
                        title={ title }
                        price={ price }
                        thumbnail={ thumbnail }
                        addItemToCart={ this.addItemToCart }
                      />
                    ))}
                  </div>
                ) : <p>Nenhum produto foi encontrado</p>}
              </div>
            ) : ''}
          </div>

        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
