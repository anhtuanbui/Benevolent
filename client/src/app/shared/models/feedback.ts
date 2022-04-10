export interface IFeedback {
    fullName: string;
    phoneNumber: string;
    email: string;
    surburb: string;
    timeToCall: string;
    message: string;
    receivedTime: Date;
    appUserId: string;
    id: number;
}

export class Feedback {
    fullName: string = '';
    phoneNumber: string = '';
    email: string = '';
    surburb: string = '';
    timeToCall: string = '';
    message: string = '';
    receivedTime: Date = new Date();
    appUserId: string = '';
    id: number = 0;
}