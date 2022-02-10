import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategoryList extends Component {
  render() {
    const { id, name, handleClick } = this.props;
    return (
      <label htmlFor={ id } data-testid="category">
        { name }
        <input
          name="Checked"
          id={ id }
          type="radio"
          value={ name }
          onClick={ handleClick }
        />
      </label>
    );
  }
}

CategoryList.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default CategoryList;
