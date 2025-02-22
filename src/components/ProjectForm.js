import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ProjectForm.css"; // Import custom styles

function ProjectForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    // State variables
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [skillSet, setSkillSet] = useState([]);
    const [noOfMembers, setNoOfMembers] = useState(1);
    const [isActive, setIsActive] = useState(true);

    // Skill options
    const skillOptions = [
        "ReactJs", "NodeJs", "MongoDB", "HTML", "CSS", "JavaScript",
        "Angular", "Python", "Django", "Express", "SQL", "PHP",
        "C#", "Java", "Spring Boot", "Flutter", "Swift", "VueJs",
        "Bootstrap", "Tailwind CSS", "GraphQL", "TypeScript"
    ];

    useEffect(() => {
        if (id) {
            axios.get(`/api/projects/${id}`)
                .then((res) => {
                    const project = res.data;
                    setName(project.name);
                    setDescription(project.description);
                    setSkillSet(project.skillSet);
                    setNoOfMembers(project.noOfMembers);
                    setIsActive(project.isActive);
                })
                .catch((err) => console.error("Error fetching project:", err));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh
    
        // Prepare project data
        const projectData = {
            name,
            description,
            skillSet,
            noOfMembers,
            isActive
        };
    
        try {
            let response;
            if (id) {
                // If editing a project
                response = await axios.put(`https://techechelons-backend.onrender.com/api/projects${id}`, projectData);
                console.log("Project Updated:", response.data);
            } else {
                // If adding a new project
                response = await axios.post("https://techechelons-backend.onrender.com/api/projects", projectData);
                console.log("Project Added:", response.data);
            }
    
            alert("Project saved successfully!");
            navigate("/"); // Redirect to home after saving
        } catch (error) {
            console.error("Error saving project:", error.response ? error.response.data : error);
            alert("Failed to save project. Check the console for details.");
        }
    };
    
    
    

    return (
        <div className="project-form-container">
            <div className="form-card">
                <h2 className="form-title">{id ? "Edit Project" : "Add Project"}</h2>
                <form onSubmit={handleSubmit}>

                    {/* Project Name */}
                    <div className="form-group">
                        <label>Project Name *</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Project Description */}
                    <div className="form-group">
                        <label>Project Description *</label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    {/* Skill Set - Multi Select with Scrollable List */}
                    <div className="form-group">
                        <label>Skill Set *</label>
                        <div className="custom-multiselect">
                            <select
                                multiple
                                className="form-select"
                                value={skillSet}
                                onChange={(e) =>
                                    setSkillSet([...e.target.selectedOptions].map(option => option.value))
                                }
                            >
                                {skillOptions.map((skill) => (
                                    <option key={skill} value={skill}>{skill}</option>
                                ))}
                            </select>
                        </div>
                        <small className="text-muted">Hold Ctrl (Cmd on Mac) to select multiple.</small>
                    </div>

                    {/* Number of Members */}
                    <div className="form-group">
                        <label>Number of Members *</label>
                        <input
                            type="number"
                            className="form-control"
                            min="1"
                            max="20"
                            value={noOfMembers}
                            onChange={(e) => setNoOfMembers(e.target.value)}
                            required
                        />
                    </div>

                    {/* Is Active - Checkbox */}
                    <div className="form-check-group">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                        <label className="form-check-label">Is Active?</label>
                    </div>

                    {/* Buttons */}
                    <div className="button-group">
                        <button type="submit" className="btn btn-success">Save Project</button>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ProjectForm;
