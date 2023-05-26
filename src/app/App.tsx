import "./App.css"
import ReposList from "../components/RepoList/ReposList"
import { Route, Routes } from "react-router-dom"
import { RepoCard } from "../components/RepoCard/RepoCard"

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<ReposList />} />
                <Route path={"/repoInfo"} element={<RepoCard />} />
            </Routes>
        </div>
    )
}

export default App
