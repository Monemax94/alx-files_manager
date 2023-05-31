import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';
import redisClient from '../utils/redis';
import userUtils from '../utils/user';

class AuthController {
  /**
   * Authentication module
   */
  static async getConnect(req, res) {
    const Authorization = req.header('Authorization') || '';
    const auth = Authorization.split(' ')[1];

    if (!auth) { return res.status(401).send({ error: 'Unauthorized' }); }

    const decoded = Buffer.from(auth, 'base64').toString(
      'utf-8',
    );

    const [email, password] = decoded.split(':');
    if (!email || !password) { return res.status(401).send({ error: 'Unauthorized' }); }

    const pass = sha1(password);

    const user = await userUtils.getUser({
      email,
      password: pass,
    });

    if (!user) return res.status(401).send({ error: 'Unauthorized' });

    const token = uuidv4();
    const key = `auth_${token}`;
    const hoursForExpiration = 24;

    await redisClient.set(key, user._id.toString(), hoursForExpiration * 3600);

    return res.status(200).send({ token });
  }

  /**
   * Sign-out a user based on the token
   */
  static async getDisconnect(req, res) {
    const { userId, key } = await userUtils.getUserIdAndKey(req);
    if (!userId) return res.status(401).send({ error: 'Unauthorized' });
    await redisClient.del(key);

    return res.status(204).send();
  }
}

export default AuthController;