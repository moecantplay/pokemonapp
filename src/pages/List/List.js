import React from "react";
import { connect } from "react-redux";
import QueryString from "query-string";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";
import { getListPokemon } from "../../api/api";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      nextPage: {},
      prevPage: {},
      listPokemon: [],
      ownedPokemon: []
    };
  }

  componentDidMount() {
    this.fetchListPokemon();
  }

  parseURL = url => {
    const { offset = "", limit = "" } = QueryString.parse(url);

    return { offset, limit };
  };

  getQuery = url => {
    const anchor = document.createElement("a");
    anchor.href = url;

    return anchor.search;
  };

  fetchListPokemon = async (obj = {}) => {
    const { ownedList } = this.props;

    this.setState({ isLoading: true });

    const data = await getListPokemon(obj);
    const { next, previous, results } = data;

    this.setState({
      isLoading: false,
      nextPage: this.parseURL(this.getQuery(next)),
      prevPage: this.parseURL(this.getQuery(previous)),
      listPokemon: results,
      ownedPokemon: ownedList
    });
  };

  matchOwnedData = name => {
    const { ownedList } = this.props;

    const matchData = ownedList.find(item => item.pokemon === name);

    if (matchData) return matchData.owned;

    return 0;
  };

  render() {
    const { isLoading, listPokemon, prevPage, nextPage } = this.state;

    return (
      <div className="pokemon__app">
        <div className="container">
          <div className="pokemon__list">
            {listPokemon &&
              listPokemon.length > 0 &&
              listPokemon.map(item => (
                <div className="pokemon__list-item" key={item.name}>
                  <Card
                    link={item.name}
                    name={item.name}
                    owned={() => this.matchOwnedData(item.name)}
                  />
                </div>
              ))}
            {isLoading && <Loading />}
          </div>
          {!isLoading && listPokemon.length > 0 && (
            <Pagination
              prevFunc={() => this.fetchListPokemon(prevPage)}
              nextFunc={() => this.fetchListPokemon(nextPage)}
              disablePrev={prevPage.offset === "" && true}
              disableNext={nextPage.offset === "" && true}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ownedList }) => ({
  ownedList
});

export default connect(mapStateToProps, null)(List);
