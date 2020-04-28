import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import reduxThunk from "redux-thunk";
import * as persisters from "./persisters";
// import { loadState, storeState } from "./localStore";
import { loadState, storeState } from "./electronStore";
import { session } from "./electronSession";
import { onSessionLoad } from "./login/store";
import throttle from "lodash/throttle";

import * as reducers from "./reducers";
const rootReducer = combineReducers(reducers);

function subscribeStore(store) {
  store.subscribe(
        throttle(() => {
          const st = { ...store.getState() };
          // session.storeSession("auth", JSON.stringify(st.auth));
          Object.keys(persisters).forEach(f => {
            const newSt = persisters[f](st[f]);
            st[f] = newSt;
            return st;
          });
          storeState(st);
        }, 1000)
    );
}

const loggerMiddleware = createLogger();

export function myCreateStore() {
  const initStore = loadState();
  const store = createStore(
        rootReducer,
        initStore,
        applyMiddleware(
            reduxThunk, // lets us dispatch() functions
            loggerMiddleware // neat middleware that logs actions
        )
    );
  subscribeStore(store);
  return store;
}

export const store = myCreateStore();

const subscriptions = {};

export function subscribe(key, fn) {
  if (subscriptions[key]) {
    subscriptions[key].unsub();
  }
  subscriptions[key] = { unsub: store.subscribe(fn) };
}

// onSessionLoad(store).then(() => {console.log("auth session loaded"); });

// each module should register for listening in any config changes
// this way to the store.  It provides data locality with the module.
// by having a key, makes sure that the subscription is done only once
/*
import * as listeners from "./listeners";
console.log(listeners);

import map from "lodash/map";
map(listeners, fn => {
  const k = fn();
  k.listen(store.getState()); // initial state
  subscribe(k.key, k.listen);
});
*/
