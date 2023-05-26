import "./App.css"
import ReposList from "../components/RepoList/ReposList"
import { Route, Routes } from "react-router-dom"

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<ReposList />} />
                <Route path={"/repoInfo"} element={<div></div>} />
            </Routes>
        </div>
    )
}

export default App
