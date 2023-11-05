/* eslint-disable  @typescript-eslint/no-unused-vars */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { injectable, interfaces } from 'inversify';
import 'reflect-metadata';

export interface IContactService {
  submit: (data: FormData) => Promise<string>;
}

export namespace IContactService {
  export const $: interfaces.ServiceIdentifier<IContactService> =
    Symbol('IContactService');
}

interface ContactResponse {
  next: string;
  ok: boolean;
}

@injectable()
export class ContactService implements IContactService {
  async submit(data: FormData): Promise<string> {
    try {
      const response: AxiosResponse<ContactResponse> = await axios.post(
        'https://formspree.io/f/xjvpddee',
        data,
      );

      if (response.status === 200 && response.data.ok) {
        return 'Thanks for your message!';
      }

      return 'Your message was not sent, please try again!';
    } catch (ex) {
      const { response } = ex as AxiosError<any>;

      const [error] = response?.data?.errors || [];
      if (!error) {
        return response?.data.error;
      }

      return `${error.field} ${error.message}`;
    }
  }
}
