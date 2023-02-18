const reducerFunction = (state, action) => {
  switch (action.type) {
    // Submit Case
    case "SUBMIT":
      if (!state.editMode) {
        if (state.textValue) {
          const id = JSON.parse(localStorage.getItem("Current ID"));
          state.itemList = [
            ...state.itemList,
            { id: id + 1, name: state.textValue },
          ];
          localStorage.setItem(
            `Item ${id + 1}`,
            JSON.stringify({ id: id + 1, itemName: state.textValue })
          );
          state.textValue = "";
          localStorage.setItem("Current ID", id + 1);

          state.showPopUp = {
            popUp: "Added item.",
            show: true,
            color: "green",
          };

          return {
            ...state,
          };
        }
        state.showPopUp = {
          popUp: "Please enter value.",
          show: true,
          color: "red",
        };
        return {
          ...state,
        };
      }
      localStorage.setItem(
        `Item ${state.editedId}`,
        JSON.stringify({
          id: state.editedId,
          itemName: state.textValue,
        })
      );
      state.showPopUp = {
        show: true,
        popUp: `Updated to ${state.textValue}!`,
        color: "green",
      };
      state.editMode = false;
      state.reRenderList = !state.reRenderList;
      state.textValue = "";
      return {
        ...state,
      };
    case "EDIT":
      state.textValue = state.itemList.find(
        (item) => item.id === action.payload
      ).name;
      state.editMode = true;
      state.editedId = action.payload;
      return {
        ...state,
      };
    case "DELETE":
      const deletedItemName = state.itemList.find(
        (item) => item.id === action.payload
      ).name;

      localStorage.removeItem(`Item ${action.payload}`);
      state.itemList = state.itemList.filter((item) => {
        return item.id !== action.payload;
      });
      const currentId2 = JSON.parse(localStorage.getItem("Current ID"));
      let maxId = 0;
      for (let i = 1; i <= currentId2; i++) {
        if (JSON.parse(localStorage.getItem(`Item ${i}`))) {
          const { id } = JSON.parse(localStorage.getItem(`Item ${i}`));
          maxId = Math.max(maxId, id);
        }
      }
      localStorage.setItem("Current ID", maxId);

      state.showPopUp = {
        popUp: `Deleted ${deletedItemName}!`,
        show: true,
        color: "red",
      };
      return {
        ...state,
      };
    case "CLEAR":
      state.itemList = [];
      localStorage.clear();
      localStorage.setItem("Current ID", 0);
      state.showPopUp = { show: true, popUp: "Empty", color: "grey" };
      return {
        ...state,
      };
    case "RELOAD":
      const listEffect = [];
      const currentId = JSON.parse(localStorage.getItem("Current ID"));
      for (let i = 1; i <= currentId; i++) {
        if (JSON.parse(localStorage.getItem(`Item ${i}`))) {
          const { id, itemName } = JSON.parse(
            localStorage.getItem(`Item ${i}`)
          );
          listEffect.push({ id, name: itemName });
        }
      }
      state.itemList = listEffect;
      return {
        ...state,
      };
    case "TEXT":
      state.textValue = action.payload.target.value;
      return {
        ...state,
      };
    case "POPUP":
      state.showPopUp = { popUp: "", show: false, color: "red" };
      return {
        ...state,
      };
    default:
      throw new Error("Invalid or Missing Action Type!");
  }
};

export default reducerFunction;
