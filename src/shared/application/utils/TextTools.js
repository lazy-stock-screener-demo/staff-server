const TextTools = {};

TextTools.createRandomNumericString = function (numberDigits) {
  const chars = "0123456789";
  let value = "";

  for (let i = numberDigits; i > 0; --i) {
    value += chars[Math.round(Math.random() * (chars.length - 1))];
  }

  return value;
};

TextTools.extractSubString = function (char) {
  return char.substring(0, 13);
};

TextTools.addHyphen2String = function (char) {
  char = char.replace(/(\w{8})(\w{4})/, "$1-$2");
  return char;
};

module.exports = TextTools;
