const oAuthApp = process.env.NODE_ENV === 'development' ? {
  clientID: '751756c22465da9c74a2',
  clientSecret: '182e15aca7a214bd5bf0d57ed558cf384af814f3',
} : {
  clientID: 'fc609eafebad9c228174',
  clientSecret: '1c851fc9ae1c7ee50c22a32cae9857daeb1cff59',
};

export default {
  ...oAuthApp,
  repo: 'zeronight.github.io',
  owner: 'zeronight',
  admin: ['zeronight'],
};
