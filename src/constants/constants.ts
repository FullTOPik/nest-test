const maxAge = 24 * 60 * 60 * 1000; //24h*
const accessTokenLifeTime = process.env.ACCESS_TOKEN_LIFE_TIME;
const refreshTokenLifeTime = process.env.REFRESH_TOKEN_LIFE_TIME;
const PASSWORD_HASH_COST = parseInt(process.env.PASSWORD_HASH_COST);
const ROLES_KEY = "roles";
const paginationDefaultValues = {
  defaultLimit: 10,
  defaultPage: 1,
  maxLimit: 50,
  minLimit: 0,
};
const maxQuestionProperties = {
  maxLengthText: 500,
  maxLengthAnswer: 500,
};
const throttlerOptions = {
  time: 30,
  maxRequests: 10,
  maxRequestsUploadXml: 5,
};

export {
  maxAge,
  accessTokenLifeTime,
  refreshTokenLifeTime,
  PASSWORD_HASH_COST,
  ROLES_KEY,
  paginationDefaultValues,
  maxQuestionProperties,
  throttlerOptions,
};
