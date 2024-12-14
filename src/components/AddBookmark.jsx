import React, { useState } from "react";
import "./AddBookmark.css";

const AddBookmark = ({ onClose, onAdd }) => {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    const handleSubmit = () => {
        onAdd({ title, link });
        setTitle("");
        setLink("");
        onClose();
    };

    return (
        <div className="overlay">
            <div className="add-bookmark-modal">
                <h2>Add Bookmark</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="modal-input"
                />
                <input
                    type="text"
                    placeholder="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="modal-input"
                />
                <div className="modal-actions">
                    <button onClick={handleSubmit} className="modal-button">Add</button>
                    <button onClick={onClose} className="modal-button">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddBookmark;
