export interface Page {
    id: string;

    /** Title */
    title: string;

    /** List of subreddits */
    subreddits: string[];

    /** Social media platform */
    platform: Platforms;

    /** Description */
    description?: string;

    /** How many posts per day (max 24) */
    period: number;

    /** Link */
    url: string;

    /** Does the title translate */
    isTitleTranslated: boolean;
    hideTitle: boolean;
}

export enum Platforms {
    Vk = 'VK',
    Instagram = 'INSTAGRAM'
}

export interface Post {
    _id: string;
    title?: string;
    media?: string;
    subreddit: string;
    upvote_ratio: number;
    ups: number;
    permalink: string;
    status: PostStatus;
    page: string;
    createdAt: Date;
    postedAt: Date;
}

export enum PostStatus {
    Idle = 'IDLE',
    Scheduled = 'SCHEDULED',
    Posted = 'POSTED'
}
