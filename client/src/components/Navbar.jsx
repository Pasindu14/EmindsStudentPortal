import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const [isMastersListVisible, setMastersListVisible] = useState(false);

  const toggleMastersList = () => {
    setMastersListVisible((prev) => !prev);
  };

  return (
    <div>
      <nav className="bg-gray-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block z-10">
                <div className="ml-10 flex items-baseline space-x-4">
                  <div className="relative group">
                    <button
                      onClick={toggleMastersList}
                      className="hover:bg-[#570DF8] hover:text-white text-black px-3 py-2 text-lg font-bold font-inter"
                    >
                      MASTERS
                    </button>
                    {isMastersListVisible && (
                      <div className="absolute left-0 mt-2 bg-white border border-gray-300 p-2 rounded shadow-lg">
                        <Link
                          to={`students`}
                          onClick={() => setMastersListVisible(false)}
                          className="block text-black text-lg font-bold font-inter py-2 px-2 hover:bg-[#570DF8] hover:text-white w-56"
                        >
                          Students
                        </Link>
                        <Link
                          to={`batches`}
                          onClick={() => setMastersListVisible(false)}
                          className="block text-black text-lg font-bold font-inter py-2 px-2 hover:bg-[#570DF8] hover:text-white"
                        >
                          Batches
                        </Link>
                        <Link
                          to={`courses`}
                          onClick={() => setMastersListVisible(false)}
                          className="block text-black text-lg font-bold font-inter py-2 px-2 hover:bg-[#570DF8] hover:text-white"
                        >
                          Courses
                        </Link>
                        <Link
                          to={`exams`}
                          onClick={() => setMastersListVisible(false)}
                          className="block text-black text-lg font-bold font-inter py-2 px-2 hover:bg-[#570DF8] hover:text-white"
                        >
                          Exams
                        </Link>
                        <Link
                          to={`questions`}
                          onClick={() => setMastersListVisible(false)}
                          className="block text-black text-lg font-bold font-inter py-2 px-2 hover:bg-[#570DF8] hover:text-white"
                        >
                          Questions
                        </Link>
                        <Link
                          to={`sessions`}
                          onClick={() => setMastersListVisible(false)}
                          className="block text-black text-lg font-bold font-inter py-2 px-2 hover:bg-[#570DF8] hover:text-white"
                        >
                          Sessions
                        </Link>
                        <Link
                          to={`jobs`}
                          onClick={() => setMastersListVisible(false)}
                          className="block text-black text-lg font-bold font-inter py-2 px-2 hover:bg-[#570DF8] hover:text-white"
                        >
                          Jobs
                        </Link>
                        <Link
                          to={`events`}
                          onClick={() => setMastersListVisible(false)}
                          className="block text-black text-lg font-bold font-inter py-2 px-2 hover:bg-[#570DF8] hover:text-white"
                        >
                          Events
                        </Link>

                        {/* Add more master items as needed */}
                      </div>
                    )}
                  </div>

                  <Link
                    to={`batch-mapping`}
                    className="hover:bg-[#570DF8] hover:text-white text-black px-3 py-2 text-lg font-bold font-inter"
                  >
                    MAPPING
                  </Link>
                  <Link
                    to={`students`}
                    className="hover:bg-[#570DF8] hover:text-white text-black px-3 py-2 text-lg font-bold font-inter"
                  >
                    APPROVAL
                  </Link>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                  href="#"
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Team
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Projects
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Calendar
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Reports
                </a>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Navbar;
