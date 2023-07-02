import {create} from "zustand";

export interface LanguagesType {
    english: TextType,
    russian: TextType,
    german: TextType,
    turkish: TextType,
    serbian: TextType,
    spanish: TextType,
}

export interface ActiveLanguageType {
    code: string,
    text: TextType,
    setLang: (text: TextType, name: string) => void,
}

export interface TextType {
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
        dmOnDiscord: string,
        contribute: string,
        development1: string,
        development2: string,
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
        }
    }
}

export const languagesStore = create<LanguagesType>(
    () => (
        {
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
                    dmOnDiscord: 'DM me on Discord!',
                    contribute: 'Contribute to the project!',
                    development1: 'This website is still under development! Performance may not be optimal yet. Please feel free to DM me on',  // here goes "discord" and then part 2
                    development2: 'if you encounter any problems!',
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
                    }
                }
            },
            german: {
                dates: {
                    ago: 'her',     // example: 5 days "ago"
                    in: 'in',       // example: release "in" 5 days
                    year: 'Jahr',
                    years: 'Jahre',
                    month: 'Monat',
                    months: 'Monate',
                    day: 'Tag',
                    days: 'Tage',
                    hour: 'Stunde',
                    hours: 'Stunden',
                    minute: 'Minute',
                    minutes: 'Minuten',
                    second: 'Sekunde',
                    seconds: 'Sekunden',
                },
                navbar: {
                    home: 'Home',     // example: Home page
                    username: 'Username',
                    loginWithOsu: 'Login mit osu!',
                    dmOnDiscord: 'DM mich auf Discord!',
                    contribute: 'Tragen Sie zum Projekt bei!',
                    development1: 'Diese Website ist noch in Entwicklung! Performance ist möglicherweise noch nicht optimal. Du bist herzlich dazu eingeladen, mich auf',  // here goes "discord" and then part 2
                    development2: 'zu kontaktieren, wenn du irgendwelche Probleme hast!',
                },
                home: {
                    welcome: 'Willkommen auf wysi727!',
                    search: 'Suche einen osu! username in der oberen Suchleiste'
                },
                user: {
                    top: {
                        previous: 'A.K.A',                  // example: also known as / previous usernames
                        lvl: 'lvl',                         // example: lvl 100 / level 100
                        joined: 'Beigetraten am',                // example: Joined at 11/05/2020
                        peakGlobal: 'Höchster globaler Rang',   // example: Peak Global Rank: #2,301
                        peakCountry: 'Höchster Länderspezifischer Rang', // example: Peak Global Rank: #25
                        performance: 'Performance',         // example: Performance: 200pp / PP: 200pp
                        medals: 'Medallien',
                        acc: 'Accuracy',
                        consistency: 'Consistency',
                        speed: 'Speed',
                        stars: 'Stars',
                        aim: 'Aim',
                        skillsDisclaimer: 'Dieser Chart nutzt eine subjektive Formel, welche nicht als wirkliche Metrik genutzt werden sollte.',
                        rankedScore: 'Ranked Score',
                        maxCombo: 'Max Combo',
                        playTime: 'Spielzeit',
                        playCount: 'Playcount',
                    },
                    bar: {
                        followers: 'Follower',
                        website: 'Website',
                        location: 'Ort',
                        interests: 'Interessen',
                        occupation: 'Beschäftigung',           // example: my "occupation" is student
                    },
                    middle: {
                        setup: {
                            peripherals: 'Hardware',
                            mouse: 'Maus',
                            keyboard: 'Keyboard',
                            tablet: 'Tablet',
                            touch: 'Touch Screen',
                            monitor: 'Monitor',
                            headphones: 'Headphones',
                            microphone: 'Microphone',
                            keypad: 'Keypad',
                            mousepad: 'Mousepad',
                            chair: 'Stuhl',
                        },
                        graphs: {
                            globalHistory: 'Globale Rang-Historie',
                            countryHistory: 'Länderspezifische Rang-Historie',
                            playsHistory: 'Plays Historie',
                            top100: 'Top 100 stats',
                            topHitRatios: 'Hit ratios',
                            topRankRatios: 'Rang ratios',
                            top100plays: 'PP plays',
                        },
                    },
                    scores: {
                        pinned: 'Angepinnte Scores',
                        first: 'Erster Platz Scores',
                        best: 'Beste PP Scores',
                        recent: 'Neuliche Scores',
                        duration: 'Dauer',
                        bpm: 'BPM',
                        combo: 'Combo',
                        score: 'Score',
                        playPause: 'Play/Pause',            // example: play audio / pause audio
                        downloadMap: 'Map downloaden',
                        share: 'Teilen',
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
                    development1: 'Овај сајт је и даље у развоју. Пошаљите ми поруку на ',  // here goes "discord" and then part 2
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
                    home: 'Unicio',     // example: Home page
                    username: 'nombre de usuario',
                    loginWithOsu: 'Loguear con osu!',
                    dmOnDiscord: 'MP en Discord!',
                    contribute: 'Contribuye al proyecto!',
                    development1: 'Ésta página web está en desarrollo! El rendimiento puede no ser óptimo. Porfavor, siéntete libre de enviar un MP en',  // here goes "discord" and then part 2
                    development2: 'si encuentras algún problema!',
                },
                home : {
                    welcome: 'Bienvenido a wysi727!',
                    search: 'Busca un usuario de osu! en la barra buscadora!'
                },
                user: {
                    top: {
                        previous: 'anteriormente conocido como',                  // example: also known as / previous usernames
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
                    bar : {
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
            }
        })
)

export const languageStore = create<ActiveLanguageType>(
    (set) => ({
        code: 'gb',
        text: languagesStore.getState().english,
        setLang: (text: TextType, name: string) => {
            set({text: text, code: name})
        }
    })
)