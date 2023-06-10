import React, {useEffect, useRef, useState} from "react";
import {MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity, User} from "../../interfaces/UserCardInterface";
import "../../interfaces/ScoresInterface";
import Score from "./Score";
import {Bar, Doughnut, Line} from 'react-chartjs-2';
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
import {registerables} from 'chart.js';
import {ItemsEntity, ItemsEntity1, ItemsEntity2, scoresTypes} from "../../interfaces/ScoresInterface";
import 'chartjs-adapter-moment';
import {ColorsType} from "../../interfaces/ColorsInterface";
import {UserMedalsInterface} from "../../interfaces/MedalsInterface";
import Medal from "./Medal";
import BarPanel from "./panels/BarPanel";
import TopPanel from "./panels/TopPanel";
import BBCode from '@bbob/react';
import presetReact from '@bbob/preset-react';

Chart.register(ArcElement, PointElement, CategoryScale, LinearScale, LineController, LineElement, Title, Tooltip, RadarController, RadialLinearScale, Filler, zoomPlugin);
Chart.register(...registerables);

interface userData {
    data: User;
    volume: number;
    mode: string;
    medals: UserMedalsInterface;
    scores: scoresTypes;
    username: string;
    colors: ColorsType;
}

type Mode = 'x' | 'y' | 'xy';
type ModeSnap = "x" | "y" | "nearest" | "index" | "dataset" | "point" | undefined;
type ModeModifier = 'ctrl' | 'alt' | 'shift' | 'meta';
type AxisType = "time" | undefined;
const UserCard: React.FC<userData> = (props: userData) => {
    const plugins = [presetReact()];
    const [activeScores, setActiveScores] = useState<ItemsEntity[] | ItemsEntity1[] | ItemsEntity2[]>([]);
    const [searchingScores, setSearchingScores] = useState<boolean>(false);
    const getFirstCountryLog = () => {
        const today = new Date(props.data?.db_rank_history?.country_rank[0]?.date);
        return today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    }
    let firstCountryLog;
    if (props.data?.db_rank_history?.country_rank[0]) {
        firstCountryLog = getFirstCountryLog();
    } else {
        const today = new Date()
        firstCountryLog = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
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
    Chart.defaults.color = props.colors.ui.font;
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
                backgroundColor: [props.colors.judgements.x300, props.colors.judgements.x100, props.colors.judgements.x50, props.colors.judgements.xMiss],
                hoverBackgroundColor: [props.colors.judgements.x300 + 'cc', props.colors.judgements.x100 + 'cc', props.colors.judgements.x50 + 'cc', props.colors.judgements.xMiss + 'cc'],
            },
        ],
    };
    const rankData = {
        labels: ['XH', 'X', 'SH', 'S', 'A'],
        datasets: [
            {
                data: [props.data.statistics.grade_counts.ssh, props.data.statistics.grade_counts.ss, props.data.statistics.grade_counts.sh, props.data.statistics.grade_counts.s, props.data.statistics.grade_counts.a],
                backgroundColor: [props.colors.ranks.xh, props.colors.ranks.x, props.colors.ranks.sh, props.colors.ranks.s, props.colors.ranks.a],
                hoverBackgroundColor: [props.colors.ranks.xh + 'cc', props.colors.ranks.x + 'cc', props.colors.ranks.sh + 'cc', props.colors.ranks.s + 'cc', props.colors.ranks.a + 'cc'],
            },
        ],
    };
    const doughnutOptions = {
        elements: {
            arc: {
                borderWidth: 0
            }
        }
    }
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
            borderColor: props.colors.charts.global,
            tension: 0.1
        }]
    };
    const countryHistoryData = {
        labels: getHistoryDates(props.data.db_rank_history.country_rank),
        datasets: [{
            label: 'Rank',
            data: getHistoryValues(props.data.db_rank_history.country_rank),
            fill: false,
            borderColor: props.colors.charts.country,
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
            borderColor: props.colors.charts.plays,
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
        if (props.scores?.best?.items) {
            for (let score of props.scores.best.items) {
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
        }
        avgCS /= props.scores.best.items.length * 10;
        avgAR /= props.scores.best.items.length * 10;
        avgHA /= props.scores.best.items.length * 10;
        avgSR /= props.scores.best.items.length * 10;
        avgSpd /= props.scores.best.items.length * 300;
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
            backgroundColor: props.colors.charts.skills + '44',
            borderColor: props.colors.charts.skills,
            color: '#f5f5f5'
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
            backgroundColor: props.colors.charts.topPp,
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
    useEffect(() => {
        setActiveScores(props.scores.pinned.items);
        document.title = `${props.username} · wysi727`;
    }, [props.scores]);
    const contentRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const contentHeight = contentRef.current?.clientHeight;
        if (contentHeight && sidebarRef.current) {
            sidebarRef.current.style.maxHeight = `${contentHeight}px`;
        }
    }, []);
    return (
        <div className="row m-0" style={{
            maxWidth: 1200,
            backgroundColor: props.colors.ui.main,
            color: props.colors.ui.font
        }}>
            <TopPanel colors={props.colors} data={props.data} skillsData={skillsData} skillsOptions={skillsOptions}
                      playtime={playtime} firstCountryLog={firstCountryLog}/>
            <BarPanel data={props.data} colors={props.colors}/>
            <div className="midPanel col-12 row gap-3 p-3 pb-5 m-0 mb-5">
                <div className="d-flex flex-column col-12 col-md m-0" ref={contentRef} style={{maxHeight: "100%"}}>
                    <div className="rounded-5 shadow row mb-3" style={{backgroundColor: props.colors.ui.background}}>
                        <div className="col-12 col-lg-6 row m-0 p-3 justify-content-center">
                            <div>
                                Hit Ratios:
                            </div>
                            <div className="mt-2" style={{height: 200, width: 200}}>
                                <Doughnut data={hitData} options={doughnutOptions}/>
                            </div>
                            <ul className="col-12">
                                <li className="d-flex flex-row align-items-center justify-content-between">
                                <span className="d-flex flex-row align-items-center gap-1">
                                <div style={{
                                    backgroundColor: props.colors.judgements.x300,
                                    height: 15,
                                    width: 15
                                }}
                                     className={"rounded-1"}></div>300: {hits_300_percent.toFixed(2)}%</span><span>{props.data.statistics.count_300?.toLocaleString()}</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: props.colors.judgements.x100,
                                        height: 15,
                                        width: 15
                                    }}
                                    className={"rounded-1"}></div>100: {hits_100_percent.toFixed(2)}%</span><span>{props.data.statistics.count_100?.toLocaleString()}</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: props.colors.judgements.x50,
                                        height: 15,
                                        width: 15
                                    }}
                                    className={"rounded-1"}></div>50: {hits_50_percent.toFixed(2)}%</span><span>{props.data.statistics.count_50?.toLocaleString()}</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: props.colors.judgements.xMiss,
                                        height: 15,
                                        width: 15
                                    }}
                                    className={"rounded-1"}></div>0: {hits_miss_percent.toFixed(2)}%</span><span>{props.data.statistics.count_miss?.toLocaleString()}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-lg-6 row m-0 p-3 justify-content-center">
                            <div>
                                Rank Ratios:
                            </div>
                            <div className="" style={{height: 200, width: 200}}>
                                <Doughnut data={rankData} options={doughnutOptions}/>
                            </div>
                            <ul className="col-12">
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: props.colors.ranks.xh,
                                        height: 15,
                                        width: 15
                                    }}
                                    className={"rounded-1"}></div>XH: {(ranks_xh_percent).toFixed(2)}%</span><span>{props.data.statistics.grade_counts.ssh.toLocaleString()}</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: props.colors.ranks.x,
                                        height: 15,
                                        width: 15
                                    }}
                                    className={"rounded-1"}></div>X: {(ranks_x_percent).toFixed(2)}%</span><span>{props.data.statistics.grade_counts.ss.toLocaleString()}</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: props.colors.ranks.sh,
                                        height: 15,
                                        width: 15
                                    }}
                                    className={"rounded-1"}></div>SH: {(ranks_sh_percent).toFixed(2)}%</span><span>{props.data.statistics.grade_counts.sh.toLocaleString()}</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: props.colors.ranks.s,
                                        height: 15,
                                        width: 15
                                    }}
                                    className={"rounded-1"}></div>S: {(ranks_s_percent).toFixed(2)}%</span><span>{props.data.statistics.grade_counts.s.toLocaleString()}</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: props.colors.ranks.a,
                                        height: 15,
                                        width: 15
                                    }}
                                    className={"rounded-1"}></div>A: {(ranks_a_percent).toFixed(2)}%</span><span>{props.data.statistics.grade_counts.a.toLocaleString()}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="rounded-5 shadow row mb-3" style={{backgroundColor: props.colors.ui.background}}>
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
                    <div className="rounded-5 shadow row mb-3" style={{backgroundColor: props.colors.ui.background}}>
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
                                <h6>Top {props.scores.best.items.length} plays:</h6>
                            </div>
                            <div className="w-100 flex-grow-1">
                                <Bar data={ppData} options={ppDataOptions}/>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-5 shadow row" style={{backgroundColor: props.colors.ui.background}}>
                        <div className="col-12 row m-0 p-3 d-flex flex-column">
                            <div className={"d-flex flex-row justify-content-between"}>
                                <div>Medals:</div>
                                <div>({props.data.user_achievements.length}/{
                                    props.medals.medalHushHush.length +
                                    props.medals.medalSkills.length +
                                    props.medals.modIntroduction.length +
                                    props.medals.medalBeatmapChallenges.length +
                                    props.medals.medalBeatmapSpotlights.length +
                                    props.medals.medalBeatmapPacks.length
                                })
                                </div>
                            </div>
                            <div className={"p-3 d-flex flex-column shadow rounded-5"}>
                                <div>Hush Hush:</div>
                                <div className="d-flex flex-row flex-wrap gap-2 pt-3 justify-content-center">
                                    {props.medals.medalHushHush.map((medal: any) => (
                                        <Medal thisMedal={medal} userMedals={props.data.user_achievements}/>
                                    ))}
                                </div>
                            </div>
                            <div className={"p-3 d-flex flex-column shadow rounded-5"}>
                                <div>Beatmap Challenges:</div>
                                <div className="d-flex flex-row flex-wrap gap-2 pt-3 justify-content-center">
                                    {props.medals.medalBeatmapChallenges.map((medal: any) => (
                                        <Medal thisMedal={medal} userMedals={props.data.user_achievements}/>
                                    ))}
                                </div>
                            </div>
                            <div className={"p-3 d-flex flex-column shadow rounded-5"}>
                                <div>Beatmap Packs:</div>
                                <div className="d-flex flex-row flex-wrap gap-2 pt-3 justify-content-center">
                                    {props.medals.medalBeatmapPacks.map((medal: any) => (
                                        <Medal thisMedal={medal} userMedals={props.data.user_achievements}/>
                                    ))}
                                </div>
                            </div>
                            <div className={"p-3 d-flex flex-column shadow rounded-5"}>
                                <div>Beatmap Spotlights:</div>
                                <div className="d-flex flex-row flex-wrap gap-2 pt-3 justify-content-center">
                                    {props.medals.medalBeatmapSpotlights.map((medal: any) => (
                                        <Medal thisMedal={medal} userMedals={props.data.user_achievements}/>
                                    ))}
                                </div>
                            </div>
                            <div className={"p-3 d-flex flex-column shadow rounded-5"}>
                                <div>Skill & Dedication:</div>
                                <div className="d-flex flex-row flex-wrap gap-2 pt-3 justify-content-center">
                                    {props.medals.medalSkills.map((medal: any) => (
                                        <Medal thisMedal={medal} userMedals={props.data.user_achievements}/>
                                    ))}
                                </div>
                            </div>
                            <div className={"p-3 d-flex flex-column shadow rounded-5"}>
                                <div>Mod Introduction:</div>
                                <div className="d-flex flex-row flex-wrap gap-2 pt-3 justify-content-center">
                                    {props.medals.modIntroduction.map((medal: any, index: number) => (
                                        <Medal thisMedal={medal}
                                               userMedals={props.data.user_achievements}
                                               key={index}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-5 shadow m-0 p-3 col-md-4 col-12 d-flex flex-column"
                     style={{backgroundColor: props.colors.ui.background}}>
                    <div
                        className="m-0 d-flex flex-row align-items-center justify-content-between overflow-hidden rounded-4">
                        <div className="btn-group rounded-pill flex-grow-1 shadow">
                            <button className="btn rounded-0 flex-grow-1"
                                    style={{
                                        backgroundColor: props.colors.ui.background,
                                        color: props.colors.ui.font
                                    }}
                                    data-tooltip-id={"reactTooltip"}
                                    data-tooltip-content={"Pinned Scores"}
                                    disabled={activeScores === props.scores.pinned.items}
                                    onClick={() => {
                                        setSearchingScores(true);
                                        setActiveScores(props.scores.pinned.items);
                                        setSearchingScores(false);
                                    }}>
                                <i className="bi bi-pin-angle"></i>
                            </button>
                            <button className="btn rounded-0 flex-grow-1"
                                    style={{
                                        backgroundColor: props.colors.ui.background,
                                        color: props.colors.ui.font
                                    }}
                                    data-tooltip-id={"reactTooltip"}
                                    data-tooltip-content={"First Place"}
                                    disabled={activeScores === props.scores.firsts.items}
                                    onClick={() => {
                                        setSearchingScores(true);
                                        setActiveScores(props.scores.firsts.items);
                                        setSearchingScores(false);
                                    }}>
                                <i className="bi bi-star"></i>
                            </button>
                            <button className="btn rounded-0 flex-grow-1"
                                    style={{
                                        backgroundColor: props.colors.ui.background,
                                        color: props.colors.ui.font
                                    }}
                                    data-tooltip-id={"reactTooltip"}
                                    data-tooltip-content={"Best Scores"}
                                    disabled={activeScores === props.scores.best.items}
                                    onClick={() => {
                                        setSearchingScores(true);
                                        setActiveScores(props.scores.best.items);
                                        setSearchingScores(false);
                                    }}>
                                <i className="bi bi-bar-chart-line"></i>
                            </button>
                            <button className="btn rounded-0 flex-grow-1"
                                    style={{
                                        backgroundColor: props.colors.ui.background,
                                        color: props.colors.ui.font
                                    }}
                                    data-tooltip-id={"reactTooltip"}
                                    data-tooltip-content={"Recent Scores"}
                                    disabled={activeScores === props.scores.recent.items}
                                    onClick={() => {
                                        setSearchingScores(true);
                                        setActiveScores(props.scores.recent.items);
                                        setSearchingScores(false);
                                    }}>
                                <i className="bi bi-clock-history"></i>
                            </button>
                        </div>
                    </div>
                    <div className="m-0 p-0 flex-grow-1" style={{overflowY: "scroll", maxHeight: "98%"}}>
                        {searchingScores ?
                            <div className="spinner-border mx-auto mt-5" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> :
                            <>{activeScores.map((score: any, index: number) => (
                                <Score data={score} colors={props.colors} num={index} volume={props.volume}
                                       key={index}/>
                            ))}</>}

                    </div>
                </div>
            </div>
            {/*<div dangerouslySetInnerHTML={{__html: props.data.page.html}}>*/}
            {/*</div>*/}
        </div>
    )
}

export default UserCard;