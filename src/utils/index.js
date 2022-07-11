export function mergeDataWithKey(data) {
  if (!data) {
    return [];
  }
  return Object.values(data).map((value, index) => {
    return {
      ...value,
      key: Object.keys(data)[index],
    };
  });
}

export function getBoardKey() {
  const arr = window.location.href.split("/");
  return arr[4];
}

export function byPropKey(propertyName, value) {
  return {
    [propertyName]: value,
  };
}
