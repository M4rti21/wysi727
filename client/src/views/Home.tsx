import {ActiveLanguageType, languageStore} from "../store/store";

const Home = () => {
    const language = languageStore((state: ActiveLanguageType) => state.text);
    const english = languageStore((state: ActiveLanguageType) => state.english);

    return (
        <div style={{backdropFilter: "blur(4px)", height: "100%", width: "100vw"}}>
            <h1 className={"text-light text-center mt-3"}>{language?.home?.welcome ? language.home.welcome : english.home.welcome}</h1>
            <h3 className={"text-light text-center"}>{language?.home?.search ? language.home.search : english.home.search}</h3>
        </div>
    );
}
export default Home;