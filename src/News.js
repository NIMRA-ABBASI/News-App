import Newitem from "./Newsitem.js";
import { useEffect, useState } from "react";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {
  const [News, setNews] = useState([]);
  const[totalArticles, setTotalArticles] = useState(0);
  const [Page, setPage] = useState(1);
  const [Load, setLoad] = useState(false);
  
 
  useEffect(() => {
    async function fetchData() {
      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?&category=${props.category}&country=${props.country}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${Page}&pageSize=${props.pageSize}`;
      setLoad(true);
      document.title = `${capatilizeFirtLetter(props.category)} - News App`;
      let response = await fetch(url);
      props.setProgress(30);
      let data = await response.json();
      props.setProgress(70);
      setNews(prevNews => [...prevNews, ...data.articles]);
      setTotalArticles(data.totalResults);
      setLoad(false);
      props.setProgress(100);
    }
    fetchData();
  }, [Page]);

  function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  function capatilizeFirtLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

 const fetchMoreData = () => {
    setPage((p) => p + 1);
  };

  return (
    <>
        <div className="text-center my-3">
          <h1>
            The News - Top {capatilizeFirtLetter(props.category)} Headlines
          </h1>
        </div>
        {Load && <Spinner/>} 
       
        <InfiniteScroll
          dataLength={News ? News.length : 0}
          next={fetchMoreData}
          hasMore={News.length !== totalArticles}
          loader={<Spinner />}
        >
          <div className="container">
          <div className="row">
            {
              News.map((element, index) => (
                <div key={index} className="col-md-4">
                  <Newitem
                    title={
                      element.title ? truncateText(element.title, 45) : " "
                    }
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
                    author={!element.author ? "Unknown" : element.author}
                    date={new Date(element.publishedAt).toGMTString()}
                    source={element.source.name}
                  />
                </div>
              ))}
          </div>
          {console.log(News)}
          </div>
        </InfiniteScroll>
       
    </>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "science",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;