import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategoryList extends Component {
  render() {
    const { id, name } = this.props;
    return (
      <label htmlFor={ id } data-testid="category">
        { name }
        <input
          id={ id }
          type="radio"
          value={ name }
        />
      </label>
    );
  }
}

CategoryList.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CategoryList;
