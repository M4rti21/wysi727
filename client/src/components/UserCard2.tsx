import React from "react";
import LineChart from "./LineChart";
import {MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity} from "../interfaces/UserCardInterface";

interface userData {
    data: any;
}

const UserCard2: React.FC<userData> = (props) => {
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
    const width = 565;
    const normalizeArray = (arr: number[]) => {
        const minValue = Math.min(...arr);
        const maxValue = Math.max(...arr);
        return arr.map((value) => {
            return (value - minValue) / (maxValue - minValue) * height;
        });
    }
    const yValues = normalizeArray(props.data.monthly_playcounts.map((obj: MonthlyPlaycountsEntityOrReplaysWatchedCountsEntity) => obj.count));
    const step = width / yValues.length;
    const xValues = [];
    for (let i = 0; i < yValues.length; i++) {
        const number = (i * step);
        xValues.push(number);
    }
    const invertArray = (arr: number[]) => {
        let maxNum = Math.max(...arr);
        let minNum = Math.min(...arr);

        arr[arr.indexOf(maxNum)] = minNum;
        arr[arr.indexOf(minNum)] = maxNum;

        return arr;
    }
    const rankYValues = normalizeArray(props.data.rank_history.data);
    const rXValues = [];
    for (let i = 0; i < rankYValues.length; i++) {
        const number = (i * step);
        rXValues.push(number);
    }
    const rankXValues = invertArray(rXValues);
    return (
        <div className="d-flex flex-column overflow-hidden mb-5 me-auto mx-5 border userCard">
            <div className="d-flex flex-row gap-3 border-bottom p-4">
                <img src={props.data.avatar_url} alt="pfp" style={{height: 180, width: 180}}/>
                <div className="d-flex flex-column">
                    <div>
                        <span>username:</span>
                        <h3>{props.data.username}</h3>
                    </div>
                    <div>
                        <span>rank:</span>
                        <h4>#{props.data.statistics.global_rank}</h4>
                    </div>
                    <div>
                        <span>country:</span>
                        <h5 className="d-flex flex-row gap-1 align-items-center"><img
                            src={`https://flagsapi.com/${props.data.country.code.toUpperCase()}/flat/32.png`}
                            alt="flag"/>{props.data.country.name}</h5>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row gap-3 border-bottom p-4">
                <div className="d-flex flex-column">
                    <div>
                        <span>performance:</span>
                        <h3>{Math.round(props.data.statistics.pp).toLocaleString()}pp</h3>
                    </div>
                    <div>
                        <span>accuracy:</span>
                        <h3>{props.data.statistics.hit_accuracy.toFixed(2).toLocaleString()}%</h3>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column gap-3 p-4 border-bottom">
                <span>rank:</span>
                <LineChart width={width} height={height} wValues={rankXValues} hValues={rankYValues}
                           color={colors.x50}/>
            </div>
            <div className="d-flex flex-column gap-3 p-4">
                <span>playcount:</span>
                <LineChart width={width} height={height} wValues={xValues} hValues={yValues} color={colors.x50}/>
            </div>
        </div>
    );
}
export default UserCard2;