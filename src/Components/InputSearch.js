import React, { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';

class InputSearch extends Component {
  render() {
    const { onChange, onClick } = this.props;
    return (
      <div className="home-search">
        <input
          type="text"
          data-testid="query-input"
          name="searchValue"
          onChange={ onChange }
          className="home-input-search"
          placeholder="Busque seu produto"
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ onClick }
          className="home-btn-search"
        >
          <BsSearch color="rgb(55, 108, 83)" />
        </button>
      </div>
    );
  }
}

InputSearch.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,

};

export default InputSearch;
