import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";

export const App = () => {
  return (
    <div className="flex flex-col items-center py-10">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
};

export default App;
