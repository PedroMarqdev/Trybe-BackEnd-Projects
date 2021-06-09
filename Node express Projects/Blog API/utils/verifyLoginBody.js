const genericError = 'Invalid fields';
const verifyLoginFields = (body) => {
  if (!body) throw new Error(genericError);
  if (body.email === '') throw new Error('"email" is not allowed to be empty');
  if (body.password === '') throw new Error('"password" is not allowed to be empty');
};
const verifyLoginBody = async (body, User) => {
  verifyLoginFields(body);
  if (!body.email) throw new Error('"email" is required');
  if (!body.password) throw new Error('"password" is required');
  const result = await User.findOne({
    where: { email: body.email, password: body.password },
  });
  if (!result) throw new Error(genericError);
  return result;
};

module.exports = verifyLoginBody;
