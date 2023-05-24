import './App.css'
import RepoList from "../components/RepoList/RepoList";
import {Route, Routes} from "react-router-dom";

function App() {


    return (
        <div className="App" >
            <Routes>
                <Route  path={'/'} element={<RepoList/>}/>
                <Route path={"/repoInfo"} element={<div></div>}/>
            </Routes>
        </div>
    )
}

export default App
