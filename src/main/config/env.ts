export const env = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node',
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'ct-1c049v3',
};
