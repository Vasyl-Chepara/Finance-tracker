import { action_for_get_data } from "./actions";
import { store } from "./index";

const fetch_data_from_api = function(action_type,val) {
  var url = [action_type[1],val].join('/')
  fetch(url).then((response) =>
    response.json().then((res) => {
      store.dispatch(action_for_get_data(action_type[0], res));
    })
  );
}

export default fetch_data_from_api;
