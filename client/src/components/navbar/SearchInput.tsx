import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import {modeSettings, ModeSettingsType} from "../../store/store";
import {IconButton, InputBase, Paper, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ModeButton from "./ModeButton";

const SearchInput = () => {
    const mode = modeSettings((state: ModeSettingsType) => state.mode);
    const navigate = useNavigate();
    const [data, setData] = useState('');
    const handleChange = (e: any) => {
        e.preventDefault();
        setData(e.target.value);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(data)
        if (data !== '') {
            navigate(`/users/${data}/${mode}`);
        }
        setData('');
    }
    return (
        <form onSubmit={handleSubmit}
              className={"d-flex flex-row"}>
            <InputBase
                sx={{ml: 1, flex: 1}}
                placeholder="Username"
                onChange={handleChange} value={data}
            />
            <IconButton type="submit" disabled={data === ''}>
                <SearchIcon/>
            </IconButton>
        </form>
    );
}
export default SearchInput;