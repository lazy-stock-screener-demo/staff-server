import { Middleware } from "./middleware/Middleware";
import { authCache } from "../../../../auth/infra/cache";

const middleware = new Middleware(authCache);

export { middleware };
