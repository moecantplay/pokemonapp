import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../components/Card/Card";
import { removePokemon } from "../../redux/actions";

class MyFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ownedData: []
    };
  }

  componentDidMount() {
    this.updateDataList();
  }

  updateDataList = data => {
    const { ownedList } = this.props;
    
    this.setState({ ownedData: data || ownedList });
  }

  matchOwnedData = name => {
    const { ownedList } = this.props;

    const matchData = ownedList.find(item => item.pokemon === name);

    if (matchData) return matchData.owned;

    return 0;
  };

  removePokemon = data => {
    const { releasePokemon } = this.props;

    releasePokemon({
      nickname: data.nickname,
      name: data.name,
      callback: data => this.updateDataList(data)
    });
  };

  render() {
    const { ownedData } = this.state;

    return (
      <div className="pokemon__app">
        <div className="container">
          <div className="pokemon__list">
            {ownedData.length > 0 &&
              ownedData.map(item =>
                item.list.map(subItem => (
                  <div className="pokemon__list-item" key={subItem.nickname}>
                    <Card
                      key={subItem.nickname}
                      name={subItem.name}
                      nickname={subItem.nickname}
                      owned={() => this.matchOwnedData(subItem.name)}
                      removeFunction={() => this.removePokemon(subItem)}
                    />
                  </div>
                ))
              )}
            {ownedData.length <= 0 && (
              <div className="pokemon__list-empty">
                <span className="title">You do not own any Pokemon</span>
                <Link to="/" className="button-redirect">
                  Catch a Pokemon!
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  releasePokemon: removePokemon
};

const mapStateToProps = ({ ownedList }) => ({
  ownedList
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFavorites);
