export interface User {
    avatar_url: string;
    country_code: string;
    default_group: string;
    id: number;
    is_active: boolean;
    is_bot: boolean;
    is_deleted: boolean;
    is_online: boolean;
    is_supporter: boolean;
    last_visit: string;
    pm_friends_only: boolean;
    profile_colour: string;
    username: string;
    cover_url: string;
    discord: string;
    db_rank_history: {
        global_rank: [{ date: Date, rank: number }],
        country_rank: [{ date: Date, rank: number }]
    },
    has_supported: boolean;
    interests: string;
    join_date: string;
    kudosu: Kudosu;
    location: string;
    rank_highest: { rank: number };
    max_blocks: number;
    max_friends: number;
    occupation: string;
    playmode: string;
    playstyle: (string)[];
    post_count: number;
    profile_order: (string)[];
    title: string;
    twitter: string;
    website: string;
    country: Country;
    cover: Cover;
    is_restricted: boolean;
    account_history: any;
    active_tournament_banner: any;
    badges: (BadgesEntity)[];
    favourite_beatmapset_count: number;
    follower_count: number;
    graveyard_beatmapset_count: number;
    groups: (GroupsEntity)[];
    loved_beatmapset_count: number;
    monthly_playcounts: (MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity)[];
    page: Page;
    pending_beatmapset_count: number;
    previous_usernames: any;
    ranked_beatmapset_count: number;
    replays_watched_counts: (MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity)[];
    scores_first_count: number;
    statistics: Statistics;
    support_level: number;
    user_achievements: (UserAchievementsEntity)[];
    rank_history: RankHistory;
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
    id: number;
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
    data: (number)[];
}

export interface userScoreSmall {
    position: number;
    score: ScoreInterface;
}

export interface ScoreInterface {
    accuracy: number;
    best_id: number;
    created_at: string;
    id: number;
    max_combo: number;
    mode: string;
    mode_int: number;
    mods: string[];
    passed: boolean;
    perfect: boolean;
    pp: number;
    rank: string;
    replay: boolean;
    score: number;
    statistics: Statistics;
    type: string;
    user_id: number;
    current_user_attributes: CurrentUserAttributes;
    beatmap: Beatmap;
    beatmapset: Beatmapset;
    user: UserBeatmap;
    weight: Weight;
}

export interface Statistics {
    count_100: number;
    count_300: number;
    count_50: number;
    count_geki: number;
    count_katu: number;
    count_miss: number;
}

export interface CurrentUserAttributes {
    pin: boolean;
}

export interface Beatmap {
    beatmapset_id: number;
    difficulty_rating: number;
    id: number;
    mode: string;
    status: string;
    total_length: number;
    user_id: number;
    version: string;
    accuracy: number;
    ar: number;
    bpm: number;
    convert: boolean;
    count_circles: number;
    count_sliders: number;
    count_spinners: number;
    cs: number;
    deleted_at: string;
    drain: number;
    hit_length: number;
    is_scoreable: boolean;
    last_updated: string;
    mode_int: number;
    passcount: number;
    playcount: number;
    ranked: number;
    url: string;
    checksum: string;
}

export interface Beatmapset {
    artist: string;
    artist_unicode: string;
    covers: Covers;
    creator: string;
    favourite_count: number;
    hype: number;
    id: number;
    nsfw: boolean;
    offset: number;
    play_count: number;
    preview_url: string;
    source: string;
    spotlight: boolean;
    status: string;
    title: string;
    title_unicode: string;
    track_id: number;
    user_id: number;
    video: boolean;
}

export interface Covers {
    cover: string;
    "cover@2x": string;
    card: string;
    "card@2x": string;
    list: string;
    "list@2x": string;
    slimcover: string;
    "slimcover@2x": string;
}

export interface UserBeatmap {
    avatar_url: string;
    country_code: string;
    default_group: string;
    id: number;
    is_active: boolean;
    is_bot: boolean;
    is_deleted: boolean;
    is_online: boolean;
    is_supporter: boolean;
    last_visit: string;
    pm_friends_only: boolean;
    profile_colour: string;
    username: string;
}

export interface Weight {
    percentage: number;
    pp: number;
}
