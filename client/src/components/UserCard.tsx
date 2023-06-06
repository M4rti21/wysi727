import React, {useEffect, useState} from "react";
import {MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity} from "../interfaces/UserCardInterface";
import "../interfaces/ScoresInterface";
import Score from "./Score";
import {Bar, Doughnut, Line, Radar} from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-plugin-annotation';
import {
    ArcElement,
    CategoryScale,
    Chart,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    RadarController,
    RadialLinearScale,
    Title,
    Tooltip,
    Filler
} from 'chart.js'
import 'chartjs-adapter-date-fns';
import FlagEmoji from "./FlagEmoji";
import {Tooltip as ReactTooltip} from 'react-tooltip'
import {registerables} from 'chart.js';
import {ParallaxBanner} from "react-scroll-parallax";
import {ItemsEntity, ItemsEntity1, ItemsEntity2, scoresTypes} from "../interfaces/ScoresInterface";
import 'chartjs-adapter-moment';
import {ColorsType} from "../interfaces/ColorsInterface";

Chart.register(ArcElement, PointElement, CategoryScale, LinearScale, LineController, LineElement, Title, Tooltip, RadarController, RadialLinearScale, Filler, zoomPlugin);
Chart.register(...registerables);

interface userData {
    data: any;
    volume: number;
    mode: string;
}

type Mode = 'x' | 'y' | 'xy';
type ModeSnap = "x" | "y" | "nearest" | "index" | "dataset" | "point" | undefined;
type ModeModifier = 'ctrl' | 'alt' | 'shift' | 'meta';
type AxisType = "time" | undefined;
type ModeTime = 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';

const scoresTitles = {
    best: 'Best Scores',
    first: 'First Place',
    pinned: 'Pinned Scores',
    recent: 'Recent Scores',
}
const UserCard: React.FC<userData> = (props: userData) => {
    const colors: ColorsType = {
        ui: {
            font: '#f5f5f5',
            background: '#212529'
        },
        judgements: {
            x300: '#35d4fb',
            x100: '#6cf128',
            x50: '#fbc435',
            xMiss: '#fc0606',
        },
        ranks: {
            xh: '#ffffff',
            x: '#fbc435',
            sh: '#cccccc',
            s: '#c89102',
            a: '#6cf128',
            b: '#066cf1',
            c: '#b014dc',
            d: '#e00414',
            f: '#aaaaaa'
        },
        charts: {
            lvl: '#fbc435',
            skills: '#b64757',
            global: '#fbc435',
            country: '#fbc435',
            plays: '#fbc435',
            topPp: '#35d4fb'
        }
    }
    const [activeScores, setActiveScores] = useState<ItemsEntity[] | ItemsEntity1[] | ItemsEntity2[]>([]);
    const [searchingScores, setSearchingScores] = useState<boolean>(true);
    const [scoresTitle, setScoresTitle] = useState<string>(scoresTitles.pinned);
    const [userScores, setUserScores] = useState<scoresTypes>({
        best: {
            items: [],
            pagination: {
                hasMore: false
            },
            count: 0
        },
        firsts: {
            items: [],
            pagination: {
                hasMore: false
            },
            count: 0
        },
        pinned: {
            items: [],
            pagination: {
                hasMore: false
            },
            count: 0
        },
        recent: {
            items: [],
            pagination: {
                hasMore: false
            },
            count: 0
        }
    });
    const getFirstCountryLog = () => {
        const today = new Date(props.data.db_rank_history?.country_rank[0]?.date);
        return today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    }
    let firstCountryLog;
    if (props.data.db_rank_history?.country_rank[0]) {
        firstCountryLog = getFirstCountryLog();
    } else {
        const today = new Date()
        firstCountryLog = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    }

    async function getScores(thing: string) {
        const response = await fetch(`http://localhost:5000/usrScores/${props.data.id}/${thing}/${props.mode}`);
        return await response.json();
    }

    const getNewScores = async () => {
        const newScores: scoresTypes = {
            best: {
                items: [],
                pagination: {
                    hasMore: false
                },
                count: 0,
            },
            firsts: {
                items: [],
                pagination: {
                    hasMore: false
                },
                count: 0,
            },
            pinned: {
                items: [],
                pagination: {
                    hasMore: false
                },
                count: 0,
            },
            recent: {
                items: [],
                pagination: {
                    hasMore: false
                },
                count: 0,
            }
        };
        newScores.pinned.items = await getScores('pinned');
        newScores.firsts.items = await getScores('firsts');
        newScores.best.items = await getScores('best');
        newScores.recent.items = await getScores('recent');
        setSearchingScores(true);
        setUserScores(newScores);
        setActiveScores(newScores.pinned.items);
        setScoresTitle(scoresTitles.pinned);
        setSearchingScores(false);
        console.log(newScores);
    }
    const secondsToDHMS = (seconds: number) => {
        seconds = Number(seconds);
        let d = Math.floor(seconds / (3600 * 24));
        let h = Math.floor(seconds % (3600 * 24) / 3600);
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 60);
        let dDisplay = d > 0 ? d + "d " : "";
        let hDisplay = h > 0 ? h + "h " : "";
        let mDisplay = m > 0 ? m + "m " : "";
        let sDisplay = s > 0 ? s + "s" : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }
    const playtime = secondsToDHMS(props.data.statistics.play_time);
    const avgPlayTime = secondsToDHMS(props.data.statistics.play_time / props.data.statistics.play_count);
    const hits_total: number = (props.data.statistics.count_50 + props.data.statistics.count_100 + props.data.statistics.count_300 + props.data.statistics.count_miss);
    const hits_miss_percent: number = props.data.statistics.count_miss / hits_total * 100;
    const hits_50_percent: number = props.data.statistics.count_50 / hits_total * 100;
    const hits_100_percent: number = props.data.statistics.count_100 / hits_total * 100;
    const hits_300_percent: number = props.data.statistics.count_300 / hits_total * 100;
    Chart.defaults.font.family = "Torus Pro";
    Chart.defaults.plugins.legend.display = false;
    Chart.defaults.color = colors.ui.font;
    const ranks_total: number = (props.data.statistics.grade_counts.ssh + props.data.statistics.grade_counts.ss + props.data.statistics.grade_counts.sh + props.data.statistics.grade_counts.s + props.data.statistics.grade_counts.a);
    const ranks_xh_percent: number = props.data.statistics.grade_counts.ssh / ranks_total * 100;
    const ranks_x_percent: number = props.data.statistics.grade_counts.ss / ranks_total * 100;
    const ranks_sh_percent: number = props.data.statistics.grade_counts.sh / ranks_total * 100;
    const ranks_s_percent: number = props.data.statistics.grade_counts.s / ranks_total * 100;
    const ranks_a_percent: number = props.data.statistics.grade_counts.a / ranks_total * 100;
    const hitData = {
        labels: ['300', '100', '50', '0'],
        datasets: [
            {
                data: [props.data.statistics.count_300, props.data.statistics.count_100, props.data.statistics.count_50, props.data.statistics.count_miss],
                backgroundColor: [colors.judgements.x300, colors.judgements.x100, colors.judgements.x50, colors.judgements.xMiss],
                hoverBackgroundColor: [colors.judgements.x300 + 'cc', colors.judgements.x100 + 'cc', colors.judgements.x50 + 'cc', colors.judgements.xMiss + 'cc'],
            },
        ],
    };
    const rankData = {
        labels: ['XH', 'X', 'SH', 'S', 'A'],
        datasets: [
            {
                data: [props.data.statistics.grade_counts.ssh, props.data.statistics.grade_counts.ss, props.data.statistics.grade_counts.sh, props.data.statistics.grade_counts.s, props.data.statistics.grade_counts.a],
                backgroundColor: [colors.ranks.xh, colors.ranks.x, colors.ranks.sh, colors.ranks.s, colors.ranks.a],
                hoverBackgroundColor: [colors.ranks.xh + 'cc', colors.ranks.x + 'cc', colors.ranks.sh + 'cc', colors.ranks.s + 'cc', colors.ranks.a + 'cc'],
            },
        ],
    };
    const getHistoryDates = (rankArray: { date: Date, rank: number }[]) => {
        return rankArray.map(function (obj: any) {
            return new Date(obj.date);
        });
    }
    const getHistoryValues = (rankArray: any) => {
        return rankArray.map(function (obj: any) {
            return obj.rank;
        });
    }
    const globalHistoryData = {
        labels: getHistoryDates(props.data.db_rank_history.global_rank),
        datasets: [{
            label: 'Rank',
            data: getHistoryValues(props.data.db_rank_history.global_rank),
            fill: false,
            borderColor: colors.charts.global,
            tension: 0.1
        }]
    };
    const countryHistoryData = {
        labels: getHistoryDates(props.data.db_rank_history.country_rank),
        datasets: [{
            label: 'Rank',
            data: getHistoryValues(props.data.db_rank_history.country_rank),
            fill: false,
            borderColor: colors.charts.country,
            tension: 0.1
        }]
    };
    const today = new Date();
    const daysAgoGlobal = new Date(new Date().setDate(today.getDate() - 90)).setHours(0, 0, 0);
    const daysAgoCountry = new Date(new Date().setDate(today.getDate() - 20)).setHours(0, 0, 0);
    const historyChartOptions = {
        responsive: true,
        scales: {
            y: {
                reverse: true,
                ticks: {
                    min: 0,
                    beginAtZero: true,
                    stepSize: 1
                }
            },
            x: {
                type: 'time' as AxisType,
                min: daysAgoGlobal,
                time: {
                    displayFormats: {
                        day: 'DD/MM/YY',
                    },
                },
            }
        },
        elements: {
            point: {
                radius: 2
            }
        },
        interaction: {
            mode: 'index' as ModeSnap
        },
        plugins: {
            tooltip: {
                displayColors: false
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                        modifierKey: 'alt' as ModeModifier
                    },
                    pinch: {
                        enabled: true,
                        modifierKey: 'alt' as ModeModifier
                    },
                    mode: 'x' as Mode
                },
                pan: {
                    enabled: true,
                    mode: 'x' as Mode,
                    modifierKey: 'alt' as ModeModifier
                },
                rangeMin: {
                    x: 1,
                    y: 1
                },
            }
        },
        pointHitRadius: 10,
        pointHoverRadius: 4,

    };
    const playsHistoryData = {
        labels: props.data.monthly_playcounts.map((obj: MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity) => {
            return new Date(obj.start_date);
        }),
        datasets: [{
            label: 'Play Count',
            data: props.data.monthly_playcounts.map((obj: MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity) => obj.count),
            fill: false,
            borderColor: colors.charts.plays,
            tension: 0.1
        }]
    };
    const playsHistoryOptions = {
        responsive: true,
        scales: {
            y: {
                reverse: false,
                ticks: {
                    min: 0,
                    beginAtZero: true,
                    stepSize: 1
                }
            },
            x: {
                type: 'time' as AxisType,
                time: {
                    displayFormats: {
                        day: 'MM/YY',
                    },
                },
            }
        },
        elements: {
            point: {
                radius: 2
            }
        },
        interaction: {
            mode: 'index' as ModeSnap
        },
        plugins: {
            tooltip: {
                displayColors: false
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                        modifierKey: 'alt' as ModeModifier
                    },
                    pinch: {
                        enabled: true,
                        modifierKey: 'alt' as ModeModifier
                    },
                    mode: 'x' as Mode
                },
                pan: {
                    enabled: true,
                    mode: 'x' as Mode,
                    modifierKey: 'alt' as ModeModifier
                },
                rangeMin: {
                    x: 1,
                    y: 1
                },
            }
        },
        pointHitRadius: 10,
        pointHoverRadius: 4,
    };
    let aimScore = 0;
    let speedScore = 0;
    let accScore = 0;
    let starsScore = 0;
    let constScore = 0;
    //  CALCULATE SKILLS
    //
    //  Consistency:
    //      Calculate the standard deviation (SD) of the player's scores across their top 100 plays.
    //      Normalize the SD by dividing it by the maximum possible standard deviation across all players.
    //      Multiply the normalized SD by 100 to obtain the consistency score.
    //
    //      Consistency Score = (SD / Max SD) * 100
    //
    //  Aim:
    //      Calculate the average Circle Size (CS) of the player's top 100 plays.
    //      Calculate the average Approach Rate (AR) of the player's top 100 plays.
    //      Calculate the average hit accuracy (HA) of the player's top 100 plays.
    //      Assign weights to each attribute: CS_weight, AR_weight, HA_weight (sum of weights should be 1).
    //      Combine the weighted values to generate the aim score.
    //
    //      Aim Score = (CS * 0.4 + AR * 0.3 + HA * 0.3) * 100
    //
    //  Speed:
    //      Calculate the average Beats Per Minute (BPM) of the songs in the player's top 100 plays.
    //      Normalize the average BPM by dividing it by the maximum possible BPM across all players.
    //      Multiply the normalized average BPM by 100 to obtain the speed score.
    //      Max BPM = 300
    //      Speed Score = (Avg BPM / Max BPM) * 100
    //
    //  Accuracy:
    //      Calculate the average hit accuracy (HA) of the player's top 100 plays.
    //      Normalize the average hit accuracy by dividing it by the maximum possible hit accuracy across all players.
    //      Multiply the normalized average hit accuracy by 100 to obtain the accuracy score.
    //
    //      Accuracy Score = (HA / Max HA) * 100
    //
    const calculateStandardDeviation = (numbers: number[]) => {
        const n = numbers.length;
        const mean = numbers.reduce((sum, num) => sum + num, 0) / n;
        const squaredDiffs = numbers.map(num => Math.pow(num - mean, 2));
        const variance = squaredDiffs.reduce((sum, num) => sum + num, 0) / n;
        return Math.sqrt(variance);
    }
    const allPPs: number[] = [];
    const calculateScores = () => {
        let avgCS = 0;
        let avgAR = 0;
        let avgHA = 0;
        let avgSpd = 0;
        let avgSR = 0;
        let allCS: number[] = [];
        let allAR: number[] = [];
        let allHA: number[] = [];
        let allSpd: number[] = [];
        let allSR: number[] = [];
        const modFactors = {
            DT: 1.5,
            HT: 0.75,
            HD: 0.1,
            HR: 1.4,
            FL: 0.2,
            EZ: 0.5,
        };
        for (let score of userScores.best.items) {
            allPPs.push(Math.round(score.pp));
            //CS
            if (score.mods.some(obj => obj.acronym === 'EZ')) {
                avgCS += score.beatmap.cs / 2;
            } else if (score.mods.some(obj => obj.acronym === 'HR')) {
                if (score.beatmap.cs * 1.3 < 10) {
                    avgCS += score.beatmap.cs * 1.3;
                    allCS.push(score.beatmap.cs * 1.3);
                } else {
                    avgCS += 10;
                    allCS.push(10);
                }
            } else {
                avgCS += score.beatmap.cs;
                allCS.push(score.beatmap.cs);
            }
            //AR
            if (score.mods.some(obj => obj.acronym === 'EZ')) {
                if (score.mods.some(obj => obj.acronym === 'DT')) {
                    avgAR += (score.beatmap.ar * 0.5) * 1.33;
                    allAR.push((score.beatmap.ar * 0.5) * 1.33);
                } else if (score.mods.some(obj => obj.acronym === 'HT')) {
                    avgAR += (score.beatmap.ar * 0.5) * 0.67;
                    allAR.push((score.beatmap.ar * 0.5) * 0.67);
                } else {
                    avgAR += score.beatmap.ar * 0.5;
                    allAR.push(score.beatmap.ar * 0.5);
                }
            } else if (score.mods.some(obj => obj.acronym === 'HR')) {
                if (score.mods.some(obj => obj.acronym === 'DT')) {
                    if (score.beatmap.ar * 1.4 * 1.33 < 11) {
                        avgAR += score.beatmap.ar * 1.4 * 1.33;
                        allAR.push(score.beatmap.ar * 1.4 * 1.33);
                    } else {
                        avgAR += 11;
                        allAR.push(11);
                    }
                } else if (score.mods.some(obj => obj.acronym === 'HT')) {
                    if (score.beatmap.ar * 1.4 * 0.67 < 11) {
                        avgAR += score.beatmap.ar * 1.4 * 0.67;
                        allAR.push(score.beatmap.ar * 1.4 * 0.67);
                    } else {
                        avgAR += 11;
                        allAR.push(11);
                    }
                } else {
                    if (score.beatmap.ar * 1.4 < 10) {
                        avgAR += score.beatmap.ar * 1.4;
                        allAR.push(score.beatmap.ar * 1.4);
                    } else {
                        allAR.push(10);
                    }
                }
            } else if (score.mods.some(obj => obj.acronym === 'DT')) {
                avgAR += score.beatmap.ar * 1.33;
                allAR.push(score.beatmap.ar * 1.33);
            } else if (score.mods.some(obj => obj.acronym === 'HT')) {
                avgAR += score.beatmap.ar * 0.67;
                allAR.push(score.beatmap.ar * 0.67);
            } else {
                avgAR += score.beatmap.ar;
                allAR.push(score.beatmap.ar);
            }

            let starRating = score.beatmap.difficulty_rating;

            if (score.mods.some(obj => obj.acronym === 'EZ')) {
                starRating *= modFactors.EZ;
            }
            if (score.mods.some(obj => obj.acronym === 'HR')) {
                starRating *= modFactors.HR;
            }

            if (score.mods.some(obj => obj.acronym === 'DT')) {
                starRating *= modFactors.DT;
            }
            if (score.mods.some(obj => obj.acronym === 'HT')) {
                starRating *= modFactors.HT;
            }

            if (score.mods.some(obj => obj.acronym === 'FL')) {
                starRating *= modFactors.FL;
            }

            avgHA += score.beatmap.accuracy;
            allHA.push(score.beatmap.accuracy);
            avgSR += starRating;
            allSR.push(starRating);
            avgSpd += score.mods.some(obj => obj.acronym === 'DT') ? score.beatmap.bpm * 1.5 : score.mods.some(obj => obj.acronym === 'HT') ? score.beatmap.bpm * 0.75 : score.beatmap.bpm;
            allSpd.push((score.mods.some(obj => obj.acronym === 'DT') ? score.beatmap.bpm * 1.5 : score.mods.some(obj => obj.acronym === 'HT') ? score.beatmap.bpm * 0.75 : score.beatmap.bpm));
        }
        avgCS /= userScores.best.items.length * 10;
        avgAR /= userScores.best.items.length * 10;
        avgHA /= userScores.best.items.length * 10;
        avgSR /= userScores.best.items.length * 10;
        avgSpd /= userScores.best.items.length * 300;
        accScore = Math.round(avgHA * 100);
        avgCS *= 0.4;
        avgHA *= 0.6;
        avgAR *= 0.2;
        starsScore = avgSR > 100 ? 100 : Math.round(avgSR * 100);
        aimScore = (avgCS + avgHA + avgAR) * 100 > 100 ? 100 : Math.round((avgCS + avgHA + avgAR) * 100);
        speedScore = avgSpd > 100 ? 100 : Math.round(avgSpd * 100);
        constScore = Math.round(100 - (
            calculateStandardDeviation(allHA) +
            calculateStandardDeviation(allAR) +
            calculateStandardDeviation(allCS) +
            calculateStandardDeviation(allSR) +
            calculateStandardDeviation(allSpd) / 4
        ));
    }
    useEffect(() => {
        getNewScores().then()
    }, [props.mode, props.data.id]);
    calculateScores();
    const skillsData = {
        labels: [
            `Consistency - ${constScore}`,
            `Speed - ${speedScore}`,
            `Aim - ${aimScore}`,
            `Stars - ${starsScore}`,
            `Accuracy - ${accScore}`
        ],
        datasets: [{
            label: 'Skill set',
            data: [constScore, speedScore, aimScore, starsScore, accScore],
            fill: true,
            backgroundColor: '#FF638444',
            borderColor: '#FF6384FF',
        }]
    };
    const skillsOptions = {
        scales: {
            r: {
                ticks: {
                    display: false,
                    tooltip: false
                },
                max: 100,
                min: 0,
                beginAtZero: false,
            }
        },
        plugins: {
            tooltip: {
                enabled: false
            },
            legend: {
                display: false
            },
            customCanvasBackgroundColor: {
                color: 'red',
            }
        },
        elements: {
            line: {
                borderWidth: 3
            }
        }
    };
    const ppData = {
        labels: allPPs.map(() => ''),
        datasets: [{
            label: 'PP',
            data: allPPs,
        }],
    };
    const ppDataOptions = {
        responsive: true,
        pointHoverRadius: 4,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false,
                min: allPPs.reverse()[0] - Math.round(allPPs.reverse()[0] * 0.1)
            },
            x: {
                beginAtZero: false,
                ticks: {
                    display: false
                }
            },
        },
        plugins: {
            tooltip: {
                displayColors: false
            }
        }
    };
    return (
        <div className="row m-0" style={{
            maxWidth: 1200,
            backgroundColor: colors.ui.background,
            color: colors.ui.font
        }}>
            <ReactTooltip id="reactTooltip" style={{zIndex: 10}}/>
            <div className="topPanel m-0 p-0 col-12" style={{overflow: "hidden", position: "relative"}}>
                <ParallaxBanner layers={
                    [{
                        image: props.data.cover_url,
                        speed: -18
                    }]} style={{width: "100%", height: "100%"}}>
                    <div className="h-100 w-100" style={{backdropFilter: "brightness(40%) blur(4px)"}}>
                        <div className="d-flex flex-row justify-content-start">
                            <div className="p-3">
                                <div className="ratio ratio-1x1 rounded-5"
                                     style={{
                                         backgroundImage: `url(${props.data.avatar_url})`,
                                         backgroundPosition: "center",
                                         backgroundSize: "cover",
                                         height: 200,
                                         width: 200
                                     }}>
                                </div>
                                <div className="mt-2">
                                    <a data-tooltip-id={props.data.previous_usernames.length > 0 ? "reactTooltip" : ""}
                                       data-tooltip-content={`A.K.A: ${JSON.stringify(props.data.previous_usernames).substring(1, JSON.stringify(props.data.previous_usernames).length - 1).replace(/"/g, '')}`}
                                       className="d-block text-center fs-3 mb-2 text-align-center text-decoration-none text-light"
                                       href={`https://osu.ppy.sh/users/${props.data.id}`} target="_blank"
                                       rel="noreferrer">
                                        {props.data.username}
                                    </a>
                                </div>
                                <div className="level d-flex flex-row align-items-center gap-3">
                                    <h6 className="p-0 m-0">lvl {props.data.statistics.level.current}</h6>
                                    <div className="flex-grow-1 overflow-hidden bg-black rounded-pill"
                                         style={{height: 5}}>
                                        <div className="bg-warning"
                                             style={{width: `${props.data.statistics.level.progress}%`, height: 5}}>
                                        </div>
                                    </div>
                                    <h6 className="p-0 m-0">{props.data.statistics.level.progress}%</h6>
                                </div>
                            </div>
                            <div className="p-3">
                                <div className="fs-1 d-flex flex-row align-items-center"
                                     data-tooltip-id="reactTooltip"
                                     data-tooltip-content={`Peak Rank:#${props.data.rank_highest.rank?.toLocaleString()}`}>
                                    <i className="bi bi-globe2 me-2 fs-2"></i>#{props.data.statistics.global_rank?.toLocaleString()}
                                </div>
                                <div>
                                    <div className="fs-2 d-flex flex-row align-items-center">
                                        <div className="d-flex flex-row align-items-center"
                                             data-tooltip-id="reactTooltip"
                                             data-tooltip-content={`Peak Country Rank: #${
                                                 props.data.db_rank_history.country_rank.reduce((prev: any, current: any) => {
                                                     return (prev.rank > current.rank) ? prev : current;
                                                 }).rank} (started logging in ${firstCountryLog})`}>
                                            <img width="32" className="countryIco me-2" alt="ico"
                                                 src={require(`../assets/countries/${props.data.country.code.toLowerCase()}/vector.svg`)}/>
                                            #{props.data.statistics.rank.country?.toLocaleString()}
                                        </div>
                                        <div className="ms-2 h-100 d-flex align-items-center"
                                             data-tooltip-id="reactTooltip"
                                             data-tooltip-content={props.data.country.name}>
                                            <FlagEmoji size={32} code={props.data.country.code}/>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>Performance:</div>
                                    <div
                                        className="fs-4">{Math.round(props.data.statistics.pp)?.toLocaleString()}pp
                                    </div>
                                </div>
                                <div>
                                    <div>Accuracy:</div>
                                    <div className="fs-4">
                                        {props.data.statistics.hit_accuracy.toFixed(2)}%
                                    </div>
                                </div>
                                <div>
                                    <div>Medals:</div>
                                    <div className="fs-5">
                                        {props.data.user_achievements.length}<i
                                        className="bi bi-award-fill ms-2"></i>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop: -100, marginBottom: -100, zIndex: 4}}
                                 className="position-relative mx-auto d-flex align-items-center">
                                <i className="bi bi-info-circle position-absolute"
                                   style={{top: 120, right: 30}}
                                   data-tooltip-id="reactTooltip"
                                   data-tooltip-content={`This chart uses a subjective formula which should not be taken as an actual metric`}></i>
                                <Radar data={skillsData} options={skillsOptions} height={400} width={400}/>
                            </div>
                            <div className="p-3 d-flex flex-column gap-3">
                                <div>
                                    <div>
                                        <i className="bi bi-chevron-double-up me-2"></i>Ranked Score:
                                    </div>
                                    <div className="fs-5 ms-4"
                                         data-tooltip-id="reactTooltip"
                                         data-tooltip-content={`Total Score: ${props.data.statistics.total_score.toLocaleString()}`}>
                                        {props.data.statistics.ranked_score.toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <i className="bi bi-1-circle me-2"></i>Max Combo:
                                    </div>
                                    <div className="fs-5 ms-4">{props.data.statistics.maximum_combo}x</div>
                                </div>
                                <div>
                                    <div>
                                        <i className="bi bi-clock me-2"></i>Play Time:
                                    </div>
                                    <div className="fs-5 ms-4"
                                         style={{width: "min-content"}}
                                         data-tooltip-id="reactTooltip"
                                         data-tooltip-content={playtime}>
                                        {Math.round(props.data.statistics.play_time / 60 / 60)}h
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <i className="bi bi-arrow-counterclockwise me-2"></i>Play Count:
                                    </div>
                                    <div className="fs-5 ms-4">
                                        {props.data.statistics.play_count?.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ParallaxBanner>
            </div>
            <div className="barPanel m-0 p-0 col-12 shadow p-3 d-flex flex-row flex-wrap gap-3">
                <div>
                    <i className="bi bi-people-fill me-2"></i> Followers: {props.data.follower_count}
                </div>
                <div>
                    <i className="bi bi-discord me-2"></i>{props.data.discord}
                </div>
                <div>
                    <i className="bi bi-twitter me-2"></i>{props.data.twitter}
                </div>
                <div>
                    <i className="bi bi-globe2 me-2"></i>{props.data.website}
                </div>
                <div>
                    <i className="bi bi-geo-alt-fill me-2"></i>{props.data.location}
                </div>
                <div>
                    <i className="bi bi-suit-heart-fill me-2"></i>{props.data.interests}
                </div>
                <div>
                    <i className="bi bi-buildings-fill me-2"></i>{props.data.occupation}
                </div>
            </div>
            <div className="botPanel col-12 row m-0 p-3 justify-content-center" style={{zIndex: 3}}>
                <div className="midPanel col-12 col-xl-8 m-0">
                    <div className="d-flex flex-column me-3">
                        <div className="rounded-5 shadow row mb-3">
                            <div className="col-12 col-lg-6 row m-0 p-3 justify-content-center">
                                <div>
                                    Hit Ratios:
                                </div>
                                <div className="mt-2" style={{height: 200, width: 200}}>
                                    <Doughnut data={hitData}/>
                                </div>
                                <ul className="col-12">
                                    <li className="d-flex flex-row align-items-center justify-content-between">
                                <span className="d-flex flex-row align-items-center gap-1">
                                <div style={{
                                    backgroundColor: colors.judgements.x300,
                                    height: 15,
                                    width: 15
                                }}></div>300: {hits_300_percent.toFixed(2)}%</span><span>{props.data.statistics.count_300?.toLocaleString()}</span>
                                    </li>
                                    <li className="d-flex flex-row align-items-center justify-content-between"><span
                                        className="d-flex flex-row align-items-center gap-1"><div
                                        style={{
                                            backgroundColor: colors.judgements.x100,
                                            height: 15,
                                            width: 15
                                        }}></div>100: {hits_100_percent.toFixed(2)}%</span><span>{props.data.statistics.count_100?.toLocaleString()}</span>
                                    </li>
                                    <li className="d-flex flex-row align-items-center justify-content-between"><span
                                        className="d-flex flex-row align-items-center gap-1"><div
                                        style={{
                                            backgroundColor: colors.judgements.x50,
                                            height: 15,
                                            width: 15
                                        }}></div>50: {hits_50_percent.toFixed(2)}%</span><span>{props.data.statistics.count_50?.toLocaleString()}</span>
                                    </li>
                                    <li className="d-flex flex-row align-items-center justify-content-between"><span
                                        className="d-flex flex-row align-items-center gap-1"><div
                                        style={{
                                            backgroundColor: colors.judgements.xMiss,
                                            height: 15,
                                            width: 15
                                        }}></div>0: {hits_miss_percent.toFixed(2)}%</span><span>{props.data.statistics.count_miss?.toLocaleString()}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12 col-lg-6 row m-0 p-3 justify-content-center">
                                <div>
                                    Rank Ratios:
                                </div>
                                <div className="" style={{height: 200, width: 200}}>
                                    <Doughnut data={rankData}/>
                                </div>
                                <ul className="col-12">
                                    <li className="d-flex flex-row align-items-center justify-content-between"><span
                                        className="d-flex flex-row align-items-center gap-1"><div
                                        style={{
                                            backgroundColor: colors.ranks.xh,
                                            height: 15,
                                            width: 15
                                        }}></div>XH: {(ranks_xh_percent).toFixed(2)}%</span><span>{props.data.statistics.grade_counts.ssh.toLocaleString()}</span>
                                    </li>
                                    <li className="d-flex flex-row align-items-center justify-content-between"><span
                                        className="d-flex flex-row align-items-center gap-1"><div
                                        style={{
                                            backgroundColor: colors.ranks.x,
                                            height: 15,
                                            width: 15
                                        }}></div>X: {(ranks_x_percent).toFixed(2)}%</span><span>{props.data.statistics.grade_counts.ss.toLocaleString()}</span>
                                    </li>
                                    <li className="d-flex flex-row align-items-center justify-content-between"><span
                                        className="d-flex flex-row align-items-center gap-1"><div
                                        style={{
                                            backgroundColor: colors.ranks.sh,
                                            height: 15,
                                            width: 15
                                        }}></div>SH: {(ranks_sh_percent).toFixed(2)}%</span><span>{props.data.statistics.grade_counts.sh.toLocaleString()}</span>
                                    </li>
                                    <li className="d-flex flex-row align-items-center justify-content-between"><span
                                        className="d-flex flex-row align-items-center gap-1"><div
                                        style={{
                                            backgroundColor: colors.ranks.s,
                                            height: 15,
                                            width: 15
                                        }}></div>S: {(ranks_s_percent).toFixed(2)}%</span><span>{props.data.statistics.grade_counts.s.toLocaleString()}</span>
                                    </li>
                                    <li className="d-flex flex-row align-items-center justify-content-between"><span
                                        className="d-flex flex-row align-items-center gap-1"><div
                                        style={{
                                            backgroundColor: colors.ranks.a,
                                            height: 15,
                                            width: 15
                                        }}></div>A: {(ranks_a_percent).toFixed(2)}%</span><span>{props.data.statistics.grade_counts.a.toLocaleString()}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="rounded-5 shadow row mb-3">
                            <div className="col-12 col-lg-6 row m-0 p-3 justify-content-center">
                                <div className="d-flex flex-row justify-content-between">
                                    <h6>Global Rank History:</h6>
                                    <i className="bi bi-info-circle"
                                       data-tooltip-id="reactTooltip"
                                       data-tooltip-content={`You can zoom or drag by holding 'alt'`}></i>
                                </div>
                                <Line data={globalHistoryData} options={historyChartOptions}/>
                            </div>
                            <div className="col-12 col-lg-6 row m-0 p-3 justify-content-center">
                                <div className="d-flex flex-row justify-content-between">
                                    <h6>Country Rank History:</h6>
                                    <i className="bi bi-info-circle"
                                       data-tooltip-id="reactTooltip"
                                       data-tooltip-content={`You can zoom or drag by holding 'alt'`}></i>
                                </div>
                                <Line data={countryHistoryData} options={historyChartOptions}/>
                            </div>
                        </div>
                        <div className="rounded-5 shadow row mb-3">
                            <div className="col-12 col-lg-6 row m-0 p-3 justify-content-center">
                                <div className="d-flex flex-row justify-content-between">
                                    <h6>Plays History:</h6>
                                    <i className="bi bi-info-circle"
                                       data-tooltip-id="reactTooltip"
                                       data-tooltip-content={`You can zoom or drag by holding 'alt'`}></i>
                                </div>
                                <Line data={playsHistoryData} options={playsHistoryOptions}/>
                            </div>
                            <div className="col-12 col-lg-6 row m-0 p-3 justify-content-center">
                                <div className="d-flex flex-row justify-content-between">
                                    <h6>Top {userScores.best.items.length} plays:</h6>
                                </div>
                                <div className="w-100 flex-grow-1">
                                    <Bar data={ppData} options={ppDataOptions}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rigthPanel col-12 col-xl-4 m-0">
                    <div className="p-3 d-flex flex-column rounded-5 shadow m-0">
                        <div className="m-0 d-flex flex-row align-items-center justify-content-between">
                            <div className="rounded-pill overflow-hidden flex-grow-1 d-flex flex-row shadow">
                                <button className="btn btn-dark rounded-0 flex-grow-1"
                                        data-tooltip-id={"reactTooltip"}
                                        data-tooltip-content={"Pinned Scores"}
                                        disabled={activeScores === userScores.pinned.items}
                                        onClick={() => {
                                            setSearchingScores(true);
                                            setScoresTitle(scoresTitles.pinned);
                                            setSearchingScores(false);
                                            setActiveScores(userScores.pinned.items);
                                        }}>
                                    <i className="bi bi-pin-angle"></i>
                                </button>
                                <button className="btn btn-dark rounded-0 flex-grow-1"
                                        data-tooltip-id={"reactTooltip"}
                                        data-tooltip-content={"First Place"}
                                        disabled={activeScores === userScores.firsts.items}
                                        onClick={() => {
                                            setSearchingScores(true);
                                            setScoresTitle(scoresTitles.first);
                                            setSearchingScores(false);
                                            setActiveScores(userScores.firsts.items);
                                        }}>
                                    <i className="bi bi-star"></i>
                                </button>
                                <button className="btn btn-dark rounded-0 flex-grow-1"
                                        data-tooltip-id={"reactTooltip"}
                                        data-tooltip-content={"Best Scores"}
                                        disabled={activeScores === userScores.best.items}
                                        onClick={() => {
                                            setSearchingScores(true);
                                            setScoresTitle(scoresTitles.best);
                                            setSearchingScores(false);
                                            setActiveScores(userScores.best.items);
                                        }}>
                                    <i className="bi bi-bar-chart-line"></i>
                                </button>
                                <button className="btn btn-dark rounded-0 flex-grow-1"
                                        data-tooltip-id={"reactTooltip"}
                                        data-tooltip-content={"Recent Scores"}
                                        disabled={activeScores === userScores.recent.items}
                                        onClick={() => {
                                            setSearchingScores(true);
                                            setScoresTitle(scoresTitles.recent);
                                            setSearchingScores(false);
                                            setActiveScores(userScores.recent.items);
                                        }}>
                                    <i className="bi bi-clock-history"></i>
                                </button>
                            </div>
                        </div>
                        <div className="d-flex flex-column m-0 pt-2 justify-content-center"
                             style={{overflowY: "scroll"}}>
                            {searchingScores ?
                                <div className="spinner-border mx-auto mt-5" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> :
                                <>{activeScores.map((score: any, index: number) => (
                                    <Score data={score} colors={colors} num={index} volume={props.volume}/>
                                ))}</>}

                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="botPanel p-3 text-light" dangerouslySetInnerHTML={{__html: props.data.page.html}}*/}
            {/*     style={{backgroundColor: '#2a2226'}}></div>*/}
        </div>
    );
}

export default UserCard;