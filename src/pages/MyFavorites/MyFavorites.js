import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Card from "../../components/Card/Card";
import { removePokemon } from "../../redux/actions";

const MyFavorites = ({ ownedList, releasePokemon }) => {
  const [ownedData, setOwnedData] = useState([]);
  const [modalData, setModalData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateDataList = (data) => {
    setOwnedData(data || ownedList);
  };

  const removePokemon = (data) => {
    releasePokemon({
      nickname: data.nickname,
      name: data.name,
      callback: (data) => updateDataList(data),
    });
  };

  const openModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData({});
  };

  useEffect(() => {
    updateDataList();
  }, []);

  const capitalised = (string) =>
    string.replace(/^\w/, function (chr) {
      return chr.toUpperCase();
    });

  return (
    <div className="pokemon__app">
      <div className="container">
        <div className="pokemon__favorite">
          {ownedData.length > 0 &&
            ownedData.map((item) => (
              <div className="pokemon__category" key={item.pokemon}>
                <div className="pokemon__category-head">
                  <span className="title">{capitalised(item.pokemon)}</span>
                  <span className="count">Owned: {item.owned}</span>
                </div>
                <div className="pokemon__list">
                  {item.list.map((subItem) => (
                    <div className="pokemon__list-item" key={subItem.nickname}>
                      <Card
                        link={subItem.name}
                        nickname={subItem.nickname}
                        removeFunction={() => openModal(subItem)}
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
          onRequestClose={() => closeModal()}
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
                onClick={() => closeModal()}
                className="button button-release"
              >
                Nevermind
              </button>
              <button
                type="button"
                onClick={() => {
                  closeModal();
                  removePokemon(modalData);
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
};

const mapDispatchToProps = {
  releasePokemon: removePokemon,
};

const mapStateToProps = ({ ownedList }) => ({
  ownedList,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyFavorites);
