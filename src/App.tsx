import "./App.css";
import "antd/dist/antd.css";

import MainPage from "./components/pages/MainPage";
import { Provider } from "react-redux";
import { store } from "./store";

import { Buffer } from "buffer";
import * as process from "process";

window.Buffer = window.Buffer || Buffer;
window.process = window.process || process;

const App = () => {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
};

export default App;
