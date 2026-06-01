import type { WrappedSlidesStat } from "../types/wrapped-type";

export interface StorySlide {
    id: number;
    icon: string;
    title: string;
    value: string;
    color: string;
    iconImage?: string;
}

export class SlideGenerator {

    static generateSlides(year: number, wrappedData: WrappedSlidesStat): StorySlide[] {
        if (!wrappedData) return [];

        const topLanguage = Object.entries(wrappedData.languageStats as Record<string, number>)
            .sort(([, a], [, b]) => b - a)[0]?.[0] || 'N/A';

        const topRepo = wrappedData.activeRepos[0].repo;

        return [
            {
                id: 1,
                icon: '🎉',
                title: 'Your GitHub Story',
                value: `A look back at your ${year} journey`,
                color: 'from-blue-500 to-blue-600',
            },
            {
                id: 2,
                icon: '👤',
                title: wrappedData.introStats.username,
                value: `${wrappedData.introStats.followers} followers`,
                color: 'from-purple-500 to-purple-600',
            },
            {
                id: 3,
                icon: '📊',
                title: 'Total Contributions',
                value: wrappedData.introStats.totalContributions.toLocaleString(),
                color: 'from-pink-500 to-pink-600',
            },
            {
                id: 4,
                icon: '📦',
                title: 'Public Repositories',
                value: wrappedData.introStats.public_repos.toString(),
                color: 'from-indigo-500 to-indigo-600',
            },
            {
                id: 5,
                icon: '💻',
                title: 'Commits',
                value: wrappedData.totalActivityStats.totalCommits.toLocaleString(),
                color: 'from-green-500 to-green-600',
            },
            {
                id: 6,
                icon: '🔀',
                title: 'Pull Requests',
                value: wrappedData.totalActivityStats.totalPRs.toString(),
                color: 'from-orange-500 to-orange-600',
            },
            {
                id: 7,
                icon: '🐛',
                title: 'Issues',
                value: wrappedData.totalActivityStats.totalIssues.toString(),
                color: 'from-red-500 to-red-600',
            },
            {
                id: 8,
                icon: '🔗',
                title: 'Repos Contributed To',
                value: wrappedData.totalActivityStats.totalRepoContributedTo.toString(),
                color: 'from-teal-500 to-teal-600',
            },
            {
                id: 9,
                icon: '🔥',
                title: 'Longest Streak',
                value: `${wrappedData.streakStats.longestStreak.count} days`,
                color: 'from-amber-500 to-amber-600',
            },
            {
                id: 10,
                icon: '🌟',
                title: 'Current Streak',
                value: `${wrappedData.streakStats.currentStreak.count} days`,
                color: 'from-yellow-500 to-yellow-600',
            },
            {
                id: 11,
                icon: '📅',
                title: 'Active Days',
                value: wrappedData.streakStats.activeDays.toString(),
                color: 'from-cyan-500 to-cyan-600',
            },
            {
                id: 12,
                icon: '⭐',
                title: 'Top Language',
                value: topLanguage,
                color: 'from-green-400 to-green-600',
            },
            {
                id: 13,
                icon: '📝',
                title: 'Merged PRs',
                value: wrappedData.prStats.mergedPRCount.toString(),
                color: 'from-lime-500 to-lime-600',
            },
            {
                id: 14,
                icon: '✨',
                title: 'Merge Rate',
                value: wrappedData.prStats.mergeRate,
                color: 'from-emerald-500 to-emerald-600',
            },
            {
                id: 17,
                icon: '🏆',
                title: 'Most Active Repository',
                value: topRepo,
                color: 'from-fuchsia-500 to-fuchsia-600',
            },
            {
                id: 15,
                icon: '🎯',
                title: 'Your Type',
                value: wrappedData.personality.personality.type,
                color: 'from-violet-500 to-violet-600',
            },
        ];

    }

}