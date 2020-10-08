import React from 'react';
import PropTypes from 'prop-types';
import SideBar from "../../../modules/layout/SideBar/SideBar";
import RatingListContainer from "../../../modules/gradess/ratingList/RatingListContainer";

const ProductsPage = props => {
    return (
        <div>
            <SideBar/>
            <RatingListContainer/>
        </div>
    );
};

ProductsPage.propTypes = {

};

export default ProductsPage;
