import React from "react";
import FlagEmoji from "../FlagEmoji";
import {ColorSettingsType, colorsSettings} from "../../../store/store";
import GroupIcon from '@mui/icons-material/Group';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import PlaceIcon from '@mui/icons-material/Place';
import InterestsIcon from '@mui/icons-material/Interests';
import WorkIcon from '@mui/icons-material/Work';
import {ActiveLanguageType, languageStore} from "../../../store/languages";

interface propsInterface {
    data: any;
}

const BarPanel = (props: propsInterface) => {
    const language = languageStore((state: ActiveLanguageType) => state.text);

    const colors = colorsSettings((state: ColorSettingsType) => state.colors);
    return (
        <>
            <div className="d-flex flex-row flex-wrap gap-3 align-items-center py-3 px-4" style={{
                marginBottom: -68,
                zIndex: 10,
                backgroundColor: colors.ui.bg,
            }}>
                <div className="d-flex flex-row align-items-center gap-2">
                    <GroupIcon/>
                    <div>{language.user.bar.followers}: {props.data.follower_count}</div>
                </div>
                <div className="d-flex flex-row align-items-center gap-2">
                    <svg style={{width: 20}} xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                         fill="currentColor"
                         className="bi bi-discord" viewBox="0 0 16 16">
                        <path
                            d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                    </svg>
                    <div>{props.data.discord}</div>
                </div>
                <div className="d-flex flex-row align-items-center gap-2">
                    <TwitterIcon/>
                    <div>{props.data.twitter}</div>
                </div>
                <div className="d-flex flex-row align-items-center gap-2">
                    <LanguageIcon/>
                    <div>{props.data.website}</div>
                </div>
                <div className="d-flex flex-row align-items-center gap-2">
                    <PlaceIcon/>
                    <div>{props.data.location}</div>
                </div>
                <div className="d-flex flex-row align-items-center gap-2">
                    <InterestsIcon/>
                    <div>{props.data.interests}</div>
                </div>
                <div className="d-flex flex-row align-items-center gap-2">
                    <WorkIcon/>
                    <div>{props.data.occupation}</div>
                </div>
            </div>
            <div className="m-0 p-0 col-12 shadow py-3 px-4 d-flex flex-row flex-wrap gap-3 align-items-center"
                 style={{
                     position: "sticky",
                     top: -1,
                     backgroundColor: colors.ui.bg,
                     zIndex: 4
                 }}>
                <div className="d-flex flex-row flex-wrap gap-3 align-items-center">
                    <div className="ratio ratio-1x1 rounded-3"
                         style={{
                             backgroundImage: `url(${props.data.avatar_url})`,
                             backgroundPosition: "center",
                             backgroundSize: "cover",
                             height: 36,
                             width: 36
                         }}>
                    </div>
                    <a className={"fs-5 text-decoration-none"} style={{color: colors.ui.font}}
                       href={`https://osu.ppy.sh/users/${props.data.id}`} target="_blank">{props.data.username}</a>
                    <div>{props.data.statistics?.global_rank ?
                        <>
                            <div className="d-flex flex-row align-items-center">
                                <i className="bi bi-globe2 me-2"></i>#{props.data.statistics?.global_rank?.toLocaleString()}
                            </div>
                        </>
                        : ''}</div>
                    <div>{props.data.statistics?.country_rank ?
                        <>
                            <div className="d-flex flex-row align-items-center">
                                <div className="d-flex flex-row align-items-center">
                                    #{props.data.statistics.rank.country?.toLocaleString()}
                                </div>
                                <div className="ms-2 h-100 d-flex align-items-center"
                                     data-tooltip-id="reactTooltip"
                                     data-tooltip-content={props.data.country.name}>
                                    <FlagEmoji size={20} code={props.data.country.code}/>
                                </div>
                            </div>
                        </>
                        : ''}
                    </div>
                    <div>
                        {Math.round(props.data.statistics?.pp)?.toLocaleString()}pp
                    </div>
                    <div>
                        {props.data.statistics?.hit_accuracy.toFixed(2)}%
                    </div>
                    <div>
                        {Math.round(props.data.statistics?.play_time / 60 / 60)}h
                    </div>
                    <div>
                        <i className="bi bi-discord me-2"></i>{props.data.discord}
                    </div>
                    <div>
                        <i className="bi bi-twitter me-2"></i>{props.data.twitter}
                    </div>
                </div>
            </div>
        </>
    );
}
export default BarPanel;