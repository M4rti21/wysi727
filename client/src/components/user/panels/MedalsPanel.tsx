import React from "react";
import Medal from "../Medal";
import {ColorSettingsType, colorsSettings, modeSettings, ModeSettingsType} from "../../../store/store";

interface propsInterface {
    medals: any;
    userMedals: any[];
    userId: number;
}

const MedalsPanel = (props: propsInterface) => {
    const colors = colorsSettings((state: ColorSettingsType) => state.colors);
    const mode = modeSettings((state: ModeSettingsType) => state.mode);
    let combinedLength = 0;
    for (const category in props.medals) {
        const categoryArray = props.medals[category];
        combinedLength += categoryArray?.length;
    }
    const achievedMedalsCount: { [category: string]: number } = {};
    Object.entries(props.medals)?.forEach(([category, medals]) => {
        achievedMedalsCount[category] = 0;
        props.userMedals?.forEach((achievedMedal) => {
            if ((medals as any[])?.find((medal) => parseInt(medal.MedalID) === achievedMedal.achievement_id)) {
                achievedMedalsCount[category]++;
            }
        });
    });
    return (
        <div className="col-12 row m-0 p-3">
            <div className={"d-flex flex-row align-items-center"}>
                <div className={"d-flex flex-row align-items-center"}>
                    <a href={`https://osekai.net/profiles/?user=${props.userId}&mode=${mode}`}
                       target={"_blank"}
                       data-tooltip-id="reactTooltip"
                       data-tooltip-content={`See profile on osekai!`}>
                        <div className={"me-2"}>
                            <svg width="24" height="24" viewBox="0 0 102 110" xmlns="http://www.w3.org/2000/svg" fill={colors.ui.font}>
                                <path
                                    d="M51 11.6908C54.067 11.6908 57.0464 12.4879 59.6753 13.9936L81.8454 26.9243C87.1907 30.0242 90.5206 35.781 90.5206 42.0692V67.9308C90.5206 74.1304 87.1907 79.9758 81.8454 83.0757L59.5876 96.0064C56.9588 97.5121 53.9794 98.3092 50.9124 98.3092C47.8454 98.3092 44.866 97.5121 42.2371 96.0064L20.1546 83.0757C14.8093 79.9758 11.4794 74.219 11.4794 67.9308V42.0692C11.4794 35.8696 14.8093 30.0242 20.1546 26.9243L42.3247 13.9936C44.9536 12.4879 47.933 11.6908 51 11.6908ZM51 0C46.0052 0 41.0103 1.3285 36.6289 3.89694L14.3711 16.8277C5.52062 22.0531 0 31.6184 0 42.0692V67.9308C0 78.2931 5.52062 87.9469 14.3711 93.1723L36.5412 106.103C41.0103 108.672 46.0052 110 50.9124 110C55.8196 110 60.9021 108.672 65.2835 106.103L87.4536 93.1723C96.3918 87.9469 101.825 78.3816 101.825 67.9308V42.0692C101.825 31.7069 96.3041 22.0531 87.4536 16.8277L65.3711 3.89694C60.9021 1.3285 55.9948 0 51 0Z"/>
                                <path opacity="0.9"
                                      d="M51.0876 31.4412C51.5257 31.4412 51.9638 31.5298 52.3144 31.7955L70.1906 42.2464C70.9793 42.6892 71.4174 43.5749 71.4174 44.4606V65.3623C71.4174 66.248 70.8917 67.1337 70.1906 67.5765L52.402 78.0274C52.0515 78.2931 51.6133 78.3817 51.1752 78.3817C50.737 78.3817 50.2989 78.2931 49.9484 78.0274L31.8968 67.5765C31.1082 67.1337 30.67 66.248 30.67 65.3623V44.4606C30.67 43.5749 31.1958 42.6892 31.8968 42.2464L49.7731 31.7955C50.2113 31.5298 50.6494 31.4412 51.0876 31.4412ZM51.0876 23.2931C49.2473 23.2931 47.4071 23.7359 45.8298 24.7102L27.9535 35.2496C24.7113 37.1981 22.6958 40.6522 22.6958 44.5491V65.4509C22.6958 69.2593 24.7113 72.802 27.9535 74.7504L45.8298 85.2013C47.4948 86.1755 49.335 86.6184 51.0876 86.6184C52.8401 86.6184 54.768 86.1755 56.3453 85.2013L74.2216 74.7504C77.4638 72.802 79.4793 69.3478 79.4793 65.4509V44.4606C79.4793 40.6522 77.4638 37.1095 74.2216 35.161L56.4329 24.7987C54.768 23.8245 52.9278 23.2931 51.0876 23.2931Z"/>
                                <path opacity="0.8"
                                      d="M50.9123 45.7891C51.0876 45.7891 51.2628 45.8776 51.4381 45.8776L58.4484 49.9517C58.7989 50.1288 58.9742 50.4831 58.9742 50.8374V58.9855C58.9742 59.3398 58.7989 59.694 58.4484 59.8712L51.4381 63.9453C51.2628 64.0338 51.0876 64.0338 50.9123 64.0338C50.737 64.0338 50.5618 63.9453 50.3865 63.9453L43.3762 59.8712C43.0257 59.694 42.8504 59.3398 42.8504 58.9855V50.8374C42.8504 50.4831 43.0257 50.1288 43.3762 49.9517L50.3865 45.8776C50.6494 45.8776 50.737 45.7891 50.9123 45.7891ZM50.9123 42.6006C50.2113 42.6006 49.5102 42.7778 48.8092 43.1321L41.7989 47.2061C40.4845 47.9147 39.6958 49.3317 39.6958 50.8374V58.9855C39.6958 60.4911 40.4845 61.8197 41.7989 62.6168L48.8092 66.6908C49.4226 67.0451 50.1236 67.2222 50.9123 67.2222C51.701 67.2222 52.3144 67.0451 53.0154 66.6908L60.0257 62.6168C61.3401 61.9082 62.1288 60.4911 62.1288 58.9855V50.8374C62.1288 49.3317 61.3401 48.0032 60.0257 47.2061L53.0154 43.1321C52.402 42.7778 51.701 42.6006 50.9123 42.6006Z"/>
                            </svg>
                        </div>
                    </a>
                    <div>
                        Medals:
                    </div>
                </div>
                <div className={"ms-auto"}>
                    ({props.userMedals?.length}/{combinedLength})
                    - {(props.userMedals?.length / combinedLength * 100).toFixed(0)}%
                </div>
            </div>
            {Object.entries(props.medals).map(([category, medals]) => (
                <div key={category} className={"p-3 mt-2"}>
                    <div className={"mb-2 d-flex flex-row justify-content-between"}>
                        <div>{category}:</div>
                        <div>({achievedMedalsCount[category]}/{(medals as any[])?.length})
                            - {(achievedMedalsCount[category] / (medals as any[])?.length * 100).toFixed(0)}%
                        </div>
                    </div>
                    <div className={"d-flex flex-row flex-wrap gap-1 justify-content-center"}>
                        {(medals as any[]).map((medal: any, index: number) => (
                            <Medal thisMedal={medal} userMedals={props.userMedals} key={index}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
export default MedalsPanel;