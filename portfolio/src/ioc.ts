import { Container } from "inversify";
import { BlogService, IBlogService } from "./services/BlogService";
import { IDateService, DateService } from "./services/DateService";

export const container = new Container();

// Setup DateService
container.bind<IDateService>("DateService").to(DateService);

// Setup BlogService
container.bind<IBlogService>("BlogService").to(BlogService).inSingletonScope();