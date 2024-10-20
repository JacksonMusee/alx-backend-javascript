export default function cleanSet(set, startString) {
  const selectValues = [];

  if (startString.length > 0) {
    for (const item of set) {
      if (typeof item === 'string' && item.startsWith(startString)) {
        selectValues.push(item.slice(startString.length));
      }
    }
  }

  return selectValues.join('-');
}
