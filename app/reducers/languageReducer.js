import {SET_LANGUAGE} from '../constants';

const initialState = {
  selectedLanguage: 'en',
};

const langaugeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        selectedLanguage: action.payload,
      };
    default:
      return state;
  }
};

export default langaugeReducer;
