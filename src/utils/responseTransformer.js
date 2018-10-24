import * as constants from '../constants/index';

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
    validity: 'Realtime Currency Exchange Rate',
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

const loadProcessConfig = processType => {
  switch (processType) {
    case constants.CURRENCY_EXCHANGE_RATE:
      return mappings.exchangeRateMapping;
    default:
      throw new Error(`Configuration not found for process ${processType}`);
  }
};

export default (config, response, processType) => {
  const injectRawResponse = config.injectRawResponse || false;
  const processConfig = loadProcessConfig(processType);

  if (response[processConfig.validity]) {
    const res = {
      ...mapper(response, processConfig.toObj, processConfig.propertyMappings),
    };

    if (injectRawResponse) {
      res.raw = response;
    }
    return res;
  }

  return response;
};
