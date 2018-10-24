import fs from 'fs';
import path from 'path';

const mappingsCache = {};

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

const loadProcessConfig = async processType => {
  const fileToLoad = path.resolve(
    __dirname,
    `../config/process/${processType}.json`,
  );

  return new Promise((resolve, reject) => {
    if (!mappingsCache[processType]) {
      fs.readFile(fileToLoad, 'utf8', (err, result) => {
        if (err) {
          reject(
            new Error(`Configuration not found for process ${processType}`),
          );
        }

        try {
          mappingsCache[processType] = JSON.parse(result);
          resolve(mappingsCache[processType]);
        } catch (e) {
          reject(
            new Error(
              `Error parsing the configuration for process ${processType}`,
            ),
          );
        }
      });
    } else {
      resolve(mappingsCache[processType]);
    }
  });
};

export default async (config, response, processType) => {
  const injectRawResponse = !!config.injectRawResponse || false;
  const processConfig = await loadProcessConfig(processType);

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
