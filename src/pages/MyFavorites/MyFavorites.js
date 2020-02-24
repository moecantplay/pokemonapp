import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Card from "../../components/Card/Card";
import { removePokemon } from "../../redux/actions";

class MyFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ownedData: [],
      modalData: {},
      isModalOpen: false
    };
  }

  componentDidMount() {
    this.updateDataList();
  }

  updateDataList = data => {
    const { ownedList } = this.props;

    this.setState({ ownedData: data || ownedList });
  };

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

  openModal = data => {
    this.setState({ modalData: data, isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalData: {}, isModalOpen: false });
  };

  render() {
    const { ownedData, modalData, isModalOpen } = this.state;

    const capitalised = string =>
      string.replace(/^\w/, function(chr) {
        return chr.toUpperCase();
      });

    return (
      <div className="pokemon__app">
        <div className="container">
          <div className="pokemon__favorite">
            {ownedData.length > 0 &&
              ownedData.map(item => (
                <div className="pokemon__category" key={item.pokemon}>
                  <div className="pokemon__category-head">
                    <span className="title">{capitalised(item.pokemon)}</span>
                    <span className="count">Owned: {item.owned}</span>
                  </div>
                  <div className="pokemon__list">
                    {item.list.map(subItem => (
                      <div
                        className="pokemon__list-item"
                        key={subItem.nickname}
                      >
                        <Card
                          link={subItem.name}
                          nickname={subItem.nickname}
                          removeFunction={() => this.openModal(subItem)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            {ownedData.length <= 0 && (
              <div className="pokemon__list-empty">
                <span className="title">You do not own any Pokemon</span>
                <Link to="/" className="button-redirect">
                  Catch a Pokemon!
                </Link>
              </div>
            )}
          </div>

          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => this.closeModal()}
            closeTimeoutMS={200}
            className="pokemon__modal pokemon__modal-confirm"
          >
            <div className="container">
              <span className="pm__title">
                Are you sure you want to{" "}
                <span className="emphasize">release</span>{" "}
                <i>{modalData.nickname}</i>?
              </span>
              <div className="pm__foot">
                <button
                  type="button"
                  onClick={() => this.closeModal()}
                  className="button button-release"
                >
                  Nevermind
                </button>
                <button
                  type="button"
                  onClick={() => {
                    this.closeModal();
                    this.removePokemon(modalData);
                  }}
                  className="button button-catch"
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal>
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
