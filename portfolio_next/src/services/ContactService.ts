/* eslint-disable  @typescript-eslint/no-unused-vars */
import "reflect-metadata";

import axios, { AxiosResponse } from 'axios';
import { injectable, interfaces } from 'inversify';

export interface IContactService {
  submit: (data: FormData) => Promise<boolean>
}

export namespace IContactService {
  export const $: interfaces.ServiceIdentifier<IContactService> = Symbol('IContactService');
}

interface ContactResponse {
  next: string
  ok: boolean
};

@injectable()
export class ContactService implements IContactService {
  async submit (data: FormData): Promise<boolean> {
    const response: AxiosResponse<ContactResponse> =
            await axios.post('https://formspree.io/f/xjvpddee', data);
    return response.status === 200 && response.data.ok;
  }
}
