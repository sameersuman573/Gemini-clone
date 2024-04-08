import React, { useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { Context } from "../../Context/Context";

const Sidebar = () => {
  const [extended, setextended] = useState(false);

  // when we will click on menu-sidebar button we want a changed state using the state we will on or hide
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  // to show prev asked data
  const loadprompt = async (prompt) => {
    // because the eaxact asked question wi;; be stored in recent prompt and the prev list of prompts will be stored in prevPrompts -refer to Context.jsx
    // setprevprompt(prev=>[...prev,prompt])
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      {/* TOP SECTION */}

      <div className="top">
        <img
          onClick={() => setextended((prev) => !prev)}
          // the previous value must not be equal to prev value
          className="menu"
          src={assets.menu_icon}
        />

        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {/* if our state is false we will hide all the recent entry */}
        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={() => loadprompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* BOTTOM SECTION */}

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activities</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
