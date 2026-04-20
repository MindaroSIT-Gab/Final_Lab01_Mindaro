import React, { useState } from 'react';

const Feedback: React.FC = () => {
    const [formData, setFormData] = useState({
        studentName: "",
        course: "",
        rating: 0,
        comments: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.studentName || !formData.course || formData.rating === 0) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/Feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Feedback submitted!");
                // Reset form
                setFormData({ studentName: "", course: "", rating: 0, comments: "" });
            } else {
                alert("Failed to submit feedback.");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
            <h2>Course Feedback</h2>

            <label>Student Name:</label>
            <input 
                type="text" 
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })} 
                required 
            />

            <label>Course:</label>
            <select 
                value={formData.course} 
                onChange={(e) => setFormData({ ...formData, course: e.target.value })} 
                required
            >
                <option value="">Select a course</option>
                <option value="ITLETERA">ITLETERA</option>
                <option value="APTECH1">APTECH1</option>
            </select>

            <label>Rating (1-5)</label>
            <div style={{ display: 'flex', gap: '10px' }}>
                {[1, 2, 3, 4, 5].map((num) => (
                    <label key={num}>
                        <input 
                            type="radio" 
                            name="rating" 
                            checked={formData.rating === num}
                            onChange={() => setFormData({ ...formData, rating: num })} 
                        /> {num}
                    </label>
                ))}
            </div>

            <label>Comments</label>
            <textarea 
                value={formData.comments} 
                onChange={(e) => setFormData({ ...formData, comments: e.target.value })} 
            />

            <button type="submit">Submit Feedback</button>
        </form>
    );
};

export default Feedback;
