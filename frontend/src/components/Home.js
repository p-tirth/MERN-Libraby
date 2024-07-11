import React, { useState, useEffect } from 'react';
import backgroundImage from '../libimg.jpg';

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
    setForceUpdate(prev => !prev);
  };

  const Card = ({ children }) => {
    return <div className="bg-white bg-opacity-80 rounded-lg shadow-md p-6 mb-8">{children}</div>;
  };

  const StatCard = ({ title, count, onClickHandle }) => {
    return (
      <div
        className="bg-white bg-opacity-90 rounded-lg shadow-md p-4 cursor-pointer focus:scale-95 focus:ring-3 focus:ring-blue-400 hover:scale-105 transition-transform transition-ring transition-duration-100"
        onClick={onClickHandle}
        tabIndex={0}
      >
        <p className="font-semibold text-center text-gray-800">{title}</p>
        <p className="text-center text-4xl mt-2 text-gray-600">{count}</p>
      </div>
    );
  };

  return (
    <div
      className="container mx-auto px-4 py-8"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="bg-white bg-opacity-80 rounded-lg p-8">
        <h1 className="font-bold text-3xl text-center mb-8 text-gray-900">Welcome to the Library Management System</h1>
        <p className="text-center text-lg mb-8 text-gray-700">Books organized, knowledge accessed: Simplify your library management.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <StatCard title="Total Books" onClickHandle={showBooks} count={counts.books} />
          <StatCard title="Total Authors" onClickHandle={showAuthors} count={counts.authors} />
          <StatCard title="Total Borrowers" onClickHandle={showBorrowers} count={counts.borrowers} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <StatCard title="Checked Out Books" onClickHandle={showCheckoutBooks} count={counts.booksWithBorrower} />
          <StatCard title="Borrowers without Books" onClickHandle={showBorrowersWithoutBook} count={counts.borrowersWithoutBook} />
        </div>

        <div className="flex justify-center mt-8">
          <button onClick={triggerUpdate} className="bg-gray-800 text-white py-2 px-6 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700">
            Force Refresh Counts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
