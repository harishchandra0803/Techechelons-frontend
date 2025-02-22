import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProjectList />} />
                <Route path="/add" element={<ProjectForm />} />
                <Route path="/edit/:id" element={<ProjectForm />} />
            </Routes>
        </Router>
    );
}

export default App;
