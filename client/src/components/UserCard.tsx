import React, {useEffect, useRef} from "react";
import LineChart from "./LineChart";
import {MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity} from "../interfaces/UserCardInterface";
import Score from "./Score";

interface LineChartProps {
    dataPoints: number[];
    chartTitle?: string;
}

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
        s: '#fbe40a',
        a: '#65d60c',
        b: '#066cf1',
        c: '#b014dc',
        d: '#e00414',
        f: '#aaaaaa'
    }
    const accChart = {
        background: `conic-gradient(
            ${colors.x300} 0% ${hits_300_percent}%, 
            ${colors.x100} ${hits_300_percent}% ${hits_300_percent + hits_100_percent}%, 
            ${colors.x50} ${hits_300_percent + hits_100_percent}% ${hits_300_percent + hits_100_percent + hits_50_percent}%,
            ${colors.xMiss} ${hits_300_percent + hits_100_percent + hits_50_percent}% ${hits_300_percent + hits_100_percent + hits_50_percent + hits_miss_percent}%)`,
        minHeight: 200,
        maxHeight: 200,
        minWidth: 200,
        maxWidth: 200,
        borderRadius: '50%'
    }
    const ranks: number[] = [props.data.statistics.grade_counts.ssh, props.data.statistics.grade_counts.ss, props.data.statistics.grade_counts.sh, props.data.statistics.grade_counts.s, props.data.statistics.grade_counts.a];
    const ranks_total: number = (props.data.statistics.grade_counts.ssh + props.data.statistics.grade_counts.ss + props.data.statistics.grade_counts.sh + props.data.statistics.grade_counts.s + props.data.statistics.grade_counts.a);
    const bigrank = Math.max(...ranks);
    const ranks_xh_percent: number = props.data.statistics.grade_counts.ssh / ranks_total * 100;
    const ranks_x_percent: number = props.data.statistics.grade_counts.ss / ranks_total * 100;
    const ranks_sh_percent: number = props.data.statistics.grade_counts.sh / ranks_total * 100;
    const ranks_s_percent: number = props.data.statistics.grade_counts.s / ranks_total * 100;
    const ranks_a_percent: number = props.data.statistics.grade_counts.a / ranks_total * 100;
    const rankChart = {
        background: `conic-gradient(
            ${colors.x} 0% ${ranks_xh_percent + ranks_x_percent}%, 
            ${colors.s} ${ranks_xh_percent + ranks_x_percent}% ${ranks_xh_percent + ranks_x_percent + ranks_sh_percent + ranks_s_percent}%, 
            ${colors.a} ${ranks_xh_percent + ranks_x_percent + ranks_sh_percent + ranks_s_percent}% ${ranks_xh_percent + ranks_x_percent + ranks_sh_percent + ranks_s_percent + ranks_a_percent}%)`,
        minHeight: 200,
        maxHeight: 200,
        minWidth: 200,
        maxWidth: 200,
        borderRadius: '50%'
    }
    const height = 150;
    const width = 600;
    const normalizeArray = (arr: number[]) => {
        const minValue = Math.min(...arr);
        const maxValue = Math.max(...arr);
        return arr.map((value) => {
            return (value - minValue) / (maxValue - minValue) * height;
        });
    }
    const rankYValues = normalizeArray(props.data.rank_history.data);
    const rankXValues = [];
    const step2 = width / rankYValues.length;
    for (let i = 0; i < rankYValues.length; i++) {
        const number = (i * step2);
        rankXValues.push(number);
    }
    const yValues = normalizeArray(props.data.monthly_playcounts.map((obj: MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity) => obj.count));
    const step = width / yValues.length;
    const xValues = [];
    for (let i = 0; i < yValues.length; i++) {
        const number = (i * step);
        xValues.push(number);
    }
    return (
        <div className="row mx-5 border">
            <div className="midPanel col-12 row border m-0 p-0">
                <div className="leftPanel col-12 col-sm-2 border m-0 p-0">
                    <div className="ratio ratio-1x1 border"
                         style={{
                             backgroundImage: `url(${props.data.avatar_url})`,
                             backgroundPosition: "center",
                             backgroundSize: "cover"
                         }}>
                    </div>
                    <a className="d-block text-center fs-4 text-align-center text-decoration-none text-light py-3 border-top"
                       href={`https://osu.ppy.sh/users/${props.data.id}`} target="_blank">
                        {props.data.username}
                    </a>
                    <div className="mx-3">
                        <div><i className="bi bi-globe2 me-2"></i>Global Rank:</div>
                        <div className="fs-5 ms-4">#{props.data.statistics.global_rank.toLocaleString()}</div>
                    </div>
                    <div className="mx-3">
                        <div><img width="16" className="countryIco me-2" alt="ico"
                                  src={require(`../assets/countries/${props.data.country.code.toLowerCase()}/vector.svg`)}/>Country
                            Rank:
                        </div>
                        <div className="fs-5 ms-4">#{props.data.statistics.rank.country.toLocaleString()}<img
                            src={`https://flagcdn.com/24x18/${props.data.country.code.toLowerCase()}.png`}
                            alt="flag" className="mx-2"/></div>
                    </div>
                    <div className="mx-3">
                        <div><i className="bi bi-capsule-pill me-2"></i>Performance:</div>
                        <div className="fs-5 ms-4">{props.data.statistics.pp.toLocaleString()}pp
                        </div>
                    </div>
                    <div className="mx-3">
                        <div><i className="bi bi-award-fill me-2"></i>Medals:</div>
                        <div className="fs-5 ms-4">{props.data.user_achievements.length}
                        </div>
                    </div>
                </div>
                <div className="midPanel col-12 col-sm-8 col-xl-6 m-0 p-0">
                    <div className="level col-12 d-flex flex-row align-items-center gap-3 p-3 border">
                        <h6 className="p-0 m-0">lvl {props.data.statistics.level.current}</h6>
                        <div className="border flex-grow-1 overflow-hidden" style={{height: 5}}>
                            <div className="bg-warning"
                                 style={{width: `${props.data.statistics.level.progress}%`, height: 5}}>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row flex-wrap m-0 p-0">
                        <div className="chart col-12 col-xl-6 row border m-0 justify-content-center">
                            <span
                                className="text-center mt-2">Overall Accuracy: {props.data.statistics.hit_accuracy.toFixed(2)}%</span>
                            <div className="m-3 col-auto" style={accChart}></div>
                            <ul className="col-12">
                                <li className="d-flex flex-row align-items-center justify-content-between">
                                <span className="d-flex flex-row align-items-center gap-1">
                                <div style={{
                                    backgroundColor: colors.x300,
                                    height: 15,
                                    width: 15
                                }}></div>300: {hits_300_percent.toFixed(2)}%</span><span>{props.data.statistics.count_300.toLocaleString()}</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: colors.x100,
                                        height: 15,
                                        width: 15
                                    }}></div>100: {hits_100_percent.toFixed(2)}%</span><span>{props.data.statistics.count_100.toLocaleString()}</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: colors.x50,
                                        height: 15,
                                        width: 15
                                    }}></div>50:&nbsp; {hits_50_percent.toFixed(2)}%</span><span>{props.data.statistics.count_50.toLocaleString()}</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: colors.xMiss,
                                        height: 15,
                                        width: 15
                                    }}></div>0:&nbsp;&nbsp; {hits_miss_percent.toFixed(2)}%</span><span>{props.data.statistics.count_miss.toLocaleString()}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="chart col-12 col-xl-6 row border m-0 justify-content-center">
                            <span
                                className="text-center mt-2">Total Play Count: {props.data.statistics.play_count.toLocaleString()}</span>
                            <div className="m-3 col-auto" style={rankChart}></div>
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
                                    }}></div>A: {ranks_a_percent.toFixed(2)}%</span><span>{props.data.statistics.grade_counts.a.toLocaleString()}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="rank col-12 d-flex flex-column p-3 border m-0">
                        <h6>Rank Graph:</h6>
                        <div className="chartDiv" style={{transform: 'scaleY(-1)'}}>
                            <LineChart wValues={rankXValues} hValues={rankYValues}
                                       color={colors.x50}/>
                        </div>
                    </div>
                    <div className="play col-12 d-flex flex-column p-3 m-0">
                        <h6>Plays Graph:</h6>
                        <div className="chartDiv">
                            <LineChart wValues={xValues} hValues={yValues}
                                       color={colors.x50}/>
                        </div>

                    </div>
                </div>
                <div className="rightPanel col-4 border m-0 p-0 d-flex flex-column"
                     style={{maxHeight: 850, overflowY: "scroll"}}>
                    {props.scores.map((score) => (
                        <Score data={score} colors={colors}></Score>
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