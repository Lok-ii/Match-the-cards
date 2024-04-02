import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import start from "../assets/start.png";
import apple from "../assets/apple.jpg";
import orange from "../assets/orange.avif";
import pineapple from "../assets/pineapple.png";
import grapes from "../assets/grapes.jpg";
import strawberry from "../assets/strawberry.jpg";
import banana from "../assets/banana.png";
import A from "../assets/A.png";
import B from "../assets/B.png";
import G from "../assets/G.png";
import O from "../assets/O.png";
import P from "../assets/P.png";
import S from "../assets/S.png";
import btnClick from "../assets/btnClick.wav";
import matchMusic from "../assets/matchMusic.wav";
import loseSound from "../assets/loseSound.wav";
import flip from "../assets/flip.mp3";
import winningMusic from "../assets/winningMusic.wav";

export interface Card {
  name: string;
  img: string;
  side: string;
  hidden: boolean;
}

interface GameContextType {
  leftData: Card[];
  setLeftData: React.Dispatch<React.SetStateAction<Card[]>>; 
  rightData: Card[];
  setRightData: React.Dispatch<React.SetStateAction<Card[]>>;
  bananaCount: number;
  setBananaCount: (count: number) => void;
  shuffle: () => void;
  leftCard: string;
  setLeftCard: (card: string) => void;
  rightCard: string;
  setRightCard: (card: string) => void;
  timer: number;
  setTimer: (time: number) => void;
  rating: number;
  setRating: (rating: number) => void;
  reset: () => void;
  btn: string;
  setBtn: (btn: string) => void;
  clickAudio: HTMLAudioElement;
  loseAudio: HTMLAudioElement;
  matchAudio: HTMLAudioElement;
  flipAudio: HTMLAudioElement;
  winAudio: HTMLAudioElement;
}

interface ContextProps {
  children: ReactNode;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const useFlip = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useFlip must be used within a GameContextProvider");
  }
  return context;
};

const Context = ({ children }: ContextProps) => {
  const [bananaCount, setBananaCount] = useState(0);
  const [leftCard, setLeftCard] = useState("");
  const [rightCard, setRightCard] = useState("");
  const [btn, setBtn] = useState(start);
  const left: Card[] = [
    {
      name: "apple",
      img: apple,
      side: "left",
      hidden: false,
    },
    {
      name: "banana",
      img: banana,
      side: "left",
      hidden: false,
    },
    {
      name: "grapes",
      img: grapes,
      side: "left",
      hidden: false,
    },
    {
      name: "orange",
      img: orange,
      side: "left",
      hidden: false,
    },
    {
      name: "pineapple",
      img: pineapple,
      side: "left",
      hidden: false,
    },
    {
      name: "strawberry",
      img: strawberry,
      side: "left",
      hidden: false,
    },
  ];
  const right: Card[] = [
    {
      name: "apple",
      img: A,
      side: "right",
      hidden: false,
    },
    {
      name: "banana",
      img: B,
      side: "right",
      hidden: false,
    },
    {
      name: "grapes",
      img: G,
      side: "right",
      hidden: false,
    },
    {
      name: "orange",
      img: O,
      side: "right",
      hidden: false,
    },
    {
      name: "pineapple",
      img: P,
      side: "right",
      hidden: false,
    },
    {
      name: "strawberry",
      img: S,
      side: "right",
      hidden: false,
    },
  ];
  const [leftData, setLeftData] = useState<Card[]>([...left]);
  const [rightData, setRightData] = useState<Card[]>([...right]);
  const [timer, setTimer] = useState<number>(30);
  const [rating, setRating] = useState<number>(5);

  const shuffle = () => {
    const leftArray = [...left];
    const rightArray = [...right];
    leftArray.sort(() => Math.random() - 0.5);
    rightArray.sort(() => Math.random() - 0.5);
    setLeftData(leftArray);
    setRightData(rightArray);
  };

  const reset = () => {
    shuffle();
    setTimer(30);
    setRating(5);
    setLeftCard("");
    setRightCard("");
    setBananaCount(0);
  };

  useEffect(() => {
    shuffle();
  }, []);

  const clickAudio = new Audio(btnClick);
  const loseAudio = new Audio(loseSound);
  const matchAudio = new Audio(matchMusic);
  const flipAudio = new Audio(flip);
  const winAudio = new Audio(winningMusic);

  const value: GameContextType = {
    leftData,
    rightData,
    setLeftData,
    setRightData,
    bananaCount,
    setBananaCount,
    shuffle,
    leftCard,
    setLeftCard,
    rightCard,
    setRightCard,
    timer,
    setTimer,
    rating,
    setRating,
    reset,
    btn,
    setBtn,
    clickAudio,
    loseAudio,
    matchAudio,
    flipAudio,
    winAudio,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default Context;
