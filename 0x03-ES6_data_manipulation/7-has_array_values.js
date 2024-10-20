export default function hasValuesFromArray(xSet, yArr) {
  return yArr.every((element) => xSet.has(element));
}
