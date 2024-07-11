import React, { useState, useEffect } from 'react';

const Home = ({
  showBooks,
  showAuthors,
  showBorrowers,
  showBorrowersWithoutBook,
  showCheckoutBooks,
  showRemainingBooks
}) => {
  const [counts, setCounts] = useState({
    books: 0,
    authors: 0,
    borrowers: 0,
    booksWithBorrower: 0,
    borrowersWithoutBook: 0,
  });
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URI}/counts`);
        if (response.ok) {
          const data = await response.json();
          const parsedData = {
            books: parseInt(data.books) || 0,
            authors: parseInt(data.authors) || 0,
            borrowers: parseInt(data.borrowers) || 0,
            booksWithBorrower: parseInt(data.booksWithBorrower) || 0,
            borrowersWithoutBook: parseInt(data.borrowersWithoutBook) || 0,
          };
          setCounts(parsedData);
        } else {
          console.error('Failed to fetch counts:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, [forceUpdate]);

  const triggerUpdate = () => {
    setForceUpdate(prev => !prev); // Toggle forceUpdate to trigger data fetching
  };

  const StatCard = ({ title, count, onClickHandle }) => {
    return (
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md p-6 cursor-pointer hover:bg-gray-800 transition duration-200">
        <p className="font-semibold text-center text-white">{title}</p>
        <p className="text-center text-4xl mt-4 text-white">{count}</p>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-bold text-4xl text-center mb-8">Welcome to the Library Management System</h1>
      <p className="text-lg text-center mb-12">Organize, manage, and simplify your library with ease.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-3 lg:col-span-1">
          <StatCard title="Total Books" onClickHandle={showBooks} count={counts.books} />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <StatCard title="Total Authors" onClickHandle={showAuthors} count={counts.authors} />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <StatCard title="Total Borrowers" onClickHandle={showBorrowers} count={counts.borrowers} />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <StatCard title="Checked Out Books" onClickHandle={showCheckoutBooks} count={counts.booksWithBorrower} />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <StatCard title="Borrowers without Books" onClickHandle={showBorrowersWithoutBook} count={counts.borrowersWithoutBook} />
        </div>
        <div className="col-span-3 lg:col-span-1">
          <StatCard title="Remaining Books" onClickHandle={showRemainingBooks} count={counts.books - counts.booksWithBorrower} />
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={triggerUpdate}
          className="bg-gray-700 text-gray-300 py-3 px-8 rounded-lg hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
        >
          Force Refresh Counts
        </button>
      </div>
    </div>
  );
};

export default Home;
