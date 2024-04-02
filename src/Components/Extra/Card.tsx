import React, { useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import pink_card from "../../assets/pink_card.png";
import blue_card from "../../assets/blue_card.png";
import blue_back from "../../assets/Background-overlay.png";
import pink_back from "../../assets/Backgroundred-overlay.png";
import { useFlip } from "../../Context/Context";
import PropTypes from "prop-types";

interface Props {
  item: {
    name: string;
    img: string;
    side: string;
    hidden: boolean;
  };
}

const Card: React.FC<Props> = ({ item }) => {
  const { leftCard, setLeftCard, rightCard, setRightCard, flipAudio } =
    useFlip();
  const [flipped, setFlipped] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [rightDisabled, setRightDisabled] = useState(true);

  useEffect(() => {
    if (leftCard !== "" && rightCard !== "") {
      if (leftCard !== rightCard) {
        setTimeout(() => {
          setFlipped(false);
        }, 1000);
      }
    }

    if (leftCard !== "") {
      setDisabled(true);
    }

    if (rightCard !== "" && leftCard === "") {
      setRightDisabled(true);
    }

    if (rightCard === "" && leftCard === "") {
      setRightDisabled(true);
      setDisabled(false);
    }

    if (rightCard === "" && leftCard !== "") {
      setRightDisabled(false);
    }
  }, [leftCard, rightCard, setLeftCard, setRightCard]);

  return (
    <ReactCardFlip
      isFlipped={flipped}
      flipDirection="horizontal"
      containerClassName={`${
        item.hidden ? "invisible" : "visible"
      } transition-all duration-300 ease-in-out pointer-events-auto`}
    >
      <button
        className={`front ${
          item.hidden ? "invisible" : "visible"
        } w-[13rem] h-[17rem] pointer-events-auto`}
        disabled={item.side === "left" ? disabled : rightDisabled}
        onClick={() => {
          setFlipped(true);
          flipAudio?.play();
          if (item.side === "left") {
            setLeftCard(item.name);
          } else {
            setRightCard(item.name);
          }
        }}
      >
        <img
          src={item.side === "left" ? pink_card : blue_card}
          alt={item.name}
        />
      </button>
      <button
        className={`back relative w-[13rem] h-[17rem] flex items-center justify-center pointer-events-auto ${
          item.side === "right" && "bg-[#ADE6F4]"
        } ${item.hidden ? "invisible" : "visible"}`}
      >
        <img
          className="absolute w-full h-full"
          src={item.side === "left" ? pink_back : blue_back}
          alt=""
        />
        <img
          className={`w-[5rem] h-[5rem] object-contain z-[10] ${
            item.side === "left" && "mix-blend-multiply"
          }`}
          src={item.img}
          alt={item.name}
        />
      </button>
    </ReactCardFlip>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    side: PropTypes.oneOf(["left", "right"]).isRequired,
    hidden: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Card;
