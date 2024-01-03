import React, { useContext, useState } from 'react';
import { BsArrowLeftCircleFill } from "react-icons/bs";
import useAllData from '../../hooks/useAllData';
import NodataHere from '../../common/NodataHere';
import { UserProvider } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import moment from 'moment';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const AllContract = () => {
    const { user } = useContext(UserProvider)
    const { isPending, error, users, refetch } = useAllData()

    const axiosData = useAxios()

    const [data, setData] = useState({})
    const [defaultData, setDefaultData] = useState({})
    console.log(defaultData)

    const handelUpdate = (item) => {
        document.getElementById('my_modal_5').showModal()
        setData(item)
    }

    const handelUplodeData = (item) => {
        document.getElementById('my_modal_7').showModal()
        setDefaultData(item)
    }

    const [imgUplode, setImageUplode] = useState('')

    const uploadImageToImgBB = () => {
        const imgbbApiKey = '48262f7096c971f7f2f1b695ae2a6be0';
        const fileInput = document.getElementById('fileInput');
        const selectedFile = fileInput.files[0];
        const formData = new FormData();
        formData.append('image', selectedFile);
        axios.post('https://api.imgbb.com/1/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                key: imgbbApiKey,
            },
        })
            .then(response => {
                const imageUrl = response.data.data.url;
                setImageUplode(imageUrl)
                toast.success('Image upload sucessfylly !')
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handelSubmit = (e) => {
        e.preventDefault()
        const fullname = e.target.firstname.value;
        const email = e.target.email.value;
        const phon = e.target.phon.value;
        const address = e.target.address.value;
        const img = imgUplode || defaultData?.img;
        const userEmail = user?.email
        const time = moment().calendar()
        const data = { fullname, email, phon, address, img, userEmail, time }

        axiosData.put(`/users/${defaultData?._id}`, data)
            .then(res => {
                document.getElementById('my_modal_7').close()
                Swal.fire({
                    title: "Good job!",
                    text: "User update successfully",
                    icon: "success"
                });
                refetch()
            })

    }


    const handelDelateUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosData.delete(`/users/${id}`)
                    .then(res => {
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "User delete successfully.",
                            icon: "success"
                        });
                    })

            }
        });
    }

    return (
        <div className=''>

            <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

                <div class="flex flex-col">
                    <div class="-m-1.5 overflow-x-auto">
                        <div class="p-1.5 min-w-full inline-block align-middle">
                            <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">

                                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead class="bg-gray-50 dark:bg-slate-800">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 text-start">
                                                <div class="flex items-center gap-x-2">
                                                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                        User
                                                    </span>
                                                </div>
                                            </th>

                                            <th scope="col" class="px-6 py-3 text-start">
                                                <div class="flex items-center gap-x-2">
                                                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                        Address
                                                    </span>
                                                </div>
                                            </th>

                                            <th scope="col" class="px-6 py-3 text-start">
                                                <div class="flex items-center gap-x-2">
                                                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                        Phon number
                                                    </span>
                                                </div>
                                            </th>

                                            <th scope="col" class="px-6 py-3 text-start">
                                                <div class="flex items-center gap-x-2">
                                                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                        Time
                                                    </span>
                                                </div>
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-start">
                                                <div class="flex items-center gap-x-2">
                                                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                        Time
                                                    </span>
                                                </div>
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-start">
                                                <div class="flex items-center justify-center gap-x-2">
                                                    <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                                        Status
                                                    </span>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">

                                        {
                                            users?.length > 0 ? <>
                                                {
                                                    users?.map((item, i) => {
                                                        return <tr class="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
                                                            <td class="h-px w-px whitespace-nowrap align-top">
                                                                <a class="block p-6" href="#">
                                                                    <div class="flex items-center gap-x-3">
                                                                        <img class="inline-block h-[2.375rem] w-[2.375rem] rounded-full" src={item?.img} alt="Image Description" />
                                                                        <div class="grow">
                                                                            <span class="block text-sm font-semibold text-gray-800 dark:text-gray-200">{item?.fullname}</span>
                                                                            <span class="block text-sm text-gray-500">{item?.email}</span>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            </td>
                                                            <td class="h-px w-px whitespace-nowrap align-top">
                                                                <a class="block p-6" href="#">
                                                                    <span class="text-sm text-gray-600 dark:text-gray-400">{item?.address}</span>
                                                                </a>
                                                            </td>
                                                            <td class="h-px w-px whitespace-nowrap align-top">
                                                                <a class="block p-6" href="#">
                                                                    <span class="text-sm text-gray-600 dark:text-gray-400">{item?.phon}</span>
                                                                </a>
                                                            </td>

                                                            <td class="h-px w-px whitespace-nowrap align-top">
                                                                <a class="block p-6" href="#">
                                                                    <span class="text-sm text-gray-600 dark:text-gray-400">{item?.time}</span>
                                                                </a>
                                                            </td>
                                                            <td class="h-px w-px whitespace-nowrap align-top">
                                                                <a class="block p-6" onClick={() => handelUpdate(item)}>
                                                                    <span class="py-3 px-4 inline-flex items-center gap-x-2 text-sm cursor-pointer font-semibold rounded-lg border border-transparent text-red-500 hover:bg-red-100 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-800/30 dark:hover:text-red-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">view</span>
                                                                </a>
                                                            </td>
                                                            <td class="h-px w-px whitespace-nowrap align-top">
                                                                <a class=" py-6 flex items-center justify-center">
                                                                    <button onClick={() => handelDelateUser(item._id)} type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-500 hover:bg-red-100 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-800/30 dark:hover:text-red-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                                        Delete
                                                                    </button>
                                                                    <button onClick={() => handelUplodeData(item)} type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:bg-blue-800/30 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                                        Edit
                                                                    </button>
                                                                </a>
                                                            </td>

                                                        </tr>
                                                    })
                                                }
                                            </> : <NodataHere></NodataHere>
                                        }

                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <dialog id="my_modal_5" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    </form>
                    <div
                        class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
                        <div class="rounded-t-lg h-32 overflow-hidden">
                            <img class="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
                        </div>
                        <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                            <img class="object-cover object-center h-32" src={data?.img} alt='Woman looking front' />
                        </div>
                        <div class="text-center mt-2">
                            <h2 class="font-semibold">{data?.fullname}</h2>
                            <p class="text-gray-500">{data?.email}</p>
                        </div>
                        <ul class="py-4 mt-2 text-gray-700 flex items-center justify-around">
                            <li class="flex flex-col items-center justify-around">
                                <svg class="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path
                                        d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                                <div>2k</div>
                            </li>
                            <li class="flex flex-col items-center justify-between">
                                <svg class="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path
                                        d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                                </svg>
                                <div>10k</div>
                            </li>
                            <li class="flex flex-col items-center justify-around">
                                <svg class="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path
                                        d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                                </svg>
                                <div>15</div>
                            </li>
                        </ul>
                        <div class="p-4 border-t mx-8 mt-2">
                            <button class="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Follow</button>
                        </div>
                    </div>
                </div>
            </dialog>



            {/* Edit */}
            <dialog id="my_modal_7" className="modal">
                <div className="w-11/12 max-w-5xl modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    </form>
                    <div class="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

                        <div class="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-slate-900">
                            <div class="mb-8">
                                <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200">
                                    Profile
                                </h2>
                                <p class="text-sm text-gray-600 dark:text-gray-400">
                                    Manage your name, password and account settings.
                                </p>
                            </div>

                            <form onSubmit={handelSubmit}>

                                <div class="grid sm:grid-cols-12 gap-2 sm:gap-6">
                                    <div class="sm:col-span-3">
                                        <label class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                            Profile photo
                                        </label>
                                    </div>


                                    <div class="sm:col-span-9">
                                        <div class="flex items-center gap-5">
                                            <img class="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800" src={defaultData?.img} alt="Image Description" />
                                            <div class="flex gap-x-2">
                                                <div className='flex items-center gap-2'>
                                                    <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                                    <input onChange={uploadImageToImgBB} id="fileInput" type="file" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" />

                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="sm:col-span-3">
                                        <label class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                            Full name
                                        </label>

                                    </div>


                                    <div class="sm:col-span-9">
                                        <div class="sm:flex">
                                            <input required defaultValue={defaultData?.fullname} name='firstname' id="af-account-full-name" type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Maria" />
                                        </div>
                                    </div>


                                    <div class="sm:col-span-3">
                                        <label class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                            Email
                                        </label>
                                        <span class="text-sm text-gray-400 dark:text-gray-600">
                                            (Optional)
                                        </span>
                                    </div>


                                    <div class="sm:col-span-9">
                                        <input defaultValue={defaultData?.email} required name='email' id="af-account-email" type="email" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="maria@site.com" />
                                    </div>





                                    <div class="sm:col-span-3">
                                        <div class="inline-block">
                                            <label class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                                Phone
                                            </label>

                                        </div>
                                    </div>


                                    <div class="sm:col-span-9">
                                        <div class="sm:flex">
                                            <input defaultValue={defaultData?.phon} required name='phon' id="af-account-phone" type="number" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="+x(xxx)xxx-xx-xx" />
                                            <select class="py-2 px-3 pe-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                                                <option selected>Mobile</option>
                                                <option>Home</option>
                                                <option>Work</option>
                                                <option>Fax</option>
                                            </select>
                                        </div>

                                    </div>




                                    <div class="sm:col-span-3">
                                        <label class="inline-block text-sm text-gray-800 mt-2.5 dark:text-gray-200">
                                            Address
                                        </label>
                                    </div>


                                    <div class="sm:col-span-9">
                                        <textarea defaultValue={defaultData?.address} required name='address' id="af-account-bio" class="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" rows="6" placeholder="Type your Address..."></textarea>
                                    </div>

                                </div>


                                <div class="mt-5 flex justify-end gap-x-2">
                                    <button type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                        Update now
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </dialog>




        </div>
    );
};

export default AllContract;