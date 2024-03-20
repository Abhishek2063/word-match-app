import React, { useEffect, useState } from "react";
import { get } from "./config/api";
import { SEARCH_GET } from "./routes/apiRoutes";
import SearchTableData from "./views/SearchTableData";
import SearchInput from "./views/SearchInput";
import './App.css'; // Import your CSS file for styling

const App = () => {
  const [dataList, setDataList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryError, setSearchQueryError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataListRequest = await get(SEARCH_GET);
        if (dataListRequest.success) {
          setDataList(dataListRequest.data);
        }
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function immediately
  }, []); // Add an empty dependency array to run the effect only once on component mount

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Word Match Assignment</h1>
      </header>
      <main className="app-content">
        <div className="centered-content">
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchQueryError={searchQueryError}
            setSearchQueryError={setSearchQueryError}
            setDataList={setDataList}
          />
          <SearchTableData dataList={dataList} />
        </div>
      </main>
    </div>
  );
};

export default App;
