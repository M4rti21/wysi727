import React from "react";
import {ScoreInterface} from "../interfaces/UserCardInterface";
import {Simulate} from "react-dom/test-utils";
import blur = Simulate.blur;

interface propsInterface {
    data: ScoreInterface;
    colors: {
        x300: string,
        x100: string,
        x50: string,
        xMiss: string,
        x: string,
        s: string,
        a: string,
        b: string,
        c: string,
        d: string,
        f: string,
    }
}

const Score = (props: propsInterface) => {
    console.log(props.data);
    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: 150,
        }}>
            <div style={{
                backgroundImage: `url(${props.data.beatmapset.covers.cover})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                filter: "blur(4px) brightness(30%)",
                zIndex: 1,
                width: "100%",
                height: 150,
                top: 0,
                left: 0,
            }}></div>
            <div className="border p-2 m-0"
                 style={{
                     position: "relative",
                     zIndex: 2,
                     top: -150,
                     left: 0,
                     height: 150,
                     marginTop: -150
            }}>
                <div className="d-flex flex-row align-items-center gap-3">
                    <div style={{
                        backgroundImage: `url(${props.data.beatmapset.covers.list})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        minHeight: 50,
                        minWidth: 50
                    }}>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-column">
                            <div>
                                <a href={`https://osu.ppy.sh/beatmapsets/${props.data.beatmapset.id}`}
                                   className="text-decoration-none text-light"
                                   target="_blank">{props.data.beatmapset.title}</a>
                                <span className="ms-2" style={{fontSize: 12}}>
                            by {props.data.beatmapset.artist}
                        </span>
                            </div>
                            <div style={{fontSize: 12}}>
                                [{props.data.beatmap.version}] - <a className="text-light text-decoration-none"
                                                                    target="_blank"
                                                                    href={`https://osu.ppy.sh/users/${props.data.beatmapset.user_id}`}>
                                {props.data.beatmapset.creator}
                            </a>
                            </div>
                        </div>
                    </div>
                    <h2 className="ms-auto me-2">
                        {props.data.rank == "SH" || props.data.rank == "SSH" ?
                            (<span style={{color: props.colors.x}}>{props.data.rank}</span>) :
                            props.data.rank == "S" || props.data.rank == "SS" ?
                                (<span style={{color: props.colors.s}}>{props.data.rank}</span>) :
                                props.data.rank == "A" ?
                                    (<span style={{color: props.colors.a}}>{props.data.rank}</span>) :
                                    props.data.rank == "B" ?
                                        (<span style={{color: props.colors.b}}>{props.data.rank}</span>) :
                                        props.data.rank == "C" ?
                                            (<span style={{color: props.colors.c}}>{props.data.rank}</span>) :
                                            props.data.rank == "D" ?
                                                (<span style={{color: props.colors.d}}>{props.data.rank}</span>) :
                                                props.data.rank == "F" ?
                                                    (<span
                                                        style={{color: props.colors.f}}>{props.data.rank}</span>) : ""}
                    </h2>
                </div>
                <div className="pt-2 d-flex flex-row flex-wrap gap-2" style={{fontSize: 10}}>
                    <div>
                        CS: {props.data.beatmap.cs} |
                    </div>
                    <div>
                        AR: {props.data.beatmap.ar} |
                    </div>
                    <div>
                        OD: {props.data.beatmap.accuracy} |
                    </div>
                    <div>
                        HP: {props.data.beatmap.drain} |
                    </div>
                    <div>
                        SR: {props.data.beatmap.difficulty_rating}
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                <span className="d-flex flex-row gap-2" style={{fontSize: 14}}>
                    {(props.data.accuracy * 100).toFixed(2)}% - {props.data.max_combo}x
                </span>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-end">
                    <div>
                    <span
                        style={{color: props.colors.x300}}>{props.data.statistics.count_300 + props.data.statistics.count_geki}</span>/
                        <span
                            style={{color: props.colors.x100}}>{props.data.statistics.count_100 + props.data.statistics.count_katu}</span>/
                        <span style={{color: props.colors.x50}}>{props.data.statistics.count_50}</span>/
                        <span style={{color: props.colors.xMiss}}>{props.data.statistics.count_miss}</span>
                    </div>
                    <span className="d-flex flex-row gap-2 justify-content-end mt-auto">
                    <span>
                    {props.data.mods?.map((mod) => (mod
                    ))}
                        {props.data.mods?.length ? " -" : ""}
                        </span>
                        {Math.round(props.data.pp)}pp<span style={{fontSize: 10, color: "#bbbbbb"}}
                                                           className="d-flex flex-column text-end">
                    <span>{Math.round(props.data.weight.percentage)}%</span>
                    <span>{Math.round(props.data.weight.pp)}pp</span></span>
                </span>
                </div>
            </div>

        </div>
    );
}
export default Score;