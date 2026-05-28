export interface Wrapped {
    id: string;
    githubUsername: string;
    userId: number;
    title: string;
    type: 'yearly' | 'monthly' | 'weekly' | 'daily';
    status: 'pending' | 'completed' | 'failed';
    year: number;
    jobId: string;
    data: WrappedSlidesStat;
    createdAt: Date;
}

export interface PersonalityType {
    readonly type: 'Builder' | 'Explorer' | 'Fixer';
    readonly description: string;
}

export interface WrappedSlidesStat {
    introStats: IntroStats;
    totalActivityStats: TotalActivityStats;
    streakStats: StreakStats;
    languageStats: { [key: string]: number; };
    prStats: PRStats;
    personality: { personality: PersonalityType; score: number };
    activeRepos: { repo: string, commitCount: number }[];
}

export interface IntroStats {
    username: string;
    avatar: string;
    followers: number;
    following: number;
    public_repos: number;
    public_gists: number;
    created_at: string;
    location: string;
    totalContributions: number;
}

export interface TotalActivityStats {
    totalCommits: number;
    totalPRs: number;
    totalIssues: number;
    totalRepoContributedTo: number;
}

export interface PRStats {
    mergedPRCount: number;
    totalPRCount: number;
    mergeRate: string;
}

export interface StreakStats {
    activeDays: number;
    longestStreak: {
        count: number;
        startDate: string;
        endDate: string;
    };
    currentStreak: {
        count: number;
        startDate: string;
        endDate: string;
    };
    mostActiveDay: {
        date: string;
        count: number;
    };
}