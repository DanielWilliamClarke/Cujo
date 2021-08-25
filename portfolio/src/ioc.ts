import { Container } from "inversify";
import { CujoService, ICujoService } from "./services/CujoService";
import { ContactService, IContactService } from "./services/ContactService";
import { IDateService, DateService } from "./services/DateService";

export const container = new Container();

// Setup DateService
container.bind<IDateService>("DateService").to(DateService);

// Setup BlogService
container.bind<ICujoService>("CujoService").to(CujoService).inSingletonScope();

// Setup ContactService 
container.bind<IContactService>("ContactService").to(ContactService).inSingletonScope();