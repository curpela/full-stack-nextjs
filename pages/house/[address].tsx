import React from "react";

import HouseImages from "../../components/House/HouseImages";
import NavAuth from "../../components/Layout/NavAuth";

export default function address(props: any) {
  return (
    <div
      className="address-container"
      style={{ backgroundColor: "$background" }}
    >
      <NavAuth />

        <HouseImages />
    </div>
  );
}

address.getInitialProps = (props: any) => {
  return { address: props.query.address };
};
