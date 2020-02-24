const INIT_STATE = [];

export default (state = INIT_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case "REMOVE_POKEMON":
    case "OWNED_LIST": {
      return payload;
    }

    default:
      return state;
  }
};
