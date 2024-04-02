import "./App.css";
import Context from "./Context/Context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Welcome from "./Components/Screens/Welcome";
import Hello from "./Components/Screens/Hello";
import Help from "./Components/Screens/Help";
import Instructions from "./Components/Screens/Instructions";
import GameScreen from "./Components/Game/GameScreen";

function App() {
  return (
    <Context>
      <BrowserRouter> {/* Use BrowserRouter */}
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Welcome />} />
            <Route path="hello" element={<Hello />} />
            <Route path="help" element={<Help />} />
            <Route path="instructions" element={<Instructions />} />
            <Route path="activity" element={<GameScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Context>
  );
}

export default App;
