import React, {useRef, useState} from "react";
import {ItemsEntity} from "../interfaces/ScoresInterface";
import {ParallaxBanner} from "react-scroll-parallax";

interface propsInterface {
    data: ItemsEntity;
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
    },
    num: number
}

const Score = (props: propsInterface) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const height = 200;
    const togglePlayback = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    if (audioRef.current != null) {
        audioRef.current.onended = () => {
            setIsPlaying(!isPlaying);
        }
    }
    return (
        <ParallaxBanner
            layers={[
                {
                    image: props.data.beatmapset.covers.cover,
                    speed: 0
                }]}
            style={{width: "100%"}}>
            <div className="border p-2 m-0 h-100 w-100"
                 style={{backdropFilter: "brightness(40%) blur(4px)"}}>
                <div className="d-flex flex-row align-items-center gap-3">
                    <div className="beatmapImg ps-1" style={{
                        backgroundImage: `url(${props.data.beatmapset.covers.list})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        minHeight: 50,
                        minWidth: 50,
                    }}>
                        {props.num + 1}:
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row flex-wrap align-items-end">
                                <a href={`https://osu.ppy.sh/beatmapsets/${props.data.beatmapset.id}`}
                                   className="text-decoration-none text-light me-2"
                                   target="_blank">{props.data.beatmapset.title}</a>
                                <a style={{fontSize: 12, marginBottom: 1}} className="text-decoration-none text-light">
                                    by {props.data.beatmapset.artist}
                                </a>
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
                    <div className="ms-auto me-2 fs-1">
                        {props.data.rank === "SH" || props.data.rank === "XH" ?
                            (<span style={{color: props.colors.x}}>{props.data.rank}</span>) :
                            props.data.rank === "S" || props.data.rank === "X" ?
                                (<span style={{color: props.colors.s}}>{props.data.rank}</span>) :
                                props.data.rank === "A" ?
                                    (<span style={{color: props.colors.a}}>{props.data.rank}</span>) :
                                    props.data.rank === "B" ?
                                        (<span style={{color: props.colors.b}}>{props.data.rank}</span>) :
                                        props.data.rank === "C" ?
                                            (<span style={{color: props.colors.c}}>{props.data.rank}</span>) :
                                            props.data.rank === "D" ?
                                                (<span style={{color: props.colors.d}}>{props.data.rank}</span>) :
                                                props.data.rank === "F" ?
                                                    (<span
                                                        style={{color: props.colors.f}}>{props.data.rank}</span>) : ""}
                    </div>
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
                    {(props.data.accuracy * 100).toFixed(2)}% - {props.data.max_combo}x - {props.data.total_score.toLocaleString()}
                </span>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-end">
                    <div className="d-flex flex-row mb-1">
                        <div style={{color: props.colors.x300}}>
                            {props.data.statistics.great}
                        </div>
                        /
                        <div style={{color: props.colors.x100}}>
                            {props.data.statistics.ok ? props.data.statistics.ok : '0'}
                        </div>/
                        <div style={{color: props.colors.x50}}>
                            {props.data.statistics.meh ? props.data.statistics.meh : '0'}
                        </div>/
                        <div style={{color: props.colors.xMiss}}>
                            {props.data.statistics.miss ? props.data.statistics.miss : '0'}
                        </div>
                    </div>
                    <div className="d-flex flex-row gap-2 justify-content-end mt-auto">
                        <div style={{fontSize: 10, color: "#bbbbbb"}}
                             className="d-flex flex-row gap-1">
                            <div>{props.data.weight?.pp ? `${Math.round(props.data.weight.pp)}pp` : ''}</div>
                            <div>({props.data.weight?.percentage ? `${Math.round(props.data.weight.percentage)}%` : ''})</div>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-row justify-content-between">
                    <div>
                        <button onClick={togglePlayback} className="text-light"
                                style={{backgroundColor: "#00000000", border: "none"}}>
                            <audio src={`https:${props.data.beatmapset.preview_url}`} ref={audioRef}/>
                            {isPlaying ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
                        </button>
                        <button className="text-light"
                                style={{backgroundColor: "#00000000", border: "none"}}>
                            <a href={`osu://b/${props.data.beatmap.id}`} className="text-decoration-none text-light">
                                <i className="bi bi-download" data-turbolinks="false"></i>
                            </a>
                        </button>
                        {props.data.replay ?
                            (<button className="text-light"
                                     style={{backgroundColor: "#00000000", border: "none"}}>
                                <a href={`https://osu.ppy.sh/scores/osu/${props.data.best_id}/`} target="_blank"
                                   className="text-decoration-none text-light">
                                    <i className="bi bi-film"></i>
                                </a>
                            </button>) : ""}
                    </div>
                    <div>
                        {props.data.mods?.map((mod) => (
                            <>{mod.acronym}</>
                        ))}
                        {props.data.mods?.length ? " - " : ""}
                        {Math.round(props.data.pp)}pp
                    </div>
                </div>
            </div>
        </ParallaxBanner>
    );
}
export default Score;