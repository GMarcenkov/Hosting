import React from "react";
import { Link } from "react-router-dom";
import "./CategoryContainer.css";

const CategoryList = ({ category }) => {
  return <Link to={`/category/${category.slug}`}>{category.title}</Link>;
};

CategoryList.propTypes = {};

export default CategoryList;
