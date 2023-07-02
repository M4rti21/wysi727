import React, {useEffect, useRef, useState} from "react";
import {ItemsEntity, ModsEntity} from "../../interfaces/ScoresInterface";
import {ParallaxBanner} from "react-scroll-parallax";
import {ColorSettingsType, colorsSettings, volumeSettings, VolumeSettingsType} from "../../store/store";
import ScoreModal from "./ScoreModal";
import domtoimage from 'dom-to-image';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ConstructionIcon from '@mui/icons-material/Construction';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckIcon from '@mui/icons-material/Check';

interface propsInterface {
    data: ItemsEntity;
    num: number,
}

const Score = (props: propsInterface) => {
    const captureScreenshot = () => {
        const element = document.getElementById(props.num.toString());
        if (element) {
            domtoimage.toBlob(element)
                .then(function (blob: any) {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'screenshot.png';
                    link.click();
                });
        }
    }
    const volume = volumeSettings((state: VolumeSettingsType) => state.realVolume);
    const colors = colorsSettings((state: ColorSettingsType) => state.colors);
    const dateObj = new Date(props.data.ended_at);
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const fullDate = day + "/" + month + "/" + year;
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const togglePlayback = () => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().then();
            }
            setIsPlaying(!isPlaying);
        }
    };
    if (audioRef.current != null) {
        audioRef.current.onended = () => {
            setIsPlaying(!isPlaying);
        }
        audioRef.current.volume = volume / 100
    }
    const getDaysAgo = (startDate: string): string => {
        // Convert the start date string to a Date object
        const start: Date = new Date(startDate);

        // Get the current date
        const currentDate: Date = new Date();

        // Calculate the time difference in milliseconds
        const timeDiff: number = Math.abs(currentDate.getTime() - start.getTime());

        // Calculate the number of milliseconds in a day, month, and year
        const oneDay: number = 24 * 60 * 60 * 1000;
        const oneMonth: number = 30.44 * oneDay; // Approximate average month length
        const oneYear: number = 365.24 * oneDay; // Approximate average year length

        // Calculate the differences in days, months, and years
        const daysDiff: number = Math.floor(timeDiff / oneDay);
        const monthsDiff: number = Math.floor(timeDiff / oneMonth);
        const yearsDiff: number = Math.floor(timeDiff / oneYear);

        // Subtract days, months, and years from the respective differences
        const remainingDays: number = daysDiff - (monthsDiff * (oneMonth / oneDay));
        const remainingMonths: number = monthsDiff - (yearsDiff * 12);

        // Create the formatted string for years, months, and days
        let result: string = "";

        if (yearsDiff > 0) {
            result += yearsDiff === 1 ? "1 year" : `${Math.floor(yearsDiff)} years`;
        }

        if (remainingMonths > 0) {
            if (result.length > 0) {
                result += ", ";
            }
            result += remainingMonths === 1 ? "1 month" : `${Math.floor(remainingMonths)} months`;
        }

        if (remainingDays > 0) {
            if (result.length > 0) {
                result += ", ";
            }
            result += remainingDays === 1 ? "1 day" : `${Math.floor(remainingDays)} days`;
        }

        // Create the time string (HH:mm AM/PM)
        const hours: number = start.getHours();
        const minutes: string = String(start.getMinutes()).padStart(2, "0");
        const ampm: string = hours >= 12 ? "PM" : "AM";
        const formattedHours: number = hours % 12 === 0 ? 12 : hours % 12;
        const timeString: string = `${formattedHours}:${minutes} ${ampm}`;

        // Create the date string with time
        let dateString: string;

        if (daysDiff === 0) {
            dateString = `today (at ${timeString})`;
        } else if (daysDiff === 1) {
            dateString = `yesterday (at ${timeString})`;
        } else {
            dateString = `${result} ago`;
        }

        return dateString;
    }
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    return (
        <>
            <div id={props.num.toString()} className="rounded mb-2 overflow-hidden"
                 style={{
                     color: '#ffffff',
                     minHeight: 100,
                 }}>
                <ParallaxBanner
                    layers={[
                        {
                            image: props.data.beatmapset.covers.cover,
                            speed: 0
                        }]}
                    style={{width: "100%", height: "100%"}}>
                    <div className="p-2 m-0 rounded " style={{backdropFilter: "brightness(40%) blur(4px)"}}>
                        <div className="d-flex flex-row align-items-center gap-3">
                            <div className="beatmapImg ps-1 rounded ratio-1x1" style={{
                                backgroundImage: `url(${props.data.beatmapset.covers.list})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                minHeight: 50,
                                maxHeight: 50,
                                minWidth: 50,
                                maxWidth: 50,
                            }}>
                            </div>
                            <div className="d-flex flex-row justify-content-between">
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row flex-wrap align-items-end">
                                        <a href={`https://osu.ppy.sh/beatmapsets/${props.data.beatmapset.id}`}
                                           className="text-decoration-none me-2"
                                           style={{color: '#ffffff'}}
                                           target="_blank" rel="noreferrer">{props.data.beatmapset.title}</a>
                                        <a style={{fontSize: 12, marginBottom: 1, color: '#ffffff'}}
                                           className="text-decoration-none">
                                            by {props.data.beatmapset.artist}
                                        </a>
                                    </div>
                                    <div style={{fontSize: 12}}>
                                        [{props.data.beatmap.version}] - <a className="text-decoration-none"
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            href={`https://osu.ppy.sh/users/${props.data.beatmapset.user_id}`}
                                                                            style={{color: '#ffffff'}}>
                                        {props.data.beatmapset.creator}
                                    </a>
                                    </div>
                                </div>
                            </div>
                            <div className="ms-auto me-2 d-flex flex-column">
                                <div className="fs-1">
                                <span
                                    style={{color: (colors.ranks as any)[props.data.rank.toLowerCase()]}}>{props.data.rank}</span>
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
                                {
                                    props.data.statistics?.perfect &&
                                    <div style={{color: colors.judgements.x320}}>
                                        {props.data.statistics.perfect}
                                    </div>
                                }
                                <div style={{color: colors.judgements.x300}}>
                                    {props.data.statistics.great}
                                </div>
                                {
                                    props.data.statistics?.good &&
                                    <div style={{color: colors.judgements.x200}}>
                                        {props.data.statistics.good}
                                    </div>
                                }
                                <div style={{color: colors.judgements.x100}}>
                                    {props.data.statistics.ok ? props.data.statistics.ok : '0'}
                                </div>
                                <div style={{color: colors.judgements.x50}}>
                                    {props.data.statistics.meh ? props.data.statistics.meh : '0'}
                                </div>
                                <div style={{color: colors.judgements.xMiss}}>
                                    {props.data.statistics.miss ? props.data.statistics.miss : '0'}
                                </div>
                            </div>
                            <div style={{fontSize: 10, color: '#ffffff' + 'cc'}}
                                 className="d-flex flex-column">
                                <div className="ms-auto"
                                     data-tooltip-id="reactTooltip"
                                     data-tooltip-content={getDaysAgo(props.data.ended_at)}>{fullDate}</div>
                                <div className="d-flex flex-row gap-1">
                                    <div>{props.data.weight?.pp ? `${Math.round(props.data.weight.pp)}pp` : ''}</div>
                                    <div>{props.data.weight?.percentage ? `(${Math.round(props.data.weight.percentage)}%)` : ''}</div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between">
                            <div className="d-flex flex-row gap-1">
                                <div>#{props.num + 1} |</div>
                                <button onClick={togglePlayback}
                                        style={{backgroundColor: "#00000000", border: "none", color: '#ffffff'}}>
                                    <audio ref={audioRef} src={`https:${props.data.beatmapset.preview_url}`}/>
                                    {isPlaying ? <i className="bi bi-pause-fill"></i> :
                                        <i className="bi bi-play-fill"></i>}
                                </button>
                                <button style={{backgroundColor: "#00000000", border: "none", color: '#ffffff'}}>
                                    <a href={`osu://b/${props.data.beatmap.id}`}
                                       className="text-decoration-none"
                                       style={{color: '#ffffff'}}>
                                        <i className="bi bi-download" data-turbolinks="false"></i>
                                    </a>
                                </button>
                                {props.data.replay ?
                                    (<button
                                        style={{backgroundColor: "#00000000", border: "none", color: '#ffffff'}}>
                                        <a href={`https://osu.ppy.sh/scores/osu/${props.data.best_id}/`} target="_blank"
                                           rel="noreferrer"
                                           style={{color: '#ffffff'}}
                                           className="text-decoration-none">
                                            <i className="bi bi-film"></i>
                                        </a>
                                    </button>) : ""}
                                <button type="button"
                                        style={{backgroundColor: "#00000000", border: "none", color: '#ffffff'}}
                                        onClick={captureScreenshot}>
                                    <i className="bi bi-camera"></i>
                                </button>
                            </div>
                            <div className="d-flex flex-row gap-2 align-items-center">
                                <div className="d-flex flex-row flex-wrap gap-1">
                                    {props.data.mods?.map((mod: ModsEntity, index: number) => (
                                        <img height={18}
                                             key={index}
                                             src={require(`../../assets/mod-icons/${mod.acronym.toLowerCase()}.png`)}
                                             alt={mod.acronym}
                                             data-tooltip-id="reactTooltip"
                                             data-tooltip-content={mod.acronym}/>
                                    ))}
                                </div>
                                <div>
                                    {Math.round(props.data.pp)}pp
                                </div>
                                <div
                                    data-tooltip-id="reactTooltip"
                                    data-tooltip-content={props.data.beatmapset.status}>
                                    {props.data.beatmapset.status === "graveyard" &&
                                        <HighlightOffIcon
                                            style={{color: colors.beatmap.graveyard}}/>}
                                    {props.data.beatmapset.status === "wip" &&
                                        <ConstructionIcon
                                            style={{color: colors.beatmap.wip}}/>}
                                    {props.data.beatmapset.status === "pending" &&
                                        <PendingActionsIcon
                                            style={{color: colors.beatmap.pending}}/>}
                                    {props.data.beatmapset.status === "ranked" &&
                                        <KeyboardDoubleArrowUpIcon
                                            style={{color: colors.beatmap.ranked}}/>}
                                    {props.data.beatmapset.status === "approved" &&
                                        <CheckIcon
                                            style={{color: colors.beatmap.approved}}/>}
                                    {props.data.beatmapset.status === "qualified" &&
                                        <CheckIcon
                                            style={{color: colors.beatmap.qualified}}/>}
                                    {props.data.beatmapset.status === "loved" &&
                                        <FavoriteIcon
                                            style={{color: colors.beatmap.loved}}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </ParallaxBanner>
            </div>
            <ScoreModal data={props.data} num={props.num}/>
        </>
    );
}
export default Score;