import React from "react";
import axios from "axios";
import "../classCreate/components/SubjectCreate.module.css";
import slugify from "slugify";
import Select from "react-select";
import { CustomOption } from "../../category/components/CategoryCreate/CustomOption";
import { selectCategory } from "../../category/components/CategoryCreate/SelectCategory";

class ProductEditContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      imageLink: "",
      category_title: "",
      price: 0,
      discount_price: 0,
      categories: [],
      subcategories: [{parent_id:''}],
      weight: 0,
      sku: 0,
      editedProductId: this.props.editedProductId,
      isLoading: true,
      quantity: 0,
      errors: {},
      error: ""
    };
  }

  componentDidMount() {
    this.handleGetProductById();
    this.handleGetCategory();
  }

  handleInput = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  handleChangeParent = parent => {
    this.setState({ category_title: parent.label });
  };

  handleGetProductById = async () => {
    await axios
      .get(`http://localhost:5000/products/${this.state.editedProductId}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          title: response.data.title,
          imageLink: response.data.imageLink,
          price: response.data.price,
          discount_price: response.data.discount_price,
          weight: response.data.weight,
          sku: response.data.sku,
          quantity: response.data.quantity
        });
      })
      .catch(function(error) {});
  };

  handleGetCategory = async () => {
    await axios
      .get("http://localhost:5000/category/")
      .then(response => {
        response.data.map(category => {
          this.handleBuildCategory(category, response.data);
        });
        this.state.subcategories.map(sub => {
          if (!sub.parent_id) {
            this.state.categories.push(sub);
          }
        });
        this.setState({ isLoading: false });
      })
      .catch(function(error) {});
  };
  handleBuildCategory = (category, categories) => {
    let result = categories.filter(sub => sub.parent_id === category._id);

    if (result.length > 0) {
      category.subcategory = result;
      this.state.subcategories.push(category);
    } else {
      if (!category.parent_id) {
        this.state.subcategories.push(category);
      }
    }
  };
  validateForm = data => {
    const error = {};

    if (data.title.length < 3) {
      error.title = "Името е твърде късо.";
    }
    if (data.price < 1) {
      error.price = "Липсва цена.";
    }
    if (data.category_title.length < 3) {
      error.category = "Изберете категория.";
    }
    if (data.weight < 1) {
      error.weight = "Добавете тегло.";
    }
    if (data.sku < 1) {
      error.sku = "Добавете SKU.";
    }
    if (data.quantity < 1) {
      error.quantity = "Добавете бройка.";
    }
    if (data.imageLink < 1) {
      error.imageLink = "Добавете снимка.";
    }
    return error;
  };
  handleSubmit = () => {
    const {
      title,
      price,
      discount_price,
      weight,
      category_title,
      sku,
      quantity,
      imageLink
    } = this.state;
    const errors = this.validateForm(this.state);
    const isValid = Object.values(errors).filter(Boolean).length <= 0;
    if (!isValid) {
      this.setState({ errors: errors });
      return;
    }
    this.setState({ request: "" });
    const product = {
      title: title,
      price: price * 100,
      discount_price: discount_price * 100,
      weight: weight * 1000,
      category: category_title,
      category_slug:slugify(category_title, { lower: true, remove: /[():.@><,_{}]/g }),
      sku: sku,
      quantity: quantity,
      imageLink: imageLink,
      slug: slugify(title, { lower: true, remove: /[():.@><,_{}]/g })
    };
    axios
      .put(
        `http://localhost:5000/products/update/${this.state.editedProductId}`,
        product
      )
      .then(res => {
        this.setState({
          title: "",
          price: 0,
          discount_price: 0,
          category_title:"",
          weight: 0,
          sku: 0,
          quantity: 0
        });
        window.location.href = "/admincp/schoolYear";
      })
      .catch(error =>
        this.setState({ error: "Името или SKU на пеодукта е вече използвано." })
      );
  };
  render() {
    const {
      title,
      price,
      discount_price,
      weight,
      categories,
      sku,
      quantity,
      imageLink,
      errors
    } = this.state;
    return (
      <div className="create_product">
        <div>
          {" "}
          <div>Снимка на продукта</div>
          <input
            className="create_title"
            name="imageLink"
            type="text"
            onChange={this.handleInput}
            value={imageLink}
          />
          {imageLink === "" ? (
            ""
          ) : (
            <img
              style={{ maxHeight: "400", maxWidth: "500px" }}
              src={imageLink}
              alt="product"
            />
          )}
          <div>
            {errors.imageLink ? (
              <div style={{ color: "red" }}>{errors.imageLink}</div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div>
          {" "}
          <div>Категория</div>
          <div style={{ "max-width": "680px" }}>
            <Select
              onChange={id => this.handleChangeParent(id)}
              defaultValue={{
                label: "Родител...",
                value: ""
              }}
              style={{ cursor: "pointer" }}
              components={{ Option: CustomOption }}
              options={categories
                .map(option => {
                  return selectCategory(option);
                })
                .flat()}
            />
          </div>
          <div style={{ color: "red" }}>{errors.title ? errors.title : ""}</div>
        </div>
        <div className="form_row">
          <div className="row">
            {" "}
            <div className="form_body">
              <div>Цена</div>
              <input
                className="form_input"
                name="price"
                type="number"
                onChange={this.handleInput}
                value={price}
              />
              <div style={{ color: "red" }}>
                {errors.price ? errors.price : ""}
              </div>
            </div>
            <div>
              {" "}
              <div>Специална цена</div>
              <input
                className="form_input"
                name="discount_price"
                type="number"
                onChange={this.handleInput}
                value={discount_price}
              />
              <div style={{ color: "red" }}>
                {errors.discount_price ? errors.discount_price : ""}
              </div>
            </div>
          </div>
        </div>
        <div className="form_row">
          <div className="row">
            <div className="form_body">
              <div>Тегло в килограми</div>
              <input
                className="form_input"
                name="weight"
                type="number"
                onChange={this.handleInput}
                value={weight}
              />
              <div style={{ color: "red" }}>
                {errors.weight ? errors.weight : ""}
              </div>
            </div>
            <div>
              <div>Заглавие</div>
              <input
                className="form_input"
                name="title"
                type="text"
                onChange={this.handleInput}
                value={title}
              />
              <div style={{ color: "red" }}>
                {errors.category ? errors.category : ""}
              </div>
            </div>
          </div>
        </div>
        <div className="form_row">
          <div className="row">
            <div className="form_body">
              <div>SKU</div>
              <input
                className="form_input"
                name="sku"
                type="number"
                onChange={this.handleInput}
                value={sku}
              />
              <div style={{ color: "red" }}>{errors.sku ? errors.sku : ""}</div>
            </div>
            <div>
              <div>Бройка</div>
              <input
                className="form_input"
                placeholder="Бройка"
                name="quantity"
                type="number"
                onChange={this.handleInput}
                value={quantity}
              />
              <div style={{ color: "red" }}>
                {errors.quantity ? errors.quantity : ""}
              </div>
            </div>
          </div>
        </div>
        <button className="create_button" onClick={this.handleSubmit}>
          Редактирай
        </button>
        <div>{this.state.error}</div>
      </div>
    );
  }
}

export default ProductEditContainer;
