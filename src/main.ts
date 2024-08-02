import "reflect-metadata";
import { container } from "tsyringe";
import EnvironmentConfiguration from "./configuration/environment.configuration";
import ExpressConfiguration from "./configuration/express.configuration";
import FirebaseConfiguration from "./configuration/firebase.configuration";
import RouteConfiguration from "./configuration/route.configuration";

const main = () => {
  const environmentConfiguration = container.resolve(EnvironmentConfiguration);
  const expressApplication = container.resolve(ExpressConfiguration).expressApplication;
  container.resolve(RouteConfiguration);
  container.resolve(FirebaseConfiguration);
  const port = environmentConfiguration.getIntValue("SERVER_PORT");
  expressApplication.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
};

main();
