import { glob } from "glob";
import { container, singleton } from "tsyringe";
import Router from "../router/router";
import ExpressConfiguration from "./express.configuration";

@singleton()
export default class RouteConfiguration {
  constructor(private readonly expressConfiguration: ExpressConfiguration) {
    this.registerRoutes();
  }

  private registerRoutes() {
    const routers = glob.sync("./src/router/*.router.ts");
    routers.forEach((routerFile) => {
      const routerPathFromCurrentFile = routerFile.replace("src", "..");
      const router: Router = container.resolve(require(routerPathFromCurrentFile).default);
      this.expressConfiguration.expressApplication.use(router.path(), router.get());
    });
  }
}
