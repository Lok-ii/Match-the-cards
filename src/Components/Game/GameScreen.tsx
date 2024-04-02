import { useFlip } from "../../Context/Context";
import Card from "../Extra/Card";
import { useEffect } from "react";
import { Rating } from "@smastrom/react-rating";
import reward from "../../assets/reward copy.png";
import bananaMonkey from "../../assets/bananaMonkey.png";
import monkey from "../../assets/monkey.png";
import "@smastrom/react-rating/style.css";
import yayok from "../../assets/yayok.png";
import restart from "../../assets/restart.png";
import { useNavigate } from "react-router-dom";

const GameScreen: React.FC = () => {
  const navigateTo = useNavigate();
  const {
    leftData,
    rightData,
    timer,
    setTimer,
    rating,
    setRating,
    bananaCount,
    leftCard,
    rightCard,
    setLeftCard,
    setRightCard,
    setBananaCount,
    setLeftData,
    setRightData,
    reset,
    matchAudio,
    loseAudio,
    winAudio,
  } = useFlip();

  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(timeInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, [setTimer, timer]);

  useEffect(() => {
    if (leftCard !== "" && rightCard !== "") {
      if (leftCard === rightCard) {
        setTimeout(() => {
          
          matchAudio?.play();
          setBananaCount(bananaCount + 1);
          const newLeftData = leftData.map((item) => {
            return item.name === leftCard ? { ...item, hidden: true } : item;
          });
          setLeftData([...newLeftData]);
          const newRightData = rightData.map((item) => {
            return item.name === leftCard ? { ...item, hidden: true } : item;
          });
          setRightData([...newRightData]);
          setLeftCard("");
          setRightCard("");
        }, 1000);
      } else {
        setTimeout(() => {
          setRating(rating - 1);
          setLeftCard("");
          setRightCard("");
        }, 1000);
      }
    }

    if (rating === 0 || timer === 0) {
      loseAudio?.play();
    }

    if (bananaCount === 6) {
      winAudio?.play();
    }

    if (bananaCount === 6 || rating === 0) {
      setTimer(0);
    }
  }, [leftCard, rating, rightCard, setBananaCount, setRating]);

  const Heart = (
    <path
      d="M433.5,67c-25.3-25.3-59-39.3-94.8-39.3s-69.6,14-94.9,39.4l-7.3,7.3l-7.5-7.5
      c-25.4-25.4-59.1-39.4-95-39.4c-35.8,0-69.4,13.9-94.7,39.3C13.9,92.2,0,125.9,0,161.7s14,69.5,39.4,94.8l182.7,182.7
      c3.8,3.8,9,6,14.5,6c5.4,0,10.6-2.2,14.5-6l182.2-182.4c25.4-25.4,39.3-59.1,39.4-94.9S458.8,92.4,433.5,67z M132.5,117.2
      c-23.9,0-43.4,19.5-43.4,43.4c0,11-8.9,19.9-19.9,19.9s-19.9-8.9-19.9-19.9c0-45.8,37.3-83.1,83.1-83.1c11,0,19.9,8.9,19.9,19.9
      C152.4,108.4,143.5,117.2,132.5,117.2z"
    />
  );

  const customStyles = {
    itemShapes: Heart,
    activeFillColor: "white",
    activeBoxColor: "#EC4899",
    inactiveFillColor: "white",
    inactiveBoxColor: "#FBCFE8",
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center bg-no-repeat bg-center relative`}
    >
      <div className="fixed overflow-y-auto top-[12%] left-0 w-full h-full z-[15] flex flex-col items-center">
        <div className="absolute top-0 right-8 flex items-center gap-3 z-[20]">
          <Rating
            style={{ maxWidth: 180 }}
            value={rating}
            itemStyles={customStyles}
            radius="medium"
            spaceInside="large"
            spaceBetween="small"
            readOnly
          />
        </div>
        <p className="text-[1.5rem] text-pink-500 font-semibold">
          Time: {timer} s
        </p>

        {timer === 0 || rating === 0 || bananaCount === 6 ? (
          <div className="relative top-[-4rem] flex flex-col items-center justify-center">
            <div className="">
              <img className="w-full h-[35rem] z-[-5]" src={reward} alt="" />
              <p
                className={`absolute top-[10rem] ${
                  bananaCount > 1 ? "left-[22%]" : "left-[26%]"
                } text-[3rem] font-bold text-white`}
              >
                {bananaCount} {bananaCount > 1 ? "Banana's" : "Banana"}
              </p>
              <img
                className="w-[13rem] absolute top-[45%] left-[28%]"
                src={bananaCount > 0 ? bananaMonkey : monkey}
                alt=""
              />
              <img
                className="w-[17rem] absolute bottom-4 left-[4.5rem] active:scale-[1.1] transition-all ease-in-out duration-300 pointer-events-auto cursor-pointer"
                src={bananaCount > 1 ? yayok : restart}
                alt=""
                onClick={() =>
                  bananaCount === 0 ? reset() : navigateTo("/instructions")
                }
              />
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center justify-around">
            <div className="flex flex-wrap justify-center items-center w-[50%]">
              {leftData.map((item, idx) => (
                <Card key={idx + "pinkCard"} item={item} />
              ))}
            </div>
            <div className="flex flex-wrap justify-center items-center w-[50%]">
              {rightData.map((item, idx) => (
                <Card key={idx + "blueCard"} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        className={`z-[30] fixed bottom-0 transition-all duration-[1s] ease-in-out ${
          leftCard !== "" && leftCard === rightCard
            ? "right-[-15%] rotate-[-60deg]"
            : "right-[-30%]"
        } flex flex-col items-center`}
      >
        <p id="match" className="text-[2rem] font-bold text-pink-600">
          It&apos;s a match
        </p>
        <img className="w-[30%]" src={monkey} alt="" />
      </div>
    </div>
  );
};

export default GameScreen;
