import {create} from "zustand";
import {ColorsType} from "../interfaces/ColorsInterface";
import {produce} from "immer";

export interface CompactUser {
    username: string,
    id: number,
    img: string,
}

export interface UserSettingsType {
    logged: boolean;
    user?: CompactUser | undefined;
    setUser: (user: CompactUser) => void;
    removeUser: () => void;
}

export const userSettings = create<UserSettingsType>(
    (set) => ({
        logged: false,
        setUser: (newUser: CompactUser) => {
            set({user: newUser, logged: true})
        },
        removeUser: () => {
            set({user: undefined, logged: false})
        }

    })
)

export interface ColorSettingsType {
    colors: ColorsType;
    setBg: (newColor: string) => void;
    setFont: (newColor: string) => void;
    setMain: (newColor: string) => void;
}

export const colorsSettings = create<ColorSettingsType>(
    (set) => ({
        colors: {
            ui: {
                font: '#f5f5f5',
                bg: '#212529',
                main: '#b74757',
            },
            judgements: {
                x300: '#78dcec',
                x100: '#88e55d',
                x50: '#fdfd97',
                xMiss: '#f87454',
            },
            ranks: {
                xh: '#ffffff',
                x: '#faf56a',
                sh: '#f8f4f4',
                s: '#ffdc4c',
                a: '#88e55d',
                b: '#78dcec',
                c: '#bc64f4',
                d: '#f87454',
                f: '#aaaaaa'
            },
            charts: {
                lvl: '#ffffff',
                skills: '#ffffff',
                global: '#ffdc4c',
                country: '#ffdc4c',
                plays: '#ffdc4c',
                topPp: '#78dcec'
            }
        },
        setBg: (newColor: string) => {
            set(produce((state: ColorSettingsType) => {
                state.colors.ui.bg = newColor;
            }));
        },
        setFont: (newColor: string) => {
            set(produce((state: ColorSettingsType) => {
                state.colors.ui.font = newColor;
            }));
        },
        setMain: (newColor: string) => {
            set(produce((state: ColorSettingsType) => {
                state.colors.ui.main = newColor;
            }));
        },
    })
)

export interface ModeSettingsType {
    mode: string,
    setMode: (newMode: string) => void;
}

export const modeSettings = create<ModeSettingsType>(
    (set) => ({
        mode: 'osu',
        setMode: (newMode: string) => {
            set({mode: newMode});
        }
    })
)

export interface VolumeSettingsType {
    volume: number,
    realVolume: number,
    mute: boolean,
    setVolume: (newVolume: number) => void;
    toggleMute: () => void;
}

export const volumeSettings = create<VolumeSettingsType>(
    (set) => ({
        volume: 10,
        realVolume: 10,
        mute: false,
        setVolume: (newVolume: number) => {
            set({volume: newVolume});
            set(() => ({mute: false}));
            set((state) => ({realVolume: state.volume}))
        },
        toggleMute: () => {
            set((state) => ({mute: !state.mute}));
            set((state) => ({realVolume: state.mute ? 0 : state.volume}))
        },
    })
)