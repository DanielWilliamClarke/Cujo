import 'reflect-metadata';
import { Container } from 'inversify';

import { ContactService, IContactService } from '@Services/ContactService';
import { IDateService, DateService } from '@Services/DateService';
import { IconService, IIconService } from '@Services/IconService';

export const container = new Container();

// Setup DateService
container.bind<IDateService>(IDateService.$).to(DateService);

// Setup ContactService
container
  .bind<IContactService>(IContactService.$)
  .to(ContactService)
  .inSingletonScope();

// Setup IconService
container.bind<IIconService>(IIconService.$).to(IconService).inSingletonScope();
