import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import AddBookmark from "./components/AddBookmark";
import BookmarkList from "./components/BookmarkList";
import {
  fetchAllBookmarks,
  fetchBookmarkById,
  fetchBookmarksByTitle,
  createBookmark,
  deleteBookmark,
  updateBookmark,
} from "./api/api";

const App = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [showAddScreen, setShowAddScreen] = useState(false);

  const loadAllBookmarks = async () => {
    const data = await fetchAllBookmarks();
    setBookmarks(data);
  };

  const handleSearch = async (query, type) => {
    if (type === "id") {
      const data = await fetchBookmarkById(query);
      setBookmarks([data]);
    } else if (type === "title") {
      const data = await fetchBookmarksByTitle(query);
      setBookmarks(data);
    }
  };

  const handleAdd = async (bookmark) => {
    await createBookmark(bookmark);
    loadAllBookmarks();
  };

  const handleDelete = async (id) => {
    await deleteBookmark(id);
    loadAllBookmarks();
  };

  const handleUpdate = async (id, link) => {
    await updateBookmark(id, link);
    loadAllBookmarks();
  };

  useEffect(() => {
    loadAllBookmarks();
  }, []);

  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        onRetrieveAll={loadAllBookmarks}
        onAddClick={() => setShowAddScreen(true)}
      />
      {showAddScreen && (
        <AddBookmark
          onClose={() => setShowAddScreen(false)}
          onAdd={handleAdd}
        />
      )}
      <BookmarkList
        bookmarks={bookmarks}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default App;
