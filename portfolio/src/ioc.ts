import { Container } from "inversify";

import { CujoService, ICujoService } from "./services/CujoService";
import { ContactService, IContactService } from "./services/ContactService";
import { IDateService, DateService } from "./services/DateService";
import { IconService, IIconService } from "./services/IconService";

export const container = new Container();

// Setup DateService
container.bind<IDateService>(IDateService.$).to(DateService);

// Setup BlogService
container.bind<ICujoService>("CujoService").to(CujoService).inSingletonScope();

// Setup ContactService
container.bind<IContactService>(IContactService.$).to(ContactService).inSingletonScope();

// Setup IconService
container.bind<IIconService>(IIconService.$).to(IconService).inSingletonScope();