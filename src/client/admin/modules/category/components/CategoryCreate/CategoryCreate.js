import React from "react";
import PropTypes from "prop-types";
import "./CategoryEdit.css";
import Select from "react-select";
import { CustomOption } from "./CustomOption";
import { selectCategory } from "./SelectCategory";

const CategoryCreate = ({ categories, parentSelect, handleChange,title,create }) => {
    const a=[{parent_id:'',title:'Без главна категория',slug:'',subcategory:[]}]
    const b=categories
    const categoriess=a.concat(b)
  return (
    <div>
      <div className="parent_input">
        <Select
          onChange={id => parentSelect(id)}
          defaultValue={{
            label: "Родител...",
            value: ""
          }}
          components={{ Option: CustomOption }}
          options={categoriess
            .map(option => {
              return selectCategory(option);
            })
            .flat()}
        />
      </div>
      <div className="label_title_input">
        <div>Име на Категорията</div>
        <input
          type="text"
          className="title_input"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <button className="category_edit" onClick={create}>Създай</button>
    </div>
  );
};

CategoryCreate.propTypes = {};

export default CategoryCreate;
