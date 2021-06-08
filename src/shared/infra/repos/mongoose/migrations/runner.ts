async function runner(promises) {
  for (let command of promises) {
    try {
      await command();
    } catch (err) {
      if (err.Error) {
        if (err.Error.DocumentNotFoundError) {
          console.log(`>>> Passable error occurred: DocumentNotFoundError`);
        }
      } else {
        console.log(err);
        throw new Error(err);
      }
      console.log(err);
      throw new Error(err);
    }
  }
}

export default {
  run: runner,
};
