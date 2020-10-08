import React from "react";

export const selectCategory = (category,categories = [],level=1) => {
  categories.push({
      custom: true,
      label: category.title,
      value: category._id,
      slug:category.slug,
      level: level,
  });
  if (category.subcategory) {
    category.subcategory.map(option => {
      selectCategory(option,categories,level+1);
    });
  }
  return categories;
};
