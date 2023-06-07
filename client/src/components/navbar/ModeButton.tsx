import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

interface ChildButtonProps {
    mode: string;
    username: string;
    onModeChange: (newVolume: string) => void;
}

const VolumeSlider: React.FC<ChildButtonProps> = ({mode, onModeChange, username}) => {
    const navigate = useNavigate();
    const handleChange = (modeName: string) => {
        onModeChange(modeName);
        setShowModes(!showModes);
        if (username !== '') {
            navigate(`/users/${username}/${modeName}`)
        }
    };
    const [showModes, setShowModes] = useState<boolean>(false);
    return (
        <div className="d-flex flex-row align-items-center m-0 p-0 btn-group">
            <button className="btn btn-dark d-flex justify-content-center align-items-center" onClick={() => {
                setShowModes(!showModes);
            }}>
                <img className="mode-icon" src={require(`../../assets/mode-icons/${mode}.svg`)} alt="ico"/>
            </button>
            {showModes ?
                <>
                    <button className="btn btn-dark d-flex justify-content-center align-items-center"
                            disabled={mode === 'osu'}
                            onClick={() => handleChange('osu')}>
                        <img className="mode-icon" src={require(`../../assets/mode-icons/osu.svg`).default} alt="ico"/>
                    </button>
                    <button className="btn btn-dark d-flex justify-content-center align-items-center"
                            disabled={mode === 'taiko'}
                            onClick={() => handleChange('taiko')}>
                        <img className="mode-icon" src={require(`../../assets/mode-icons/taiko.svg`).default} alt="ico"/>
                    </button>
                    <button className="btn btn-dark d-flex justify-content-center align-items-center"
                            disabled={mode === 'fruits'}
                            onClick={() => handleChange('fruits')}>
                        <img className="mode-icon" src={require(`../../assets/mode-icons/fruits.svg`).default} alt="ico"/>
                    </button>
                    <button className="btn btn-dark d-flex justify-content-center align-items-center"
                            disabled={mode === 'mania'}
                            onClick={() => handleChange('mania')}>
                        <img className="mode-icon" src={require(`../../assets/mode-icons/mania.svg`).default} alt="ico"/>
                    </button>
                </>
                : ''}
        </div>
    );
};

export default VolumeSlider;
