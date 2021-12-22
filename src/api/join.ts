import { AllInfo } from './allinfo';

export interface JoinRequest {
    msg: string;
}

export interface JoinResponse {
    id: number;
    info: AllInfo;
}
