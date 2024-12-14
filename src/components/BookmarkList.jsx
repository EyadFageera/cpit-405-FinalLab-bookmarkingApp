import React, { useState } from "react";
import "./BookmarkList.css";

const BookmarkList = ({ bookmarks, onDelete, onUpdate }) => {
    const [editId, setEditId] = useState(null);
    const [newLink, setNewLink] = useState("");

    const handleUpdate = (id) => {
        onUpdate(id, newLink);
        setEditId(null);
        setNewLink("");
    };

    return (
        <div className="bookmark-list">
            {bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="bookmark-card">
                    <h3>{bookmark.title}</h3>
                    <p>{bookmark.link}</p>
                    <div className="bookmark-actions">
                        <button onClick={() => onDelete(bookmark.id)}>Delete</button>
                        <button
                            onClick={() =>
                                navigator.clipboard.writeText(`${bookmark.title} - ${bookmark.link}`)
                            }
                        >
                            Share
                        </button>
                        {editId === bookmark.id ? (
                            <div className="edit-section">
                                <input
                                    type="text"
                                    value={newLink}
                                    onChange={(e) => setNewLink(e.target.value)}
                                    className="edit-input"
                                />
                                <button onClick={() => handleUpdate(bookmark.id)}>Save</button>
                            </div>
                        ) : (
                            <button onClick={() => setEditId(bookmark.id)}>Update</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BookmarkList;
