import React from 'react';
import PropTypes from 'prop-types';
import SideBar from "../../modules/layout/SideBar/SideBar";
import CategoryContainer from "../../modules/category/CategoryContainer";

const CategoryPage = props => {
    return (
        <div>
<SideBar/>
<CategoryContainer/>
        </div>
    );
};

CategoryPage.propTypes = {

};

export default CategoryPage;
