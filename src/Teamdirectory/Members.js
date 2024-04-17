import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Members = (props) => {
  return (
    <div className="cmp">
      <div className="cmp-head">
        <h2 className="cmp-head-title">Members</h2>
      </div>
      <div className="cmp-body">
        {props.state.team.length === 0 ? (
          <div className="cmp-head d-flex justify-content-center">
            <h5 className="p-0 m-0 name">No Records Found...</h5>
          </div>
        ) : (
          <Row>
            {props.state.team.map((ele, index) => (
              <Col xs={12} md={3} className="p-3" key={index}>
                <div className="card-custom p-2">
                  <div className="img-box">
                    <div className="card-img-box">
                      <img
                        src={ele.img}
                        alt={ele.first_name}
                        className="card-img"
                      />
                    </div>
                  </div>
                  <div className="text-box">
                    <div>
                      <h5 className="p-0 m-0 name">{ele.first_name}</h5>
                      <p className="p-0 m-0 email">{ele.email}</p>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default Members;
