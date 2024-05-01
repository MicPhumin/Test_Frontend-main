import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainScreen from "./screen/MainScreen";
import TestOneScreen from "./screen/TestOneScreen";
import TestTwoScreen from "./screen/TestTwoScreen";
import Navbar from "./component/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route index element={<MainScreen />} />
          <Route path="Test1" element={<TestOneScreen />} />
          <Route path="Test2" element={<TestTwoScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
