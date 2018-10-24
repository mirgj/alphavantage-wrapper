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

const loadFunctionConfig = async functionType => {
  const fileToLoad = path.resolve(
    __dirname,
    `../config/functions/${functionType}.json`,
  );

  return new Promise((resolve, reject) => {
    if (!mappingsCache[functionType]) {
      fs.readFile(fileToLoad, 'utf8', (err, result) => {
        if (err) {
          reject(
            new Error(`Configuration not found for function ${functionType}`),
          );
        }

        try {
          mappingsCache[functionType] = JSON.parse(result);
          resolve(mappingsCache[functionType]);
        } catch (e) {
          reject(
            new Error(
              `Error parsing the configuration for function ${functionType}`,
            ),
          );
        }
      });
    } else {
      resolve(mappingsCache[functionType]);
    }
  });
};

export default async (config, response, functionType) => {
  const injectRawResponse = !!config.injectRawResponse || false;
  const functionConfig = await loadFunctionConfig(functionType);

  if (response[functionConfig.validity]) {
    const res = {
      ...mapper(
        response,
        functionConfig.toObj,
        functionConfig.propertyMappings,
      ),
    };

    if (injectRawResponse) {
      res.raw = response;
    }
    return res;
  }

  return response;
};
