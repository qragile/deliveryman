import jwt from 'jsonwebtoken';
import config from './config';
const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: 'Token is not supplied.' });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ message: 'Admin Token is not valid.' });
};

const isMeli = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isMeli) {
    return next();
  }
  return res.status(401).send({ message: 'Meli Token is not valid.' });
};
const getTokenMeli = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isMeli: meliUser.isMeli,
      license: meliUser.License,
      acountNumber: meliUser.AcountNumber, 
    },
    config.JWT_SECRET,
    {
      expiresIn: '48h',
    }
  );
};

export { getToken, getTokenMeli, isAuth, isAdmin, isMeli };
