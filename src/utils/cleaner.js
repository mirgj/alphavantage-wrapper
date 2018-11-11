const dotReplaceRegex = /\w+\./gi;
const timeSeries = 'Time Series';

export const camelCasefy = str => {
  const s = str
    .trim()
    .split(' ')
    .join('');

  return `${s.substring(0, 1).toLowerCase()}${s.substring(1, s.length)}`;
};

export const clean = data => {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const cleanedData = {};
  Object.keys(data).forEach(k => {
    let key = k.toString();

    key = key.replace(dotReplaceRegex, '');
    key = key.replace('(', '_');
    key = key.replace(')', '');
    key = key.indexOf(timeSeries) !== -1 ? timeSeries : key;
    key = camelCasefy(key);

    cleanedData[key] = clean(data[k]);
  });

  return cleanedData;
};
