import QueryString from "query-string";

const baseUrl = process.env.REACT_APP_BASE_URL;

export function getListPokemon(objParams = {}) {
  const stringParams = QueryString.stringify(objParams);

  return fetch(`${baseUrl}/pokemon?${stringParams}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
}

export function getPokemonDetail(name) {
  return fetch(`${baseUrl}/pokemon/${name}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
}
