import {
  GET_DATA_FOR_OVEVIEW,
  GET_DATA_FOR_TRANSACTIONS,
  GET_DATA_FOR_SHEDULER,
} from "./actions";

const initialState = {
  data_overview: [],
  data_transactions: [],
  data_sheduler: [],
};
function funcReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_FOR_OVEVIEW[0]:
      return {
        
        data_overview: action.data,
      };
    case GET_DATA_FOR_TRANSACTIONS[0]:
      return {
        
        data_transactions: action.data,
      };
    case GET_DATA_FOR_SHEDULER[0]:
      return {
        
        data_sheduler: action.data,
      };
    default:
      return state;
  }
}

export default funcReducer;