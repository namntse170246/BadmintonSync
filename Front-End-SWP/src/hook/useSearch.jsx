// // useSearch.js
// import { useState } from "react";
// import { GetAllRealestates } from "../components/API/APIConfigure";

// const useSearch = () => {
//     const [searchValue, setSearchValue] = useState("");
//     const [searchResult, setSearchResult] = useState([]);

//     const handleSearch = async () => {
//         try {
//             // Call your API here and set search results
//             const response = await GetAllRealestates();

//             setSearchResult(response);
//         } catch (error) {
//             console.error("Error fetching search results: ", error);
//         }
//     };

//     return { searchValue, setSearchValue, searchResult, handleSearch };
// };

// export default useSearch;
