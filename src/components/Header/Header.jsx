import React, { useContext } from 'react';
import DarkMood from '../../common/DarkMood';
import Headroom from 'react-headroom';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchData from '../../common/SearchData';
import { UserProvider } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import useAxios from '../../hooks/useAxios';

const Header = () => {
    const { logOut, user, userPhoto } = useContext(UserProvider)
    const navigate = useNavigate()
    const axiosAuth = useAxios()
    const handelLogOut = () => {
        logOut()
            .then(() => {
                axiosAuth.get('/cookedelet')
                    .then(() => {
                        toast.success('Log out Successfully !')
                        navigate('/')
                    })
            }).catch((error) => {
                console.log(error.message)
            })
    }

    const navLink = <>
        <li> <NavLink
            to="/"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " !text-blue-600  dark:text-blue-500 font-semibold" : "hover:bg-transparent font-semibold text-gray-500 hover:text-gray-400  dark:text-gray-400 dark:hover:text-gray-500"
            }
        >Home</NavLink></li>

        <li> <NavLink
            to="/contractlist"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " !text-blue-600  dark:text-blue-500 font-semibold" : "hover:bg-transparent font-semibold  text-gray-500 hover:text-gray-400  dark:text-gray-400 dark:hover:text-gray-500"
            }
        >Add Contacts</NavLink></li>
        <li> <NavLink
            to="/addcontract"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? " !text-blue-600  dark:text-blue-500 font-semibold" : "hover:bg-transparent font-semibold  text-gray-500 hover:text-gray-400  dark:text-gray-400 dark:hover:text-gray-500"
            }
        >Add Contacts</NavLink></li>


    </>
    return (
        <div>
            <Headroom>
                <div className="navbar bg-base-100">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {navLink}
                            </ul>
                        </div>
                        <a className="text-xl btn btn-ghost">PhonBOOK</a>
                    </div>
                    <div className="hidden navbar-center lg:flex">
                        <ul className="px-1 menu menu-horizontal">
                            {navLink}
                        </ul>
                    </div>
                    <div className="navbar-end">

                        {
                            user ? <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={user?.photoURL || userPhoto} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a>{user?.displayName}</a></li>
                                    <li><a>{user?.email}</a></li>
                                    <li onClick={handelLogOut}><a>Logout</a></li>
                                </ul>
                            </div> : <div className="dropdown dropdown-end">
                                <Link to='/login' class="flex items-center gap-x-2 font-medium text-gray-500 hover:text-blue-600 md:border-s md:border-gray-300 md:my-6 md:ps-6 dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500" >
                                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    Log in
                                </Link>
                            </div>
                        }

                    </div>
                </div>

            </Headroom>


            {/* Search modal */}

            <div id="hs-overlay-top" className="hs-overlay hs-overlay-open:translate-y-0 -translate-y-full fixed top-0 inset-x-0 transition-all duration-300 transform max-h-40 h-full w-full z-[60] bg-white border-b dark:bg-gray-800 dark:border-gray-700 hidden" tabIndex="-1">
                <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white">
                        Search Your Item
                    </h3>
                    <button type="button" className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm text-gray-500 rounded-md hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white dark:text-gray-500 dark:hover:text-gray-400 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-overlay-top">
                        <span className="sr-only">Close modal</span>
                        <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center justify-center p-4">
                    <SearchData></SearchData>
                </div>
            </div>

        </div>
    );
};

export default Header;