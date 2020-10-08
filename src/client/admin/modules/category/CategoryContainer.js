import React from "react";
import axios from "axios";
import TreeChildren from "./TreeChildren";
import "./components/categoryContainer.css";
import CategoryCreate from "./components/CategoryCreate/CategoryCreate";
import ReactLoading from "react-loading";
import slugify from "slugify";
import CategoryEdit from "./components/CategoryEdit";

class CategoryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      category: {},
      subcategory: [],
      subcategories: [],
      parentId: "",
      parentTitle:'',
      title: "",
      isLoading: true,
      selected_category: [],
      selected_category_parent: []
    };
  }
  componentDidMount() {
    this.handleGetCategory();
  }
  handleInput = event => {
    this.setState({
      title: event.target.value
    });
  };
  handleChange = event => {
    this.setState({selected_category:[{
      ...this.state.selected_category[0],
        title: event.target.value
      }]
    });
  };
  handleGetCategory = async () => {
    await axios
      .get("http://localhost:5000/category/")
      .then(response => {
        this.setState({
          categories: response.data
        });
        response.data.map(category => {
          this.handleBuildCategory(category);
        });
        this.state.subcategory.map(sub => {
          if (!sub.parent_id) {
            this.state.subcategories.push(sub);
          }
        });

        this.setState({ isLoading: false });
      })
      .catch(function(error) {});
  };

  handleBuildCategory = category => {
    let result = this.state.categories.filter(
      sub => sub.parent_id === category._id
    );

    if (result.length > 0) {
      category.subcategory = result;
      this.state.subcategory.push(category);
    } else {
      if (!category.parent_id) {
        this.state.subcategory.push(category);
      }
    }
  };
  handleChangeParent = parent => {
    this.setState({ parentId: parent.value,parentTitle:parent.label });
  };
  handleCreateCategory = async () => {

    const category = {
      parent_id: this.state.parentId===undefined?"":this.state.parentId,
      title: this.state.title,
      slug: slugify(this.state.title)
    };
    await axios
      .post("http://localhost:5000/category/add", category)
      .catch(e => {
        this.setState({ request: "Failed to create" });
      });
    this.setState({
      categories: [],
      category: {},
      subcategory: [],
      subcategories: []
    });
    this.handleGetCategory();
  };
  handleSelectCategory = async category => {
    await this.setState({
      selected_category: [],
      selected_category_parent: []
    });
    this.state.selected_category.push(category);
    if (category.parent_id)
      await this.state.categories.map(option => {
        if (category.parent_id === option._id) {
          this.state.selected_category_parent.push(option);
        }
      });
    this.setState({});
  };
  handleEditCategory = id => {
    const category = {
      parent_id: this.state.parentId,
      title: this.state.selected_category[0].title,
      slug: slugify(this.state.selected_category[0].title)
    };
    console.log(category,id);
    axios
      .put(`http://localhost:5000/category/edit/${id}`, category)
        .then(response => {
          this.setState({
            categories: [],
            category: {},
            subcategory: [],
            subcategories: [],
            selected_category: [],
            selected_category_parent: []
          });
          this.handleGetCategory();
        })
        .catch(function(error) {});
  };
  handleDeleteCategory = id => {
    axios
      .delete(`http://localhost:5000/category/delete/${id}`)
      .then(response => {
        this.setState({
          categories: [],
          category: {},
          subcategory: [],
          subcategories: [],
          selected_category: [],
          selected_category_parent: []
        });
        this.handleGetCategory();
      })
      .catch(function(error) {});
  };
  handleBackToCreate=()=>{
    this.setState({selected_category:[]})
  }
  render() {
    const {
      subcategories,
      isLoading,
      selected_category,
      selected_category_parent
    } = this.state;
    if (isLoading === true) {
      return (
        <ReactLoading type={"spin"} color={"blue"} height={300} width={100} />
      );
    }
    return (
      <div className="category_wrapper">
        <div className="category_holder">
          <div className="container_categories">
            {subcategories.map(category => {
              return (
                <div>
                  <TreeChildren
                    editCategory={this.handleSelectCategory}
                    subcategory={category}
                    category={category}
                  />
                </div>
              );
            })}
          </div>
          <div className="container_category">
            {selected_category.length === 0 ? (
              <CategoryCreate
                handleChange={this.handleInput}
                categories={subcategories}
                title={this.state.title}
                parentSelect={this.handleChangeParent}
                create={this.handleCreateCategory}
              />
            ) : (
              <CategoryEdit
                  back_to_create={this.handleBackToCreate}
                editCategory={this.handleEditCategory}
                deleteCategory={this.handleDeleteCategory}
                parent={selected_category_parent[0]}
                handleChange={this.handleChange}
                categories={subcategories}
                category={selected_category[0]}
                parentSelect={this.handleChangeParent}
                create={this.handleCreateCategory}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

CategoryContainer.propTypes = {};

export default CategoryContainer;
