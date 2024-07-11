import React, { useState, useRef, useEffect } from 'react';
import Logo from '../bookshelf.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faBook, faUser, faEdit, faCheck, faTrash, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Header = ({
  onAddBookClick,
  onAddBorrowerClick,
  onAddAuthorClick,
  onUpdateBookClick,
  onUpdateBorrowerClick,
  onDeleteBookClick,
  onDeleteBorrowerClick,
  onUpdateAuthorClick,
  onCheckinClick,
  onCheckoutClick,
  goHome,
  onProfileClick,
  onLogoutClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdateDropdownOpen, setIsUpdateDropdownOpen] = useState(false);
  const [isDeleteDropdownOpen, setIsDeleteDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const updateDropdownRef = useRef(null);
  const deleteDropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (updateDropdownRef.current && !updateDropdownRef.current.contains(event.target)) {
      setIsUpdateDropdownOpen(false);
    }
    if (deleteDropdownRef.current && !deleteDropdownRef.current.contains(event.target)) {
      setIsDeleteDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleUpdateDropdown = () => {
    setIsUpdateDropdownOpen(!isUpdateDropdownOpen);
  };

  const toggleDeleteDropdown = () => {
    setIsDeleteDropdownOpen(!isDeleteDropdownOpen);
  };

  return (
    <header className="bg-gray-100 shadow-lg py-4">
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        <h1 onClick={goHome} className="flex items-center text-gray-800 text-2xl lg:text-3xl font-bold cursor-pointer">
          <img src={Logo} alt="Logo" className="w-10 h-10 lg:w-12 lg:h-12 mr-2 rounded-full" />
          <span className="hidden lg:block">Library Management System</span>
        </h1>
        <div className="flex items-center space-x-4">
          {/* Dropdown for New */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 focus:ring-2 focus:ring-gray-400"
            >
              <FontAwesomeIcon icon={isDropdownOpen ? faAngleUp : faAngleDown} className="mr-2" /> New
            </button>
            <div
              ref={dropdownRef}
              className={`absolute z-10 mt-2 w-52 bg-white shadow-lg rounded-md ${isDropdownOpen ? 'block' : 'hidden'}`}
            >
              <div className="py-2">
                <button onClick={onAddBookClick} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faBook} className="mr-2" /> Add New Book
                </button>
                <button onClick={onAddAuthorClick} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faUser} className="mr-2" /> Add New Author
                </button>
                <button onClick={onAddBorrowerClick} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faUser} className="mr-2" /> Add New Borrower
                </button>
              </div>
            </div>
          </div>

          {/* Dropdown for Update */}
          <div className="relative">
            <button
              onClick={toggleUpdateDropdown}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 focus:ring-2 focus:ring-gray-400"
            >
              <FontAwesomeIcon icon={isUpdateDropdownOpen ? faAngleUp : faAngleDown} className="mr-2" /> Update
            </button>
            <div
              ref={updateDropdownRef}
              className={`absolute z-10 mt-2 w-52 bg-white shadow-lg rounded-md ${isUpdateDropdownOpen ? 'block' : 'hidden'}`}
            >
              <div className="py-2">
                <button onClick={onUpdateBookClick} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Update Book Details
                </button>
                <button onClick={onUpdateAuthorClick} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Update Author Details
                </button>
                <button onClick={onUpdateBorrowerClick} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faEdit} className="mr-2" /> Update Borrower Details
                </button>
              </div>
            </div>
          </div>

          {/* Dropdown for Delete */}
          <div className="relative">
            <button
              onClick={toggleDeleteDropdown}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 focus:ring-2 focus:ring-gray-400"
            >
              <FontAwesomeIcon icon={isDeleteDropdownOpen ? faAngleUp : faAngleDown} className="mr-2" /> Delete
            </button>
            <div
              ref={deleteDropdownRef}
              className={`absolute z-10 mt-2 w-52 bg-white shadow-lg rounded-md ${isDeleteDropdownOpen ? 'block' : 'hidden'}`}
            >
              <div className="py-2">
                <button onClick={onDeleteBookClick} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete Book
                </button>
                <button onClick={onDeleteBorrowerClick} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">
                  <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete Borrower
                </button>
              </div>
            </div>
          </div>

          {/* Book Checkin and Checkout Buttons */}
          <button
            onClick={onCheckinClick}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 focus:ring-2 focus:ring-gray-400"
          >
            <FontAwesomeIcon icon={faCheck} className="mr-2" /> Checkin
          </button>
          <button
            onClick={onCheckoutClick}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 focus:ring-2 focus:ring-gray-400"
          >
            <FontAwesomeIcon icon={faCheck} className="mr-2" /> Checkout
          </button>

          {/* User Profile and Logout */}
          <div className="relative">
            <button
              onClick={onProfileClick}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 focus:ring-2 focus:ring-gray-400"
            >
              <FontAwesomeIcon icon={faUserCircle} className="mr-2" /> Profile
            </button>
            <div className={`absolute z-10 mt-2 w-40 bg-white shadow-lg rounded-md hidden`}>
              <button onClick={onLogoutClick} className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-200">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
