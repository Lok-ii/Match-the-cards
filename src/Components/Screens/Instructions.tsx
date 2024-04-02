import info1 from "../../assets/info1.png";
import info2 from "../../assets/info2.png";
import info3 from "../../assets/info3.png";

interface InstructionsProps {}

const Instructions: React.FC<InstructionsProps> = () => {
  return (
    <div className="w-full h-full absolute top-0 flex items-center justify-center">
      <div className="flex items-center">
        <img src={info1} alt="" />
        <img src={info2} alt="" />
        <img src={info3} alt="" />
      </div>
    </div>
  )
};

export default Instructions;