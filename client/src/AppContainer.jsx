import React from "react";
import { Students } from "./pages/Masters/Students";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
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
        <Navbar />

        <ToastContainer />
        <Card title="MANAGE STUDENTS">
          <Students />
        </Card>
      </Provider>
    </div>
  );
};

export default AppContainer;
