import TopNav from "@/components/TopNav";
import { Provider } from "@/context";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IntlProvider } from "react-intl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <IntlProvider locale="id" defaultLocale="en">
      <Provider>
        <ToastContainer position="top-center" />
        <TopNav />
        <Component {...pageProps} />
      </Provider>
    </IntlProvider>
  );
}
