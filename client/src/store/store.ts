import {create} from "zustand";
import {ColorsType} from "../interfaces/ColorsInterface";
import {produce} from "immer";

export interface CompactUser {
    username: string,
    id: number,
    avatar_url: string,
    lang?: {
        code?: string,
        name?: string,
    },
}

export interface UserSettingsType {
    logged: boolean;
    sessionUser?: CompactUser;
    setSessionUser: (user: CompactUser) => void;
    removeSessionUser: () => void;
}

export const userSettings = create<UserSettingsType>(
    (set) => ({
        logged: false,
        sessionUser: undefined,
        setSessionUser: (newUser: CompactUser) => {
            set({sessionUser: newUser, logged: true})
            languageStore.getState().setLang(newUser?.lang?.name ? newUser.lang.name : 'english', newUser?.lang?.code ? newUser.lang.code : 'gb');
        },
        removeSessionUser: () => {
            set({sessionUser: undefined, logged: false})
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
                x320: '#bbbbbb',
                x300: '#78dcec',
                x200: '#2266ff',
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
            beatmap: {
                graveyard: '#cccccc',
                wip: '#fe9967',
                pending: '#ffd966',
                ranked: '#66ccff',
                approved: '#b3ff66',
                qualified: '#66ccff',
                loved: '#fe67ab',
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

export interface ActiveLanguageType {
    name: string,
    code: string,
    text: TextType,
    english: TrueTextType,
    setLang: (name: string, code: string) => void,
}

export interface LanguagesType {
    english: TrueTextType,
    russian: TextType,
    german: TextType,
    turkish: TextType,
    serbian: TextType,
    spanish: TextType,
    catalan: TextType,
    latvian: TextType,
    italian: TextType,
    japanese: TextType,
    norwegian: TextType,
    esperanto: TextType,
    galician: TextType,
    portuguese: TextType,
    portugueseBr: TextType,
    polish: TextType,
    estonian: TextType,
    finnish: TextType,
    hungarian: TextType,
    dutch: TextType,
    chineseS: TextType,
    chineseT: TextType,
    afrikaans: TextType,
}

export interface TextType {
    dates?: {
        ago?: string,
        in?: string,
        year?: string,
        years?: string,
        month?: string,
        months?: string,
        day?: string,
        days?: string,
        hour?: string,
        hours?: string,
        minute?: string,
        minutes?: string,
        second?: string,
        seconds?: string,
    }
    navbar?: {
        home?: string,
        username?: string,
        loginWithOsu?: string,
        logout?: string,
        dmOnDiscord?: string,
        contribute?: string,
        development1?: string,
        development2?: string,
        helpTranslating?: string,
        wysiProfile?: string,
        osuProfile?: string,
    },
    home?: {
        welcome?: string,
        search?: string,
    },
    user?: {
        top?: {
            previous?: string,
            lvl?: string,
            joined?: string,
            peakGlobal?: string,
            peakCountry?: string,
            performance?: string,
            acc?: string,
            medals?: string,
            consistency?: string,
            speed?: string,
            stars?: string,
            aim?: string,
            skillsDisclaimer?: string,
            rankedScore?: string,
            maxCombo?: string,
            playTime?: string,
            playCount?: string,
        },
        bar?: {
            followers?: string,
            website?: string,
            location?: string,
            interests?: string,
            occupation?: string,
        },
        middle?: {
            setup?: {
                peripherals?: string,
                mouse?: string,
                keyboard?: string,
                tablet?: string,
                touch?: string,
                monitor?: string,
                headphones?: string,
                microphone?: string,
                keypad?: string,
                mousepad?: string,
                chair?: string,
            },
            graphs?: {
                info?: string,
                globalHistory?: string,
                countryHistory?: string,
                playsHistory?: string,
                topHitRatios?: string,
                topRankRatios?: string,
                top100plays?: string,
                top100?: string,
            }
        },
        scores?: {
            pinned?: string,
            first?: string,
            best?: string,
            recent?: string,
            duration?: string,
            bpm?: string,
            combo?: string,
            score?: string,
            playPause?: string,
            downloadMap?: string,
            share?: string,
        },
        medals?: {
            rarest?: string,
            recent?: string,
            achievedAt?: string,
        }
    }
}

export interface TrueTextType {
    dates: {
        ago: string,
        in: string,
        year: string,
        years: string,
        month: string,
        months: string,
        day: string,
        days: string,
        hour: string,
        hours: string,
        minute: string,
        minutes: string,
        second: string,
        seconds: string,
    }
    navbar: {
        home: string,
        username: string,
        loginWithOsu: string,
        logout: string,
        dmOnDiscord: string,
        contribute: string,
        development1: string,
        development2: string,
        helpTranslating: string,
        wysiProfile: string,
        osuProfile: string,
    },
    home: {
        welcome: string,
        search: string,
    },
    user: {
        top: {
            previous: string,
            lvl: string,
            joined: string,
            peakGlobal: string,
            peakCountry: string,
            performance: string,
            acc: string,
            medals: string,
            consistency: string,
            speed: string,
            stars: string,
            aim: string,
            skillsDisclaimer: string,
            rankedScore: string,
            maxCombo: string,
            playTime: string,
            playCount: string,
        },
        bar: {
            followers: string,
            website: string,
            location: string,
            interests: string,
            occupation: string,
        },
        middle: {
            setup: {
                peripherals: string,
                mouse: string,
                keyboard: string,
                tablet: string,
                touch: string,
                monitor: string,
                headphones: string,
                microphone: string,
                keypad: string,
                mousepad: string,
                chair: string,
            },
            graphs: {
                info: string,
                globalHistory: string,
                countryHistory: string,
                playsHistory: string,
                topHitRatios: string,
                topRankRatios: string,
                top100plays: string,
                top100: string,
            }
        },
        scores: {
            pinned: string,
            first: string,
            best: string,
            recent: string,
            duration: string,
            bpm: string,
            combo: string,
            score: string,
            playPause: string,
            downloadMap: string,
            share: string,
        },
        medals: {
            rarest: string,
            recent: string,
            achievedAt: string,
        }
    }
}

export const languagesStore = create<LanguagesType>(
    () => ({
        english: {
            dates: {
                ago: 'ago',     // example: 5 days "ago"
                in: 'in',       // example: release "in" 5 days
                year: 'year',
                years: 'years',
                month: 'month',
                months: 'months',
                day: 'day',
                days: 'days',
                hour: 'hour',
                hours: 'hours',
                minute: 'minute',
                minutes: 'minutes',
                second: 'second',
                seconds: 'seconds',
            },
            navbar: {
                home: 'Home',     // example: Home page
                username: 'Username',
                loginWithOsu: 'Login with osu!',
                logout: 'Logout',
                dmOnDiscord: 'DM me on Discord!',
                contribute: 'Contribute to the project!',
                development1: 'This website is still under development! Performance may not be optimal yet. Please feel free to DM me on',
                development2: 'if you encounter any problems!',
                helpTranslating: 'Help translating this website!',
                wysiProfile: '727!profile',
                osuProfile: 'osu!profile',
            },
            home: {
                welcome: 'Welcome to wysi727!',
                search: 'Search a osu!username on the top searchbar'
            },
            user: {
                top: {
                    previous: 'A.K.A',                  // example: also known as / previous usernames
                    lvl: 'lvl',                         // example: lvl 100 / level 100
                    joined: 'Joined at',                // example: Joined at 11/05/2020
                    peakGlobal: 'Peak Global Rank',     // example: Peak Global Rank: #2,301
                    peakCountry: 'Peak Country Rank',   // example: Peak Global Rank: #25
                    performance: 'Performance',         // example: Performance: 200pp / PP: 200pp
                    medals: 'Medals',
                    acc: 'Accuracy',
                    consistency: 'Consistency',
                    speed: 'Speed',
                    stars: 'Stars',
                    aim: 'Aim',
                    skillsDisclaimer: 'This chart uses a subjective formula which should not be taken as an actual metric',
                    rankedScore: 'Ranked Score',
                    maxCombo: 'Max Combo',
                    playTime: 'Play Time',
                    playCount: 'Play Count',
                },
                bar: {
                    followers: 'Followers',
                    website: 'Website',
                    location: 'Location',
                    interests: 'Interests',
                    occupation: 'Occupation',           // example: my "occupation" is student
                },
                middle: {
                    setup: {
                        peripherals: 'Peripherals',
                        mouse: 'Mouse',
                        keyboard: 'Keyboard',
                        tablet: 'Tablet',
                        touch: 'Touch Screen',
                        monitor: 'Monitor',
                        headphones: 'Headphones',
                        microphone: 'Microphone',
                        keypad: 'Keypad',
                        mousepad: 'Mousepad',
                        chair: 'Chair',
                    },
                    graphs: {
                        info: 'You can drag and zoom while holding "alt" on your keyboard',
                        globalHistory: 'Global Rank History',
                        countryHistory: 'Country Rank History',
                        playsHistory: 'Plays History',
                        top100: 'Top 100 stats',
                        topHitRatios: 'Hit ratios',
                        topRankRatios: 'Rank ratios',
                        top100plays: 'Top 100 plays',
                    },
                },
                scores: {
                    pinned: 'Pinned Scores',
                    first: 'First Place Scores',
                    best: 'Best PP Scores',
                    recent: 'Recent Scores',
                    duration: 'Duration',
                    bpm: 'BPM',
                    combo: 'Combo',
                    score: 'Score',
                    playPause: 'Play/Pause',            // example: play audio / pause audio
                    downloadMap: 'Download Map',
                    share: 'Share',
                },
                medals: {
                    rarest: 'Rarest Medal',
                    recent: 'Recently achieved medals',
                    achievedAt: 'Achieved at'
                }
            }
        },
        russian: {
            dates: {
                ago: 'назад',     // example: 5 days "ago"
                in: 'через',       // example: release "in" 5 days
                year: 'год',
                years: 'лет',
                month: 'месяц',
                months: 'месяцев',
                day: 'день',
                days: 'дней',
                hour: 'час',
                hours: 'часов',
                minute: 'минуту',
                minutes: 'минут',
                second: 'секунду',
                seconds: 'секунд',
            },
            navbar: {
                home: 'Главная',     // example: Home page
                username: 'Никнейм',
                loginWithOsu: 'Войти через osu!',
                dmOnDiscord: 'Написать мне в Discord!',
                contribute: 'Внесите свой вклад в проект!',
                development1: 'Сайт всё ещё в разработке! Производительность может быть не оптимальной. Не стесняйтесь писать мне в',  // here goes "discord" and then part 2
                development2: 'если у вас возникнут проблемы!',
            },
            home: {
                welcome: 'Добро пожаловать на wysi727!',
                search: 'Введите osu! никнейм в поле поиска сверху'
            },
            user: {
                top: {
                    previous: 'A.K.A',                          // example: also known as / previous usernames
                    lvl: 'Уровень',                             // example: lvl 100 / level 100
                    joined: 'Дата регистрации:',                // example: Joined at 11/05/2020
                    peakGlobal: 'Высший ранк',                  // example: Peak Global Rank: #2,301
                    peakCountry: 'Высший ранк по стране',       // example: Peak Global Rank: #25
                    performance: 'Производительность',          // example: Performance: 200pp / PP: 200pp
                    medals: 'Медали',
                    acc: 'Точность',
                    consistency: 'Стабильность',
                    speed: 'Скорость',
                    stars: 'Звёзды',
                    aim: 'Аим',
                    skillsDisclaimer: 'Этот график использует формулу, которую не стоит принимать за объективную метрику',
                    rankedScore: 'Рейтинговые очки',
                    maxCombo: 'Максимальное комбо',
                    playTime: 'Время в игре',
                    playCount: 'Количество игр',
                },
                bar: {
                    followers: 'Подписчики',
                    website: 'Веб-сайт',
                    location: 'Место проживания',
                    interests: 'Интересы',
                    occupation: 'Род деятельности',           // example: my "occupation" is student
                },
                middle: {
                    setup: {
                        peripherals: 'Периферия',
                        mouse: 'Мышь',
                        keyboard: 'Клавиатура',
                        tablet: 'Планшет',
                        touch: 'Сенсорный экран',
                        monitor: 'Монитор',
                        headphones: 'Наушники',
                        microphone: 'Микрофон',
                        keypad: 'Кейпад',
                        mousepad: 'Коврик',
                        chair: 'Кресло',
                    },
                    graphs: {
                        globalHistory: 'История глобального ранка',
                        countryHistory: 'История ранка по стране',
                        playsHistory: 'История игр',
                        top100: 'Топ 100',
                        topHitRatios: 'Соотношение попаданий',
                        topRankRatios: 'Соотношение оценок',
                        top100plays: 'Топ 100 игр',
                    },
                },
                scores: {
                    pinned: 'Закреплённые',
                    first: 'Первые места',
                    best: 'Лучшие',
                    recent: 'Последние игры',
                    duration: 'Длина',
                    bpm: 'BPM',
                    combo: 'Комбо',
                    score: 'Очки',
                    playPause: 'Воспроизведение/Пауза',            // example: play audio / pause audio
                    downloadMap: 'Скачать карту',
                    share: 'Поделиться',
                },
            }
        },
        german: {
            dates: {
                ago: "her",
                in: "in",
                year: "Jahr",
                years: "Jahren",
                month: "Monat",
                months: "Monaten",
                day: "Tag",
                days: "Tage",
                hour: "Stunde",
                hours: "Stunden",
                minute: "Minute",
                minutes: "Minuten",
                second: "Sekunde",
                seconds: "Sekunden"
            },
            navbar: {
                home: "Home",
                username: "Nutzername",
                loginWithOsu: "Einloggen mit osu!",
                dmOnDiscord: "Schreib mir eine DM auf Discord",
                contribute: "Unterstütze das Projekt!",
                development1: "Diese Webseite ist noch in der Entwickung, die Leistung ist daher möglicherweise noch nicht optimal. Bitte",
                development2: "wenn Probleme auftreten sollten!",
                helpTranslating: "Hilf dabei, diese Website zu übersetzen!"
            },
            home: {
                welcome: "Willkommen zu wysi727!",
                search: "Suche nach einem osu!Nutzernamen in der oberen Suchleiste"
            },
            user: {
                top: {
                    previous: "A.K.A",
                    lvl: "lvl",
                    joined: "Beigetreten am",
                    peakGlobal: "Höchster Globaler Rang",
                    peakCountry: "Höchster Länder Rang",
                    performance: "Performance",
                    medals: "Medaillen",
                    acc: "Genauigkeit",
                    consistency: "Konsistenz",
                    speed: "Schnelligkeit",
                    stars: "Sterne",
                    aim: "Aim",
                    skillsDisclaimer: "Dieses Diagramm verwendet eine subjektive Formel",
                    rankedScore: "Punktzahl auf Ranglisten",
                    maxCombo: "Max Combo",
                    playTime: "Spielzeit",
                    playCount: "Spielanzahl"
                },
                bar: {
                    followers: "Followers",
                    website: "Website",
                    location: "Standort",
                    interests: "Interessen",
                    occupation: "Beschäftigung"
                },
                middle: {
                    setup: {
                        peripherals: "Peripherie",
                        mouse: "Maus",
                        keyboard: "Tastatur",
                        tablet: "Tablet",
                        touch: "Touch Screen",
                        monitor: "Monitor",
                        headphones: "Kopfhörer",
                        microphone: "Mikrofon",
                        keypad: "Keypad",
                        mousepad: "Mauspad",
                        chair: "Stuhl"
                    },
                    graphs: {
                        info: "Du kannst ziehen und zoomen, während du \"alt\" auf deiner Tastatur gedrückt hältst",
                        globalHistory: "Globale Ranggeschichte",
                        countryHistory: "Länder Ranggeschichte",
                        playsHistory: "Spieleverlauf",
                        top100: "Top 100 Statistik",
                        topHitRatios: "Trefferquoten",
                        topRankRatios: "Rangquoten",
                        top100plays: "PP Spiele"
                    }
                },
                scores: {
                    pinned: "Angepinnte Scores",
                    first: "Erster Platz",
                    best: "Beste PP Scores",
                    recent: "Neuliche Scores",
                    duration: "Dauer",
                    bpm: "BPM",
                    combo: "Combo",
                    score: "Score",
                    playPause: "Play/Pause",
                    downloadMap: "Map Herunterladen",
                    share: "Teilen"
                },
                medals: {
                    rarest: "Seltenste Medaille",
                    recent: "Kürzlich erreichte Medaillen",
                    achievedAt: "Erreicht am"
                }
            }
        },
        turkish: {
            dates: {
                ago: 'önce',     // example: 5 days "ago"
                in: 'içinde',       // example: release "in" 5 days (the order of the words should be changed because of the SOV(subject + object + verb) word order, for example, "5 gün(days) içinde(in) yayınlanacak(will be released)")
                year: 'yıl',
                years: 'yıl',
                month: 'ay',
                months: 'ay',
                day: 'gün',
                days: 'gün',
                hour: 'saat',
                hours: 'saat',
                minute: 'dakika',
                minutes: 'dakika',
                second: 'saniye',
                seconds: 'saniye',
            },
            navbar: {
                home: 'Ana sayfa',     // example: Home page
                username: 'Kullanıcı Adı',
                loginWithOsu: 'osu! ile giriş yap',
                dmOnDiscord: "Discord'da bana mesaj gönder!",
                contribute: 'Projeye Katkıda Bulun!',
                development1: 'Bu site hala yapım aşamasında! Site performansı ideal seviyede olmayabilir. Herhangi bir problem ile karşılaşırsanız',  // here goes "discord" and then part 2
                development2: 'adresinden bana mesaj göndermekten çekinmeyin!',
            },
            home: {
                welcome: "wysi727'ye hoşgeldin!",
                search: 'Arama çubuğunda bir osu! kullanıcısı ara'
            },
            user: {
                top: {
                    previous: 'nâm-ı diğer',                  // example: also known as / previous usernames
                    lvl: 'lv',                         // example: lvl 100 / level 100
                    joined: 'tarihinde katıldı',                // example: Joined at 11/05/2020 (date should go first, for example, "22.05.2016 tarihinde katıldı" also dots are used instead of slashes in turkish date format)
                    peakGlobal: 'En Yüksek Küresel Sıralama',   	// example: Peak Global Rank: #2,301
                    peakCountry: 'En Yüksek Ülkesel Sıralama', 	// example: Peak Global Rank: #25
                    performance: 'Performans',         // example: Performance: 200pp / PP: 200pp
                    medals: 'Medalyalar',
                    acc: 'İsabet',
                    consistency: 'Tutarlılık',
                    speed: 'Hız',
                    stars: 'Yıldız',
                    aim: 'Aim',
                    skillsDisclaimer: 'Bu grafik gerçek bir ölçü olarak alınmaması gereken sübjektif bir formül kullanır',
                    rankedScore: 'Dereceli Skor',
                    maxCombo: 'Maksimum Kombo',
                    playTime: 'Oynama Süresi',
                    playCount: 'Oynama Sayısı',
                },
                bar: {
                    followers: 'Takipçiler',
                    website: 'Website',
                    location: 'Konum',
                    interests: 'İlgi Alanları',
                    occupation: 'Meslek',           // example: my "occupation" is student
                },
                middle: {
                    setup: {
                        peripherals: 'Donanım',     //(there isn't an exact translation of this word)
                        mouse: 'Fare',
                        keyboard: 'Klavye',
                        tablet: 'Tablet',
                        touch: 'Dokunmatik Ekran',
                        monitor: 'Monitör',
                        headphones: 'Kulaklık',
                        microphone: 'Mikrofon',
                        keypad: 'Keypad',
                        mousepad: 'Mousepad',
                        chair: 'Sandalye',
                    },
                    graphs: {
                        globalHistory: 'Küresel Sıralama Geçmişi',
                        countryHistory: 'Ülkesel Sıralama Geçmişi',
                        playsHistory: 'Oynama Geçmişi',
                        top100: 'İlk 100 istatistikleri',
                        topHitRatios: 'İsabet oranları',
                        topRankRatios: 'Sıralama oranları',
                        top100plays: 'İlk 100 Skorlar',
                    },
                },
                scores: {
                    pinned: 'Sabitlenen Skorlar',
                    first: 'Birincilikler',
                    best: 'En İyi Performans',
                    recent: 'Son Skorlar',
                    duration: 'Uzunluk',
                    bpm: 'BPM',
                    combo: 'Kombo',
                    score: 'Skor',
                    playPause: 'Oynat/Durdur',            // example: play audio / pause audio (play and pause should also be at the end, for example, Sesi(the audio) oynat(play))
                    downloadMap: 'Haritayı İndir',
                    share: 'Paylaş',
                }
            }
        },
        serbian: {
            dates: {
                ago: 'пре',         // example: 5 days ago would be "пре" 5 дана
                in: 'за',           // example: release "in" 5 days
                year: 'годину',     // "пре годину дана". "пре 1 годину" is alright but sounds a bit broken
                years: 'година',    // 2-4 years is (for example) "пре 3 године", 5+ is "пре 5 година"
                month: 'месец',     // "пре месец дана". "пре 1 месец" is alright but sounds a bit broken
                months: 'месеци',   // 2-4 months is (for example) "пре 3 месеца", 5+ is "пре 5 месеци"
                day: 'дан',         // "јуче". "пре 1 дан" again is alright but sounds a bit broken
                days: 'дана',       // "пре _ дана" for all numbers above 1
                hour: 'сат',        // "пре сат времена". "пре 1 сат" is alright but sounds a bit broken
                hours: 'сати',      // 2-4 hours is (for example) "пре 3 сата", 5+ is "пре 5 сати"
                minute: 'минут',    // "пре 1 минут"
                minutes: 'минута',  // "пре _ минута" for all numbers above 1
                second: 'секунд',   // "пре 1 секунд"
                seconds: 'секунди', // 2-4 seconds is "пре 3 секунде", 5+ is "пре 5 секунди"
            },
            navbar: {
                home: 'Почетна',     // example: Home page
                username: 'Корисничко име',
                loginWithOsu: 'Пријави се са osu! налогом',
                dmOnDiscord: 'Пошаљи ми поруку преко Дискорда',
                contribute: 'Подржи пројекат',
                development1: 'Овај сајт је и даље у развоју. Пошаљите ми поруку на',  // here goes "discord" and then part 2
                development2: ' ако наиђете на икакве проблеме!',
            },
            home: {
                welcome: 'Добродошао на wysi727!',
                search: 'Претражи osu! корисничко име на траци за претрагу'
            },
            user: {
                top: {
                    previous: 'Такође познат/а као',      // example: also known as / previous usernames
                    lvl: 'ниво',                         // example: lvl 100 / level 100
                    joined: 'Придружио/ла се',                // example: Joined at 11/05/2020
                    peakGlobal: 'Највиши глобални ранг',   	// example: Peak Global Rank: #2,301
                    peakCountry: 'Највиши државни ранг', 	// example: Peak Global Rank: #25
                    performance: 'Перформанса',         // example: Performance: 200pp / PP: 200pp
                    medals: 'Медаље',
                    acc: 'Прецизност',
                    consistency: 'Устаљеност',
                    speed: 'Брзина',
                    stars: 'Тежина (звездице)',
                    aim: 'Циљање',
                    skillsDisclaimer: 'Овај графички приказ користи необјективну формулу и стога вердности не треба схватити као мерило стварних перформанси',
                    rankedScore: 'Рангиран резултат',
                    maxCombo: 'Максимални комбо',
                    playTime: 'Време играња',
                    playCount: 'Број играња',
                },
                bar: {
                    followers: 'Број пратилаца',
                    website: 'Веб-сајт',
                    location: 'Локација',
                    interests: 'Интересовања',
                    occupation: 'Занимање',       // example: my "occupation" is student
                },
                middle: {
                    setup: {
                        peripherals: 'Уређаји',
                        mouse: 'Миш',
                        keyboard: 'Тастатура',
                        tablet: 'Таблет',
                        touch: 'Екран на додир',
                        monitor: 'Монитор',
                        headphones: 'Слушалице',
                        microphone: 'Микрофон',
                        keypad: 'Keypad',
                        mousepad: 'Подлога за миш',
                        chair: 'Столица',
                    },
                    graphs: {
                        globalHistory: 'Историја глобалног ранга',
                        countryHistory: 'Историја државног ранга',
                        playsHistory: 'Историја броја играња',
                        top100: 'Статистика за топ 100',
                        topHitRatios: 'Однос удараца',
                        topRankRatios: 'Однос рангова',
                        top100plays: 'Топ 100 играња по перформанси',
                    },
                },
                scores: {
                    pinned: 'Закачени резултати',
                    first: 'Прва места',
                    best: 'Најбоље перформансе',
                    recent: 'Скорашње игре',
                    duration: 'Дужина',
                    bpm: 'BPM',
                    combo: 'Комбо',
                    score: 'Резултат',
                    playPause: 'Пусти/Паузирај',            // example: play audio / pause audio
                    downloadMap: 'Преузми мапу',
                    share: 'Подели',
                }
            }
        },
        spanish: {
            dates: {
                ago: 'hace',     // example: 5 days "ago"
                in: 'en',       // example: release "in" 5 days
                year: 'año',
                years: 'años',
                month: 'mes',
                months: 'meses',
                day: 'día',
                days: 'días',
                hour: 'hora',
                hours: 'horas',
                minute: 'minuto',
                minutes: 'minutos',
                second: 'segundo',
                seconds: 'segundos',
            },
            navbar: {
                home: 'Inicio',     // example: Home page
                username: 'nombre de usuario',
                loginWithOsu: 'Loguear con osu!',
                dmOnDiscord: 'MP en Discord!',
                contribute: 'Contribuye al proyecto!',
                development1: 'Ésta página web está en desarrollo! El rendimiento puede no ser óptimo. Porfavor, siéntete libre de enviar un MP en',  // here goes "discord" and then part 2
                development2: 'si encuentras algún problema!',
            },
            home: {
                welcome: 'Bienvenido a wysi727!',
                search: 'Busca un usuario de osu! en la barra buscadora!'
            },
            user: {
                top: {
                    previous: 'A.K.A',                  // example: also known as / previous usernames
                    lvl: 'nivel',                         // example: lvl 100 / level 100
                    joined: 'Se unió el',                // example: Joined at 11/05/2020
                    peakGlobal: 'Mayor rango global',   	// example: Peak Global Rank: #2,301
                    peakCountry: 'Mayor rango nacional ', 	// example: Peak Global Rank: #25
                    performance: 'Rendimiento',         // example: Performance: 200pp / PP: 200pp
                    medals: 'Medallas',
                    acc: 'Precisión',
                    consistency: 'Consistencia',
                    speed: 'Velocidad',
                    stars: 'Estrellas',
                    aim: 'Puntería',
                    skillsDisclaimer: 'Éste gráfico usa una fórmula subjetiva que no debería tomarse como una métrica actual.',
                    rankedScore: 'Puntaje clasificado.',
                    maxCombo: 'Combo máximo',
                    playTime: 'Tiempo de juego',
                    playCount: 'Conteo de jugadas',
                },
                bar: {
                    followers: 'Seguidores',
                    website: 'Página web',
                    location: 'Ubicación',
                    interests: 'Intereses',
                    occupation: 'Ocupación',           // example: my "occupation" is student
                },
                middle: {
                    setup: {
                        peripherals: 'Periféricos',
                        mouse: 'Ratón',
                        keyboard: 'Teclado',
                        tablet: 'Tableta',
                        touch: 'Pantalla táctil',
                        monitor: 'Monitor',
                        headphones: 'Auriculares',
                        microphone: 'Micrófono',
                        keypad: 'Tecladonum',
                        mousepad: 'Alfombrilla',
                        chair: 'Silla',
                    },
                    graphs: {
                        globalHistory: 'Historial de rango global',
                        countryHistory: 'Historial de rango nacional',
                        playsHistory: 'Historial de jugadas',
                        top100: 'Top 100 estadísticas',
                        topHitRatios: 'Proporción de aciertos',
                        topRankRatios: 'Proporción de rangos',
                        top100plays: 'Mejor rendimiento',
                    },
                },
                scores: {
                    pinned: 'Puntuaciones ancladas',
                    first: 'Primeros lugares',
                    best: 'Mejores jugadas',
                    recent: 'Puntuaciones recientes',
                    duration: 'Duración',
                    bpm: 'BPM',
                    combo: 'Combo',
                    score: 'Puntuación',
                    playPause: 'Reproducir/Pausar',            // example: play audio / pause audio
                    downloadMap: 'Descargar Mapa',
                    share: 'Compartir',
                }
            }
        },
        catalan: {
            dates: {
                ago: 'fa',
                in: 'en',
                year: 'any',
                years: 'anys',
                month: 'mes',
                months: 'mesos',
                day: 'dia',
                days: 'dies',
                hour: 'hora',
                hours: 'hores',
                minute: 'minut',
                minutes: 'minuts',
                second: 'segon',
                seconds: 'segons'
            },
            navbar: {
                home: 'Inici',
                username: 'Nom d\'usuari',
                loginWithOsu: 'Login amb osu!',
                dmOnDiscord: 'Contacta amb mi a Discord!',
                contribute: 'Contribueix al projecte!',
                development1: 'Aquesta pàgina encara està en desenvolupament! El rendiment pot no ser òptim encara. Si us plau, contacta amb mi a',
                development2: 'si trobes cap problema/error!'
            },
            home: {
                welcome: 'Benvingut a wysi727!',
                search: 'Busa un nom d\'usuari d\'osu! a la barra de cerca'
            },
            user: {
                top: {
                    previous: 'A.K.A',
                    lvl: 'nivell',
                    joined: 'Registrat el',
                    peakGlobal: 'Millor Rang Global',
                    peakCountry: 'Millor Rang Nacional',
                    performance: 'Rendiment',
                    medals: 'Medalles',
                    acc: 'Precisió',
                    consistency: 'Consistència',
                    speed: 'Velocitat',
                    stars: 'Estrelles',
                    aim: 'Punteria',
                    skillsDisclaimer: 'Aquest gràfic utilitza una fórmula subjectiva la qual no s\'hauria de fer servir com a mesura real',
                    rankedScore: 'Puntuació Ranquejada',
                    maxCombo: 'Màxim Combo',
                    playTime: 'Temps Jugat',
                    playCount: 'Partides Totals'
                },
                bar: {
                    followers: 'Seguidors',
                    website: 'Pàgina Web',
                    location: 'Ubicació',
                    interests: 'Aficions',
                    occupation: 'Ocupació'
                },
                middle: {
                    setup: {
                        peripherals: 'Perifèrics',
                        mouse: 'Ratolí',
                        keyboard: 'Teclat',
                        tablet: 'Tauleta',
                        touch: 'Pantalla Tàctil',
                        monitor: 'Monitor',
                        headphones: 'Auriculars',
                        microphone: 'Micròfon',
                        keypad: 'Keypad',
                        mousepad: 'Alfombreta',
                        chair: 'Cadira'
                    },
                    graphs: {
                        globalHistory: 'Historial de Rang Global',
                        countryHistory: 'Historial de Rang Nacional',
                        playsHistory: 'Historial de Partides',
                        top100: 'Estats del top 100',
                        topHitRatios: 'Proporció d\'encerts',
                        topRankRatios: 'Proporció de rangs',
                        top100plays: 'Millor rendiment'
                    }
                },
                scores: {
                    pinned: 'Puntuacions destacades',
                    first: 'Puntuacions primer lloc',
                    best: 'Millors puntuacions',
                    recent: 'Puntuacions recents',
                    duration: 'Duració',
                    bpm: 'BPM',
                    combo: 'Combo',
                    score: 'Puntuació',
                    playPause: 'Reproduir/Pausar',
                    downloadMap: 'Descarregar el Mapa',
                    share: 'Compartir'
                }
            }
        },
        latvian: {
            dates: {
                ago: 'pirms',
                in: 'iekšā',
                year: 'gads',
                years: 'gadi',
                month: 'mēnesis',
                months: 'mēnešus',
                day: 'diena',
                days: 'dienas',
                hour: 'stunda',
                hours: 'stundas',
                minute: 'minute',
                minutes: 'minutes',
                second: 'sekunde',
                seconds: 'sekundes'
            },
            navbar: {
                home: 'Māja',
                username: 'Lietotājvārds',
                loginWithOsu: 'Pieteikties ar Osu!',
                dmOnDiscord: 'Raksti man Discorda!',
                contribute: 'Piedalieties projektā!',
                development1: 'Šī vietne joprojām ir izstrādes stadijā! Veiktspēja vēl var nebūt optimāla. Lūdzu, rakstiet man ziņu',
                development2: 'ja rodas kādas problēmas!'
            },
            home: {
                welcome: 'Laipni lūdzam wysi727!',
                search: 'Augšējā meklēšanas joslā meklējiet osu!lietotājvārdu'
            },
            user: {
                top: {
                    previous: 'A.K.A',
                    lvl: 'lvl',
                    joined: 'Pievienojās',
                    peakGlobal: 'Pasaules ranga maksimums',
                    peakCountry: 'Valsts ranga maksimums',
                    performance: 'Sniegumu',
                    medals: 'Medaļas',
                    acc: 'Precizitāte',
                    consistency: 'Konsekvence',
                    speed: 'Ātrums',
                    stars: 'Zvaigznes',
                    aim: 'Mērķis',
                    skillsDisclaimer: 'Šajā diagrammā ir izmantota subjektīva formula, kuru nevajadzētu uzskatīt par faktisku metriku',
                    rankedScore: 'Reitings',
                    maxCombo: 'Maks Combo',
                    playTime: 'Spēlēšanas laiks',
                    playCount: 'Spēļu skaits'
                },
                bar: {
                    followers: 'Sekotāji',
                    website: 'Tīmekļa vietne',
                    location: 'Atrašanās vieta',
                    interests: 'Intereses',
                    occupation: 'Nodarbošanās'
                },
                middle: {
                    setup: {
                        peripherals: 'Perifērijas ierīces',
                        mouse: 'Pele',
                        keyboard: 'Tastatūra',
                        tablet: 'Planšets',
                        touch: 'Skārienekrāns',
                        monitor: 'Monitors',
                        headphones: 'Austiņas',
                        microphone: 'Mikrofons',
                        keypad: 'Tastatūra pads',
                        mousepad: 'Peles paliktnis',
                        chair: 'Kresls'
                    },
                    graphs: {
                        globalHistory: 'Globālā ranga vēsture',
                        countryHistory: 'Valsts ranga vēsture',
                        playsHistory: 'Spēlē vēsturi',
                        top100: 'Top 100 statistika',
                        topHitRatios: 'Hitu koeficienti',
                        topRankRatios: 'Ranga attiecības',
                        top100plays: 'PP rezultāti'
                    }
                },
                scores: {
                    pinned: 'Piespraustie Rezultāti',
                    first: 'Pirma Vieta Rezultāti',
                    best: 'Labākie PP rezultāti',
                    recent: 'Jaunākie Rezultāti',
                    duration: 'Ilgums',
                    bpm: 'BPM',
                    combo: 'Combo',
                    score: 'Score',
                    playPause: 'Atskaņot/Pauzēt',
                    downloadMap: 'Lejupielādēt karti',
                    share: 'Dalīties'
                }
            }
        },
        italian: {
            dates: {
                ago: 'fa',
                in: 'in',
                year: 'anno',
                years: 'anni',
                month: 'mese',
                months: 'mesi',
                day: 'giorno',
                days: 'giorni',
                hour: 'ora',
                hours: 'ore',
                minute: 'minuto',
                minutes: 'minuti',
                second: 'secondo',
                seconds: 'secondi'
            },
            navbar: {
                home: 'Pagina Iniziale',
                username: 'Nome Utente',
                loginWithOsu: 'Registrati con osu!',
                dmOnDiscord: 'Scrivimi su discord!',
                contribute: 'Contribuisci al progetto!',
                development1: 'Questo sito web è ancora in fase di sviluppo! Le prestazioni potrebbero non essere ancora ottimali. Non esitare a scrivermi',
                development2: 'se riscontri qualche problema!'
            },
            home: {
                welcome: 'Benvenuti a wysi727!',
                search: 'Cerca il tuo nome di osu! nella barra di ricerca superiore'
            },
            user: {
                top: {
                    previous: 'Conosciuto in passato come',
                    lvl: 'Livello',
                    joined: 'Iscritto il',
                    peakGlobal: 'Rango globale massimo',
                    peakCountry: 'Rango nazionale massimo',
                    performance: 'Prestazioni',
                    medals: 'Medaglie',
                    acc: 'Precisione',
                    consistency: 'Consistenza',
                    speed: 'Velocità',
                    stars: 'Stelle',
                    aim: 'Mira',
                    skillsDisclaimer: 'Questo grafico utilizza una formula soggettiva che non dovrebbe essere considerata come metrica reale',
                    rankedScore: 'Punteggio Classificato',
                    maxCombo: 'Combo Massima',
                    playTime: 'Tempo Di Gioco',
                    playCount: 'Numero di Partite'
                },
                bar: {
                    followers: 'Followers',
                    website: 'Sito Web',
                    location: 'Posizione',
                    interests: 'Interessi',
                    occupation: 'Professione'
                },
                middle: {
                    setup: {
                        peripherals: 'Periferiche',
                        mouse: 'Mouse',
                        keyboard: 'Tastiera',
                        tablet: 'Tavoletta Grafica',
                        touch: 'Schermo Touch',
                        monitor: 'Monitor',
                        headphones: 'Cuffie',
                        microphone: 'Microfono',
                        keypad: 'Keypad',
                        mousepad: 'Mousepad',
                        chair: 'Sedia'
                    },
                    graphs: {
                        globalHistory: 'Storico Rango Globale',
                        countryHistory: 'Storico Rango Nazionale',
                        playsHistory: 'Storico delle Partite',
                        top100: 'Statistiche top 100',
                        topHitRatios: 'Rapporto di Precisione',
                        topRankRatios: 'Rapporto dei Risultati',
                        top100plays: 'Migliori Punteggi'
                    }
                },
                scores: {
                    pinned: 'Punteggi Fissati',
                    first: 'Primo Posto',
                    best: 'Migliori Punteggi per PP',
                    recent: 'Punteggi Recenti',
                    duration: 'Durata',
                    bpm: 'BPM',
                    combo: 'Combo',
                    score: 'Punteggio',
                    playPause: 'Riproduci/Pausa',
                    downloadMap: 'Scarica Mappa',
                    share: 'Condividi'
                }
            }
        },
        japanese: {
            dates: {
                ago: "前",
                in: "後に",
                year: "年",
                years: "年",
                month: "月",
                months: "月",
                day: "日",
                days: "日",
                hour: "時間",
                hours: "時間",
                minute: "分",
                minutes: "分",
                second: "秒",
                seconds: "秒"
            },
            navbar: {
                home: "ホーム",
                username: "ユーザー名",
                loginWithOsu: "osu!でログイン",
                dmOnDiscord: "DiscordでDMしてください！",
                contribute: "プロジェクトに貢献して！",
                development1: "このウェブサイトはまだ開発中であり、まだ完璧ではありません。もし問題を見つけたら",
                development2: "で気軽にDMしてください",
                helpTranslating: "このサイトの翻訳を手伝ってください！"
            },
            home: {
                welcome: "Wysi727ようこそ!",
                search: "上の検索バーからosu!のユーザー名を検索"
            },
            user: {
                top: {
                    previous: "以前の名前は",
                    lvl: "レベル",
                    joined: "登録",
                    peakGlobal: "最高の世界ランキング",
                    peakCountry: "最高の国別ランキング",
                    performance: "パフォーマンス",
                    medals: "メダル",
                    acc: "精度",
                    consistency: "安定感",
                    speed: "スピード",
                    stars: "難易度",
                    aim: "エイム",
                    skillsDisclaimer: "このグラフは目安です。実際のものとは異なる可能性があります。",
                    rankedScore: "合計Rankedスコア",
                    maxCombo: "最大コンボ",
                    playTime: "プレイ時間",
                    playCount: "プレイ回数"
                },
                bar: {
                    followers: "フォロワー",
                    website: "ウエブサイト",
                    location: "ロケーション",
                    interests: "興味",
                    occupation: "職業"
                },
                middle: {
                    setup: {
                        peripherals: "周辺機器",
                        mouse: "マウス",
                        keyboard: "キーボード",
                        tablet: "グラフィックタブレット",
                        touch: "接触画面",
                        monitor: "モニター",
                        headphones: "ヘッドホン",
                        microphone: "マイクロホン",
                        keypad: "Keypad",
                        mousepad: "Mousepad",
                        chair: "椅子"
                    },
                    graphs: {
                        info: "キーボードのALTキーを押しながら、ドラッグ、ズームできます",
                        globalHistory: "世界ランキングの記録",
                        countryHistory: "国別ランキングの記録",
                        playsHistory: "プレイ回数の記録",
                        top100: "Top 100 stats",
                        topHitRatios: "Hit ratios",
                        topRankRatios: "Rank ratios",
                        top100plays: "PP プレイ"
                    }
                },
                scores: {
                    pinned: "ピン留めされたスコア",
                    first: "1位の記録",
                    best: "最高のパフォーマンス",
                    recent: "最近スコア",
                    duration: "長さ",
                    bpm: "BPM",
                    combo: "コンボ",
                    score: "スコア",
                    playPause: "再生/一時停止",
                    downloadMap: "マップをダウンロード",
                    share: "共有する"
                },
                medals: {
                    rarest: "最もレアなメダル",
                    recent: "最近獲得したメダル",
                    achievedAt: "ここで獲得:"
                }
            }
        },
        norwegian: {
            dates: {
                ago: 'siden',
                in: 'i',
                year: 'år',
                years: 'år',
                month: 'måned',
                months: 'måneder',
                day: 'dag',
                days: 'dager',
                hour: 'time',
                hours: 'timer',
                minute: 'minutt',
                minutes: 'minutter',
                second: 'sekund',
                seconds: 'sekunder'
            },
            navbar: {
                home: 'Hjem',
                username: 'Brukernavn',
                loginWithOsu: 'Logg inn med osu!',
                dmOnDiscord: 'DM meg på Discord!',
                contribute: 'Bidra til dette prosjektet!',
                development1: 'Denne nettsiden er fortsatt under utvikling! Ytelse er muligens ikke optimal enda. Vennligst DM meg på',
                development2: 'hvis du møter på problemer!'
            },
            home: {
                welcome: 'Velkommen til wysi727!',
                search: 'Søk etter et osu! brukernavn i øverste søkefelt'
            },
            user: {
                top: {
                    previous: 'Også kjent som',
                    lvl: 'lvl',
                    joined: 'Ble med',
                    peakGlobal: 'Høyeste globale rang',
                    peakCountry: 'Høyeste landsrangering',
                    performance: 'Prestasjon',
                    medals: 'Medaljer',
                    acc: 'Nøyaktighet',
                    consistency: 'Konsistens',
                    speed: 'Fart',
                    stars: 'Stjerner',
                    aim: 'Sikte',
                    skillsDisclaimer: 'Dette diagrammet bruker en subjektiv formel og burde ikke anses som et faktisk måltall',
                    rankedScore: 'Rangert Poeng',
                    maxCombo: 'Maks Kombo',
                    playTime: 'Spilletid',
                    playCount: 'Antall Spillforsøk'
                },
                bar: {
                    followers: 'Følgere',
                    website: 'Nettside',
                    location: 'Posisjon',
                    interests: 'Interesser',
                    occupation: 'Yrke'
                },
                middle: {
                    setup: {
                        peripherals: 'Utstyr',
                        mouse: 'Mus',
                        keyboard: 'Tastatur',
                        tablet: 'Tegnebrett',
                        touch: 'Touch-skjerm',
                        monitor: 'Skjerm',
                        headphones: 'Hodetelefoner',
                        microphone: 'Mikrofon',
                        keypad: 'Keypad',
                        mousepad: 'Musematte',
                        chair: 'Stol'
                    },
                    graphs: {
                        globalHistory: 'Global rangeringshistorie',
                        countryHistory: 'Landsrangeringshistorie',
                        playsHistory: 'Spillhistorie',
                        top100: 'Top 100 statistikk',
                        topHitRatios: 'Trefforhold',
                        topRankRatios: 'Rangeringsforhold',
                        top100plays: 'PP-prestasjoner'
                    }
                },
                scores: {
                    pinned: 'Festede Resultater',
                    first: 'Førsteplass-resultater',
                    best: 'Beste PP-prestasjoner',
                    recent: 'Nylige Prestasjoner',
                    duration: 'Lengde',
                    bpm: 'BPM',
                    combo: 'Kombo',
                    score: 'Poeng',
                    playPause: 'Start/Stopp',
                    downloadMap: 'Last ned kart',
                    share: 'Del'
                }
            }
        },
        esperanto: {
            dates: {
                ago: 'antaŭ',
                in: 'en',
                year: 'jaro',
                years: 'jaroj',
                month: 'monato',
                months: 'monatoj',
                day: 'tago',
                days: 'tagoj',
                hour: 'horo',
                hours: 'horoj',
                minute: 'minuto',
                minutes: 'minutoj',
                second: 'sekundo',
                seconds: 'sekundoj'
            },
            navbar: {
                home: 'Hejpaĝo',
                username: 'Uzantnomo',
                loginWithOsu: 'Ensalutu kun osu!',
                dmOnDiscord: 'DM min al mia Diskordo!',
                contribute: 'Kontribuu al la projekto!',
                development1: 'Ĉi tiu retejo ankoraŭ estas evoluanta! Agado eble ankoraŭ ne estas ĝusta! Bonvolu DM min',
                development2: 'se vi trovas problemojn'
            },
            home: {
                welcome: 'Bonvenon en wysi727!',
                search: 'Serĉu osu!uzantnomo sur la supra searchbar'
            },
            user: {
                top: {
                    previous: 'Antaŭe konata kiel',
                    lvl: 'Levelo',
                    joined: 'Ensalutinta',
                    peakGlobal: 'Plej bona tutmonda rango',
                    peakCountry: 'Plej bona landa rango',
                    performance: 'Agado',
                    medals: 'Medaloj',
                    acc: 'Precizeco',
                    consistency: 'Kohereco',
                    speed: 'Rapido',
                    stars: 'Steloj',
                    aim: 'Celo',
                    skillsDisclaimer: 'Ĉi tiu diagramo uzas subjektivan formulon, kiu ne devus esti prenita kiel aktuala metrikon',
                    rankedScore: 'Rangigita poentaro',
                    maxCombo: 'Maksimuma kombo',
                    playTime: 'Ludo tempo',
                    playCount: 'Ludo kalkulo'
                },
                bar: {
                    followers: 'Sekvantoj',
                    website: 'Retejo',
                    location: 'Loko',
                    interests: 'Interesoj',
                    occupation: 'Okupo'
                },
                middle: {
                    setup: {
                        peripherals: 'Ekstercentratoj',
                        mouse: 'Muso',
                        keyboard: 'Klavaro',
                        tablet: 'Grafika tablojdo',
                        touch: 'Tuŝe krano',
                        monitor: 'Monitoro',
                        headphones: 'Aŭdilo',
                        microphone: 'Mikrofono',
                        keypad: 'Keypad',
                        mousepad: 'Musko planto',
                        chair: 'Seĝo'
                    },
                    graphs: {
                        globalHistory: 'Rekordo de tutmonda rango',
                        countryHistory: 'Rekordo de landa rango',
                        playsHistory: 'Luda rekordo',
                        top100: 'Plej bonaj 100 statiskoj',
                        topHitRatios: 'Hit ratios',
                        topRankRatios: 'Rank ratios',
                        top100plays: 'PP plays'
                    }
                },
                scores: {
                    pinned: 'Fiksaj poentaroj',
                    first: 'Plej bonaj 1 poentaroj',
                    best: 'Plej bonaj pp poentaroj',
                    recent: 'Freŝaj poentaroj',
                    duration: 'Daŭro',
                    bpm: 'BPM',
                    combo: 'Kombo',
                    score: 'Poentaro',
                    playPause: 'Ludi/Paŭzi',
                    downloadMap: 'Malŝarĝi mapon',
                    share: 'Kunhavigi'
                }
            }
        },
        galician: {
            dates: {
                ago: 'fai',
                in: 'en',
                year: 'ano',
                years: 'anos',
                month: 'mes',
                months: 'meses',
                day: 'día',
                days: 'días',
                hour: 'hora',
                hours: 'horas',
                minute: 'minuto',
                minutes: 'minutos',
                second: 'segundo',
                seconds: 'segundos'
            },
            navbar: {
                home: 'Inicio',
                username: 'Nome de usuario',
                loginWithOsu: 'Loguear con osu!',
                dmOnDiscord: 'MP ao meu Discord!',
                contribute: 'Contribúe ao proxecto!',
                development1: 'Esta web aínda esta baixo desenvolvemento! O rendemento pode non ser óptimo aínda. Por favor séntete libre de contactarme por',
                development2: 'se atopas calquera problema!'
            },
            home: {
                welcome: 'Benvido a wysi727!',
                search: 'Busca un nome de usuario de osu! na barra de busca'
            },
            user: {
                top: {
                    previous: 'tamén coñecido como',
                    lvl: 'nivel',
                    joined: 'Uniuse o',
                    peakGlobal: 'Maior Rango Global',
                    peakCountry: 'Maior Rango Nacional',
                    performance: 'Rendemento',
                    medals: 'Medallas',
                    acc: 'Precisión',
                    consistency: 'Consistencia',
                    speed: 'Velocidade',
                    stars: 'Estrelas',
                    aim: 'Puntería',
                    skillsDisclaimer: 'Este gráfico usa unha fórmula subxectiva que non se debería tomar como unha medida real',
                    rankedScore: 'Puntuación Rankeada',
                    maxCombo: 'Combo Máximo',
                    playTime: 'Tempo de Xogo',
                    playCount: 'Reconto de Xogo'
                },
                bar: {
                    followers: 'Seguidores',
                    website: 'Sitio web',
                    location: 'Localización',
                    interests: 'Intereses',
                    occupation: 'Ocupación'
                },
                middle: {
                    setup: {
                        peripherals: 'Periféricos',
                        mouse: 'Rato',
                        keyboard: 'Teclado',
                        tablet: 'Tableta',
                        touch: 'Pantalla Táctil',
                        monitor: 'Monitor',
                        headphones: 'Auriculares',
                        microphone: 'Micrófono',
                        keypad: 'Teclado Numérico',
                        mousepad: 'Alfombrilla',
                        chair: 'Cadeira'
                    },
                    graphs: {
                        globalHistory: 'Historial de Rango Global',
                        countryHistory: 'Historial de Rango Nacional',
                        playsHistory: 'Historial de Xogadas',
                        top100: 'Estatísticas do top 100',
                        topHitRatios: 'Proporción de acertos',
                        topRankRatios: 'Proporción de rangos',
                        top100plays: 'Mellores Puntuacións'
                    }
                },
                scores: {
                    pinned: 'Puntuacións Ancoradas',
                    first: 'Puntuacións de Primeiro Lugar',
                    best: 'Mellores Puntuacións de PP',
                    recent: 'Puntuacións Recentes',
                    duration: 'Duración',
                    bpm: 'BPM',
                    combo: 'Combo',
                    score: 'Puntuación',
                    playPause: 'Reproducir/Pausar',
                    downloadMap: 'Descargar Mapa',
                    share: 'Compartir'
                }
            }
        },
        portuguese: {
            dates: {
                ago: "atrás",
                in: "em",
                year: "ano",
                years: "anos",
                month: "mês",
                months: "meses",
                day: "dia",
                days: "dias",
                hour: "hora",
                hours: "horas",
                minute: "minuto",
                minutes: "minutos",
                second: "segundo",
                seconds: "segundos"
            },
            navbar: {
                home: "Inicio",
                username: "Nome de Utilizador",
                loginWithOsu: "Iniciar sessão com osu!",
                dmOnDiscord: "Envia-me uma mensagem no Discord!",
                contribute: "Contribua com o projeto!",
                development1: "Este site ainda está em desenvolvimento! A performance pode não ser a ideal. Sinta-se à vontade de me enviar uma mensagem em",
                development2: "Se encontrares algum problema!",
                helpTranslating: "Ajuda-nos a traduzir este website!"
            },
            home: {
                welcome: "Bem-vindo ao wysi727!",
                search: "Pesquise por um osu! username na barra de pesquisa no topo da página"
            },
            user: {
                top: {
                    previous: "A.K.A",
                    lvl: "lvl",
                    joined: "Inscreveu-se em",
                    peakGlobal: "Rank Global mais alto",
                    peakCountry: "Rank de País mais alto",
                    performance: "Desempenho",
                    medals: "Medalhas",
                    acc: "Precisão",
                    consistency: "Consistência",
                    speed: "Rapidez",
                    stars: "Estrelas",
                    aim: "Mira",
                    skillsDisclaimer: "Este gráfico usa uma fórmula subjetiva que não deve ser tomada como uma métrica real",
                    rankedScore: "Score Rankeado",
                    maxCombo: "Combo máximo",
                    playTime: "Tempo de Jogo",
                    playCount: "Número de jogadas"
                },
                bar: {
                    followers: "Seguidores",
                    website: "Website",
                    location: "Localização",
                    interests: "Interesses",
                    occupation: "Ocupação"
                },
                middle: {
                    setup: {
                        peripherals: "Periféricos",
                        mouse: "Rato",
                        keyboard: "Teclado",
                        tablet: "Tablet",
                        touch: "Ecrã tátil",
                        monitor: "Monitor",
                        headphones: "Headphones",
                        microphone: "Microfone",
                        keypad: "Keypad",
                        mousepad: "Tapete de rato",
                        chair: "Cadeira"
                    },
                    graphs: {
                        info: "Podes arrastar e dar zoom se segurares a tecla \"alt\" no teclado",
                        globalHistory: "Histórico de Rank Global",
                        countryHistory: "Histórico do Rank do País",
                        playsHistory: "Histórico de plays",
                        top100: "Estatísticas do Top 100",
                        topHitRatios: "Rácio de julgamentos",
                        topRankRatios: "Rácio de rank",
                        top100plays: "Top 100 jogadas"
                    }
                },
                scores: {
                    pinned: "Pontuações afixadas",
                    first: "Pontuações de primeiro lugar",
                    best: "Melhores pontuações PP",
                    recent: "Pontuações Recentes",
                    duration: "Duração",
                    bpm: "BPM",
                    combo: "Combo",
                    score: "Pontuação",
                    playPause: "Reproduzir/Pausar",
                    downloadMap: "Download do mapa",
                    share: "Partilhar"
                },
                medals: {
                    rarest: "Medalha mais rara",
                    recent: "Medalhas recentemente obtidas",
                    achievedAt: "Realizado em"
                }
            }
        },
        portugueseBr: {
            dates: {
                ago: 'atrás',
                in: 'de',
                year: 'ano',
                years: 'anos',
                month: 'mês',
                months: 'meses',
                day: 'dia',
                days: 'dias',
                hour: 'hora',
                hours: 'horas',
                minute: 'minuto',
                minutes: 'minutos',
                second: 'segundo',
                seconds: 'segundos'
            },
            navbar: {
                home: 'Início',
                username: 'Nome de usuário',
                loginWithOsu: 'Login com o osu!',
                dmOnDiscord: 'Me chama no PV do Discord!',
                contribute: 'Contribua para esse projeto!',
                development1: 'Este site ainda está em desenvolvimento! O desempenho pode não ser ideal ainda. Por favor, sinta-se à vontade para mandar MSG no meu PV',
                development2: 'Se você encontrar quaisquer problemas!'
            },
            home: {
                welcome: 'Bem vindo(a) ao wysi727!',
                search: 'Pesquise um nome de usuario do osu! no topo da barra de pesquisa'
            },
            user: {
                top: {
                    previous: 'Outros nomes',
                    lvl: 'level',
                    joined: 'Juntou-se em',
                    peakGlobal: 'Classificação Global Máxima',
                    peakCountry: 'Classificação nacional máxima ',
                    performance: 'Desempenho',
                    medals: 'Medalhas',
                    acc: 'Precisão',
                    consistency: 'Consistência',
                    speed: 'Velocidade',
                    stars: 'Estrelas',
                    aim: 'Mira',
                    skillsDisclaimer: 'Este gráfico usa uma fórmula subjetiva que não deve ser tomada como uma métrica real',
                    rankedScore: 'Pontuação ranqueada',
                    maxCombo: 'Combo máximo',
                    playTime: 'Tempo de jogo',
                    playCount: 'Vezes jogadas'
                },
                bar: {
                    followers: 'Seguidores',
                    website: 'Website',
                    location: 'Localização',
                    interests: 'Interesses',
                    occupation: 'Ocupação'
                },
                middle: {
                    setup: {
                        peripherals: 'Periféricos',
                        mouse: 'Mouse',
                        keyboard: 'Teclado',
                        tablet: 'Tablet',
                        touch: 'Touch Screen',
                        monitor: 'Monitor',
                        headphones: 'Fones de ouvido',
                        microphone: 'Microfone',
                        keypad: 'Keypad',
                        mousepad: 'Mousepad',
                        chair: 'Cadeira'
                    },
                    graphs: {
                        globalHistory: 'Histórico de Classificação Global',
                        countryHistory: 'Histórico de classificação Nacional',
                        playsHistory: 'Histórico de jogadas',
                        top100: 'Top 100 estatísticas',
                        topHitRatios: 'Taxas de acerto',
                        topRankRatios: 'Taxas de classificação',
                        top100plays: 'Jogadores PP'
                    }
                },
                scores: {
                    pinned: 'Pontuações fixadas',
                    first: 'Pontuações de primeiro lugar',
                    best: 'Melhores pontuações de PP',
                    recent: 'Pontuações recentes',
                    duration: 'Duração',
                    bpm: 'bpm',
                    combo: 'Combo',
                    score: 'Pontuação',
                    playPause: 'Reproduzir/Pausar',
                    downloadMap: 'Baixar o mapa',
                    share: 'Compartilhar'
                }
            }
        },
        polish: {
            dates: {
                ago: 'temu',
                in: 'w',
                year: 'rok',
                years: 'lata',
                month: 'miesiąc',
                months: 'miesiące/miesięcy',
                day: 'dzień',
                days: 'dni',
                hour: 'godzina',
                hours: 'godziny',
                minute: 'minuta',
                minutes: 'minuty',
                second: 'sekunda',
                seconds: 'sekundy'
            },
            navbar: {
                home: 'Strona Główna',
                username: 'Nazwa użytkownika',
                loginWithOsu: 'Zaloguj się przez osu!',
                dmOnDiscord: 'Napisz do mnie na discordzie!',
                contribute: 'Pomóż przy projekcie!',
                development1: 'Ta strona jest nadal w fazie rozwoju! Niektóre funkcje mogą nie działać poprawnie. Błędy możesz zgłaszać w wiadomości prywatnej na',
                development2: 'jeśli napotkasz jakiekolwiek problemy!'
            },
            home: {
                welcome: 'Witaj w wysi727!',
                search: 'Wyszukaj nazwę użytkownika osu!.'
            },
            user: {
                top: {
                    previous: 'A.K.A',
                    lvl: 'poziom',
                    joined: 'Dołączył(a)',
                    peakGlobal: 'Najwyższy Ranking Globalny',
                    peakCountry: 'Najwyższy Ranking Krajowy',
                    performance: 'Performance',
                    medals: 'Medale',
                    acc: 'Celność',
                    consistency: 'Consistency',
                    speed: 'Szybkość',
                    stars: 'Gwiazdki',
                    aim: 'Aim',
                    skillsDisclaimer: 'Ten wykres używa subiektywnej formuły, która nie powinna być brana jako poprawny wymiar umiejętności',
                    rankedScore: 'Wynik rankingowy',
                    maxCombo: 'Maksymalne Combo',
                    playTime: 'Łączny czas gry',
                    playCount: 'Liczba zagrań'
                },
                bar: {
                    followers: 'Obserwujący',
                    website: 'Strona internetowa',
                    location: 'Obecna lokalizacja',
                    interests: 'Zainteresowania',
                    occupation: 'Zajęcia'
                },
                middle: {
                    setup: {
                        peripherals: 'Preferowane urządzenia',
                        mouse: 'Myszka',
                        keyboard: 'Klawiatura',
                        tablet: 'Tablet',
                        touch: 'Ekran dotykowy',
                        monitor: 'Monitor',
                        headphones: 'Słuchawki',
                        microphone: 'Mikrofon',
                        keypad: 'Keypad',
                        mousepad: 'Podkładka do myszy',
                        chair: 'Krzesło'
                    },
                    graphs: {
                        globalHistory: 'Historia rankingu globalnego',
                        countryHistory: 'Historia rankingu krajowego',
                        playsHistory: 'Ostatnie Zagrania',
                        top100: 'Statystyki najlepszych wyników',
                        topHitRatios: 'Wykres celności',
                        topRankRatios: 'Wykres rankingu',
                        top100plays: 'Wyniki'
                    }
                },
                scores: {
                    pinned: 'Przypięte wyniki',
                    first: 'Pierwsze miejsca',
                    best: 'Najlepsze wyniki',
                    recent: 'Ostatnie wyniki',
                    duration: 'Czas trwania',
                    bpm: 'BPM',
                    combo: 'Combo',
                    score: 'Wynik',
                    playPause: 'Odtwórz/Wstrzymaj',
                    downloadMap: 'Pobierz mapę',
                    share: 'Udostępnij'
                }
            }
        },
        estonian: {
            dates: {
                ago: "tagasi",
                in: "in",
                year: "aasta",
                years: "aastat",
                month: "kuu",
                months: "kuud",
                day: "päev",
                days: "päevi",
                hour: "tund",
                hours: "tunde",
                minute: "minut",
                minutes: "minutit",
                second: "sekund",
                seconds: "sekundit"
            },
            navbar: {
                home: "Home",
                username: "Kasutajanimi",
                loginWithOsu: "Logi sisse Osu!-ga",
                dmOnDiscord: "Kirjuta mulle Discordi!",
                contribute: "Anna oma panus projekti!",
            }
        },
        finnish: {
            dates: {
                ago: "sitten",
                in: "in",
                year: "vuosi",
                years: "vuotta",
                month: "kuukausi",
                months: "kuukautta",
                day: "päivä",
                days: "päivää",
                hour: "tunti",
                hours: "tuntia",
                minute: "minuutti",
                minutes: "minuuttia",
                second: "sekunti",
                seconds: "sekuntia"
            },
            navbar: {
                home: "Etusivu",
                username: "Käyttäjänimi",
                loginWithOsu: "Kirjaudu sisään osu!:lla",
                dmOnDiscord: "Viesti mua Discordissa!",
                contribute: "Contribute to the project!",
                development1: "Sivusto on kehityksen alla! Suorituskyky ei vielä ehkä ole optimaalinen. Olethan vapaasti yhteydessä minuun",
                development2: "jos huomaat mitään ongelmia!",
                helpTranslating: "Auta sivuston kääntämisessä!"
            },
            home: {
                welcome: "Tervetuloa wysi727:ään!",
                search: "Search a osu!username on the top searchbar"
            },
            user: {
                top: {
                    previous: "A.K.A",
                    lvl: "taso",
                    joined: "Liittyi",
                    peakGlobal: "Korkein Maailmanlaajuinen Sijoitus",
                    peakCountry: "Korkein Maakohtainen Sijoitus",
                    performance: "Suorituskyky",
                    medals: "Mitalit",
                    acc: "Tarkkuus",
                    consistency: "Konsistenssi",
                    speed: "Nopeus",
                    stars: "Vaikeustaso",
                    aim: "Tähtäys",
                    skillsDisclaimer: "Kaavio käyttää subjektiivista kaavaa, jota ei pitäisi pitää todellisen taidon mittarina",
                    rankedScore: "Tilastoidut Pisteet",
                    maxCombo: "Suurin Combo",
                    playTime: "Pelattu Aika",
                    playCount: "Pelikertoja"
                },
                bar: {
                    followers: "Seuraajia",
                    website: "Verkkosivu",
                    location: "Sijainti",
                    interests: "Kiinnostuksen kohteet",
                    occupation: "Ammatti"
                },
                middle: {
                    setup: {
                        peripherals: "Oheislaitteet",
                        mouse: "Hiiri",
                        keyboard: "Näppäimistö",
                        tablet: "Piirtopöytä",
                        touch: "Kosketusnäyttö",
                        monitor: "Näyttö",
                        headphones: "Kuulokkeet",
                        microphone: "Mikrofoni",
                        keypad: "Keypad",
                        mousepad: "Hiirimatto",
                        chair: "Tuoli"
                    },
                    graphs: {
                        info: "Voit raahata ja zoomata pitäen \"alt\" näppäintä pohjassa",
                        globalHistory: "Global Rank History",
                        countryHistory: "Country Rank History",
                        playsHistory: "Pelaushistoria",
                        top100: "Top 100 stats",
                        topHitRatios: "Hit ratios",
                        topRankRatios: "Rank ratios",
                        top100plays: "Top 100 -tulokset"
                    }
                },
                scores: {
                    pinned: "Kiinnitetyt Tulokset",
                    first: "Kärkisijat",
                    best: "Parhaat PP-tulokset",
                    recent: "Viimeisimmät Tulokset",
                    duration: "Pituus",
                    bpm: "BPM",
                    combo: "Combo",
                    score: "Pisteet",
                    playPause: "Toista/Tauko",
                    downloadMap: "Lataa Kartta",
                    share: "Jaa"
                },
                medals: {
                    rarest: "Harvinaisin Mitali",
                    recent: "Äskettäin saadut mitalit",
                    achievedAt: "Saavutettu"
                }
            }
        },
        hungarian: {
            dates: {
                ago: "ezelőtt",
                in: "ben",
                year: "év",
                years: "évek",
                month: "hónap",
                months: "hónapok",
                day: "nap",
                days: "napok",
                hour: "óra",
                hours: "órák",
                minute: "perc",
                minutes: "percek",
                second: "másodperc",
                seconds: "másodpercek"
            },
            navbar: {
                home: "Haza",
                username: "Felhasználónév",
                loginWithOsu: "Bejelentkezés osu!-val",
                dmOnDiscord: "DM-ben írj Discordon!",
                contribute: "Hozzájárulás a projekthez!",
                development1: "A weboldal még fejlesztés alatt áll! A teljesítmény még nem biztosan optimális. Kérlek nyugodjan írj DM-ben",
                development2: "ha bármilyen problémát találsz!",
                helpTranslating: "Segíts lefordítani az oldalt!"
            },
            home: {
                welcome: "Üdv a wysi727 oldalon!",
                search: "Keress osu! felhasználói névre a fenti keresősávban"
            },
            user: {
                top: {
                    previous: "más néven",
                    lvl: "lvl",
                    joined: "Csatlakozott",
                    peakGlobal: "Globális csúcsrang",
                    peakCountry: "Hazai csúcsrang",
                    performance: "Teljesítmény",
                    medals: "Érmek",
                    acc: "Pontosság",
                    consistency: "Konzisztencia",
                    speed: "Sebesség",
                    stars: "Csillagok",
                    aim: "Célzás",
                    skillsDisclaimer: "Ez a diagram egy szubjektív egyenlet alapján számol és nem használatos objektív összehasonlításra",
                    rankedScore: "Rangsorolt pontszám",
                    maxCombo: "Maximális kombó",
                    playTime: "Játékidő",
                    playCount: "Próbák száma"
                },
                bar: {
                    followers: "Követők",
                    website: "Weblap",
                    location: "Származás",
                    interests: "Érdeklődés",
                    occupation: "Foglalkozás"
                },
                middle: {
                    setup: {
                        peripherals: "Perifériák",
                        mouse: "Egér",
                        keyboard: "Billentyűzet",
                        tablet: "Rajztábla",
                        touch: "Érintőképernyő",
                        monitor: "Monitor",
                        headphones: "Fejhallgató",
                        microphone: "Mikrofon",
                        keypad: "Billentyűpad",
                        mousepad: "Egérpad",
                        chair: "Szék"
                    },
                    graphs: {
                        info: "Nagyítani az \"alt\" billentyű letartásával és az egér húzásával tudsz",
                        globalHistory: "Globális rangtörténet",
                        countryHistory: "Haza rangtörténet",
                        playsHistory: "Játszási előzmények",
                        top100: "Top 100 statok",
                        topHitRatios: "Találati arányok",
                        topRankRatios: "Rang arányok",
                        top100plays: "Top 100 eredmény"
                    }
                },
                scores: {
                    pinned: "Kitűzött eredmények",
                    first: "Első helyezések",
                    best: "Legnagyobb PP eredmények",
                    recent: "Legutóbbi eredmények",
                    duration: "Hossz",
                    bpm: "BPM",
                    combo: "Kombó",
                    score: "Pontszám",
                    playPause: "Lejátszás/Megállítás",
                    downloadMap: "Map letöltése",
                    share: "Megosztás"
                },
                medals: {
                    rarest: "Legritkább érme",
                    recent: "Legutóbb elért érmék",
                    achievedAt: "Elérte"
                }
            }
        },
        dutch: {
            dates: {
                ago: "sinds",
                in: "in",
                year: "jaar",
                years: "jaren",
                month: "maand",
                months: "maanden",
                day: "dag",
                days: "dagen",
                hour: "uur",
                hours: "uren",
                minute: "minuut",
                minutes: "minuten",
                second: "seconde",
                seconds: "secondes"
            },
            navbar: {
                home: "Hoofdpagina",
                username: "Gebruikersnaam",
                loginWithOsu: "Login met osu!",
                dmOnDiscord: "DM me op Discord!",
                contribute: "Draag bij aan het project!",
                development1: "Deze website is nog in ontwikkeling! Mogelijk is de prestaties nog niet optimaal. Aarzel niet om me een DM te sturen. Op",
                development2: "als je problemen tegenkomt!",
                helpTranslating: "Help deze website te vertalen!"
            },
            home: {
                welcome: "Welkom bij wysi727!",
                search: "Zoek een osu!gebruikersnaam in de bovenste zoekbalk"
            },
            user: {
                top: {
                    previous: "A.K.A",
                    lvl: "lvl",
                    joined: "Geregistreerd op",
                    peakGlobal: "Top Globale Rang",
                    peakCountry: "Top Land Rang",
                    performance: "Prestatie",
                    medals: "Medailles",
                    acc: "Nauwkeurigheid",
                    consistency: "Consistentie",
                    speed: "Snelheid",
                    stars: "Sterren",
                    aim: "Richten",
                    skillsDisclaimer: "Deze grafiek gebruikt subjectieve formules die met een korrel zout gelezen moeten woorden en kunnen niet gebruikt woorden als maatstaf.",
                    rankedScore: "Competitieve Score",
                    maxCombo: "Maximale Combo",
                    playTime: "Afspeeltijd",
                    playCount: "Aantal Play's"
                },
                bar: {
                    followers: "Volgers",
                    website: "Website",
                    location: "Locatie",
                    interests: "Interesses",
                    occupation: "Beroep"
                },
                middle: {
                    setup: {
                        peripherals: "Rand Apparatuur",
                        mouse: "Muis",
                        keyboard: "Keyboard",
                        tablet: "Pen Tablet",
                        touch: "Touch Screen",
                        monitor: "Monitor",
                        headphones: "Hoofdtelefoon",
                        microphone: "Microfoon",
                        keypad: "Keypad",
                        mousepad: "Muismat",
                        chair: "Stoel"
                    },
                    graphs: {
                        info: "Je kunt slepen en zoomen terwijl je 'alt' ingedrukt houdt op je toetsenbord",
                        globalHistory: "Globale Rang Geschiedenis",
                        countryHistory: "Land Rang Geschiedenis",
                        playsHistory: "Speel Geschiedenis",
                        top100: "Top 100 statistieken",
                        topHitRatios: "Hit verhoudingen",
                        topRankRatios: "Rang verhoudingen",
                        top100plays: "Top 100 plays"
                    }
                },
                scores: {
                    pinned: "Vastgezette scores",
                    first: "Eerste plaats Scores",
                    best: "Beste PP Scores",
                    recent: "Recente scores",
                    duration: "Duur",
                    bpm: "BPM",
                    combo: "Combo",
                    score: "Score",
                    playPause: "Afspelen/pauzeren",
                    downloadMap: "Map Downloaden",
                    share: "Delen"
                },
                medals: {
                    rarest: "Zeldzaamste Medaille",
                    recent: "Onlangs behaalde medailles",
                    achievedAt: "Bereikt op"
                }
            }
        },
        chineseS: {
            dates: {
                ago: "前",
                in: "在",
                year: "年",
                years: "年",
                month: "月",
                months: "月",
                day: "天",
                days: "天",
                hour: "小时",
                hours: "小时",
                minute: "分钟",
                minutes: "分钟",
                second: "秒",
                seconds: "秒"
            },
            navbar: {
                home: "主页",
                username: "用户名",
                loginWithOsu: "使用 osu 登录！",
                dmOnDiscord: "私讯我在 Discord！",
                contribute: "为工程作出贡献！",
                development1: "这个网站正在发展中！性能可能还不是最佳。请随心所欲地私讯我",
                development2: "如果您遇到任何问题！",
                helpTranslating: "帮忙翻译这个网站！"
            },
            home: {
                welcome: "欢迎来到 wysi727！",
                search: "在顶部搜索栏中搜索 osu!用户名"
            },
            user: {
                top: {
                    previous: "亦称",
                    lvl: "lvl",
                    joined: "加入于",
                    peakGlobal: "全球排名峰",
                    peakCountry: "国家排名峰",
                    performance: "表现",
                    medals: "奖章",
                    acc: "精度",
                    consistency: "持续性",
                    speed: "速度",
                    stars: "星级",
                    aim: "瞄准",
                    skillsDisclaimer: "这个图表采用了一个主观公式，不应视为实际公式。",
                    rankedScore: "排名分",
                    maxCombo: "最大连击数",
                    playTime: "游戏时间",
                    playCount: "游戏次数"
                },
                bar: {
                    followers: "关注者",
                    website: "网址",
                    location: "地点",
                    interests: "兴趣",
                    occupation: "职业"
                },
                middle: {
                    setup: {
                        peripherals: "设备",
                        mouse: "滑鼠",
                        keyboard: "键盘",
                        tablet: "平板",
                        touch: "触摸屏幕",
                        monitor: "显示屏",
                        headphones: "耳机",
                        microphone: "麦克风",
                        keypad: "小键盘",
                        mousepad: "滑鼠垫",
                        chair: "椅子"
                    },
                    graphs: {
                        info: "您可以在键盘上按住'Alt'时拖动并缩放",
                        globalHistory: "全球排名历史",
                        countryHistory: "国家排名历史",
                        playsHistory: "Plays History",
                        top100: "前 100 次统计",
                        topHitRatios: "点击率",
                        topRankRatios: "排名率",
                        top100plays: "Top 100 plays"
                    }
                },
                scores: {
                    pinned: "Pinned Scores",
                    first: "First Place Scores",
                    best: "最佳PP 得分",
                    recent: "近期得分",
                    duration: "时长",
                    bpm: "BPM",
                    combo: "连击",
                    score: "得分",
                    playPause: "播放/暂停",
                    downloadMap: "Download Map",
                    share: "分享"
                },
                medals: {
                    rarest: "最稀有的奖章",
                    recent: "最近获得的奖章",
                    achievedAt: "完成于"
                }
            }
        },
        chineseT: {
            dates: {
                ago: "前",
                in: "在",
                year: "年",
                years: "年",
                month: "月",
                months: "月",
                day: "天",
                days: "天",
                hour: "小時",
                hours: "小時",
                minute: "分鐘",
                minutes: "分鐘",
                second: "秒",
                seconds: "秒"
            },
            navbar: {
                home: "主頁",
                username: "用戶名",
                loginWithOsu: "使用 osu 登錄！",
                dmOnDiscord: "私訊我在Discord！",
                contribute: "為工程作出貢獻！",
                development1: "這個網站正在發展中！性能可能還不是最佳。請隨心所欲地私訊我",
                development2: "如果您遇到任何問題！",
                helpTranslating: "幫忙翻譯這個網站！"
            },
            home: {
                welcome: "歡迎來到 wysi727！",
                search: "在頂部搜索欄中搜索 osu!用戶名"
            },
            user: {
                top: {
                    previous: "亦稱",
                    lvl: "lvl",
                    joined: "加入於",
                    peakGlobal: "全球排名峰",
                    peakCountry: "國家排名峰",
                    performance: "表現",
                    medals: "獎章",
                    acc: "精度",
                    consistency: "持續性",
                    speed: "速度",
                    stars: "星級",
                    aim: "瞄準",
                    skillsDisclaimer: "這個圖表採用了一個主觀公式，不應視為實際公式。",
                    rankedScore: "排名分",
                    maxCombo: "最大連擊數",
                    playTime: "遊戲時間",
                    playCount: "遊戲次數"
                },
                bar: {
                    followers: "關注者",
                    website: "網址",
                    location: "地點",
                    interests: "興趣",
                    occupation: "職業"
                },
                middle: {
                    setup: {
                        peripherals: "設備",
                        mouse: "滑鼠",
                        keyboard: "鍵盤",
                        tablet: "平板",
                        touch: "觸摸屏幕",
                        monitor: "顯示屏",
                        headphones: "耳機",
                        microphone: "麥克風",
                        keypad: "小鍵盤",
                        mousepad: "滑鼠墊",
                        chair: "椅子"
                    },
                    graphs: {
                        info: "您可以在鍵盤上按住 Alt 時拖動並縮放",
                        globalHistory: "全球排名歷史",
                        countryHistory: "國家排名歷史",
                        playsHistory: "Plays 記錄",
                        top100: "前 100 次統計",
                        topHitRatios: "點擊率",
                        topRankRatios: "排名率",
                        top100plays: "前 100 Plays"
                    }
                },
                scores: {
                    pinned: "置頂得分",
                    first: "首位得分",
                    best: "最佳PP 得分",
                    recent: "近期得分",
                    duration: "時長",
                    bpm: "BPM",
                    combo: "連擊",
                    score: "得分",
                    playPause: "播放/暫停",
                    downloadMap: "下載 Map",
                    share: "分享"
                },
                medals: {
                    rarest: "最稀有的獎章",
                    recent: "最近獲得的獎章",
                    achievedAt: "完成於"
                }
            }
        },
        afrikaans: {
            dates: {
                ago: "verlede",
                in: "in",
                year: "jaar",
                years: "jare",
                month: "maand",
                months: "maande",
                day: "dag",
                days: "dae",
                hour: "uur",
                hours: "ure",
                minute: "minuut",
                minutes: "minute",
                second: "sekond",
                seconds: "sekonde"
            },
            navbar: {
                home: "Huis",
                username: "Gebruikernaam",
                loginWithOsu: "Teken in met osu!",
                dmOnDiscord: "DM my op Discord!",
                contribute: "Dra by tot die projek!",
                development1: "Hierdie webwerf is nog onder ontwikkeling! Werkverrigting is dalk nog nie optimaal nie. Voel asseblief vry om my te DM op",
                development2: "as jy enige probleme kry!",
                helpTranslating: "Help die webwerf vertaal!"
            },
            home: {
                welcome: "Welkom by wysi727!",
                search: "Soek vir 'n osu! gebruikernaam op die boonste soekbalk"
            },
            user: {
                top: {
                    previous: "A.K.A",
                    lvl: "lvl",
                    joined: "Aangesluit op",
                    peakGlobal: "Piek Globale Rang",
                    peakCountry: "Piek Land Rang",
                    performance: "Werkverrigting",
                    medals: "Medaljes",
                    acc: "Akkuraatheid",
                    consistency: "Konsekwentheid",
                    speed: "Spoed",
                    stars: "Sterre",
                    aim: "Mik",
                    skillsDisclaimer: "Die kaart gebruik 'n subjektiwe formule wat nie as 'n werklike maatstaf geneem moet word nie",
                    rankedScore: "Gerangskik Telling",
                    maxCombo: "Max Kombo",
                    playTime: "Speel tyd",
                    playCount: "Speel Hoeveelheid"
                },
                bar: {
                    followers: "Volgelinge",
                    website: "Webwerf",
                    location: "Lokasie",
                    interests: "Belangstelle",
                    occupation: "Werk"
                },
                middle: {
                    setup: {
                        peripherals: "Randapparatuur",
                        mouse: "Muis",
                        keyboard: "Sleutelbord",
                        tablet: "Tablet",
                        touch: "Raakskerm",
                        monitor: "Monitor",
                        headphones: "Oorfone",
                        microphone: "Mikrofoon",
                        keypad: "Sleutelbord",
                        mousepad: "Muis mat",
                        chair: "Stoel"
                    },
                    graphs: {
                        info: "Jy kan sleep en zoem terwyl jy \"alt\" op jou sleutelbord in hou",
                        globalHistory: "Globale Rang Geskiedenis",
                        countryHistory: "Land Rang Geskiedenis",
                        playsHistory: "Spel Geskiedenis",
                        top100: "Top 100 statistieke",
                        topHitRatios: "Trefverhoudings",
                        topRankRatios: "Rang verhoudings",
                        top100plays: "Top 100 spele"
                    }
                },
                scores: {
                    pinned: "Vasgespelde tellings",
                    first: "Eerste plek tellings",
                    best: "Beste PP tellings",
                    recent: "Onlangse Tellings",
                    duration: "Duur",
                    bpm: "BPM",
                    combo: "Kombo",
                    score: "Telling",
                    playPause: "Speel/Pouse",
                    downloadMap: "Laai af map",
                    share: "Deel"
                },
                medals: {
                    rarest: "Skaarste Medalje",
                    recent: "Onderlangs behaal medalje",
                    achievedAt: "Behaal op"
                }
            }
        },
    })
)

export const languageStore = create<ActiveLanguageType>(
    (set) => ({
        name: 'english',
        code: 'gb',
        text: languagesStore.getState().english,
        english: languagesStore.getState().english,
        setLang: (name: string, code: string) => {
            set({name: name, code: code, text: (languagesStore.getState() as any)[name]})
        }
    })
)