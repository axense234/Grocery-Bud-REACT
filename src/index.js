import React, { useEffect, useReducer, useRef, useState } from "react";
import ReactDOM from "react-dom";
// CSS
import "./style.css";
// React Icons
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

const MainApp = () => {
  const [showPopUp, setShowPopUp] = useState({ popUp: "", show: false });
  const inputRef = useRef(null);
  const defaultState = {
    itemList: [],
    textValue: "",
    showClearAll: false,
    idNeed: 0,
    editMode: false,
    editedId: 1,
    reRenderList: false,
  };

  // REDUCER FUNCTION(CANNOT MOVE IT SOMEWHERE ELSE)
  const reducer = (state, action) => {
    // Initializing new state properties
    let newIdNeed = state.idNeed;
    let newEditedId = state.editedId;
    let newItemList = state.itemList;
    let newClear = state.showClearAll;
    let newTextValue = state.textValue;
    let newEditMode = state.editMode;
    let newReRender = state.reRenderList;

    switch (action.type) {
      // Submit Case
      case "SUBMIT":
        if (!state.editMode) {
          if (state.textValue) {
            let id = JSON.parse(localStorage.getItem("Current ID"));
            console.log(id);
            newItemList = [...newItemList, { id: id + 1, name: newTextValue }];
            newClear = true;
            localStorage.setItem(
              `Item ${id + 1}`,
              JSON.stringify({ id: id + 1, itemName: newTextValue })
            );
            newTextValue = "";
            localStorage.setItem("Current ID", id + 1);
            return {
              ...state,
              itemList: newItemList,
              showClearAll: newClear,
              textValue: newTextValue,
            };
          } else {
            setShowPopUp({ popUp: "Please Enter Value", show: true });
            setTimeout(() => {
              setShowPopUp({ ...showPopUp, show: false });
            }, 2700);
            return {
              ...state,
            };
          }
        } else {
          localStorage.setItem(
            `Item ${newEditedId}`,
            JSON.stringify({
              id: newEditedId,
              itemName: newTextValue,
            })
          );
          setShowPopUp({ show: true, popUp: "Value Changed" });
          setTimeout(() => {
            setShowPopUp({ ...showPopUp, show: false });
          }, 2700);
          newEditMode = false;
          newReRender = !newReRender;
          newTextValue = "";
          return {
            ...state,
            editMode: newEditMode,
            reRenderList: newReRender,
            textValue: newTextValue,
            editedId: newEditedId,
          };
        }
      case "EDIT":
        inputRef.current.focus();
        console.log(action.payload);
        newTextValue = newItemList[action.payload - 1].name;
        console.log(newItemList);
        newEditMode = true;
        newEditedId = action.payload;
        return {
          ...state,
          textValue: newTextValue,
          editMode: newEditMode,
          editedId: newEditedId,
        };
      case "DELETE":
        localStorage.removeItem(`Item ${action.payload}`);
        let list = newItemList.filter((item) => {
          return item.id !== action.payload;
        });
        newItemList = list;
        if (newItemList.length === 1) {
          newClear = false;
        }
        let currentId2 = JSON.parse(localStorage.getItem("Current ID"));
        let maxId = 0;
        for (let i = 1; i <= currentId2; i++) {
          if (JSON.parse(localStorage.getItem(`Item ${i}`))) {
            let item = JSON.parse(localStorage.getItem(`Item ${i}`));
            const { id } = item;
            maxId = Math.max(maxId, id);
          }
        }
        localStorage.setItem("Current ID", maxId);
        return {
          ...state,
          itemList: newItemList,
          showClearAll: newClear,
        };
      case "CLEAR":
        newItemList = [];
        localStorage.clear();
        localStorage.setItem("Current ID", 0);
        newClear = false;
        setShowPopUp({ shop: true, popUp: "Empty" });
        setTimeout(() => {
          setShowPopUp({ ...showPopUp, show: false });
        }, 2700);
        return {
          ...state,
          itemList: newItemList,
          idNeed: newIdNeed,
          showClearAll: newClear,
        };
      case "RELOAD":
        let listEffect = [];
        let currentId = JSON.parse(localStorage.getItem("Current ID"));
        for (let i = 1; i <= currentId; i++) {
          if (JSON.parse(localStorage.getItem(`Item ${i}`))) {
            let item = JSON.parse(localStorage.getItem(`Item ${i}`));
            const { id, itemName } = item;
            listEffect.push({ id, name: itemName });
          }
        }
        if (listEffect.length !== 0) {
          newClear = true;
        }
        newItemList = listEffect;
        return {
          ...state,
          idNeed: newIdNeed,
          showClearAll: newClear,
          itemList: newItemList,
        };

      case "TEXT":
        newTextValue = action.payload.target.value;
        return {
          ...state,
          textValue: newTextValue,
        };
      default:
        throw new Error("Invalid or Missing Action Type!");
    }
  };
  // END OF REDUCER FUNCTION

  const [state, dispatch] = useReducer(reducer, defaultState);

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
    dispatch({ type: "EDIT", payload: id });
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch({ type: "DELETE", payload: id });
  };

  //Getting the items from the local storage
  useEffect(() => {
    dispatch({ type: "RELOAD" });
  }, [state.reRenderList]);


  return (
    <>
      <section className='app-section'>
        {state.showPopUp ? <p id='pop-up'>{state.popUp}</p> : null}
        <h1>Grocery Bud</h1>
        <form id='input-container' onSubmit={(e) => handleSubmit(e)}>
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
        <div>
          {state.itemList.map((item) => {
            const { id, name } = item;
            return (
              <div id='item-container' key={Math.random() * 1000}>
                <p>{name}</p>
                <div>
                  {/* Edit Icon */}
                  <button id='edit' onClick={(e) => handleEdit(e, id)}>
                    <AiFillEdit></AiFillEdit>
                  </button>
                  {/* Trash Icon */}
                  <button id='trash' onClick={(e) => handleDelete(e, id)}>
                    <FaTrash></FaTrash>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {state.showClearAll ? (
          <button id='clear-all' onClick={(e) => handleClearAll(e)}>
            Clear All
          </button>
        ) : null}
      </section>
    </>
  );
};

ReactDOM.render(<MainApp></MainApp>, document.getElementById("root"));
