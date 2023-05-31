import { ObjectId } from 'mongodb';

/**
 * valid mongo id utilities
 */
const basicUtils = {
  /**
   * Validated Id's
   * @id {string|number} id to be evaluated
   * @return {boolean} true if valid, false if not
   */
  isValidId(id) {
    try {
      ObjectId(id);
    } catch (err) {
      return false;
    }
    return true;
  },
};

export default basicUtils;