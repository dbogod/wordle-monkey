export const sortArray = (arr) => {
  let sorted = [];
  for (const entry in arr) {
    sorted.push([entry, arr[entry]]);
  }
  sorted.sort(function (a, b) {
    return b[1] - a[1];
  });
  return sorted;
};

export const addKeyOrIncrementValue = (obj, key, increment = 1, initialValue = 1) => {
  obj[key] = obj[key] ? (obj[key] += increment) : initialValue;
};

export const convertToPercentage = (a, b) => {
  const percentage = (a / b) * 100;
  return Math.round((percentage + Number.EPSILON) * 100) / 100;
};
