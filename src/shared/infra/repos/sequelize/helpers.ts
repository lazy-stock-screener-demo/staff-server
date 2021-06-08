function toCamelCase(str) {
  const _ = str.indexOf("_");
  if (~_) {
    return toCamelCase(
      str.substring(0, _) +
        str
          .substring(_ + 1)
          .substring(0, 1)
          .toUpperCase() +
        str.substring(_ + 2)
    );
  } else {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  }
}

export { toCamelCase };
