import base from "../base";

export const getTodos = async () => {
  const { data } = await base.get('/todos');
  return data;
};