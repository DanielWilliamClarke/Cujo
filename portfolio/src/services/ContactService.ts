import axios, { AxiosResponse } from "axios";
import { interfaces } from "inversify";

export interface IContactService {
    submit(data: FormData): Promise<boolean>;
}

export namespace IContactService {
    export const $: interfaces.ServiceIdentifier<IContactService> = Symbol('IContactService');
}

type ContactResponse = {
    next: string;
    ok: boolean;
}

export class ContactService implements IContactService {
    async submit(data: FormData): Promise<boolean> {
        const response: AxiosResponse<ContactResponse> =
            await axios.post("https://formspree.io/f/xjvpddee", data);
        return response.status === 200 && response.data.ok;
    }
}