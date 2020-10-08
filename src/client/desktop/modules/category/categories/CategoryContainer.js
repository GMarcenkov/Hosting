import React from "react";
import axios from "axios";
import CategoryList from "./components/CategoryList";
import "./components/CategoryContainer.css";
import "./components/CategoryList.css";
class CategoryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: []
    };
  }
  componentDidMount() {
    this.handleGetCategory();
  }
  handleGetCategory = async () => {
    axios
      .get("http://localhost:5000/category/")
      .then(response => {
        this.setState({ categories: response.data });
      })
      .catch(function(error) {});
  };
  render() {
    const { categories } = this.state;
    const parents = [];
    categories.map(category => {
      if (!category.parent_id) {
        parents.push(category);
      }
    });
    return (
      <div style={{ fontSize: "30px" }}>
        <div className="sidenav">
          {parents.map(category => {
            return <CategoryList category={category} />;
          })}
        </div>
      </div>
    );
  }
}

CategoryContainer.propTypes = {};

export default CategoryContainer;
