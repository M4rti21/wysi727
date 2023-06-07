import React from "react";
import {MedalInterface} from "../../interfaces/MedalsInterface";
import {UserAchievementsEntity} from "../../interfaces/UserCardInterface";

interface MedalProps {
    thisMedal: MedalInterface,
    userMedals: UserAchievementsEntity[]
}

const Medal = (props: MedalProps) => {
    const achievedDate = props.userMedals.find((medal:UserAchievementsEntity) => medal.achievement_id === parseInt(props.thisMedal.MedalID))?.achieved_at?props.userMedals.find((medal:UserAchievementsEntity) => medal.achievement_id === parseInt(props.thisMedal.MedalID))?.achieved_at:0;
    return (
        <>
            <a href={`https://osekai.net/medals/?medal=${props.thisMedal.Name}`}
               target={'_blank'}
               className={"medal"}
               data-tooltip-id="reactTooltip"
               data-tooltip-html={
                `<div class="text-center fs-6">${props.thisMedal.Name}</div>
                <div class="text-center" style="color: #f5f5f5cc">${props.thisMedal.Description}</div>
                <div class="text-center" style="color: #f5f5f5cc; font-size: 12px">${
                    props.userMedals.find((medal:UserAchievementsEntity) => medal.achievement_id === parseInt(props.thisMedal.MedalID))?.achieved_at?
                        `Achieved at: ${new Date(achievedDate?achievedDate:'').toLocaleString()}`:''}
                </div>`
            }>
                {props.userMedals.some((medal: UserAchievementsEntity) => medal.achievement_id === parseInt(props.thisMedal.MedalID)) ?
                    <img src={props.thisMedal.Link} alt="medal" height={48}/> :
                    <img src={props.thisMedal.Link} alt="medal" height={48}
                         style={{filter: "grayscale(50%) brightness(50%)"}}/>}
            </a>
        </>

    );
}
export default Medal;