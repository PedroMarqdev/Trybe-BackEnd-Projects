const verifyUserBodyFields = (body) => {
  if (!body) throw new Error('Body is required');
  console.log(body);
  if (!body.email) throw new Error('"email" is required');
  if (!body.password) throw new Error('"password" is required');
  if (!body.displayName) throw new Error('"displayName" is required');
};
const verifyUserBody = (body) => {
  const minimumSizePassword = 6;
  const minimumSizeDisplayName = 8;
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  verifyUserBodyFields(body);
  if (body.displayName.length < minimumSizeDisplayName) {
    throw new Error('"displayName" length must be at least 8 characters long');
  }
  if (body.password.length < minimumSizePassword) {
    throw new Error('"password" length must be 6 characters long');
  }
  if (!emailRegex.test(body.email)) throw new Error('"email" must be a valid email');
};

module.exports = verifyUserBody;
