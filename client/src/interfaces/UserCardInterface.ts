export interface User {
    avatar_url?: string;
    country_code?: string;
    default_group?: string;
    id?: number;
    is_active?: boolean;
    is_bot?: boolean;
    is_deleted?: boolean;
    is_online?: boolean;
    is_supporter?: boolean;
    last_visit?: string;
    pm_friends_only?: boolean;
    profile_colour?: string;
    username?: string;
    cover_url?: string;
    discord?: string;
    has_supported?: boolean;
    interests?: null;
    join_date?: string;
    kudosu?: Kudosu;
    location?: null;
    max_blocks?: number;
    max_friends?: number;
    occupation?: null;
    playmode?: string;
    playstyle?: (string)[] | null;
    post_count?: number;
    profile_order?: (string)[] | null;
    title?: null;
    twitter?: string;
    website?: string;
    country?: Country;
    cover?: Cover;
    is_restricted?: boolean;
    account_history?: (null)[] | null;
    active_tournament_banner?: null;
    badges?: (BadgesEntity)[] | null;
    favourite_beatmapset_count?: number;
    follower_count?: number;
    graveyard_beatmapset_count?: number;
    groups?: (GroupsEntity)[] | null;
    loved_beatmapset_count?: number;
    monthly_playcounts?: (MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity)[] | null;
    page?: Page;
    pending_beatmapset_count?: number;
    previous_usernames?: (null)[] | null;
    ranked_beatmapset_count?: number;
    replays_watched_counts?: (MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity)[] | null;
    scores_first_count?: number;
    statistics?: Statistics;
    support_level?: number;
    user_achievements?: (UserAchievementsEntity)[] | null;
    rank_history?: RankHistory;
}
export interface Kudosu {
    total: number;
    available: number;
}
export interface Country {
    code: string;
    name: string;
}
export interface Cover {
    custom_url: string;
    url: string;
    id?: null;
}
export interface BadgesEntity {
    awarded_at: string;
    description: string;
    image_url: string;
    url: string;
}
export interface GroupsEntity {
    id: number;
    identifier: string;
    name: string;
    short_name: string;
    description: string;
    colour: string;
}
export interface MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity {
    start_date: string;
    count: number;
}
export interface Page {
    html: string;
    raw: string;
}
export interface Statistics {
    level: Level;
    pp: number;
    global_rank: number;
    ranked_score: number;
    hit_accuracy: number;
    play_count: number;
    play_time: number;
    total_score: number;
    total_hits: number;
    maximum_combo: number;
    replays_watched_by_others: number;
    is_ranked: boolean;
    grade_counts: GradeCounts;
    rank: Rank;
}
export interface Level {
    current: number;
    progress: number;
}
export interface GradeCounts {
    ss: number;
    ssh: number;
    s: number;
    sh: number;
    a: number;
}
export interface Rank {
    global: number;
    country: number;
}
export interface UserAchievementsEntity {
    achieved_at: string;
    achievement_id: number;
}
export interface RankHistory {
    mode: string;
    data?: (number)[] | null;
}
