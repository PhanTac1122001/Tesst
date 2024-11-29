import React, { useEffect, useState } from "react";

export default function CategoryManager() {
  const [categories, setCategories] = useState(() => {
    const categoriesLocal =
      JSON.parse(localStorage.getItem("categories")) || [];
    return categoriesLocal;
  });
  const [books, setBooks] = useState(() => {
    const booksLocal = JSON.parse(localStorage.getItem("books")) || [];
    return booksLocal;
  });
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);
  const [nameCate, setNameCate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nameCate.trim()) {
      alert("Tên danh mục không được để trống!");
      return;
    }
    const newCategories = {
      id: Date.now(),
      nameCate,
    };
    const addCategory = [...categories, newCategories];
    setCategories(addCategory);
    localStorage.setItem("categories", JSON.stringify(addCategory));
    setNameCate(" ");
  };

  const handleDelete = (id) => {
    const categoryToDelete = categories.find((cate) => cate.id === id);
    const booksUsingCategory = books.filter(
      (book) => book.category === categoryToDelete.nameCate
    );

    if (booksUsingCategory.length > 0) {
      alert("Không thể xóa danh mục vì vẫn còn sách thuộc danh mục này!");
      return;
    }

    // Xóa danh mục nếu không có sách
    const updatedCategories = categories.filter((cate) => cate.id !== id);
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };
  return (
    <>
      <div id="categoriesSection">
        <h2 className="text-2xl font-bold mb-4">Danh Mục Sách</h2>
        <div className="mb-4">
          <input
            id="categoryTitle"
            type="text"
            placeholder="Tên danh mục"
            value={nameCate}
            onChange={(e) => {
              setNameCate(e.target.value);
            }}
            className="border border-gray-300 p-2 rounded w-1/2"
          />
          <button
            id="addCategory"
            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
            onClick={handleSubmit}
          >
            Thêm Danh Mục
          </button>
        </div>
        <table className="table-auto w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Tên Danh Mục</th>
              <th className="border border-gray-300 px-4 py-2">Hành Động</th>
            </tr>
          </thead>
          <tbody id="categoriesTable">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {category.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {category.nameCate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(category.id)}
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
