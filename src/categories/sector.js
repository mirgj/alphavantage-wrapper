import requestCreator from '../utils/requestCreator';
import * as constants from '../constants/index';

const sector = config => () => {
  const query = {
    function: constants.SECTOR,
  };

  return requestCreator(config, query);
};

export default sector;
