import { Spinner } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routing } from "~/pages";
import { withProviders } from "./providers";
import "./styles/index.scss";

const App = () => {
  return (
    <div className="app">
      <Toaster
        containerClassName="custom-toaster"
        toastOptions={{
          loading: {
            icon: <Spinner variant="secondary" />,
          },
        }}
      />
      <Routing />
    </div>
  );
};

export default withProviders(App);
