import { Schema, model, connect } from 'mongoose';

let db = null;

const CategorySchema = new Schema(
  {
    categoryName: String
  },
  {
    timestamps: true
  }
);
const CategoryModel = model('Category', CategorySchema, 'Bookstore');

export const init = async () => {
  if (!db) {
    db = await connect(process.env['CosmosDbConnectionString']);
  }
};

// Method create item
export const addItem = async doc => {
  const modelToInsert = new CategoryModel({
    categoryName: doc.name
  });
  // modelToInsert['categoryName'] = doc.name;
  return await modelToInsert.save();
};
// Method get item by id
export const findItemById = async id => {
  return await CategoryModel.findById(id);
};
// Method get all items
export const findItems = async (query = {}) => {
  return await CategoryModel.find({});
};
// Method delete a item
export const deleteItemById = async id => {
  return await CategoryModel.findByIdAndDelete(id);
};
