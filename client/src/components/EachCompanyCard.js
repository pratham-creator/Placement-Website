import { Link } from "react-router-dom";

const EachCompanyCard = ({ c }) => {
  const id = c._id;
  return (
    <div className="col-6 col-md-4 col-lg-3">
      <Link to={`/company/${id}`}>
        <div className="flip-card p-2">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={c.image} className="cardImage" />

              <h4 className="frontSideHeading pt-1">{c.name}</h4>
            </div>
            <div className="flip-card-back">
              <h3 className="backSideHeading pt-2" style={{ color: "white" }}>
                {c.name}
              </h3>
              <h3
                className="backSideType pt-md-1 pl-2 pr-2"
                style={{ color: "white" }}
              >
                {c.companyType}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EachCompanyCard;
