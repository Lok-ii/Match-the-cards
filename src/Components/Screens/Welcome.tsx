import monkey_happy from "../../assets/monkey_happy.png";
import message from "../../assets/message.png";

interface WelcomeProps {}

const Welcome: React.FC<WelcomeProps> = () => {
  return (
    <div className="absolute bottom-8 left-[40%]">
      <div className="relative">
        <img className="w-[60%]" src={monkey_happy} alt="" />
        <div className="absolute top-[-40%] left-[30%]">
          <div className="relative">
            <img className="w-[85%]" src={message} alt="" />
            <p className="absolute top-[30%] left-[11%] text-4xl font-extrabold text-textPrimary">Welcome, Kiddo!</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Welcome;