import { useEffect, useMemo } from "react";
import Background from "../../assets/Background.png";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import bananaEmpty from "../../assets/bananaGray.png";
import banana from "../../assets/banana.png";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useFlip } from "../../Context/Context";
import start from "../../assets/start.png";
import play from "../../assets/play.png";
import next from "../../assets/next.png";
import yes from "../../assets/yes.png";
import back from "../../assets/back.png";

const Home = () => {
  const location = useLocation();
  const navigateTo = useNavigate();
  const { btn, setBtn, reset, clickAudio } = useFlip();
  const btnArray = useMemo(() => {
    return [start, next, yes, play, ""];
  }, []);
  const pathArray = useMemo(() => {
    return ["/", "/hello", "/help", "/instructions", "/activity"];
  }, []);

  useEffect(() => {
    if (pathArray.indexOf(location.pathname)!== -1) {
      setBtn(btnArray[pathArray.indexOf(location.pathname)]);
    }
    reset();
  }, [btnArray, location.pathname, pathArray, setBtn]);
  const { bananaCount } = useFlip();
  return (
    <div className="w-full h-full relative pointer-events-none">
      <div className="w-full h-full fixed top-0 left-0 pointer-events-none flex flex-col items-center">
        <img
          className="w-full h-[115%] object-fill object-top z-[-5] pointer-events-none"
          src={Background}
          alt=""
        />

        {location.pathname!== "/" && (
          <div className="absolute cursor-pointer top-6 left-6 pointer-events-auto active:scale-[0.9]">
            <img
              className="w-1/2"
              src={back}
              alt=""
              onClick={() => {
                clickAudio?.play();
                navigateTo(pathArray[pathArray.indexOf(location.pathname) - 1]);
              }}
            />
          </div>
        )}

        {location.pathname!== "/" && location.pathname!== "hello" && (
          <div className="progressBarContainer w-[40%] h-8 p-4 absolute top-0 z-[20] pointer-events-none">
            <div className="w-full h-full relative pointer-events-none">
              <ProgressBar
                striped
                variant="warning"
                animated
                now={bananaCount * 16.6}
              />
              {bananaCount!== 6? (
                <img
                  className="w-[4.5rem] h-[4.5rem] absolute -right-6 -top-4"
                  src={bananaEmpty}
                  alt=""
                />
              ) : (
              <>
              <img
                className="w-[4.5rem] h-[4.5rem] absolute -right-6 -top-4"
                src={bananaEmpty}
                alt=""
              />
                <img
                  className="w-[4rem] h-[4rem] absolute -right-4 -top-5 -rotate-[25deg]"
                  src={banana}
                  alt=""
                />
                </>
              )}
            </div>
          </div>
        )}

        <Outlet />

        <div
          className="fixed bottom-8 -right-24 cursor-pointer active:scale-[0.9] z-[5000] pointer-events-auto"
          onClick={() => {
            reset();
            clickAudio?.play();
            navigateTo(pathArray[pathArray.indexOf(location.pathname) + 1]);
          }}
        >
          <img className="w-[70%]" src={btn} id="btn" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;