import React from "react";
import { Link } from "react-router-dom";
import "./Card.scss";

const Card = ({ name, nickname, owned, removeFunction }) => {
  const capitalised = string =>
    string.replace(/^\w/, function(chr) {
      return chr.toUpperCase();
    });

  return (
    <div className="pokemon__card">
      <Link to={`/detail/${name}`} className="pc__link" />
      {nickname && (
        <div className="pc__item">
          <span className="label">Nickname:</span>
          <span className="value">{capitalised(nickname)}</span>
        </div>
      )}
      {name && (
        <div className="pc__item">
          <span className="label">Pokemon:</span>
          <span className="value">{capitalised(name)}</span>
        </div>
      )}
      {owned && (
        <div className="pc__item">
          <span className="label">Owned:</span>
          <span className="value">{owned()}</span>
        </div>
      )}
      {removeFunction && (
        <div className="pc__action">
          <button
            type="button"
            className="button button-release"
            onClick={() => removeFunction()}
          >
            Release
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
