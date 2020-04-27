
import { createStore, combineReducers } from "redux";
import * as reducers from "./reducers";
import { loadState, storeState } from "./localStore";
import throttle from "lodash/throttle";

const rootReducer = combineReducers(reducers);

function subscribeStore(store) {
  store.subscribe(throttle(() => storeState(store.getState()), 1000));
}

export function myCreateStore() {
  const initStore = loadState();
  const store = createStore(rootReducer, initStore);
  subscribeStore(store);
  return store;
}


