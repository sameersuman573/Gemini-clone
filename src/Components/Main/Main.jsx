import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";

const Main = () => {
  // In this component we have functions and state we will display the result on our main component
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  // with the help of useContext we can use the data of context file in our main component

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} />
      </div>

      <div className="main-container">
        {/* If nothing is searched we will show the previous components */}
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello , Devin</span>
              </p>
              <p>How Can I Help You Today</p>
            </div>

            <div className="cards">
              <div className=" card">
                <p>Suggest beautiful images to see on an upcoming road trip</p>
                <img src={assets.code_icon} alt="" />
              </div>
              <div className=" card">
                <p> Briefly summarize the concepts the urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className=" card">
                <p>
                  {" "}
                  Brain storm team bonding activities for our own work retreat
                </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className=" card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="results">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}

              {/* if we want to hide tag we use this property */}
            </div>
          </div>
        )}

        {/* BOTTOM SECTION */}

        <div className="main-bottom">
          <div className="search-box">
            <input
              // To capture the text values
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter A Prompt Here....."
            />

            <div>
              <img src={assets.gallery_icon} />
              <img src={assets.mic_icon} />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
