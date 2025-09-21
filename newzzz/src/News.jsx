import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
      <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300 animate-pulse">
        Loading news...
      </p>
    </div>
  );

  if (!articles.length) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
      <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
        No news available.
      </p>
    </div>
  );

  // Featured news (first article)
  const featured = articles[0];
  const others = articles.slice(1, 7); // next 6 articles

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-blue-900 dark:text-blue-300 mb-12 tracking-tight animate-fade-in">
          📰 Breaking News
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Featured + cards */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured News */}
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group hover:shadow-3xl transition-shadow duration-300 animate-fade-in-up">
              {featured.urlToImage && (
                <img
                  src={featured.urlToImage}
                  alt={featured.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-8 flex flex-col justify-end">
                <span className="bg-red-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-3 shadow-md">
                  {featured.source.name}
                </span>
                <h2 className="text-3xl font-bold text-white drop-shadow-lg line-clamp-2 leading-tight">
                  {featured.title}
                </h2>
                <p className="text-gray-200 mt-3 line-clamp-3 text-lg">
                  {featured.description || "No description available."}
                </p>
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  Read Full Story
                </a>
              </div>
            </div>

            {/* Other News Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {others.map((article, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {article.urlToImage && (
                    <div className="h-56 overflow-hidden">
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col justify-between h-64">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{article.source.name}</span>
                      <h3 className="font-bold text-xl text-gray-800 dark:text-gray-100 line-clamp-3 mt-2">{article.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mt-3">
                        {article.description || "No description available."}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar: Latest News */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b-2 border-blue-600 dark:border-blue-400 pb-2 animate-fade-in-right">
              Trending Now
            </h2>
            {articles.slice(7, 15).map((article, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 animate-fade-in-right"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 text-lg">{article.title}</h3>
                <div className="mt-2 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{new Date(article.publishedAt).toLocaleTimeString()}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">{article.source.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
