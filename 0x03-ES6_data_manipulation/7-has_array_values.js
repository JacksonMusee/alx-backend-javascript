export default function hasValuesFromArray(xSet, yArr) {
  return xSet.isSupersetOf(new Set(yArr));
}
