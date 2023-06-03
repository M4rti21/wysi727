import React, {useEffect, useRef, useState} from "react";
import {MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity, User} from "../interfaces/UserCardInterface";
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
import FlagEmoji from "./FlagEmoji";
import {Tooltip as ReactTooltip} from 'react-tooltip'
import {registerables} from 'chart.js';
import {ParallaxBanner} from "react-scroll-parallax";

Chart.register(ArcElement, PointElement, CategoryScale, LinearScale, LineController, LineElement, Title, Tooltip, RadarController, RadialLinearScale, Filler, zoomPlugin);
Chart.register(...registerables);

interface userData {
    data: any;
}

type Mode = 'x' | 'y' | 'xy';
type ModeSnap = "x" | "y" | "nearest" | "index" | "dataset" | "point" | undefined;
type ModeModifier = 'ctrl' | 'alt' | 'shift' | 'meta';
const UserCard: React.FC<userData> = (props: userData) => {
    useEffect(() => {
        getNewScores('best').then(() => console.log(userScores));
    }, []);
    const [userScores, setUserScores] = useState<any[]>([]);

    async function getScores(username: string, type: string) {
        const response = await fetch(`http://localhost:5000/usrScores/${username}/${type}`);
        return await response.json();
    }

    const getNewScores = async (type: string) => {
        setUserScores(await getScores(props.data.id, type));
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
    const colors = {
        x300: '#35d4fb',
        x100: '#6cf128',
        x50: '#fbc435',
        xMiss: '#fc0606',
        x: '#ffffff',
        s: '#fbc435',
        a: '#6cf128',
        b: '#066cf1',
        c: '#b014dc',
        d: '#e00414',
        f: '#aaaaaa'
    }
    Chart.defaults.backgroundColor = colors.x50;
    Chart.defaults.borderColor = '#ffffff11';
    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.family = "IBM Plex Mono";
    Chart.defaults.plugins.legend.display = false;
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
                backgroundColor: [colors.x300, colors.x100, colors.x50, colors.xMiss],
                hoverBackgroundColor: [colors.x300, colors.x100, colors.x50, colors.xMiss],
            },
        ],
    };
    const rankData = {
        labels: ['X', 'S', 'A'],
        datasets: [
            {
                data: [props.data.statistics.grade_counts.ssh + props.data.statistics.grade_counts.ss, props.data.statistics.grade_counts.sh + props.data.statistics.grade_counts.s, props.data.statistics.grade_counts.a],
                backgroundColor: [colors.x, colors.s, colors.a],
                hoverBackgroundColor: [colors.x, colors.s, colors.a],
            },
        ],
    };
    const getHistoryDates = (rankArray: any) => {
        return rankArray.map(function (obj: any) {
            const date = new Date(obj.date);
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear().toString().slice(2);
            return `${day}/${month}/${year}`;
        });
    }
    const getHistoryValues = (rankArray: any) => {
        return rankArray.map(function (obj: any) {
            return obj.rank;
        });
    }
    const rankHistoryData = {
        labels: getHistoryDates(props.data.db_rank_history.global_rank),
        datasets: [{
            label: 'Rank',
            data: getHistoryValues(props.data.db_rank_history.global_rank),
            fill: false,
            borderColor: colors.x50,
            tension: 0.1
        }]
    };
    const countryRankHistoryData = {
        labels: getHistoryDates(props.data.db_rank_history.country_rank),
        datasets: [{
            label: 'Rank',
            data: getHistoryValues(props.data.db_rank_history.country_rank),
            fill: false,
            borderColor: colors.x50,
            tension: 0.1
        }]
    };
    const historyChartOptions = {
        responsive: true,
        scales: {
            y: {
                reverse: true,
                ticks: {
                    min: 0, // it is for ignoring negative step.
                    beginAtZero: true,
                    stepSize: 1  // if i use this it always set it '1', which look very awkward if it have high value  e.g. '100'.
                }
            },
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
                        modifierKey: 'ctrl' as ModeModifier
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x' as Mode
                },
                pan: {
                    enabled: true,
                    mode: 'x' as Mode
                }
            }
        },
        pointHitRadius: 10,
        pointHoverRadius: 4,

    };
    const playsHistoryData = {
        labels: props.data.monthly_playcounts.map((obj: MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity) => {
            const date = new Date(obj.start_date);
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear().toString().slice(2);
            return `${day}/${month}/${year}`;
        }),
        datasets: [{
            label: 'Play Count',
            data: props.data.monthly_playcounts.map((obj: MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity) => obj.count),
            fill: false,
            borderColor: colors.x50,
            tension: 0.1
        }]
    };
    const playsHistoryOptions = {
        responsive: true,
        scales: {
            y: {
                ticks: {
                    min: 0, // it is for ignoring negative step.
                    beginAtZero: true,
                    stepSize: 1  // if i use this it always set it '1', which look very awkward if it have high value  e.g. '100'.
                }
            },
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
                        modifierKey: 'ctrl' as ModeModifier
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x' as Mode
                },
                pan: {
                    enabled: true,
                    mode: 'x' as Mode
                }
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
    const allPPdates: string[] = [];
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
        for (let score of userScores) {
            allPPs.push(Math.round(score.pp));
            const date = new Date(score.created_at);
            const year = date.getFullYear().toString().slice(2);
            const month = date.getMonth() + 1;
            const day = date.getDate();

            const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
            allPPdates.push(formattedDate);
            //CS
            if (score.mods?.includes("EZ")) {
                avgCS += score.beatmap.cs / 2;
            } else if (score.mods?.includes("HR")) {
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
            if (score.mods?.includes("EZ")) {
                if (score.mods?.includes("DT")) {
                    avgAR += (score.beatmap.ar * 0.5) * 1.33;
                    allAR.push((score.beatmap.ar * 0.5) * 1.33);
                } else if (score.mods?.includes("HT")) {
                    avgAR += (score.beatmap.ar * 0.5) * 0.67;
                    allAR.push((score.beatmap.ar * 0.5) * 0.67);
                } else {
                    avgAR += score.beatmap.ar * 0.5;
                    allAR.push(score.beatmap.ar * 0.5);
                }
            } else if (score.mods?.includes("HR")) {
                if (score.mods?.includes("DT")) {
                    if (score.beatmap.ar * 1.4 * 1.33 < 11) {
                        avgAR += score.beatmap.ar * 1.4 * 1.33;
                        allAR.push(score.beatmap.ar * 1.4 * 1.33);
                    } else {
                        avgAR += 11;
                        allAR.push(11);
                    }
                } else if (score.mods?.includes("HT")) {
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
            } else if (score.mods?.includes("DT")) {
                avgAR += score.beatmap.ar * 1.33;
                allAR.push(score.beatmap.ar * 1.33);
            } else if (score.mods?.includes("HT")) {
                avgAR += score.beatmap.ar * 0.67;
                allAR.push(score.beatmap.ar * 0.67);
            } else {
                avgAR += score.beatmap.ar;
                allAR.push(score.beatmap.ar);
            }

            let starRating = score.beatmap.difficulty_rating;

            if (score.mods?.includes("EZ")) {
                starRating *= modFactors.EZ;
            }
            if (score.mods?.includes("HR")) {
                starRating *= modFactors.HR;
            }

            if (score.mods?.includes("DT")) {
                starRating *= modFactors.DT;
            }
            if (score.mods?.includes("HT")) {
                starRating *= modFactors.HT;
            }

            if (score.mods?.includes("FL")) {
                starRating *= modFactors.FL;
            }

            avgHA += score.beatmap.accuracy;
            allHA.push(score.beatmap.accuracy);
            avgSR += starRating;
            allSR.push(starRating);
            avgSpd += score.mods?.includes("DT") ? score.beatmap.bpm * 1.5 : score.mods?.includes("HT") ? score.beatmap.bpm * 0.75 : score.beatmap.bpm;
            allSpd.push((score.mods?.includes("DT") ? score.beatmap.bpm * 1.5 : score.mods?.includes("HT") ? score.beatmap.bpm * 0.75 : score.beatmap.bpm));
        }

        avgCS /= userScores.length * 10;
        avgAR /= userScores.length * 10;
        avgHA /= userScores.length * 10;
        avgSR /= userScores.length * 10;
        avgSpd /= userScores.length * 300;

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
            backgroundColor: '#FF638422',
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
            data: allPPs.reverse(),
        }],
    };
    const ppDataOptions = {
        responsive: true,
        pointHoverRadius: 4,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false
            },
            x: {
                beginAtZero: false,
                ticks: {
                    display: false
                }
            }
        },
        plugins: {
            tooltip: {
                displayColors: false
            }
        }
    };
    const [height, setHeight] = useState<number>(0);
    const divRef1 = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const resizeHandler = () => {
            if (divRef1.current) {
                setHeight(divRef1.current.offsetHeight);
            }
        };
        resizeHandler();
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);
    return (
        <div className="row mx-5 border">
            <ReactTooltip
                id="reactTooltip"
                style={{zIndex: 3}}
            />
            <div className="topPanel m-0 p-0 d-flex flex-row" style={{overflow: "hidden", position: "relative"}}>
                <div>
                    <div className="ratio ratio-1x1 border"
                         style={{
                             backgroundImage: `url(${props.data.avatar_url})`,
                             backgroundPosition: "center",
                             backgroundSize: "cover",
                             height: 250,
                             width: 250
                         }}>
                    </div>
                    <div className="w-100 p-3 border">
                        <a data-tooltip-id={props.data.previous_usernames.length > 0 ? "reactTooltip" : ""}
                           data-tooltip-content={`A.K.A: ${JSON.stringify(props.data.previous_usernames).substring(1, JSON.stringify(props.data.previous_usernames).length - 1).replace(/"/g, '')}`}
                           className="d-block text-center fs-4 mb-2 text-align-center text-decoration-none text-light"
                           href={`https://osu.ppy.sh/users/${props.data.id}`} target="_blank">
                            {props.data.username}
                        </a>
                    </div>
                </div>
                <div className="flex-grow-1">
                    <ParallaxBanner layers={
                        [{
                            image: props.data.cover_url,
                            speed: -18
                        }]}
                                    style={{width: "100%", height: "100%"}}>
                        <div className="p-3 h-100 w-100" style={{backdropFilter: "brightness(50%) blur(2px)"}}>
                            <div className="d-flex flex-row flex-wrap gap-5">
                                <div className="fs-3"
                                     data-tooltip-id="reactTooltip"
                                     data-tooltip-content={`Peak Rank:#${props.data.rank_highest.rank?.toLocaleString()}`}>
                                    <i className="bi bi-globe2 me-2"></i>#{props.data.statistics.global_rank?.toLocaleString()}
                                </div>
                                <div>
                                    <div className="fs-3 d-flex flex-row align-items-center">
                                        <div className="d-flex flex-row align-items-center"
                                             data-tooltip-id="reactTooltip"
                                             data-tooltip-content={"peak country rank"}>
                                            <img width="28" className="countryIco me-2" alt="ico"
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
                            </div>
                            <div className="d-flex flex-row gap-3 mt-3">
                                <div>
                                    <div><i className="bi bi-coin me-2"></i>Performance:</div>
                                    <div className="fs-5 ms-4">{Math.round(props.data.statistics.pp)?.toLocaleString()}pp
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <i className="bi bi-chevron-double-up me-2"></i>Ranked Score:
                                    </div>
                                    <div className="fs-5 ms-4"
                                         data-tooltip-id="reactTooltip"
                                         data-tooltip-content={`Score: ${props.data.statistics.total_score.toLocaleString()}`}>
                                        {props.data.statistics.ranked_score.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-row gap-3 mt-3">
                                <div>
                                    <div><i className="bi bi-award-fill me-2"></i>Medals:</div>
                                    <div className="fs-5 ms-4">{props.data.user_achievements.length}
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
                                         data-tooltip-id="reactTooltip"
                                         data-tooltip-content={playtime}>
                                        {Math.round(props.data.statistics.play_time / 60 / 60)}h
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ParallaxBanner>
                </div>
            </div>
            <div className="midPanel col-12 row border m-0 p-0" ref={divRef1}>
                <div className="midPanel col-12 col-sm-8 col-xl-8  m-0 p-0">
                    <div className="level col-12 d-flex flex-row align-items-center gap-3 p-3 border">
                        <h6 className="p-0 m-0">lvl {props.data.statistics.level.current}</h6>
                        <div className="border flex-grow-1 overflow-hidden" style={{height: 5}}>
                            <div className="bg-warning"
                                 style={{width: `${props.data.statistics.level.progress}%`, height: 5}}>
                            </div>
                        </div>
                        <h6 className="p-0 m-0">{props.data.statistics.level.progress}%</h6>
                    </div>
                    <div className="d-flex flex-row flex-wrap m-0 p-0">
                        <div className="chart col-12 col-lg-6 row border m-0 justify-content-center p-2">
                            <span
                                className="text-center my-2">Overall Accuracy: {props.data.statistics.hit_accuracy.toFixed(2)}%</span>
                            <div className="mt-2" style={{height: 200, width: 200}}>
                                <Doughnut data={hitData}/>
                            </div>
                            <ul className="col-12">
                                <li className="d-flex flex-row align-items-center justify-content-between">
                                <span className="d-flex flex-row align-items-center gap-1">
                                <div style={{
                                    backgroundColor: colors.x300,
                                    height: 15,
                                    width: 15
                                }}></div>300: {hits_300_percent.toFixed(2)}%</span><span>{props.data.statistics.count_300?.toLocaleString()}</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: colors.x100,
                                        height: 15,
                                        width: 15
                                    }}></div>100: {hits_100_percent.toFixed(2)}%</span><span>{props.data.statistics.count_100?.toLocaleString()}</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: colors.x50,
                                        height: 15,
                                        width: 15
                                    }}></div>50:&nbsp; {hits_50_percent.toFixed(2)}%</span><span>{props.data.statistics.count_50?.toLocaleString()}</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: colors.xMiss,
                                        height: 15,
                                        width: 15
                                    }}></div>0:&nbsp;&nbsp; {hits_miss_percent.toFixed(2)}%</span><span>{props.data.statistics.count_miss?.toLocaleString()}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="chart col-12 col-lg-6 row border m-0 justify-content-center p-2">
                            <span
                                className="text-center my-2">Total Play Count: {props.data.statistics.play_count?.toLocaleString()}</span>
                            <div className="" style={{height: 200, width: 200}}>
                                <Doughnut data={rankData}/>
                            </div>
                            <ul className="col-12">
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: colors.x,
                                        height: 15,
                                        width: 15
                                    }}></div>X: {(ranks_x_percent + ranks_xh_percent).toFixed(2)}%</span><span>{(props.data.statistics.grade_counts.ss + props.data.statistics.grade_counts.ssh).toLocaleString()}</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: colors.s,
                                        height: 15,
                                        width: 15
                                    }}></div>S: {(ranks_s_percent + ranks_sh_percent).toFixed(2)}%</span><span>{(props.data.statistics.grade_counts.s + props.data.statistics.grade_counts.sh).toLocaleString()}</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: colors.a,
                                        height: 15,
                                        width: 15
                                    }}></div>A: {ranks_a_percent.toFixed(2)}%</span><span>{props.data.statistics.grade_counts.a?.toLocaleString()}</span>
                                </li>
                            </ul>
                        </div>
                        <div
                            className="chart col-12 col-lg-6 m-0 d-flex flex-column justify-content-center align-items-center p-3">
                            <div className="text-center fst-italic">"""" Skill Set """"</div>
                            <div style={{marginTop: -40, marginBottom: -50}}>
                                <Radar data={skillsData} options={skillsOptions}/>
                            </div>
                        </div>
                        <div
                            className="col-12 col-lg-6 border m-0 d-flex flex-column justify-content-center align-items-center p-3">
                            <div className="text-center fst-italic">Top {userScores.length} plays</div>
                            <div className="w-100 flex-grow-1">
                                <Bar data={ppData} options={ppDataOptions}/>
                            </div>
                        </div>
                        <div className="rank col-12 d-flex flex-column p-3 border m-0">
                            <h6>Global Rank Graph:</h6>
                            <Line data={rankHistoryData} options={historyChartOptions}/>
                        </div>
                        <div className="rank col-12 d-flex flex-column p-3 border m-0">
                            <h6>Country Rank Graph:</h6>
                            <Line data={countryRankHistoryData} options={historyChartOptions}/>
                        </div>
                        <div className="play col-12 d-flex flex-column p-3 border m-0">
                            <h6>Plays Graph:</h6>
                            <Line data={playsHistoryData} options={playsHistoryOptions}/>
                        </div>
                    </div>
                </div>
                <div className="rightPanel col-12 col-xl-4 border m-0 p-0 d-flex flex-column"
                     style={{overflowY: "scroll", height: 2250}}>
                    <div className="p-3 m-0 border d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 p-0">Top {userScores.length} plays:</h6>
                        <div>
                            <button className="text-light"
                                    style={{backgroundColor: "#00000000", border: "none"}}
                                    onClick={() => getNewScores('best').then(() => console.log(userScores))}>
                                <i className="bi bi-bar-chart-line"></i></button>
                            <button className="text-light"
                                    style={{backgroundColor: "#00000000", border: "none"}}
                                    onClick={() => getNewScores('firsts').then(() => console.log(userScores))}>
                                <i className="bi bi-star"></i></button>
                        </div>

                    </div>
                    <div className="border d-flex flex-column m-0 p-0">
                        {userScores.map((score, index) => (
                            <Score data={score} colors={colors} num={index}></Score>
                        ))}
                    </div>
                </div>
            </div>
            {/*<div className="botPanel p-3 text-light" dangerouslySetInnerHTML={{__html: props.data.page.html}}*/
            }
            {/*     style={{backgroundColor: '#2a2226'}}>*/
            }
            {/*</div>*/
            }
        </div>
    );
}

export default UserCard;