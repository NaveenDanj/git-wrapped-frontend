import type { UserState } from "./user-type";

export interface Comment {
    id: string;
    wrappedId: string;
    userId: number;
    user: UserState;
    content: string;
    createdAt: Date;
}