import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Modal from "react-modal";
import Loading from "../../components/Loading/Loading";
import { addPokemon } from "../../redux/actions";
import { getPokemonDetail } from "../../api/api";
import "./Detail.scss";

Modal.setAppElement("#root");

const Detail = ({ ownedList, updateList }) => {
  const { name } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pokemonData, setPokemonData] = useState({});
  const [ownedCount, setOwnedCount] = useState("");
  const [nicknameValue, setNicknameValue] = useState("");

  const getOwnedCount = (name) => {
    const findPokemon = ownedList.find((item) => item.pokemon === name);

    if (findPokemon) {
      setOwnedCount(findPokemon.owned);
    } else {
      setOwnedCount("0");
    }
  };

  const fetchPokemonDetail = async (name) => {
    setIsLoading(true);

    const data = await getPokemonDetail(name);

    if (data) getOwnedCount(data.name);

    setIsLoading(false);
    setPokemonData(data);
  };

  const handleCatchPokemon = (name) => {
    setDisableButton(true);

    if (Math.random() >= 0.5) {
      toast(`You caught ${name}!`);
      setNicknameValue(name);
      setIsModalOpen(true);
    } else {
      toast(`You failed to catch ${name}.`);
    }

    setTimeout(() => {
      setDisableButton(false);
    }, 1500);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const savePokemon = () => {
    const success = () => {
      toast(`You kept ${nicknameValue}!`);
      updateList({
        nickname: nicknameValue,
        name: pokemonData.name,
        owned: 1,
      });

      closeModal();
      setOwnedCount(numberCount);
      setNicknameValue("");
    };

    const failed = () => {
      toast(`Give your pokemon a different nickname!`);
    };

    const checkAvailability = (arr) => {
      const check = arr.find((item) => item.nickname === nicknameValue);

      if (check) failed();
      if (!check) success();
    };

    const numberCount = ownedCount * 1 + 1;

    const tempArr = [...ownedList];
    const type = tempArr.find((item) => item.pokemon === pokemonData.name);

    if (nicknameValue && nicknameValue.length > 0) {
      if (type && Object.keys(type).length > 0) {
        checkAvailability(type.list);
      } else {
        success();
      }
    } else {
      toast(`You must give your pokemon a nickname!`);
    }
  };

  useEffect(() => {
    fetchPokemonDetail(name);
  }, []);

  const pokemonImg = pokemonData.sprites && pokemonData.sprites.front_default;
  const pokemonType = pokemonData.types;
  const pokemonAbilities = pokemonData.abilities;
  const pokemonStats = pokemonData.stats;

  const capitalised = (string) =>
    string.replace(/^\w/, function (chr) {
      return chr.toUpperCase();
    });

  return (
    <div className="pokemon__app">
      <div className="container">
        <div className="pokemon__detail">
          {pokemonData && Object.keys(pokemonData).length > 0 && (
            <>
              <div className="pd__head">
                <div className="image-wrap">
                  {pokemonImg ? (
                    <img src={pokemonImg} alt={pokemonData.name} />
                  ) : (
                    <img src="../loading.gif" alt="loading..." />
                  )}
                </div>
                <div className="pd__head-info">
                  <div className="head__child">
                    <span className="title">Name:</span>
                    <span className="value">
                      {pokemonData.name && capitalised(pokemonData.name)}
                    </span>
                  </div>
                  <div className="head__child">
                    <span className="title">Owned:</span>
                    <span className="value">{ownedCount}</span>
                  </div>
                  <button
                    type="button"
                    className="button button-catch"
                    onClick={() => {
                      toast.dismiss();
                      handleCatchPokemon(capitalised(pokemonData.name));
                    }}
                    disabled={disableButton}
                  >
                    Catch Pokemon!
                  </button>
                </div>
              </div>

              <div className="pd__info">
                <div className="pd__info-child">
                  <span className="title">Types</span>
                  {pokemonType &&
                    pokemonType.length > 0 &&
                    pokemonType.map((item) => (
                      <span className="value" key={item.slot}>
                        {item.type && capitalised(item.type.name)}
                      </span>
                    ))}
                </div>
                <div className="pd__info-child">
                  <span className="title">Abilities</span>
                  {pokemonAbilities &&
                    pokemonAbilities.length > 0 &&
                    pokemonAbilities.map((item) => (
                      <span className="value" key={item.slot}>
                        {item.ability && capitalised(item.ability.name)}
                      </span>
                    ))}
                </div>
                <div className="pd__info-child">
                  <span className="title">Stats</span>
                  {pokemonStats &&
                    pokemonStats.length > 0 &&
                    pokemonStats.map((item) => (
                      <div
                        className="child-item"
                        key={item.stat && item.stat.name}
                      >
                        <span className="label">
                          {item.stat && capitalised(item.stat.name)}
                        </span>
                        <span className="value">{item.base_stat}</span>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
          {isLoading && <Loading />}
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => closeModal()}
          closeTimeoutMS={200}
          className="pokemon__modal pokemon__modal-catch"
        >
          <div className="container">
            <span className="pm__title">You Caught {pokemonData.name}!</span>
            <div className="pm__img">
              <div className="image-wrap">
                {pokemonImg && <img src={pokemonImg} alt={pokemonData.name} />}
              </div>
            </div>
            <div className="pm__body">
              <div className="pm__child">
                <span className="label">Give it a nickname:</span>
                <input
                  type="text"
                  value={nicknameValue}
                  autoFocus
                  onChange={(e) => setNicknameValue(e.target.value)}
                />
              </div>
              <div className="pm__child">
                <span className="label">You currently own:</span>
                <span className="value">{ownedCount}</span>
              </div>
            </div>
            <div className="pm__foot">
              <button
                type="button"
                onClick={() => closeModal()}
                className="button button-release"
              >
                Release {pokemonData.name}
              </button>
              <button
                type="button"
                onClick={() => savePokemon()}
                className="button button-catch"
              >
                Keep {pokemonData.name}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  updateList: addPokemon,
};

const mapStateToProps = ({ ownedList }) => ({
  ownedList,
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
