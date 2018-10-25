import fs from 'fs';
import path from 'path';
import converterFactory from '../converters';
import * as constants from '../constants';

const mappingsCache = {};

const getDynamicKeys = (obj, fromArray) => {
  let objClone = obj;
  let retValue = [null];

  if (fromArray.includes(constants.DYNAMIC)) {
    fromArray.forEach(frm => {
      if (frm === constants.DYNAMIC) {
        retValue = Object.keys(objClone);
        return;
      }

      objClone = objClone[frm];
    });
  }

  return retValue;
};

const mapper = (obj, toObj, mappingConfig) => {
  mappingConfig.forEach(q => {
    let objClone = obj;
    let toObjRef = toObj;
    const fromArray = q.from.split('|');
    const toArray = q.to.split('|');
    let currentElementValue;
    const dynamicFields = getDynamicKeys(obj, fromArray);

    dynamicFields.forEach(dynamic => {
      fromArray.forEach(frm => {
        if (dynamic && frm === constants.DYNAMIC) {
          // eslint-disable-next-line
          frm = dynamic;
        }

        objClone = objClone[frm];
        currentElementValue = objClone;
      });

      toArray.forEach((t, idx) => {
        if (dynamic && t === constants.DYNAMIC) {
          // eslint-disable-next-line
          t = dynamic;
        }

        if (idx === toArray.length - 1) {
          if (q.converter)
            toObjRef[t] = converterFactory(currentElementValue, q.converter);
          else toObjRef[t] = currentElementValue;
        } else {
          toObjRef = toObj[t];
        }
      });
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
