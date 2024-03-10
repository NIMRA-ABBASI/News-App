import Loading from "./Spinner-1.8s-217px.gif";

function Spinner() {
  return (
    <div className="text-center">
      <img className="my-3" src={Loading} alt="Loading" />
    </div>
  );
}

export default Spinner;
