import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';

const Root = () => {
    return (
        <div className=''>
            <Header></Header>
            <Outlet></Outlet>
            <Toaster />
        </div>
    );
};

export default Root;