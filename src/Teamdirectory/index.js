import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Administrators from "./Administrators";
import Members from "./Members";

import axios from "axios";

const Teamdirectory = () => {
  const [state, setState] = useState({
    isLoading: true,
    team: [],
    nodata: false,
    error: false,
    searchtext: "",
  });
  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {
    await axios
      .get("https://nijin-server.vercel.app/api/team-members")
      .then((response) => {
        console.log(response, " API");
        console.log(response.data, " API");
        if (response.data.length === 0) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            team: response.data,
            nodata: true,
            error: false,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            team: response.data,
            nodata: false,
            error: false,
          }));
        }
      })
      .catch((err) => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          team: [],
          nodata: false,
          error: true,
        }));
      });
  };

  const searchFun = (value) => {
    var timeOut = setTimeout(() => {
      setState((prev) => ({ ...prev, isLoading: false }));
    }, 1000);
    setState((prev) => ({ ...prev, isLoading: true, searchtext: value }));
    return () => {
      clearTimeout(timeOut);
    };
  };

  return (
    <div className="team-directory-page">
      {console.log(state, " 33333")}
      <div className="header">
        <div>
          <h1 className="page-title">Team</h1>
        </div>
        <div>
          <div className="search-box">
            <div className="search-box-icon">
              <CiSearch style={{ fontSize: "24px" }} />
            </div>
            <div className="search-box-text">
              <input
                type="text"
                className="search-input"
                name="search"
                value={state.searchtext}
                placeholder="Search"
                onChange={(e) => searchFun(e.target.value)}
              />
            </div>
          </div>
          {/* <input type="text" className="search-input" name="search" value={""} placeholder="Search"/> */}
        </div>
      </div>
      <div className="body">
        {state.isLoading ? (
          <div className="loading-box">
            <span class="loader"></span>
          </div>
        ) : state.error ? (
          <div className="loading-box">
            <h2 className="cmp-head-title">Something went wrong.... </h2>
          </div>
        ) : state.nodata ? (
          <div className="loading-box">
            <h2 className="cmp-head-title">No Records Found...</h2>
          </div>
        ) : (
          <React.Fragment>
            <Administrators
              state={{
                ...state,
                team: state.team.filter(
                  (ele) =>
                    ele.role === "admin" &&
                    ele.first_name
                      .toLowerCase()
                      .includes(state.searchtext.toLowerCase())
                ),
              }}
            />
            <div className="divider-box">
              <hr />
            </div>
            <Members
              state={{
                ...state,
                team: state.team.filter(
                  (ele) =>
                    ele.role === "member" && 
                    ele.first_name
                      .toLowerCase()
                      .includes(state.searchtext.toLowerCase()) 
                ),
              }}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Teamdirectory;
