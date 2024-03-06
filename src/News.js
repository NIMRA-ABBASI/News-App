import Newitem from "./Newsitem.js";
import { useEffect, useState } from "react";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types"

function News(props) {
  const [News, setNews] = useState([]);
  const [Page, setPage] = useState(1);
  const [Load, setLoad] = useState(false);
  const number = Math.ceil(38 / props.pageSize);

  useEffect(() => {
      async function fetchData() {
        let url = `https://newsapi.org/v2/top-headlines?&category=${props.category}&country=${props.country}&apiKey=fb99f8b050954071aa56ac25560b6a41&page=${Page}&pageSize=${props.pageSize}`;
        setLoad(true);
        let response = await fetch(url);
        let data = await response.json();
        setNews(data.articles);
        setLoad(false);
      }
      fetchData();
  }, [Page]);

  console.log(News)
  function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  function handleNext() {
    setPage((p) => p + 1);
  }

  function handlePrevious() {
    Page > 1 && setPage((p) => p - 1);
  }
  return (
    <>
     {console.log("Component rendered")}
      <div className="container my-3">
        <div className="text-center my-3">
          <h1>The News - Top Headlines</h1>
        </div>
        {Load && <Spinner />}
        <div className="row">
          {!Load &&
            News.map((element, index) => (
              <div key={index} className="col-md-4">
                <Newitem
                  title={element.title ? truncateText(element.title, 45) : " "}
                  description={
                    element.description
                      ? truncateText(element.description, 88)
                      : " "
                  }
                  imageurl={
                    !element.urlToImage
                      ? "https://i.stack.imgur.com/5ykYD.png"
                      : element.urlToImage
                  }
                  url={element.url}
                  author = {!element.author ? "Unknown":element.author}
                  date = {new Date (element.publishedAt).toGMTString()}
                />
              </div>
            ))}
        </div>
        <div className="container d-flex justify-content-end btn">
          <button
            disabled={Page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevious}
          >
            &larr;<span>Previous</span>
          </button>
          <button
            disabled={Page >= number}
            type="button"
            className="btn btn-dark ms-1"
            onClick={handleNext}
          >
            <span>Next</span>&rarr;
          </button>
        </div>
      </div>
    </>
  );
}

News.defaultProps = 
{
  country:"in",
  pageSize:6,
  category:"science",
}

News.propTypes = 
{
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}

export default News;
