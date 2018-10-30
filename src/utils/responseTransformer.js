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

const assign = (obj, keyPath, value) => {
  const lastKeyIndex = keyPath.length - 1;
  // eslint-disable-next-line
  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i];
    // eslint-disable-next-line
    if (!(key in obj)) obj[key] = {};
    // eslint-disable-next-line
    obj = obj[key];
  }
  // eslint-disable-next-line
  obj[keyPath[lastKeyIndex]] = value;
};

const mapper = (obj, mappingConfig) => {
  const result = {};
  mappingConfig.forEach(q => {
    const fromArray = q.from.split('|');
    const dynamicFields = getDynamicKeys(obj, fromArray);

    dynamicFields.forEach(dynamic => {
      let currentElementValue;
      let toPath = q.to;
      let objClone = obj;
      let formattedValue = null;
      fromArray.forEach(frm => {
        if (dynamic && frm === constants.DYNAMIC) {
          // eslint-disable-next-line
          frm = dynamic;
        }

        if (q.format && frm.indexOf(constants.DYNAMIC_FORMAT) > -1) {
          const keys = Object.keys(objClone);
          const regex = new RegExp(q.format.regex, 'i');
          const regRes = regex.exec(keys[q.format.keyIndex]);

          // eslint-disable-next-line
          frm = frm.replace(constants.DYNAMIC_FORMAT, regRes[q.format.group]);
          formattedValue = regRes[q.format.group];
        }

        objClone = objClone[frm];
        currentElementValue = objClone;
      });

      if (q.converter) {
        currentElementValue = converterFactory(
          currentElementValue,
          q.converter,
        );
      }

      toPath = toPath.replace(constants.DYNAMIC, dynamic);
      toPath = toPath.replace(constants.DYNAMIC_FORMAT, formattedValue);

      assign(result, toPath.split('|'), currentElementValue);
    });
  });

  return result;
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
      ...mapper(response, functionConfig.propertyMappings),
    };

    if (injectRawResponse) {
      res.raw = response;
    }
    return res;
  }

  return response;
};
