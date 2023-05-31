import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  /**
   * check if redis is alive and if the DB is alive too
   * { "redis": true, "db": true } with a status code 200
   */
  static getStatus(req, res) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    };
    res.status(200).send(status);
  }

  /**
   * return the number of users and files:
   * { "users": 12, "files": 1231 }
   *  with a status code 200
   */
  static async getStats(req, res) {
    const stats = {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
    res.status(200).send(stats);
  }
}

export default AppController;