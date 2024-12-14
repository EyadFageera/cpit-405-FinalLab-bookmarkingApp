const API_URL = "../../api";

export const fetchAllBookmarks = async () => {
    const response = await fetch(`${API_URL}/readAll.php`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch bookmarks");
    }
    return await response.json();
};

export const fetchBookmarkById = async (id) => {
    const response = await fetch(`${API_URL}/readOne.php?id=${id}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch bookmark by ID");
    }
    return await response.json();
};

export const fetchBookmarksByTitle = async (title) => {
    const response = await fetch(`${API_URL}/readTitle.php?title=${title}`, {
        method: "GET",
    });
    if (!response.ok) {
        throw new Error("Failed to fetch bookmarks by title");
    }
    return await response.json();
};

export const createBookmark = async (bookmark) => {
    const response = await fetch(`${API_URL}/create.php`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookmark), 
    });
    if (!response.ok) {
        throw new Error("Failed to create bookmark");
    }
    return await response.json();
};

export const deleteBookmark = async (id) => {
    const response = await fetch(`${API_URL}/delete.php`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify({ id }),
    });
    if (!response.ok) {
        throw new Error("Failed to delete bookmark");
    }
    return await response.json();
};

export const updateBookmark = async (id, title) => {
    const response = await fetch(`${API_URL}/update.php`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, title }),
    });
    if (!response.ok) {
        throw new Error("Failed to update bookmark");
    }
    return await response.json();
};
