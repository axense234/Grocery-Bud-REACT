// React
import { useRef, useReducer, useEffect } from "react";
// React Icons
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
// Reducer
import reducerFunction from "./reducerFunction";
// Data
import defaultState from "./data";
// Components
import Popup from "./Popup";

const GroceryBud = () => {
  const inputRef = useRef(null);

  const [state, dispatch] = useReducer(reducerFunction, defaultState);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: "POPUP" });
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [state.showPopUp]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT", payload: e.target.value });
  };

  const handleClearAll = (e) => {
    e.preventDefault();
    dispatch({ type: "CLEAR" });
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    inputRef.current.focus();
    dispatch({ type: "EDIT", payload: id });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch({ type: "DELETE", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "RELOAD" });
  }, [state.reRenderList]);

  return (
    <section className='grocery-bud-container'>
      {state.showPopUp.popUp && <Popup state={state} />}
      <h1>Grocery Bud</h1>
      <form
        className='grocery-bud-container__form'
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type='text'
          name='enterInput'
          id='enterInput'
          placeholder='e.g. eggs'
          value={state.textValue}
          onChange={(e) => dispatch({ type: "TEXT", payload: e })}
          autoComplete='off'
          ref={inputRef}
        />
        <button type='submit' onClick={(e) => handleSubmit(e)}>
          {state.editMode ? "Edit" : "Submit"}
        </button>
      </form>
      <div className='grocery-bud-container__groceries'>
        {state.itemList.map((item) => {
          const { id, name } = item;
          return (
            <div className='grocery-bud-container__grocery' key={id}>
              <p>{name}</p>
              <div className='grocery-bud-container__buttons'>
                <button
                  type='button'
                  id='edit'
                  onClick={(e) => handleEdit(e, id)}
                >
                  <AiFillEdit />
                </button>
                <button
                  type='button'
                  id='trash'
                  onClick={(e) => handleDelete(e, id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {state.itemList.length >= 1 && (
        <button type='button' onClick={(e) => handleClearAll(e)}>
          Clear All
        </button>
      )}
    </section>
  );
};

export default GroceryBud;
