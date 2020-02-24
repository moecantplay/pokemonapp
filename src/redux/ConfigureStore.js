import { createStore, applyMiddleware, compose } from 'redux';
// import { createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from "redux-thunk";
import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage'

const enhancers = [];

if (process.env.NODE_ENV === "development") {
  const { devToolsExtension } = window;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(thunk) , ...enhancers);
// const composedEnhancers = compose(...enhancers);

const whitelist = [
  "ownedList"
];

const persistConfig = {
  key: "Pokemon",
  whitelist,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  const store = createStore(persistedReducer, composedEnhancers);
  const persistor = persistStore(store);

  return { store, persistor };
};