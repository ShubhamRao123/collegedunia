import React, { useEffect, useState } from "react";
import collegeData from "../data/data.json"; // Adjust the path if needed
import {
  FaStar,
  FaSearch,
  FaFileDownload,
  FaArrowRight,
  FaSquare,
  FaArrowsAltH,
  FaTicketAlt, // Import the double-sided arrow icon
} from "react-icons/fa";

function Table() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("rating"); // Default sorting criteria
  const [sortOrder, setSortOrder] = useState("asc"); // Default sorting order

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating a fetch delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setColleges(collegeData);
      } catch (err) {
        setError("Failed to load college data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter colleges based on the search term
  const filteredColleges = colleges.filter((college) =>
    college.college_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort colleges based on selected criteria and order
  const sortedColleges = [...filteredColleges].sort((a, b) => {
    let comparison = 0;
    if (sortCriteria === "rating") {
      comparison = a.rating - b.rating;
    } else if (sortCriteria === "fees") {
      comparison = a.course_fee - b.course_fee;
    } else if (sortCriteria === "reviews") {
      comparison = a.number_of_reviews - b.number_of_reviews;
    } else if (sortCriteria === "ranking") {
      comparison = a.rank - b.rank; // Sorting by rank (ranking in India)
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="table-container mx-auto my-4 p-4">
      {/* Title, Search Bar, and Sort Options in the same line */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Collegedunia</h2>
        {/* Search Bar centered */}
        <div className="flex-grow flex justify-center mx-4">
          <div className="relative w-1/2">
            <input
              type="text"
              className="border rounded-lg py-2 pl-10 pr-4 w-full"
              placeholder="Search for colleges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-2 top-2 text-gray-400" />
          </div>
        </div>
        {/* Sort Options */}
        <div className="flex items-center">
          <label className="mr-2 text-sm">Sort by:</label>
          <select
            className="border rounded-lg p-2"
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="rating">Collegedunia Rating</option>
            <option value="fees">Fees</option>
            <option value="reviews">User Review Rating</option>
            <option value="ranking">Ranking in India</option>{" "}
            {/* New option for ranking */}
          </select>
          <select
            className="border rounded-lg p-2 ml-2"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-teal-800 text-white">
          <tr>
            {[
              "CD Rank",
              "Colleges",
              "Course Fee",
              "Placement",
              "User Reviews",
              "Ranking",
            ].map((header) => (
              <th key={header} className="py-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedColleges.map((college) => (
            <tr
              key={college.id}
              className="border-b hover:bg-gray-100 transition duration-300"
            >
              <td className="py-2 text-center">{college.rank}</td>
              <td className="py-2 pl-20 flex flex-col items-start">
                {/* Featured label */}
                {college.featured && (
                  <span className="mb-2 px-2 py-1 bg-red-800 text-white text-xs font-bold rounded-lg">
                    {college.featured}
                  </span>
                )}

                {/* College Logo and Name */}
                <div className="flex items-center">
                  <img src={college.logo} width="20" height="20" />
                  <span className="ml-2">{college.college_name}</span>
                </div>

                {/* Buttons */}
                <div className="flex mt-10 space-x-4 text-sm gap-8">
                  {/* Apply Now */}
                  <button className="flex items-center text-yellow-600 font-bold">
                    <FaArrowRight className="mr-1" /> Apply Now
                  </button>
                  {/* Download Brochure */}
                  <button className="flex items-center text-green-500 font-bold">
                    <FaFileDownload className="mr-1" /> Download Brochure
                  </button>
                  {/* Add to Compare */}
                  <button className="flex items-center text-black">
                    <FaSquare className="mr-1" /> Add to Compare
                  </button>
                </div>
              </td>

              <td className="py-2">
                <span className="text-green-600 font-bold">
                  ₹ {college.course_fee}
                </span>
                <br />
                <span className="text-black text-sm">BE/B. Tech</span>
                <br />
                <span className="text-black text-sm">- 1 Year Fees</span>
                <br />
                {/* Double-sided arrow for fee comparison */}
                <span className="text-gold text-xs flex items-center text-yellow-600 font-bold">
                  <FaArrowsAltH className="mr-1 text-yellow-500" />
                  Compare Fees
                </span>
              </td>
              <td className="py-2">
                <span className="text-green-600 font-bold">
                  ₹ {college.placement.average_package}
                </span>
                <br />
                <span className="text-black text-sm">Average Package</span>
                <br />
                <span className="text-green-600 font-bold">
                  ₹ {college.placement.highest_package}
                </span>
                <br />
                <span className="text-black text-sm">Highest Package</span>
                <span className="text-gold text-xs flex items-center text-yellow-600 font-bold">
                  <FaArrowsAltH className="mr-1 text-yellow-500" />
                  Compare Placement
                </span>
              </td>
              <td className="py-2 text-center">
                <span className="flex items-center justify-center">
                  <FaStar color="gold" size={20} />
                  <span className="font-bold ml-1">{college.rating}/10</span>
                </span>
                <span className="text-sm">
                  Based on {college.number_of_reviews} User Reviews
                </span>
                <span className="text-gold text-xs flex items-center justify-center text-yellow-600 font-bold">
                  <FaTicketAlt className="mr-1 text-yellow-500" />
                  {college.best}
                </span>
              </td>
              <td className="py-2 text-center flex flex-col items-center">
                <span>#{college.rank}/100 in India</span>
                {/* India Today logo with year below Ranking */}
                <div className="flex flex-row items-center mt-2">
                  <img
                    src="../image/india.jpg" // Adjust the path to your logo
                    alt="India Today"
                    className="w-12 font-semibold"
                  />
                  <span className="text-sm ml-2">2023</span>{" "}
                  {/* Added margin left for spacing */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
