import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';
import './EvaluationForm.css';

let evaluations = [];
if (localStorage.getItem('evaluations') !== null) {
  evaluations = JSON.parse(localStorage.getItem('evaluations'));
}
const obj = {
  email: '',
  message: '',
  rating: '',
};
class EvaluationForm extends Component {
  state = {
    ...obj,
  }

  handleChangeEvaluation = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  submitEvaluationForm = (event) => {
    event.preventDefault();
    evaluations.push(this.state);
    localStorage.setItem('evaluations', JSON.stringify(evaluations));
    this.setState({ ...obj });
  }

  isDisabled = () => {
    const regex = /^\S+@\S+\.\S+$/;
    const { email, rating } = this.state;
    return (
      email !== ''
      && regex.test(email)
      && rating !== ''
    );
  }

  render() {
    const { rating, email, message } = this.state;
    const STAR_NUMBER = 5;
    return (
      <div className="evaluation-container">
        <h3>Avaliações</h3>
        <form className="evaluation-form">
          <div className="input-evaluation-required">
            <input
              type="email"
              placeholder="Email"
              data-testid="product-detail-email"
              className="input-email-evaluation"
              name="email"
              value={ email }
              required
              onChange={ this.handleChangeEvaluation }
            />
            <div>
              {[...Array(STAR_NUMBER)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label
                    htmlFor={ `${ratingValue}-rating` }
                    key={ `${ratingValue}-rating` }
                  >
                    <input
                      id={ `${ratingValue}-rating` }
                      data-testid={ `${ratingValue}-rating` }
                      type="radio"
                      name="rating"
                      className="input-rating"
                      value={ ratingValue }
                      onClick={ this.handleChangeEvaluation }
                    />
                    <FaStar
                      color={ ratingValue <= rating ? '#ffc107' : '#e4e5e9' }
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <textarea
            type="text"
            placeholder="Mensagem (opcional)"
            data-testid="product-detail-evaluation"
            className="input-message-evaluation"
            name="message"
            value={ message }
            onChange={ this.handleChangeEvaluation }
          />
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.submitEvaluationForm }
            className="btn-submit-evaluation"
            disabled={ !this.isDisabled() }
          >
            Avaliar
          </button>
        </form>
        {evaluations.length === 0 ? (
          <p className="not-evaluation">Não há avaliações para esse produto</p>
        ) : (
          <div className="evaluation-user-container">
            {evaluations.map((evaluation) => (
              <div key={ evaluation.email } className="evaluation-user">
                <p className="email-user-evaluation">{evaluation.email}</p>
                {[...Array(STAR_NUMBER)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <FaStar
                      key={ ratingValue }
                      color={ ratingValue <= evaluation.rating ? '#ffc107' : '#e4e5e9' }
                    />
                  );
                })}
                <p>{evaluation.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default EvaluationForm;
