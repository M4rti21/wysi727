import React, {useEffect} from "react";
import {ParallaxBanner} from "react-scroll-parallax";
import FlagEmoji from "../FlagEmoji";
import {Radar} from "react-chartjs-2";
import {ColorSettingsType, colorsSettings} from "../../../store/store";
import {useColor} from 'color-thief-react';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PublicIcon from '@mui/icons-material/Public';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import TranslateIcon from '@mui/icons-material/Translate';
import {ActiveLanguageType, languageStore} from "../../../store/store";
import TerminalIcon from '@mui/icons-material/Terminal';

interface propsInterface {
    data: any;
    skillsData: any,
    skillsOptions: any,
    firstCountryLog: string,
    playtime: string
}

const TopPanel = (props: propsInterface) => {
    const language = languageStore((state: ActiveLanguageType) => state.text);
    const english = languageStore((state: ActiveLanguageType) => state.english);

    const colors = colorsSettings((state: ColorSettingsType) => state.colors);
    const setMain = colorsSettings((state: ColorSettingsType) => state.setMain);
    const avatarUrl = `http://localhost:5000/image/${props.data.id}/${props.data.avatar_url?.split('?')[1]?.split('.')[0]}`;
    const {data, loading, error} = useColor(avatarUrl, "hex", {crossOrigin: "use-credentials", quality: 10})
    const getDaysAgo = (start: Date): string => {
        // Convert the start date string to a Date object
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
            result += yearsDiff === 1 ? `1 ${english.dates.year}` : `${Math.floor(yearsDiff)} ${english.dates.years}`;
        }

        if (remainingMonths > 0) {
            if (result.length > 0) {
                result += ", ";
            }
            result += remainingMonths === 1 ? `1 ${english.dates.month}` : `${Math.floor(remainingMonths)} ${english.dates.months}`;
        }

        if (remainingDays > 0) {
            if (result.length > 0) {
                result += ", ";
            }
            result += remainingDays === 1 ? `1 ${english.dates.day}` : `${Math.floor(remainingDays)} ${english.dates.days}`;
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
            dateString = `today (${timeString})`;
        } else if (daysDiff === 1) {
            dateString = `yesterday (${timeString})`;
        } else {
            dateString = `${result} ${english.dates.ago}`;
        }

        return dateString;
    }

    function formatDate(date: Date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();

        // Pad single digits with leading zeros
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    useEffect(() => {
        if (data) {
            setMain(data);
            console.log(data);
        }
    }, [data]);
    return (
        <div className="topPanel m-0 p-0 col-12" style={{position: "relative"}}>
            <ParallaxBanner layers={[{
                image: props.data.cover_url,
                speed: -18,
            }]} style={{width: "100%", height: "100%", overflow: "hidden"}}>
                <div className="h-100 w-100"
                     style={{backdropFilter: "brightness(60%) blur(4px)", color: '#f5f5f5'}}>
                    <div className="row p-3 px-4" style={{overflow: "hidden"}}>
                        <div className="col-12 col-lg-3 p-3 d-flex flex-column justify-content-center">
                            <img className="ratio ratio-1x1 rounded-5 mx-auto d-block"
                                 src={props.data.avatar_url}
                                 alt={'pfp'}
                                 style={{
                                     height: 200,
                                     width: 200
                                 }}>
                            </img>
                            <div className="mt-2">
                                <a data-tooltip-id={props.data.previous_usernames?.length > 0 ? "reactTooltip" : ""}
                                   data-tooltip-content={`${language?.user?.top?.previous ? language.user.top.previous : english.user.top.previous}: ${props.data.previous_usernames?.join(', ')}`}
                                   className="d-block text-center fs-3 mb-2 text-align-center text-decoration-none text-light"
                                   href={`https://osu.ppy.sh/users/${props.data.id}`} target="_blank"
                                   rel="noreferrer">
                                    {props.data.username}
                                </a>
                            </div>
                            <div className="level d-flex flex-row align-items-center gap-3 px-4">
                                <h6 className="p-0 m-0">{language?.user?.top?.lvl ? language.user.top.lvl : english.user.top.lvl} {props.data.statistics?.level.current}</h6>
                                <div className="flex-grow-1 overflow-hidden rounded-pill p-0 mt-1"
                                     style={{
                                         height: 5,
                                         backgroundColor: colors.ui.main + '66',
                                         outline: '1px solid #ffffff22'
                                     }}>
                                    <div style={{
                                        width: `${props.data.statistics?.level.progress}%`,
                                        height: 5,
                                        backgroundColor: colors.ui.main
                                    }}>
                                    </div>
                                </div>
                                <h6 className="p-0 m-0">{props.data.statistics?.level.progress}%</h6>
                            </div>
                            <div
                                data-tooltip-id="reactTooltip"
                                data-tooltip-content={getDaysAgo(new Date(props.data.join_date))}
                                className="text-center mt-2"
                                style={{fontSize: 14}}>
                                {language?.user?.top?.joined ? language.user.top.joined : english.user.top.joined} {formatDate(new Date(props.data.join_date))}
                            </div>
                        </div>
                        <div className="col-12 col-lg-auto pt-3">
                            <div className="d-flex flex-row gap-1">
                                {props.data.customBadges?.developer &&
                                    <div className="p-1 rounded"
                                         style={{
                                             background: '-webkit-linear-gradient(319.6deg, rgb(243, 0, 79) 20.5%, rgb(255, 236, 68) 110.9%)',
                                         }}><TerminalIcon/>
                                    </div>}
                                {props.data.customBadges?.translator &&
                                    <div className="p-1 rounded"
                                         style={{
                                             background: '-webkit-linear-gradient(109.6deg, rgb(100, 178, 249) 11.2%, rgba(114, 231, 159, 0.8) 91.1%)',
                                         }}><TranslateIcon/>
                                    </div>}
                            </div>
                            <div className="fs-1 d-flex flex-row align-items-center gap-1"
                                 data-tooltip-id="reactTooltip"
                                 data-tooltip-content={`${language?.user?.top?.peakGlobal ? language.user.top.peakGlobal : english.user.top.peakGlobal}: #${props.data?.rank_highest?.rank?.toLocaleString()}`}>
                                <PublicIcon sx={{fontSize: 38}}/>#{props.data.statistics?.global_rank?.toLocaleString()}
                            </div>
                            <div>
                                <div className="fs-2 d-flex flex-row align-items-center gap-1">
                                    {props.data.country?.code &&
                                        <img width="32" className="countryIco me-2" alt="ico"
                                             src={require(`../../../assets/countries/${props.data.country?.code.toLowerCase()}/vector.svg`)}/>}
                                    <div data-tooltip-id="reactTooltip"
                                         data-tooltip-content={`${language?.user?.top?.peakCountry ? language.user.top.peakCountry : english.user.top.peakCountry}: #${props.data.db_info?.country_rank?.length ?
                                             props.data.db_info?.country_rank.reduce((prev: any, current: any) => {
                                                 return (prev?.rank > current?.rank) ? prev : current;
                                             })?.rank : ''}`}>#{props.data.statistics?.rank.country?.toLocaleString()}</div>
                                    <div className="ms-2 h-100 d-flex align-items-center"
                                         data-tooltip-id="reactTooltip"
                                         data-tooltip-content={props.data.country?.name && props.data.country.name}>
                                        {props.data.country?.code &&
                                            <FlagEmoji size={32} code={props.data.country.code}/>}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>{language?.user?.top?.performance ? language.user.top.performance : english.user.top.performance}:</div>
                                <div
                                    className="fs-4">{Math.round(props.data.statistics?.pp)?.toLocaleString()}pp
                                </div>
                            </div>
                            <div>
                                <div>{language?.user?.top?.acc ? language.user.top.acc : english.user.top.acc}:</div>
                                <div className="fs-4">
                                    {props.data.statistics?.hit_accuracy.toFixed(2)}%
                                </div>
                            </div>
                            <div>
                                <div>{language?.user?.top?.medals ? language.user.top.medals : english.user.top.medals}:</div>
                                <div className="fs-5">
                                    {props.data.user_achievements?.length}
                                    <MilitaryTechIcon className="me-2"/>
                                </div>
                            </div>
                        </div>
                        <div style={{zIndex: 8, margin: "-40px 0 -40px", height: 400, width: 400}}
                             className="col-12 col-lg position-relative mx-auto d-flex align-items-center">
                            <i className="bi bi-info-circle position-absolute"
                               style={{top: 120, right: 50}}
                               data-tooltip-id="reactTooltip"
                               data-tooltip-content={language?.user?.top?.skillsDisclaimer ? language.user.top.skillsDisclaimer : english.user.top.skillsDisclaimer}></i>
                            <Radar data={props.skillsData} options={props.skillsOptions} height={400} width={400}/>
                        </div>
                        <div className="col-12 col-lg-auto d-flex flex-column gap-3 pt-3">
                            <div>
                                <div className="d-flex flex-row align-items-center gap-2">
                                    <KeyboardDoubleArrowUpIcon/>
                                    <div>{language?.user?.top?.rankedScore ? language.user.top.rankedScore : english.user.top.rankedScore}:</div>
                                </div>
                                <div className="fs-5 ms-4"
                                     data-tooltip-id="reactTooltip"
                                     data-tooltip-content={`${language?.user?.scores?.score ? language.user.scores.score : english.user.scores.score}: ${props.data.statistics?.total_score.toLocaleString()}`}>
                                    {props.data.statistics?.ranked_score.toLocaleString()}
                                </div>
                            </div>
                            <div>
                                <div className="d-flex flex-row align-items-center gap-2">
                                    <CloseIcon/>
                                    <div>{language?.user?.top?.maxCombo ? language.user.top.maxCombo : english.user.top.maxCombo}:</div>
                                </div>
                                <div className="fs-5 ms-4">{props.data.statistics?.maximum_combo}x</div>
                            </div>
                            <div>
                                <div className="d-flex flex-row align-items-center gap-2">
                                    <AccessTimeIcon/>
                                    <div>{language?.user?.top?.playTime ? language.user.top.playTime : english.user.top.playTime}:</div>
                                </div>
                                <div className="fs-5 ms-4"
                                     style={{width: "min-content"}}
                                     data-tooltip-id="reactTooltip"
                                     data-tooltip-content={props.playtime}>
                                    {Math.round(props.data?.statistics?.play_time / 60 / 60)}h
                                </div>
                            </div>
                            <div>
                                <div className="d-flex flex-row align-items-center gap-2">
                                    <ReplayIcon/>
                                    <div>{language?.user?.top?.playCount ? language.user.top.playCount : english.user.top.playCount}:</div>
                                </div>
                                <div className="fs-5 ms-4">
                                    {props.data.statistics?.play_count?.toLocaleString()}
                                </div>
                            </div>
                            <div className="d-flex flex-row gap-2">
                                <div className="d-flex flex-row align-items-center justify-content-between">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                        <div style={{color: colors.ranks.xh}}>XH</div>
                                        <div>{props.data.statistics?.grade_counts.ssh.toLocaleString()}</div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-between">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                        <div style={{color: colors.ranks.x}}>X</div>
                                        <div>{props.data.statistics?.grade_counts.ss}</div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-between">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                        <div style={{color: colors.ranks.sh}}>SH</div>
                                        <div>{props.data.statistics?.grade_counts.sh}</div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-between">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                        <div style={{color: colors.ranks.s}}>S</div>
                                        <div>{props.data.statistics?.grade_counts.s}</div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-between">
                                    <div className="d-flex flex-column align-items-center justify-content-center">
                                        <div style={{color: colors.ranks.a}}>A</div>
                                        <div>{props.data.statistics?.grade_counts.a}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ParallaxBanner>
        </div>
    )
        ;
}
export default TopPanel;