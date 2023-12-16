const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

class TokenService {
  constructor(Token, tokenTypes, config) {
    this.Token = Token;
    (this.tokenTypes = tokenTypes), (this.config = config);
  }
  generateToken(userId, expires, type, secret = this.config.jwt.secret) {
    const payload = {
      sub: userId,
      iat: dayjs().unix(),
      exp: expires.unix(),
      type,
    };

    return jwt.sign(payload, secret);
  }

  async saveToken(token, userId, expires, type, blacklisted = false) {
    const tokenDoc = await this.Token.create({
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    });
    return tokenDoc;
  }

  async verifyToken(token, type) {
    const payload = jwt.verify(token, this.config.jwt.secret);
    const tokenDoc = await this.Token.findOne({
      token,
      user: payload.sub,
      type,
      blacklisted: false,
    });
    if (!tokenDoc) {
      throw new Error('Token not found');
    }
    return tokenDoc;
  }

  async generateAuthTokens(userId) {
    const accessTokenExpires = dayjs().add(
      this.config.jwt.accessExpirationMinutes,
      'minutes',
    );
    const accessToken = this.generateToken(
      userId,
      accessTokenExpires,
      this.tokenTypes.ACCESS,
    );
    const refreshTokenExpires = dayjs().add(
      this.config.jwt.refreshExpirationDays,
      'days',
    );
    const refreshToken = this.generateToken(
      userId,
      refreshTokenExpires,
      this.tokenTypes.REFRESH,
    );
    await this.saveToken(
      refreshToken,
      userId,
      refreshTokenExpires,
      this.tokenTypes.REFRESH,
    );
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  }
}

module.exports = TokenService;
