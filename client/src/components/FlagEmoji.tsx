import React from "react";

interface propsInterface {
    size: number;
    code: string;
}

const FlagEmoji = (props: propsInterface) => {
    function countryCodeToEmoji(countryCode: string): string {
        const countryCodeChars = countryCode
            .toUpperCase()
            .split('')
            .map((char) => {
                const code = char.charCodeAt(0);
                return (code + 127397).toString(16);
            });
        return countryCodeChars.join('-');
    }
    const emojiUnicode = countryCodeToEmoji(props.code);
    return (
        <img height={props.size} src={require(`../assets/flags/${emojiUnicode}.svg`)} alt="flag" className=""/>
    );
}
export default FlagEmoji;