import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { CustomOption } from "./CategoryCreate/CustomOption";
import { selectCategory } from "./CategoryCreate/SelectCategory";

const CategoryEdit = ({
  editCategory,
  deleteCategory,
  parent,
  categories,
  parentSelect,
  handleChange,
  category,
  back_to_create
}) => {
  const a = [
    { parent_id: "", title: "Без главна категория", slug: "", subcategory: [] }
  ];
  const b = categories;
  const categoriess = a.concat(b);
  return (
    <div>
      <div className="parent_input">
        <button className="category_edit" onClick={back_to_create}>
          назад към създване
        </button>
        <Select
          onChange={id => parentSelect(id)}
          defaultValue={{
            label: `${parent === undefined ? "Родител..." : parent.title}`,
            value: `${parent === undefined ? "" : parent._id}`
          }}
          components={{ Option: CustomOption }}
          options={categoriess
            .map(option => {
              return selectCategory(option);
            })
            .flat()}
        ></Select>
      </div>
      <div className="label_title_input">
        <div>Име на Категорията</div>
        <input
          type="text"
          className="title_input"
          value={category.title}
          onChange={handleChange}
        />
      </div>
      <button
        className="category_edit"
        onClick={() => editCategory(category._id)}
      >
        Редактирай
      </button>
      {category.subcategory.length === 0 ? (
        <button
          className="category_edit"
          onClick={() => deleteCategory(category._id)}
        >
          Изтрий
        </button>
      ) : (
        <div style={{ color: "white" }}>
          за да можете да изтриете категорията, тя не трябва да има подкатегории
        </div>
      )}
    </div>
  );
};

CategoryEdit.propTypes = {};

export default CategoryEdit;
