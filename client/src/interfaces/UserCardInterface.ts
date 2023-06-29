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
    db_info: DbInfo;
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
    playstyle?: string[];
    post_count: number;
    profile_order: string[];
    title: string;
    twitter: string;
    website: string;
    country: Country;
    cover: Cover;
    is_restricted: boolean;
    account_history: any;
    active_tournament_banner: any;
    badges: BadgesEntity[];
    favourite_beatmapset_count: number;
    follower_count: number;
    graveyard_beatmapset_count: number;
    groups: GroupsEntity[];
    loved_beatmapset_count: number;
    monthly_playcounts: MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity[];
    page: Page;
    pending_beatmapset_count: number;
    previous_usernames: any;
    ranked_beatmapset_count: number;
    replays_watched_counts: MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity[];
    scores_first_count: number;
    statistics: Statistics;
    support_level: number;
    user_achievements: UserAchievementsEntity[];
    rank_history: RankHistory;
}

export interface DbInfo {
    global_rank: RankHistory[];
    country_rank: RankHistory[];
    setup?: Setup,
    ranks: {
        xh: number,
        x: number,
        sh: number,
        s: number,
        a: number,
        b: number,
        c: number,
        d: number,
    },
}

export interface RankHistory {
    date: Date,
    rank: number
}

export interface Setup {
    peripherals?: Peripherals;
    tablet?: Tablet;
    keyboard?: Keyboard;
    mouse?: Mouse
}

export interface Mouse {
    dpi?: number;
}

export interface Peripherals {
    monitor?: string;
    headphones?: string;
    microphone?: string;
    tablet?: string;
    mouse?: string;
    keyboard?: string;
    keypad?: string;
    mousepad?: string;
    chair?: string;
}

export interface Tablet {
    maxArea: MaxArea;
    area: Area;
    drivers: string;
    filters: string[];
}

export interface MaxArea {
    x: number;
    y: number;
}

export interface Area {
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
}

export interface Keyboard {
    format: string;
    inputs: string[];
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
    data: number[];
}

export interface Statistics {
    count_100: number;
    count_300: number;
    count_50: number;
    count_geki: number;
    count_katu: number;
    count_miss: number;
}