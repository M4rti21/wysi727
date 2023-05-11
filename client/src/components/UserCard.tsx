import React from "react";

interface userData {
    data: any;
}

const UserCard: React.FC<userData> = (props) => {
    const secondsToDhms = (seconds: number) => {
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
    const playtime = secondsToDhms(props.data.statistics.play_time);
    const avgPlayTime = secondsToDhms(props.data.statistics.play_time / props.data.statistics.play_count);
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
    const progressBarStyle = {
        width: `${props.data.statistics.level.progress}%`,
        height: 5
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
    return (
        <div className="border rounded-4 mx-auto d-flex flex-column overflow-hidden mb-5" style={{width: 565, maxWidth: 565}}>
            <div className="topPanel border-bottom" style={{height: 180}}>
                <img src={props.data.cover_url} alt="pfp" style={{height: 180, width: '100%', objectFit: "cover"}}/>
            </div>
            <div className="midPanel d-flex flex-row border-bottom">
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
                <div className="rightPanel">
                    <div className="d-flex flex-row align-items-center justify-content-between gap-3 p-3 border-bottom">
                        <h6 className="p-0 m-0">lvl {props.data.statistics.level.current}</h6>
                        <div className="border flex-grow-1 overflow-hidden" style={{height: 5}}>
                            <div className="bg-warning"
                                 style={progressBarStyle}>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row p-3 p-3 border-bottom">
                        <div className="border" style={chart}></div>
                        <ul style={{width: 150}}>
                            <li className="d-flex border-bottom flex-column">
                                <h6 className="m-0 p-0">Accuracy:</h6><span>{props.data.statistics.hit_accuracy.toFixed(2)}%</span>
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
                            <li className="d-flex border-top flex-column">
                                <h6 className="m-0 p-0">Max Combo:</h6><span>x{props.data.statistics.maximum_combo}</span>
                            </li>
                        </ul>
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
            {/*<div className="botPanel p-3 text-light" dangerouslySetInnerHTML={{__html: props.data.page.html}}*/}
            {/*     style={{backgroundColor: '#2a2226'}}>*/}
            {/*</div>*/}
        </div>
    );
}

export default UserCard;