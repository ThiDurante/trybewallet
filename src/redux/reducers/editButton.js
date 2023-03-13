const initialState = {
  el: {},
  active: false,
};

// create obj with cases/actions

const editButton = (state = initialState, action) => {
  switch (action.type) {
  case 'editButton' || 'saveEditButton':
    return {
      ...state,
      ...action.payload,
    };
  case 'saveEditButton':
    return {
      ...state,
      active: action.payload.active,
    };
  default:
    return state;
  }
};

export default editButton;
