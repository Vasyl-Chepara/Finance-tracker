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
        ...state,
        data_overview: action.data,
      };
    case GET_DATA_FOR_TRANSACTIONS[0]:
      return {
        ...state,
        data_transactions: action.data,
      };
    case GET_DATA_FOR_SHEDULER[0]:
      return {
        ...state,
        data_sheduler: action.data,
      };
    default:
      return state;
  }
}

export default funcReducer;
// export const get_data_overview = state => state.data_overview;
// export const get_data_transactions = state => state.data_transactions;
// export const get_data_sheduler = state => state.data_sheduler;
