export default function hasValuesFromArray(xSet, yArr) {
  const ySet = new Set(yArr);
  return xSet.isSupersetOf(ySet) && xSet.size > ySet.size;
}
