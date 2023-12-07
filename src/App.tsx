import { ConfigProvider } from "antd";
// import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Router from "router/index";
import store from "states/store";
import "./index.scss";
import { InitAppWrapper } from "./layouts";
// const client = new QueryClient();
function App() {
  return (
    <ConfigProvider>
      <Provider store={store}>
        {/* <QueryClientProvider client={client}> */}
        <InitAppWrapper>
          <RouterProvider router={Router} />
        </InitAppWrapper>
        {/* </QueryClientProvider> */}
      </Provider>
    </ConfigProvider>
  );
}

export default App;
