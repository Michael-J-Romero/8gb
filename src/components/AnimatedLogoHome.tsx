// Accept and forward all props, including hue
const AnimatedLogoHome = (props) => {
  const Dive = require("./animatedLogo").default;
  // Accept width prop and forward it
  return <div style = {{
    transform: "translateY(-20%)",
  }}>
    <Dive {...props} animationMode="loop" />
  </div>;
};
export default AnimatedLogoHome;
