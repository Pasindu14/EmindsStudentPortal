import React from "react";
import Login from "./pages/Login/Login";
import { Provider } from "react-redux";

import { useState, useEffect } from "react";
import createAppStore from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContainer = () => {
  const [store, setStore] = useState(null);

  useEffect(() => {
    const initializeStore = async () => {
      try {
        const appStore = await createAppStore();
        setStore(appStore);
      } catch (err) {
        console.log(`Error initializing the app: ${err.message}`);
      }
    };

    initializeStore();
  }, []);

  if (store === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Provider store={store}>
        <ToastContainer />
        <Login />
      </Provider>
    </div>
  );
};

export default AppContainer;
