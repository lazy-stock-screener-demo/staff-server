import models from "../schemas";

(async function bindHooksForAggregateRoots() {
  const { Staff } = models;

  console.log("[Hooks]: Sequelize hooks setup.");
})();
