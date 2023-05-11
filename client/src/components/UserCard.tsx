import React from "react";
interface userData {
    data: any;
}

const UserCard: React.FC<userData> = (props) => {
    const hits_total: number = (props.data.statistics.count_50 + props.data.statistics.count_100 + props.data.statistics.count_300);
    const hits_50_percent: number = props.data.statistics.count_50 / hits_total * 100;
    const hits_100_percent: number = props.data.statistics.count_100 / hits_total * 100;
    const hits_300_percent: number = props.data.statistics.count_300 / hits_total * 100;
    const colors = {
        x300: '#007bff',
        x100: '#28a745',
        x50: '#ffc107'
    }
    const chartLegend = {
        width: 150
    }
    const x300Span = {
        backgroundColor: colors.x300,
        height: 15,
        width: 15
    }
    const x100Span = {
        backgroundColor: colors.x100,
        height: 15,
        width: 15
    }
    const x50Span = {
        backgroundColor: colors.x50,
        height: 15,
        width: 15
    }
    const progressBarStyle = {
        width: `${props.data.statistics.level.progress}%`,
        height: 5
    }
    const username = {
        maxWidth: 180
    }
    const chart = {
        background: `conic-gradient(${colors.x300} 0% ${hits_300_percent}%, ${colors.x100} ${hits_300_percent}% ${hits_300_percent + hits_100_percent}%, ${colors.x50} ${hits_300_percent + hits_100_percent}% 100%)`,
        height: 200,
        width: 200,
        borderRadius: '50%'
    }
    return (
        <div className="border rounded-4 mx-auto d-flex flex-column overflow-hidden">
            <div className="topPabel">
                <img src={props.data.cover_url} alt="pfp" style={{height: 180, width: '100%', objectFit: "cover"}} />
            </div>
            <div className="botPabel d-flex flex-row">
                <div className="leftPanel p-3 border-end d-flex flex-column">
                    <img src={props.data.avatar_url} alt="pfp" style={{height: 180, width: 180}} className="rounded-4"/>
                    <h3 className="text-truncate pt-2" style={username}>{props.data.username}</h3>
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
                </div>
                <div className="rightPanel p-3">
                    <div className="d-flex flex-row align-items-center justify-content-between gap-3">
                        <h6>lvl {props.data.statistics.level.current}</h6>
                        <div className="border flex-grow-1 mb-2 overflow-hidden" style={{height: 5}}>
                            <div className="bg-warning"
                                 style={progressBarStyle}></div>
                        </div>
                    </div>
                    <div className="d-flex flex-row">
                        <div className="border" style={chart}></div>
                        <ul style={chartLegend}>
                            <li className="d-flex flex-row align-items-center justify-content-between"><span
                                className="d-flex flex-row align-items-center gap-1"><div
                                style={x300Span}></div>x300:</span>{hits_300_percent.toFixed(2)}%
                            </li>
                            <li className="d-flex flex-row align-items-center justify-content-between"><span
                                className="d-flex flex-row align-items-center gap-1"><div
                                style={x100Span}></div>x100:</span>{hits_100_percent.toFixed(2)}%
                            </li>
                            <li className="d-flex flex-row align-items-center justify-content-between"><span
                                className="d-flex flex-row align-items-center gap-1"><div
                                style={x50Span}></div>x50:</span>{hits_50_percent.toFixed(2)}%
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;