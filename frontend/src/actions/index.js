// import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from 'axios';

//ACTION FOR DECKS
export const FETCH_START = 'FETCH_START';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

//ACTION FOR CARDS
export const FETCH_CARDS = 'FETCH_CARDS';
export const CARDS_SUCCESS = 'CARDS_SUCCESS';
export const CARDS_FAILURE = 'CARDS_FAILURE';

//GETTING DECKS

export const getDecks = id => dispatch => {
  dispatch({ type: FETCH_START });

  axios
    .get('http://localhost:5000/api/demo/I2r2gejFYwCQfqafWlVy')
    .then(response => {
      // dispatch({ type: FETCH_SUCCESS, payload: response.data})
      // console.log(response.data)
      axios.get(`http://localhost:5000/api/deck/${id}`).then(res => {
        let deckArray = response.data.concat(res.data);
        dispatch({ type: FETCH_SUCCESS, payload: deckArray });
      });
    })
    .catch(error => {
      dispatch({ type: FETCH_FAILURE, payload: error });
    });
};

//GETTING CARDS FOR DECKS
export const getCards = deck => dispatch => {
  console.log(deck);

  dispatch({ type: FETCH_CARDS });

  axios
    .get(
      `https://flashcards-be.herokuapp.com/api/demo/I2r2gejFYwCQfqafWlVy/${deck}`
    )
    .then(response => {
      console.log(response.data.data);
      dispatch({ type: CARDS_SUCCESS, payload: response.data.data });
    })
    .catch(error => {
      dispatch({ type: CARDS_FAILURE, payload: error });
    });
};
