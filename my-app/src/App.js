import logo from "./logo.svg";
import "./App.css";
import ManageStudent from "./Page/ManageStudent/index";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "./util/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ManageStudent />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
