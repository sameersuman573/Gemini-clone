import { createContext } from "react";
import runChat from "../Config/Gemni";
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (Props) => {
  const [input, setInput] = useState("");
  // to save the input data or when we write show that data
  const [recentPrompt, setRecentPrompt] = useState("");
  // to save the input feild data when we will click on sent button so that will be displayed in main component as the question
  const [prevPrompts, setPrevPrompts] = useState([]);
  // to save the input history and display in recent tab
  const [showResult, setShowResult] = useState(false);
  // if its is true it will hide all things such as cards and display results
  const [loading, setLoading] = useState(false);
  // if data is not displayed so it will display loading animation
  const [resultData, setResultData] = useState("");
  // to display result on our web page

  // adding typing effect to our chat
  const delaypara = (index, nextWord) => {};

  // new chat button
  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  // on sent function - when question will be asked from google
  // the way onsent fnction is writeen shows that how data will be organized when question;s answer will be fetched
  const onSent = async (prompt) => {
    setResultData("");
    // to remove the previous response
    setLoading(true);
    setShowResult(true);
    let response;

    // if prompt is not filled in search box
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }

    // typing effect
    let responseArray = response.split("**");
    let newResponse;
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "<b/>";
      }
    }
    setResultData(newResponse);

    setResultData(response);
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{Props.children}</Context.Provider>
  );
};

export default ContextProvider;
