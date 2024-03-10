function Newsitem(props) {
  return (
    <div className="my-3">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            right: "0",
            position: "absolute",
          }}
        >
          <span className="badge rounded-pill bg-danger">{props.source}</span>
        </div>

        <img src={props.imageurl} className="card-img-top newsimg" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title} </h5>
          <p className="card-text">{props.description}</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {props.author} on {props.date}
            </small>
          </p>
          <a href={props.url} target="_blank" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default Newsitem;
