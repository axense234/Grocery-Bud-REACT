const Popup = ({ state }) => {
  return (
    <p
      id='pop-up'
      style={{
        backgroundColor: state.showPopUp.color,
        boxShadow: `1px 1px 9px 2px ${state.showPopUp.color}`,
      }}
    >
      {state.showPopUp.popUp}
    </p>
  );
};

export default Popup;
