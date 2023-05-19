import React from "react";
import LineChart from "./LineChart";
import {MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity} from "../interfaces/UserCardInterface";

interface LineChartProps {
    dataPoints: number[];
    chartTitle?: string;
}

interface userData {
    data: any;
}

const UserCard: React.FC<userData> = (props) => {
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
        x300: '#007bff',
        x100: '#28a745',
        x50: '#ffc107',
        xMiss: '#d9534f'
    }
    const chart = {
        background: `conic-gradient(
            ${colors.x300} 0% ${hits_300_percent}%, 
            ${colors.x100} ${hits_300_percent}% ${hits_300_percent + hits_100_percent}%, 
            ${colors.x50} ${hits_300_percent + hits_100_percent}% ${hits_300_percent + hits_100_percent + hits_50_percent}%,
            ${colors.xMiss} ${hits_300_percent + hits_100_percent + hits_50_percent}% ${hits_300_percent + hits_100_percent + hits_50_percent + hits_miss_percent}%)`,
        height: 200,
        width: 200,
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
    console.log(rankYValues);
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
        <div className="border rounded-4 mx-auto d-flex flex-column overflow-hidden mb-5"
             style={{width: width, maxWidth: width}}>
            <div className="topPanel" style={{height: 180}}>
                <img src={props.data.cover_url} alt="pfp" style={{height: 180, width: '100%', objectFit: "cover"}}/>
            </div>
            <div className="midPanel d-flex flex-row border-bottom border-top">
                <div className="leftPanel border-end d-flex flex-column overflow-hidden">
                    <img src={props.data.avatar_url} alt="pfp" style={{height: 180, width: 180}}/>
                    <div className="p-3 d-flex flex-column border-top">
                        <h3 className="text-truncate p-0"
                            style={{maxWidth: 180}}>{props.data.username}{props.data.is_supporter ?
                            <i className="bi bi-suit-heart-fill ms-2"
                               style={{color: '#fc64ac', fontSize: 20}}></i> : ''}</h3>
                        <div>
                            <span>Country:</span>
                            <h5 className="d-flex flex-row gap-1 align-items-center"><img
                                src={`https://flagcdn.com/24x18/${props.data.country.code.toLowerCase()}.png`}
                                alt="flag"/>{props.data.country.name}</h5>
                        </div>
                        <div>
                            <span>Global Rank:</span>
                            <h5>#{props.data.statistics.global_rank}</h5>
                        </div>
                        <div>
                            <span>Country Rank:</span>
                            <h5>#{props.data.statistics.rank.country}</h5>
                        </div>
                        <div>
                            <span>Performance:</span>
                            <h5>{props.data.statistics.pp}pp</h5>
                        </div>
                    </div>
                </div>
                <div className="rightPanel flex-grow-1">
                    <div className="d-flex flex-row align-items-center justify-content-between gap-3 p-3 border-bottom">
                        <h6 className="p-0 m-0">lvl {props.data.statistics.level.current}</h6>
                        <div className="border flex-grow-1 overflow-hidden" style={{height: 5}}>
                            <div className="bg-warning"
                                 style={{width: `${props.data.statistics.level.progress}%`, height: 5}}>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column p-3 p-3 border-bottom">
                        <div className="d-flex flex-row">
                            <div className="border" style={chart}></div>
                            <ul style={{width: 180}}>
                                <li className="d-flex border-bottom flex-column pb-2">
                                    <h6 className="m-0 p-0">Accuracy:</h6>
                                    <span>{props.data.statistics.hit_accuracy.toFixed(2)}%</span>
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: colors.x300,
                                        height: 15,
                                        width: 15
                                    }}></div>x300:</span>{hits_300_percent.toFixed(2)}%
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: colors.x100,
                                        height: 15,
                                        width: 15
                                    }}></div>x100:</span>{hits_100_percent.toFixed(2)}%
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: colors.x50,
                                        height: 15,
                                        width: 15
                                    }}></div>x50:</span>{hits_50_percent.toFixed(2)}%
                                </li>
                                <li className="d-flex flex-row align-items-center justify-content-between"><span
                                    className="d-flex flex-row align-items-center gap-1"><div
                                    style={{
                                        backgroundColor: colors.xMiss,
                                        height: 15,
                                        width: 15
                                    }}></div>x0:</span>{hits_miss_percent.toFixed(2)}%
                                </li>
                                <li className="d-flex border-top flex-column pt-2">
                                    <h6 className="m-0 p-0">Max Combo:</h6>
                                    <span>{props.data.statistics.maximum_combo}x</span>
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex flex-row justify-content-center gap-3 mt-1">
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <img src="/ranks/xh.svg" alt="xh" style={{height: 20}}/>
                                <div className="fw-bold">{props.data.statistics.grade_counts.ssh}</div>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <img src="/ranks/x.svg" alt="x" style={{height: 20}}/>
                                <div className="fw-bold">{props.data.statistics.grade_counts.ss}</div>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <img src="/ranks/sh.svg" alt="sh" style={{height: 20}}/>
                                <div className="fw-bold">{props.data.statistics.grade_counts.sh}</div>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <img src="/ranks/s.svg" alt="s" style={{height: 20}}/>
                                <div className="fw-bold">{props.data.statistics.grade_counts.s}</div>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <img src="/ranks/a.svg" alt="a" style={{height: 20}}/>
                                <div className="fw-bold">{props.data.statistics.grade_counts.a}</div>
                            </div>
                        </div>
                    </div>
                    <div className="p-3">
                        <div className="d-flex gap-2"><i
                            className="bi bi-clock"></i><span><b>Play Time:</b> {playtime}</span></div>
                        <div className="d-flex gap-2"><i
                            className="bi bi-joystick"></i><span><b>Play Count:</b> {props.data.statistics.play_count}</span>
                        </div>
                        <div className="d-flex gap-2"><i
                            className="bi bi-hourglass"></i><span><b>Avg. Time x Play:</b> {avgPlayTime}</span></div>
                    </div>
                </div>
            </div>
            <div className="historyPanel d-flex border-bottom p-3 d-flex flex-column">
                <h6>Rank Graph:</h6>
                <div style={{transform : 'scaleY(-1)'}}>
                    <LineChart width={width} height={height} wValues={rankXValues} hValues={rankYValues}
                               color={colors.x50}/>
                </div>
            </div>
            <div className="historyPanel d-flex border-bottom p-3 d-flex flex-column">
                <h6>Plays Graph:</h6>
                <LineChart width={width} height={height} wValues={xValues} hValues={yValues} color={colors.x50}/>
            </div>
            {/*<div className="botPanel p-3 text-light" dangerouslySetInnerHTML={{__html: props.data.page.html}}*/}
            {/*     style={{backgroundColor: '#2a2226'}}>*/}
            {/*</div>*/}
        </div>
    );
}

export default UserCard;