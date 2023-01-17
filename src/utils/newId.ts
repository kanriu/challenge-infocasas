export const newId = (array: Array<any>) => {
  const id = Number(array[array.length - 1]?.id || 0) + 1;
  return String(id);
};
