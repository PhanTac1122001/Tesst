import React, { useState } from "react";
import CategoryManager from "./CategoryManager";
import BookManager from "./BookManager";

export default function Header() {
  const [activeTab, setActiveTab] = useState("categories");

  const handleCategory = () => {
    setActiveTab("categories");
  };

  const handleBooks = () => {
    setActiveTab("books");
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <header className="text-center py-6">
          <h1 className="text-4xl font-bold">Quản Lý Thư Viện</h1>
        </header>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            id="tabCategories"
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              activeTab === "categories" ? "bg-blue-700" : ""
            }`}
            onClick={handleCategory}
          >
            Quản Lý Danh Mục
          </button>
          <button
            id="tabBooks"
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              activeTab === "books" ? "bg-blue-700" : ""
            }`}
            onClick={handleBooks}
          >
            Quản Lý Sách
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "categories" ? (
            <CategoryManager />
          ) : activeTab === "books" ? (
            <div>
              <BookManager />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
