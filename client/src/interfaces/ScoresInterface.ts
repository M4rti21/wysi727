export interface ScoresType {
    best: Best;
    firsts: Firsts;
    pinned: Pinned;
    recent: Pinned;
}

export interface Best {
    items: ItemsEntity[];
    pagination: Pagination;
    count: number;
}

export interface ItemsEntity {
    accuracy: number;
    beatmap_id: number;
    ended_at: string;
    max_combo: number;
    maximum_statistics: MaximumStatistics;
    mods: ModsEntity[];
    passed: boolean;
    rank: string;
    ruleset_id: number;
    statistics: Statistics;
    total_score: number;
    user_id: number;
    best_id: number;
    id: number;
    legacy_perfect: boolean;
    pp: number;
    replay: boolean;
    type: string;
    current_user_attributes: CurrentUserAttributes;
    beatmap: Beatmap;
    beatmapset: Beatmapset;
    user: User;
    weight: Weight;
}

export interface MaximumStatistics {
    miss: number;
}

export interface ModsEntity {
    acronym: string;
}

export interface Statistics {
    perfect?: number;   // 320
    great: number;      // 300
    good?: number;      // 200
    ok: number;         // 100
    meh: number;        // 50
    miss: number;       // 0
}

export interface CurrentUserAttributes {
    pin: null;
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
    deleted_at: null;
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
    hype: null;
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
    track_id: null;
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
    profile_colour: null;
    username: string;
}

export interface Weight {
    percentage: number;
    pp: number;
}

export interface Pagination {
    hasMore: boolean;
}

export interface Firsts {
    items: (ItemsEntity1)[];
    pagination: Pagination;
    count: number;
}

export interface ItemsEntity1 {
    accuracy: number;
    beatmap_id: number;
    ended_at: string;
    max_combo: number;
    maximum_statistics: MaximumStatistics;
    mods: ModsEntity1[];
    passed: boolean;
    rank: string;
    ruleset_id: number;
    statistics: Statistics;
    total_score: number;
    user_id: number;
    best_id: number;
    id: number;
    legacy_perfect: boolean;
    pp: number;
    replay: boolean;
    type: string;
    current_user_attributes: CurrentUserAttributes;
    beatmap: Beatmap;
    beatmapset: Beatmapset1;
    user: User;
}

export interface ModsEntity1 {
    acronym: string;
}

export interface Beatmapset1 {
    artist: string;
    artist_unicode: string;
    covers: Covers;
    creator: string;
    favourite_count: number;
    hype: null;
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

export interface Pinned {
    items: ItemsEntity2[];
    pagination: Pagination;
    count: number;
}

export interface ItemsEntity2 {
    accuracy: number;
    beatmap_id: number;
    ended_at: string;
    max_combo: number;
    maximum_statistics: MaximumStatistics;
    mods: ModsEntity[];
    passed: boolean;
    rank: string;
    ruleset_id: number;
    statistics: Statistics1;
    total_score: number;
    user_id: number;
    best_id: number;
    id: number;
    legacy_perfect: boolean;
    pp: number;
    replay: boolean;
    type: string;
    current_user_attributes: CurrentUserAttributes;
    beatmap: Beatmap;
    beatmapset: Beatmapset1;
    user: User;
}

export interface Statistics1 {
    great: number;
    ok: number;
}
