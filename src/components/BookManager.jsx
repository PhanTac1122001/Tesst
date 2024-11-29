import Search from "antd/es/input/Search";
import React, { useState } from "react";

export default function BookManager() {
  const [books, setBooks] = useState(() => {
    const booksLocal = JSON.parse(localStorage.getItem("books")) || [];
    return booksLocal;
  });
  const [categories, setCategories] = useState(() => {
    const categoriesLocal =
      JSON.parse(localStorage.getItem("categories")) || [];
    return categoriesLocal;
  });
  const [nameBook, setNameBook] = useState("");
  const [nameAuthor, setNameAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [editingBookId, setEditingBookId] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(""); 
  const [filterCategory, setFilterCategory] = useState("");

  // 
  const handleAddBook = () => {
    if (!nameBook || !nameAuthor || !price || !category || !image) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (isNaN(price) || price <= 0) {
      setError("Vui lòng nhập giá hợp lệ!");
      return;
    }
    setError("");

    if (editingBookId) {
      const updatedBooks = books.map((book) =>
        book.id === editingBookId
          ? { ...book, nameBook, nameAuthor, price, category, image }
          : book
      );
      setBooks(updatedBooks);
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      setEditingBookId(null); 
    } else {
      
      const newBook = {
        id: Date.now(),
        nameBook,
        nameAuthor,
        price,
        category,
        image,
      };

      const updatedBooks = [...books, newBook];
      setBooks(updatedBooks);
      localStorage.setItem("books", JSON.stringify(updatedBooks));
    }

    setNameBook("");
    setNameAuthor("");
    setPrice("");
    setCategory("");
    setImage("");
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setImage(files[0]);
    } else {
      if (name === "nameBook") setNameBook(value);
      if (name === "nameAuthor") setNameAuthor(value);
      if (name === "price") setPrice(value);
      if (name === "category") setCategory(value);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUpdateBook = (bookToUpdate) => {
    
    setNameBook(bookToUpdate.nameBook);
    setNameAuthor(bookToUpdate.nameAuthor);
    setPrice(bookToUpdate.price);
    setCategory(bookToUpdate.category);
    setImage(bookToUpdate.image);
    setEditingBookId(bookToUpdate.id); 
  };

  const handleDeleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.nameBook
      .toLowerCase()
      .includes(searchKeyword.toLowerCase());
    const matchesCategory = !filterCategory || book.category === filterCategory;
    return matchesSearch && matchesCategory;
  });
  return (
    <>
      <div id="booksSection">
        <h2 className="text-2xl font-bold mb-4">Quản Lý Sách</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            id="bookTitle"
            type="text"
            placeholder="Tên sách"
            value={nameBook}
            name="nameBook"
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            id="authorName"
            type="text"
            placeholder="Tên tác giả"
            value={nameAuthor}
            name="nameAuthor"
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          />
          <input
            id="bookPrice"
            type="number"
            placeholder="Giá sách"
            value={price}
            name="price"
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          />
          <select
            id="categorySelector"
            value={category}
            name="category"
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="">Chọn danh mục</option>
            {categories.map((cate) => (
              <option key={cate.id} value={cate.nameCate}>
                {cate.nameCate}
              </option>
            ))}
          </select>
          <input
            id="bookIcon"
            type="file"
            name="image"
            onChange={handleImageChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          id="addBook"
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
          onClick={handleAddBook}
        >
          {editingBookId ? "Lưu Cập Nhật" : "Thêm Sách"}
        </button>

        <div className="mb-4 ml-[1000px]">
          <Search
            placeholder="Tìm sách theo tên"
            allowClear
            onChange={(e) => setSearchKeyword(e.target.value)}
            
            className="mb-2 mt-1"
            style={{ width: 300 }}
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg ml-11"
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((cate) => (
              <option key={cate.id} value={cate.nameCate}>
                {cate.nameCate}
              </option>
            ))}
          </select>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Tên Sách</th>
              <th className="border border-gray-300 px-4 py-2">Tác Giả</th>
              <th className="border border-gray-300 px-4 py-2">Danh Mục</th>
              <th className="border border-gray-300 px-4 py-2">Giá</th>
              <th className="border border-gray-300 px-4 py-2">Hình Ảnh</th>
              <th className="border border-gray-300 px-4 py-2">Hành Động</th>
            </tr>
          </thead>
          <tbody id="booksTable" className="text-center">
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td className="border border-gray-300 px-4 py-2">{book.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {book.nameBook}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {book.nameAuthor}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {book.category}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {book.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={book.image}
                    alt={book.nameBook}
                    className="h-16 w-16"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => handleUpdateBook(book)}
                  >
                    Sửa
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
