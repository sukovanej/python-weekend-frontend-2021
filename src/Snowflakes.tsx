import { DepthOfFieldSnowfall } from "react-snowflakes";

export default function Snowflakes() {
  return (
    <DepthOfFieldSnowfall
      count={150}
      style={{
        // Position must be relative or absolute,
        // because snowflakes are positioned absolutely.
        color: "#fff",
        position: "absolute",
        width: "95%",
        height: "95%",
        zIndex: "-1",
        backgroundColor: "235E6F",
      }}
    />
  );
}
