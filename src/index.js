import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './styles.scss';

const AddFoodForm = ({ addFood }) => {
  //hook on val and setVal with initial empty value.
  const [val, setVal] = useState('');

  //submit value to add a food
  const handleSubmit = e => {
    e.preventDefault();
    //if empty value, return as incomplete.
    if (!val) return;
    //add food as value
    addFood(val);
    //clear form after submit
    setVal('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="addInput"
        value={val}
        onChange={e => setVal(e.target.value)}
      />
      <button>Add Food</button>
    </form>
  );
};

const App = () => {
  //hook on foods and set Food with pre-set list of food as value
  const [foods, setFood] = useState([
    {
      list: 'Milk',
      isChecked: false
    },
    {
      list: 'Apple',
      isChecked: false
    },
    {
      list: 'Bread',
      isChecked: false
    }
  ]);

  //add new food into list
  const addFood = list => {
    const newFood = [...foods, { list }];
    setFood(newFood);
  };

  //toggle completion on food list
  const checkedFood = i => {
    foods[i].isChecked = !foods[i].isChecked;
    setFood(foods);
  };

  //Remove Food from list
  const removeFood = i => {
    foods.splice(i, 1);
    setFood(foods);
  };

  return (
    <div className="app--content">
      <h1>Food List</h1>

      <div className="foodList-wrap">
        {foods.map((food, i) => (
          <label key={i.list} className={food.isChecked ? 'completed' : ''}>
            <div>
              <input type="checkbox" onClick={() => checkedFood(i)} />
              {food.list}
            </div>
            <input type="button" value="✖" onClick={() => removeFood(i)} />
          </label>
        ))}
        <AddFoodForm addFood={addFood} />
      </div>
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
