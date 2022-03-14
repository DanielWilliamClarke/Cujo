import axios, { AxiosResponse } from "axios";
import { injectable } from "inversify";

export interface IContactService {
    submit (data: FormData): Promise<boolean>;
}

type ContactResponse = {
    next: string;
    ok: boolean;
}

@injectable()
export class ContactService implements IContactService {
    async submit (data: FormData): Promise<boolean> {
        const response: AxiosResponse<ContactResponse> =
            await axios.post("https://formspree.io/f/xjvpddee", data);
        return response.status === 200 && response.data.ok;
    }
}