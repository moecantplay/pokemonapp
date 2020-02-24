import types from "./types";

export const addPokemon = payload => {
  return (dispatch, getState) => {
    const { ownedList } = getState();

    const newState = [...ownedList];
    const findExisting = newState.find(item => item.pokemon === payload.name);

    if (findExisting) {
      findExisting.owned *= 1;
      findExisting.owned += 1;
      findExisting.list.push(payload);
      dispatch({ type: types.OWNED_LIST, payload: newState });
    } else {
      newState.push({
        pokemon: payload.name,
        owned: payload.owned,
        list: [{ ...payload }]
      });
      dispatch({ type: types.OWNED_LIST, payload: newState });
    }
  };
};

export const removePokemon = payload => {
  return (dispatch, getState) => {
    const { ownedList } = getState();

    const newState = [...ownedList];
    const findPokemon = newState.find(item => item.pokemon === payload.name);

    if (findPokemon.owned > 1) {
      const getIndex = findPokemon.list.findIndex(
        item => item.nickname === payload.nickname
      );
      findPokemon.owned -= 1;
      findPokemon.list.splice(getIndex, 1);
      payload.callback(newState);
      dispatch({ type: types.REMOVE_POKEMON, payload: newState });
    } else {
      const getIndex = newState.findIndex(item => item.pokemon === payload.name);
      newState.splice(getIndex, 1)
      payload.callback(newState);
      dispatch({ type: types.REMOVE_POKEMON, payload: newState });
    }
  };
};
