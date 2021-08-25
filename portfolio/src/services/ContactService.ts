import axios, { AxiosResponse } from "axios";
import { injectable } from "inversify";

export interface IContactService {
    submit (data: FormData, callback: (success: boolean) => void): Promise<void>;
}

type ContactResponse = {
    next: string;
    ok: boolean;
}

@injectable()
export class ContactService {
    async submit (data: FormData, callback: (success: boolean) => void): Promise<void> {
        const response: AxiosResponse<ContactResponse> =
            await axios.post("https://formspree.io/f/xjvpddee", data);
        callback(response.status === 200 && response.data.ok);
    }
}