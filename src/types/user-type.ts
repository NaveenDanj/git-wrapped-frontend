export interface UserState {
    id: number;
    githubId: string;
    displayName: string;
    email: string;
    username: string;
    avatarURL: string;
    isActive: boolean;
}

export type GetCurrentUserResponse = {
    user: UserState;
    token: string;
}