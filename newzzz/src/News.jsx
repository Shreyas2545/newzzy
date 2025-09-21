import React, { useEffect, useState } from "react";
import axios from "axios";

const categories = ["Technology", "Sports", "Business", "Entertainment", "Health"];

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("technology");
  const [category, setCategory] = useState("");

  const fetchNews = async (searchTerm) => {
    setLoading(true);
    try {
      const q = searchTerm || category || "technology";
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${q}&language=en&sortBy=publishedAt&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
      );
      setArticles(response.data.articles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(keyword);
  };

  const handleCategory = (cat) => {
    setCategory(cat);
    fetchNews(cat);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-blue-600 mb-10 drop-shadow-md">
        📰 Latest News
      </h1>

      {/* Search */}
      <form className="flex justify-center mb-6" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search news..."
          className="px-4 py-2 w-2/3 md:w-1/2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-r-full hover:bg-blue-700 font-semibold shadow-md transition-all"
        >
          Search
        </button>
      </form>

      {/* Categories */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-5 py-2 rounded-full border font-medium text-sm md:text-base ${
              category === cat
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-500 hover:text-white transition-colors shadow-sm"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Cards */}
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading news...</p>
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No news available.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              {article.urlToImage && (
                <div className="relative h-56">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    {article.source.name}
                  </span>
                </div>
              )}

              {/* Content Box */}
              <div className="p-5 flex flex-col justify-between h-64">
                <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-3 hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                  {article.description || "No description available."}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl font-semibold shadow-md transition-all"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
