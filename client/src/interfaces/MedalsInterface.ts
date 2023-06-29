export interface MedalInterface {
    MedalID: string;
    Name: string;
    Link: string;
    Description: string;
    Restriction: string;
    Grouping: string;
    Instructions?: string | null;
    Solution: string;
    Mods?: string | null;
    Locked?: string | null;
    Video?: string | null;
    Date: string;
    PackID?: string | null;
    FirstAchievedDate?: string | null;
    FirstAchievedBy?: string | null;
    ModeOrder: string;
    Ordering: string;
    Rarity: string;
}
