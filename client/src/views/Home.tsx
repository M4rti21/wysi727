import {ActiveLanguageType, languageStore} from "../store/languages";

const Home = () => {
    const language = languageStore((state: ActiveLanguageType) => state.text);

    return (
        <div style={{backdropFilter: "blur(4px)", height: "100%", width: "100vw"}}>
            <h1 className={"text-light text-center mt-3"}>{language.home.welcome}</h1>
            <h3 className={"text-light text-center"}>{language.home.search}</h3>
        </div>
    );
}
export default Home;