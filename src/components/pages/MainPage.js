import { Helmet } from "react-helmet";
import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";
import CharSearch from "../charSearch/CharSearch";

const MainPage = ()=>{
    const [charId,UpdateState]=useState(null);
    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>

            <div className="char__content">
                <ErrorBoundary>
                <CharList UpdateStateOfApp={UpdateState} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                         <CharInfo charId={charId} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearch/>
                    </ErrorBoundary>
                </div>
                
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;