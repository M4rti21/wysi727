import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';

interface InputProps {
    mode: string,
}

const SearchInput = (props: InputProps) => {
    const navigate = useNavigate();
    const [data, setData] = useState('');
    const handleChange = (e: any) => {
        e.preventDefault();
        setData(e.target.value);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("this works")
        navigate(`/users/${data}/${props.mode}`);
        setData('');
    }
    return (
        <form className="flex-grow-1 d-flex flex-row gap-2 align-items-center justify-content-between p-0 m-0"
              onSubmit={handleSubmit}>
            <input type="text"
                   className="text-light flex-grow-1 me-auto"
                   style={{
                       outline: 0,
                       borderWidth: "0 0 1px",
                       backgroundColor: "#00000000",
                       borderColor: "#ffffff",
                   }}
                   placeholder="Your Username" value={data}
                   onChange={handleChange}/>
            <button className="btn btn-dark ms-auto"><i className="bi bi-search"></i></button>
        </form>
    );
}
export default SearchInput;