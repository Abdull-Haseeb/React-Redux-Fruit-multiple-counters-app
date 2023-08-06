// Counter.js

import React from "react";
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";
import "./Counter.css";

const initialState = {
  counters: Array(17).fill(0),
};

const fruits = [
  "Apple",
  "Banana",
  "Orange",
  "Grapes",
  "Mango",
  "Watermelon",
  "Pineapple",
  "Cherry",
  "Kiwi",
  "Strawberry",
  "Pear",
  "Peach",
  "Plum",
  "Blueberry",
  "Raspberry",
  "Lemon",
  "Apricot",
];

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      const incrementedCounters = state.counters.map((count, index) =>
        index === action.payload ? count + 1 : count
      );
      return { ...state, counters: incrementedCounters };
    case "DECREMENT":
      const decrementedCounters = state.counters.map((count, index) =>
        index === action.payload ? (count > 0 ? count - 1 : 0) : count
      );
      return { ...state, counters: decrementedCounters };
    default:
      return state;
  }
}

const store = createStore(counterReducer);

const Counter = () => {
  const dispatch = useDispatch();
  const counters = useSelector((state) => state.counters);
  const totalSum = counters.reduce((sum, count) => sum + count, 0);

  return (
    <div className="counter-container">
      <h1 className="counter-heading">Fruit Store UI</h1>
      <div className="total-sum">
        <p>Total Fruits: {totalSum}</p>
      </div>
      <div className="counters-wrapper">
        {counters.map((count, index) => (
          <div key={index} className="counter-card">
            <p>
              {fruits[index]}: {count}
            </p>
            <button
              onClick={() => dispatch({ type: "INCREMENT", payload: index })}
              className={`increment-btn Add${fruits[index]}`}
            >
              Add {fruits[index]}
            </button>
            <button
              onClick={() => dispatch({ type: "DECREMENT", payload: index })}
              className={`decrement-btn Remove${fruits[index]}`}
            >
              Remove {fruits[index]}
            </button>
          </div>
        ))}
      </div>
      {/* sum */}
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

export default App;
