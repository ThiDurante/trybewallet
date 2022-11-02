const initialState = {
  el: {},
  active: false,
};

const editButton = (state = initialState, action) => {
  switch (action.type) {
  case 'editButton':
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default editButton;
