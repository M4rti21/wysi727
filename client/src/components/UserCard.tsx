import React, {useEffect, useRef, useState} from "react";
import {MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity} from "../interfaces/UserCardInterface";
import Score from "./Score";
import {Bar, Doughnut, Line, Radar} from 'react-chartjs-2';
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

Chart.register(ArcElement, PointElement, CategoryScale, LinearScale, LineController, LineElement, Title, Tooltip, RadarController, RadialLinearScale, Filler);

Chart.register(...registerables);

interface userData {
    data: any;
    scores: any[];
}

const UserCard: React.FC<userData> = (props: userData) => {
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
    Chart.defaults.backgroundColor = '#00000000';
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
    const rankHistoryData = {
        labels: props.data.rank_history.data.map(() => ''),
        datasets: [{
            label: 'Rank',
            data: props.data.rank_history.data,
            fill: false,
            borderColor: colors.x50,
            tension: 0.1
        }]
    };
    const rankHistoryOptions = {
        scales: {
            y: {
                reverse: true,
            },
        },
        plugins: {
            tooltip: {
                displayColors: false
            },
        }
    };
    const playsHistoryData = {
        labels: props.data.monthly_playcounts.map((obj: MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity) => obj.start_date),
        datasets: [{
            label: 'Play Count',
            data: props.data.monthly_playcounts.map((obj: MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity) => obj.count),
            fill: false,
            borderColor: colors.x50,
            tension: 0.1
        }]
    };
    const playsHistoryOptions = {
        plugins: {
            tooltip: {
                displayColors: false
            }
        }
    };
    let aimScore = 0;
    let speedScore = 0;
    let accScore = 0;
    let starsScore = 0;
    let constScore = 0;
    console.log(props.scores[0]);
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
    //
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
        console.log(Math.sqrt(variance))
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
        for (let score of props.scores) {
            allPPs.push(Math.round(score.pp));
            const date = new Date(score.created_at);
            const year = date.getFullYear().toString().slice(2);
            const month = date.getMonth() + 1;
            const day = date.getDate();

            const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
            allPPdates.push(formattedDate);
            //CS
            if (score.mods?.includes("EZ")) {
                if (score.mods?.includes("HR")) {
                    if (score.beatmap.cs * 1.3 < 10) {
                        avgCS += (score.beatmap.cs * 1.3) / 2;
                    } else {
                        avgCS += 10 / 2;
                    }
                } else {
                    avgCS += score.beatmap.cs / 2;
                }
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

        avgCS /= props.scores.length * 10;
        avgAR /= props.scores.length * 10;
        avgHA /= props.scores.length * 10;
        avgSR /= props.scores.length * 10;
        avgSpd /= props.scores.length * 300;

        accScore = Math.round(avgHA * 100);

        avgCS *= 0.4;
        avgHA *= 0.6;
        avgAR *= 0.2;

        starsScore = avgSR > 100 ? 100 : Math.round(avgSR * 100);
        aimScore = (avgCS + avgHA + avgAR) * 100 > 100 ? 100 : Math.round((avgCS + avgHA + avgAR) * 100);
        speedScore = avgSpd > 100 ? 100 : Math.round(avgSpd * 100);
        console.log(allSpd)
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
        labels: allPPdates.reverse(),
        datasets: [{
            label: 'Top Plays',
            data: allPPs.reverse(),
        }]
    };
    const ppDataOptions = {
        maintainAspectRatio: false,
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
            <div className="topPanel m-0 p-0" style={{height: 180}}>
                <img src={props.data.cover_url} alt="pfp" style={{height: 180, width: '100%', objectFit: "cover"}}/>
            </div>
            <div className="midPanel col-12 row border m-0 p-0">
                <div className="leftPanel col-12 col-sm-4 col-xl-2  border m-0 p-0"
                     ref={divRef1}>
                    <div className="ratio ratio-1x1 border"
                         style={{
                             backgroundImage: `url(${props.data.avatar_url})`,
                             backgroundPosition: "center",
                             backgroundSize: "cover"
                         }}>
                    </div>
                    <div className="w-100 pt-3 border-top">
                        <a data-tooltip-id={props.data.previous_usernames.length > 0 ? "reactTooltip" : ""}
                           data-tooltip-content={`A.K.A: ${JSON.stringify(props.data.previous_usernames).substring(1, JSON.stringify(props.data.previous_usernames).length - 1).replace(/"/g, '')}`}
                           className="d-block text-center fs-4 mb-2 text-align-center text-decoration-none text-light"
                           href={`https://osu.ppy.sh/users/${props.data.id}`} target="_blank">
                            {props.data.username}
                        </a>
                    </div>
                    <div className="mx-3 mb-2">
                        <div>
                            <i className="bi bi-globe2 me-2"></i>Global Rank:
                        </div>
                        <span className="fs-5 ms-4"
                              data-tooltip-id="reactTooltip"
                              data-tooltip-content={`Peak Rank:#${props.data.rank_highest.rank?.toLocaleString()}`}>
                            #{props.data.statistics.global_rank?.toLocaleString()}
                        </span>
                    </div>
                    <div className="mx-3 mb-2">
                        <div><img width="16" className="countryIco me-2" alt="ico"
                                  src={require(`../assets/countries/${props.data.country.code.toLowerCase()}/vector.svg`)}/>Country
                            Rank:
                        </div>
                        <div className="fs-5 ms-4 d-flex flex-row">
                            #{props.data.statistics.rank.country?.toLocaleString()}
                            <span className="ms-2"
                                  data-tooltip-id="reactTooltip"
                                  data-tooltip-content={props.data.country.name}>
                                <FlagEmoji size={24} code={props.data.country.code}/>
                            </span>
                        </div>
                    </div>
                    <div className="mx-3 mb-2">
                        <div><i className="bi bi-capsule-pill me-2"></i>Performance:</div>
                        <div className="fs-5 ms-4">{Math.round(props.data.statistics.pp)?.toLocaleString()}pp
                        </div>
                    </div>
                    <div className="mx-3 mb-2">
                        <div>
                            <i className="bi bi-chevron-double-up me-2"></i>Ranked Score:
                        </div>
                        <span className="fs-5 ms-4"
                              data-tooltip-id="reactTooltip"
                              data-tooltip-content={`Score: ${props.data.statistics.total_score.toLocaleString()}`}>
                            {props.data.statistics.ranked_score.toLocaleString()}
                        </span>
                    </div>
                    <div className="mx-3 mb-2">
                        <div><i className="bi bi-award-fill me-2"></i>Medals:</div>
                        <div className="fs-5 ms-4">{props.data.user_achievements.length}
                        </div>
                    </div>
                    <div className="mx-3 mb-2">
                        <div>
                            <i className="bi bi-1-circle me-2"></i>Max Combo:
                        </div>
                        <div className="fs-5 ms-4">{props.data.statistics.maximum_combo}x</div>
                    </div>
                    <div className="mx-3 mb-2">
                        <div>
                            <i className="bi bi-clock me-2"></i>Play Time:
                        </div>
                        <span className="fs-5 ms-4"
                              data-tooltip-id="reactTooltip"
                              data-tooltip-content={playtime}>
                            {Math.round(props.data.statistics.play_time / 60 / 60)}h
                        </span>
                    </div>
                </div>
                <div className="midPanel col-12 col-sm-8 col-xl-6  m-0 p-0">
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
                            <div className="mt-2" style={{height: 200, width: 200}}><Doughnut data={hitData}/></div>
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
                            <div className="" style={{height: 200, width: 200}}><Doughnut data={rankData}/></div>
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
                        <div className="chart col-12 col-lg-6 m-0 justify-content-center align-items-center p-3">
                            <div className="text-center fst-italic">"""" Skill Set """"</div>
                            <div style={{marginTop: -40, marginBottom: -50}}>
                                <Radar data={skillsData} options={skillsOptions}/>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 border m-0 justify-content-center align-items-center p-3">
                            <Bar data={ppData} options={ppDataOptions}/>
                        </div>
                    </div>
                    <div className="rank col-12 d-flex flex-column p-3 border m-0">
                        <h6>Rank Graph:</h6>
                        <Line data={rankHistoryData} options={rankHistoryOptions}/>
                    </div>
                    <div className="play col-12 d-flex flex-column p-3 border m-0">
                        <h6>Plays Graph:</h6>
                        <Line data={playsHistoryData} options={playsHistoryOptions}/>
                    </div>
                </div>
                <div className="rightPanel col-12 col-xl-4 border m-0 p-0 d-flex flex-column"
                     style={{overflowY: "scroll", maxHeight: height}}>
                    <div className="p-2 border text-center">
                        Top {props.scores.length} plays:
                    </div>
                    {props.scores.map((score, index) => (
                        <Score data={score} colors={colors} num={index}></Score>
                    ))}
                </div>
            </div>

            {/*<div className="botPanel p-3 text-light" dangerouslySetInnerHTML={{__html: props.data.page.html}}*/
            }
            {/*     style={{backgroundColor: '#2a2226'}}>*/
            }
            {/*</div>*/
            }
        </div>
    )
        ;
}

export default UserCard;