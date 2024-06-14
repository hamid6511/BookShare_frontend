export const fetchBooks = async () => {
    try {
        const response = await fetch("http://localhost:5199/api/Book/Get-All-Books");
        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};

export const fetchBookDetail = async (id) => {
    try {
        const response = await fetch(`http://localhost:5199/api/Book/Get-book-byId/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching book details:', error);
        throw error;
    }
};

export const addBook = async (bookDTO) => {
    try {
        const response = await fetch("http://localhost:5199/api/Book/Add-book", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookDTO)
        });
        if (!response.ok) {
            throw new Error("Failed to add book");
        }
        return "Book added successfully";
    } catch (error) {
        console.error("Error adding book:", error);
        throw error;
    }
};

export const updateBook = async (bookId, bookDTO) => {
    try {
        const response = await fetch(`http://localhost:5199/api/Book/Update-book/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookDTO)
        });
        if (!response.ok) {
            throw new Error("Failed to update book");
        }
        return "Book updated successfully";
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
};

export const deleteBook = async (bookId) => {
    try {
        const response = await fetch(`http://localhost:5199/api/Book/Delete-book/${bookId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error("Failed to delete book");
        }
        return "Book deleted successfully";
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
};

export const loanBookToUser = async (userId, bookId) => {
    try {
        const response = await fetch(`http://localhost:5199/api/Book/takeLoanBook/${userId}?BookId=${bookId}`, {
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error("Failed to loan book to user");
        }
        return "Book loaned to user successfully";
    } catch (error) {
        console.error("Error loaning book to user:", error);
        throw error;
    }
};

// Aggiungi altri metodi di fetch qui...
