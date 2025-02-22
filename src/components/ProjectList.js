import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ProjectList.css"; // Custom CSS file for better styling

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // Fetch projects from API
    useEffect(() => {
        axios.get("https://techechelons-backend.onrender.com/api/projects")
            .then(res => setProjects(res.data))
            .catch(err => console.error("Error fetching projects:", err));
    }, []);

    // Handle project deletion
    const deleteProject = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                await axios.delete(`https://techechelons-backend.onrender.com/api/projects/${id}`);
                setProjects(projects.filter(p => p._id !== id));
            } catch (error) {
                console.error("Error deleting project:", error);
            }
        }
    };

    // Filter projects based on search input
    const filteredProjects = projects.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="project-list-container">
            <h2 className="text-center">My Projects</h2>

            {/* Search & Add Project Section */}
            <div className="search-add-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by Project Name or Description"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn-add" onClick={() => navigate("/add")}>
                    Add Project
                </button>
            </div>

            {/* Project Table */}
            <div className="table-responsive">
                <table className="project-table">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Project Description</th>
                            <th>Skill Set</th>
                            <th>No. of Members</th>
                            <th>Is Active?</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <tr key={project._id}>
                                    <td>{project.name}</td>
                                    <td>{project.description}</td>
                                    <td>{project.skillSet.join(", ")}</td>
                                    <td>{project.noOfMembers}</td>
                                    <td className={project.isActive ? "active-status" : "inactive-status"}>
                                        {project.isActive ? "Yes" : "No"}
                                    </td>
                                    <td>{new Date(project.createdAt).toLocaleString()}</td>
                                    <td>
                                        <button className="btn-edit" onClick={() => navigate(`/edit/${project._id}`)}>
                                            Edit
                                        </button>
                                        <button className="btn-delete" onClick={() => deleteProject(project._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="no-projects">No projects found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProjectList;
