import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
const Demo = () => {
  // ** States
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  // ** Hooks
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articleFromLocalStorage) {
      setAllArticles(articleFromLocalStorage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle({ ...newArticle });
      setAllArticles([...allArticles, newArticle]);
      localStorage.setItem(
        "articles",
        JSON.stringify([...allArticles, newArticle])
      );
    }
  };

  const handleCopy = (url) => {
    setCopied(url);
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <section className="mt-60 w-full max-w-xl">
      <div className="flex w-full flex-col gap-2">
        <form
          className="relative flex items-center justify-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            required
            value={article.url}
            className="url_input peer"
            placeholder="Please enter an article URL"
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ↵
          </button>
        </form>

        <div className="flex max-h-60 flex-col gap-1 overflow-y-auto">
          {allArticles.map((article, i) => (
            <div
              key={`link-${i}`}
              onClick={() => setArticle(article)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                <img
                  src={copied === article.url ? tick : copy}
                  alt="copy_icon"
                  className="h-[40%] w-[40%] object-contain"
                />
              </div>
              <p className="flex-1 truncate font-satoshi text-sm font-medium text-blue-700">
                {article.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 flex max-w-full items-center justify-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="h-20 w-20 object-contain" />
        ) : error ? (
          <p className="text-center font-inter font-bold text-black">
            Well that wasn&apos;t supposed to happen... <br />{" "}
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi text-xl font-bold text-gray-600">
                Article
                <span className="blue_gradient"> Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter text-sm font-medium text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
