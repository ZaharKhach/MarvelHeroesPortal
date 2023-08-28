import sadSpider from '../../resourses/img/sadSpider.jpg'

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100%",
  padding: "0 20px",
  color: "#050000",
};

const textContainerStyle = {
  flex: "1",
  marginRight: "20px",
};

const imageStyle = {
  paddingLeft: "50px",
  maxWidth: "50%",
};

const Page404 = () => {
  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>
        <h1 style={{"color" : "#9F0013"}}>404 Page not found</h1>
        <h4>Protocol missing... Exiting program</h4>
        <p>
          Check that you typed the address correctly, go back to your previous
          page or try using our site search to find something specific.
        </p>
      </div>
      <img
        src={sadSpider}
        alt="Герой"
        style={imageStyle}
      />
    </div>
  );
};
export default Page404