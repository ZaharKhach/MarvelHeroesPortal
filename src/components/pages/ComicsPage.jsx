import { Helmet } from "react-helmet";
import AppBanner from "../appBanner/AppBanner";
import Comics from "../Comics/Comics";

const ComicsPage = (props) => {
  return (
    <>

      <Helmet>
        <meta name="descriotion" content="Page with list of our comics" />
        <title>Comics page</title>
      </Helmet>

      <AppBanner />
      <Comics />
    </>
  );
};
export default ComicsPage;
