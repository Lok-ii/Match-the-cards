import React from "react";
import monkey_happy from "../../assets/monkey_happy.png";
import message from "../../assets/message.png";
import banana from "../../assets/banana.png";

const Hello: React.FC = () => {
  return (
    <div className="absolute bottom-8 left-[40%]">
      <div className="relative">
        <img className="w-[60%]" src={monkey_happy} alt="" />
        <div className="absolute top-[-40%] left-[30%]">
          <div className="relative">
            <img className="w-[85%]" src={message} alt="" />
            <p className="absolute top-[20%] left-[11%] text-3xl font-extrabold text-textPrimary">
              Hi, I am Mizo!<br /> and I love bananas{" "}
            </p>
            <img className="w-[2rem] absolute bottom-[5.5rem] right-28" src={banana} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hello;