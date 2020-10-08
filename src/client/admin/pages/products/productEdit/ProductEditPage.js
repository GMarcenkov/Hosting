import React from "react";
import PropTypes from "prop-types";
import SideBar from "../../../modules/layout/SideBar/SideBar";
import ProductEditContainer from "../../../modules/gradess/productEdit/ProductEditContainer";

const ProductEditPage = props => {
  return (
    <div>
      <SideBar />
      <ProductEditContainer editedProductId={props.computedMatch.params.id} />
    </div>
  );
};

ProductEditPage.propTypes = {};

export default ProductEditPage;
