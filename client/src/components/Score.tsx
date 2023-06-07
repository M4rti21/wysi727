import React, {useEffect, useRef, useState} from "react";
import {ItemsEntity} from "../interfaces/ScoresInterface";
import {ParallaxBanner} from "react-scroll-parallax";
import {ColorsType} from "../interfaces/ColorsInterface";
import {Tooltip as ReactTooltip} from "react-tooltip";

interface propsInterface {
    data: ItemsEntity;
    colors: ColorsType,
    num: number,
    volume: number;
}

const Score = (props: propsInterface) => {
    props.colors.ui.font = '#f5f5f5';
    const dateObj = new Date(props.data.ended_at);
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const fullDate = day + "/" + month + "/" + year;
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const togglePlayback = () => {
        if (audioRef.current) {
            audioRef.current.volume = props.volume / 100
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
        audioRef.current.volume = props.volume / 100
    }
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = props.volume / 100;
        }
    }, [props.volume]);
    return (
        <div className="rounded-4 my-1 flex-grow-1 overflow-hidden"
        style={{
            color: props.colors.ui.font
        }}>
            <ParallaxBanner
                layers={[
                    {
                        image: props.data.beatmapset.covers.cover,
                        speed: 0
                    }]}
                style={{width: "100%"}}>
                <div className="p-2 m-0 h-100 w-100"
                     style={{backdropFilter: "brightness(40%) blur(4px)"}}>
                    <div className="d-flex flex-row align-items-center gap-3">
                        <div className="beatmapImg ps-1 rounded-3 ratio-1x1" style={{
                            backgroundImage: `url(${props.data.beatmapset.covers.list})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            minHeight: 50,
                            maxHeight: 50,
                            minWidth: 50,
                            maxWidth: 50,
                        }}>
                            {props.num + 1}:
                        </div>
                        <div className="d-flex flex-row justify-content-between">
                            <div className="d-flex flex-column">
                                <div className="d-flex flex-row flex-wrap align-items-end">
                                    <a href={`https://osu.ppy.sh/beatmapsets/${props.data.beatmapset.id}`}
                                       className="text-decoration-none me-2"
                                       style={{color: props.colors.ui.font}}
                                       target="_blank" rel="noreferrer">{props.data.beatmapset.title}</a>
                                    <a style={{fontSize: 12, marginBottom: 1, color: props.colors.ui.font}}
                                       className="text-decoration-none">
                                        by {props.data.beatmapset.artist}
                                    </a>
                                </div>
                                <div style={{fontSize: 12}}>
                                    [{props.data.beatmap.version}] - <a className="text-decoration-none"
                                                                        target="_blank"
                                                                        rel="noreferrer"
                                                                        href={`https://osu.ppy.sh/users/${props.data.beatmapset.user_id}`}
                                                                        style={{color: props.colors.ui.font}}>
                                    {props.data.beatmapset.creator}
                                </a>
                                </div>
                            </div>
                        </div>
                        <div className="ms-auto me-2 d-flex flex-column">
                            <div className="fs-1">
                                {props.data.rank === "XH" ?
                                    (<span style={{color: props.colors.ranks.xh}}>{props.data.rank}</span>) :
                                    props.data.rank === "X" ?
                                        (<span style={{color: props.colors.ranks.x}}>{props.data.rank}</span>) :
                                        props.data.rank === "SH" ?
                                            (<span style={{color: props.colors.ranks.sh}}>{props.data.rank}</span>) :
                                            props.data.rank === "S" ?
                                                (<span style={{color: props.colors.ranks.s}}>{props.data.rank}</span>) :
                                                props.data.rank === "A" ?
                                                    (<span
                                                        style={{color: props.colors.ranks.a}}>{props.data.rank}</span>) :
                                                    props.data.rank === "B" ?
                                                        (<span
                                                            style={{color: props.colors.ranks.b}}>{props.data.rank}</span>) :
                                                        props.data.rank === "C" ?
                                                            (<span
                                                                style={{color: props.colors.ranks.c}}>{props.data.rank}</span>) :
                                                            props.data.rank === "D" ?
                                                                (<span
                                                                    style={{color: props.colors.ranks.d}}>{props.data.rank}</span>) :
                                                                props.data.rank === "F" ?
                                                                    (<span
                                                                        style={{color: props.colors.ranks.f}}>{props.data.rank}</span>) : ""}
                            </div>
                        </div>
                    </div>
                    <div className="pt-2 d-flex flex-row flex-wrap gap-2" style={{fontSize: 10}}>
                        <div>
                            CS: {props.data.beatmap.cs}
                        </div>
                        <div>|</div>
                        <div>
                            AR: {props.data.beatmap.ar}
                        </div>
                        <div>|</div>
                        <div>
                            OD: {props.data.beatmap.accuracy}
                        </div>
                        <div>|</div>
                        <div>
                            HP: {props.data.beatmap.drain}
                        </div>
                    </div>
                    <div className="d-flex flex-row gap-2" style={{fontSize: 12}}>
                        <div>
                            <i className="bi bi-star-fill me-1"></i>{props.data.beatmap.difficulty_rating}
                        </div>
                        <div>|</div>
                        <div>
                            <i className="bi bi-stopwatch me-1"></i>{`${Math.floor(props.data.beatmap.total_length / 60)}:${Math.floor(props.data.beatmap.total_length - Math.floor(props.data.beatmap.total_length / 60) * 60).toString().padStart(2, '0')}`}
                        </div>
                        <div>|</div>
                        <div>
                            <i className="bi bi-music-note-beamed me-1"></i>{props.data.beatmap.bpm}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                <span className="d-flex flex-row gap-2" style={{fontSize: 14}}>
                    {(props.data.accuracy * 100).toFixed(2)}% - {props.data.max_combo}x - {props.data.total_score.toLocaleString()}
                </span>
                    </div>
                    <div className="d-flex flex-row justify-content-between align-items-end">
                        <div className="d-flex flex-row mb-1 gap-2">
                            <div style={{color: props.colors.judgements.x300}}>
                                {props.data.statistics.great}
                            </div>
                            <div style={{color: props.colors.judgements.x100}}>
                                {props.data.statistics.ok ? props.data.statistics.ok : '0'}
                            </div>
                            <div style={{color: props.colors.judgements.x50}}>
                                {props.data.statistics.meh ? props.data.statistics.meh : '0'}
                            </div>
                            <div style={{color: props.colors.judgements.xMiss}}>
                                {props.data.statistics.miss ? props.data.statistics.miss : '0'}
                            </div>
                        </div>
                        <div style={{fontSize: 10, color: props.colors.ui.font + 'cc'}}
                             className="d-flex flex-column">
                            <div className="ms-auto"
                                 data-tooltip-id="reactTooltip"
                                 data-tooltip-content={new Date(props.data.ended_at).toLocaleString()}>{fullDate}</div>
                            <div className="d-flex flex-row gap-1">
                                <div>{props.data.weight?.pp ? `${Math.round(props.data.weight.pp)}pp` : ''}</div>
                                <div>{props.data.weight?.percentage ? `(${Math.round(props.data.weight.percentage)}%)` : ''}</div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between">
                        <div>
                            <button onClick={togglePlayback}
                                    style={{backgroundColor: "#00000000", border: "none", color: props.colors.ui.font}}>
                                <audio ref={audioRef} src={`https:${props.data.beatmapset.preview_url}`}/>
                                {isPlaying ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
                            </button>
                            <button style={{backgroundColor: "#00000000", border: "none", color: props.colors.ui.font}}>
                                <a href={`osu://b/${props.data.beatmap.id}`}
                                   className="text-decoration-none"
                                   style={{color: props.colors.ui.font}}>
                                    <i className="bi bi-download" data-turbolinks="false"></i>
                                </a>
                            </button>
                            {props.data.replay ?
                                (<button
                                    style={{backgroundColor: "#00000000", border: "none", color: props.colors.ui.font}}>
                                    <a href={`https://osu.ppy.sh/scores/osu/${props.data.best_id}/`} target="_blank"
                                       rel="noreferrer"
                                       style={{color: props.colors.ui.font}}
                                       className="text-decoration-none">
                                        <i className="bi bi-film"></i>
                                    </a>
                                </button>) : ""}
                        </div>
                        <div className="d-flex flex-row gap-2 align-items-center">
                            <div className="d-flex flex-row flex-wrap gap-1">
                                {props.data.mods?.map((mod) => (
                                    <img height={18}
                                         src={require(`../assets/mod-icons/${mod.acronym.toLowerCase()}.png`)}
                                         alt={mod.acronym}
                                         data-tooltip-id="reactTooltip"
                                         data-tooltip-content={mod.acronym}/>
                                ))}
                            </div>
                            <div>
                                {Math.round(props.data.pp)}pp
                            </div>
                            <div>
                                {props.data.beatmapset.status === "graveyard" ?
                                    <i className="bi bi-slash-circle" style={{color: '#cccccc'}}></i> :
                                    props.data.beatmapset.status === "wip" ?
                                        <i className="bi bi-tools" style={{color: '#fe9967'}}></i> :
                                        props.data.beatmapset.status === "pending" ?
                                            <i className="bi bi-clock" style={{color: '#ffd966'}}></i> :
                                            props.data.beatmapset.status === "ranked" ?
                                                <i className="bi bi-chevron-double-up" style={{color: '#66ccff'}}></i> :
                                                props.data.beatmapset.status === "approved" ?
                                                    <i className="bi bi-check-lg" style={{color: '#b3ff66'}}></i> :
                                                    props.data.beatmapset.status === "qualified" ?
                                                        <i className="bi bi-check-lg" style={{color: '#66ccff'}}></i> :
                                                        props.data.beatmapset.status === "loved" ?
                                                            <i className="bi bi-suit-heart-fill"
                                                               style={{color: '#fe67ab'}}></i> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </ParallaxBanner>
        </div>
    );
}
export default Score;