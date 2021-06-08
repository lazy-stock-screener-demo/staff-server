export default (mongoose) => {
  const User = new mongoose.Schema({});
  return mongoose.model("User", User);
};
