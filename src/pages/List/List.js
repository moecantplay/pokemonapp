import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import QueryString from "query-string";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";
import { getListPokemon } from "../../api/api";

const List = ({ ownedList }) => {
  const [isLoading, setIsLoading] = useState();
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [listPokemon, setListPokemon] = useState();
  const [ownedPokemon, setOwnedPokemon] = useState();

  const parseURL = (url) => {
    const { offset = "", limit = "" } = QueryString.parse(url);

    return { offset, limit };
  };

  const getQuery = (url) => {
    const anchor = document.createElement("a");
    anchor.href = url;

    return anchor.search;
  };

  const fetchListPokemon = async (obj = {}) => {
    setIsLoading(true);

    const data = await getListPokemon(obj);
    const { next, previous, results } = data;

    setIsLoading(false);
    setNextPage(parseURL(getQuery(next)));
    setPrevPage(parseURL(getQuery(previous)));
    setListPokemon(results);
    setOwnedPokemon(ownedList);
  };

  const matchOwnedData = (name) => {
    const matchData = ownedList.find((item) => item.pokemon === name);

    if (matchData) return matchData.owned;

    return 0;
  };

  useEffect(() => {
    fetchListPokemon();
  }, []);

  return (
    <div className="pokemon__app">
      <div className="container">
        <div className="pokemon__list">
          {listPokemon &&
            listPokemon.length > 0 &&
            listPokemon.map((item) => (
              <div className="pokemon__list-item" key={item.name}>
                <Card
                  link={item.name}
                  name={item.name}
                  owned={() => matchOwnedData(item.name)}
                />
              </div>
            ))}
          {isLoading && <Loading />}
        </div>
        {!isLoading && listPokemon && listPokemon.length > 0 && (
          <Pagination
            prevFunc={() => fetchListPokemon(prevPage)}
            nextFunc={() => fetchListPokemon(nextPage)}
            disablePrev={prevPage.offset === "" && true}
            disableNext={nextPage.offset === "" && true}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ ownedList }) => ({
  ownedList,
});

export default connect(mapStateToProps, null)(List);
