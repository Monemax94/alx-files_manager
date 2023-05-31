import redisClient from './redis';
import dbClient from './db';

/**
 * User utilities module
 */
const userUtils = {
  /**
   * Get user redis id and key from request
   * @request {request_object} express request obj
   * @return {object} object with userId and
   * redis key for token
   */
  async getUserIdAndKey(request) {
    const obj = { userId: null, key: null };
    const token = request.header('X-Token');

    if (!token) return obj;
    obj.key = `auth_${token}`;
    obj.userId = await redisClient.get(obj.key);

    return obj;
  },

  /**
   * Gets a user from database
   * @query {object} query to find user
   * @return {object} user document object
   */
  async getUser(query) {
    const user = await dbClient.usersCollection.findOne(query);
    return user;
  },
};

export default userUtils;