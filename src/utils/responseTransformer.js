const mappings = {
  exchangeRateMapping: {
    toObj: {
      from: {
        code: '',
        name: '',
      },
      to: {
        code: '',
        name: '',
      },
      exchangeRate: '',
      lastRefresh: '',
      timeZone: '',
    },
    propertyMappings: [
      {
        from: 'Realtime Currency Exchange Rate|1. From_Currency Code',
        to: 'from|code',
      },
      {
        from: 'Realtime Currency Exchange Rate|2. From_Currency Name',
        to: 'from|name',
      },
      {
        from: 'Realtime Currency Exchange Rate|3. To_Currency Code',
        to: 'to|code',
      },
      {
        from: 'Realtime Currency Exchange Rate|4. To_Currency Name',
        to: 'to|name',
      },
      {
        from: 'Realtime Currency Exchange Rate|5. Exchange Rate',
        to: 'exchangeRate',
      },
      {
        from: 'Realtime Currency Exchange Rate|6. Last Refreshed',
        to: 'lastRefresh',
      },
      {
        from: 'Realtime Currency Exchange Rate|7. Time Zone',
        to: 'timeZone',
      },
    ],
  },
};

const mapper = (obj, toObj, mappingConfig) => {
  mappingConfig.forEach(q => {
    let objClone = { ...obj };
    let toObjRef = toObj;
    const fromArray = q.from.split('|');
    const toArray = q.to.split('|');
    let currentElementValue;

    fromArray.forEach(frm => {
      objClone = objClone[frm];
      currentElementValue = objClone;
    });

    toArray.forEach((t, idx) => {
      if (idx === toArray.length - 1) {
        toObjRef[t] = currentElementValue;
      } else {
        toObjRef = toObj[t];
      }
    });
  });

  return toObj;
};

export const exchangeRate = response => {
  const res = {
    raw: {
      ...response,
    },
    ...mapper(
      response,
      mappings.exchangeRateMapping.toObj,
      mappings.exchangeRateMapping.propertyMappings,
    ),
  };

  return res;
};

export const x = 1;
