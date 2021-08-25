import { Container } from "inversify";
import { BlogService, IBlogService } from "./services/BlogService";
import { ContactService, IContactService } from "./services/ContactService";
import { IDateService, DateService } from "./services/DateService";

export const container = new Container();

// Setup DateService
container.bind<IDateService>("DateService").to(DateService);

// Setup BlogService
container.bind<IBlogService>("BlogService").to(BlogService).inSingletonScope();

// Setup ContactService 
container.bind<IContactService>("ContactService").to(ContactService).inSingletonScope();