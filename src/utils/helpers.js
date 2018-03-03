export const compareNums = (a,b) => Number(a) - Number(b);

export const compareStringsOrNums = (a,b) => {
  if(a === undefined) {
    return -1;
  }
  if(b === undefined) {
    return 1;
  }
  if(typeof a === 'string' && typeof a === 'string') {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }
  const result = compareNums(a,b);
  if(!Number.isNaN(result)) {
    return (result);
  }
  // console.warn('typeof Number or String',`${typeof a} and ${typeof b}`);
  return 0;
};

export const compareObjectBy = ({key = 'id', direction = 'asc'}) =>
  (a = {[key]: ''}, b = {[key]: ''}) => {
    const multiplier = direction === 'desc' ? -1 : 1;
    const valA = a[key];
    const valB = b[key];
    return multiplier * compareStringsOrNums(valA, valB);
  };
