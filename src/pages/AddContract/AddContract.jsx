import axios from 'axios';
import React, { useContext, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { UserProvider } from '../../context/AuthContext';
import moment from 'moment';
import Swal from 'sweetalert2';

const AddContract = () => {
    const axiosData = useAxios()
    const { user } = useContext(UserProvider)

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    console.log(uploadProgress, imageUrl, uploading)

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadImageToImgBB = () => {
        const imgbbApiKey = '48262f7096c971f7f2f1b695ae2a6be0'; 

        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        setUploading(true);
        setUploadProgress(0);

        axios.post('https://api.imgbb.com/1/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                key: imgbbApiKey,
            },
            onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(progress);
            },
        })
            .then(response => {
                setUploading(false);
                setImageUrl(response.data.data.url);
                console.log(response.data.data.url);
                document.getElementById('my_modal_3').close()
            })
            .catch(error => {
                setUploading(false);
                console.error(error);
            });
    };

    const handelSubmit = (e) => {
        e.preventDefault()
        const firstname = e.target.firstname.value;
        const lastname = e.target.lastname.value;
        const fullname = firstname + " " + lastname;
        const email = e.target.email.value;
        const phon = e.target.phon.value;
        const address = e.target.address.value;
        const img = imageUrl;
        const userEmail = user?.email
        const time = moment().calendar()
        const data = { fullname, email, phon, address, img, userEmail, time }
        axiosData.post(`/users`, data)
            .then(res => {
                e.target.reset()
                Swal.fire({
                    title: "Good job!",
                    text: "User Added successfully",
                    icon: "success"
                });
            })
    }

    return (
        <div>
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
                                    <img class="inline-block h-16 w-16 rounded-full ring-2 ring-white dark:ring-gray-800" src={imageUrl || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'} alt="Image Description" />
                                    <div class="flex gap-x-2">
                                        <div>
                                            <button onClick={() => document.getElementById('my_modal_3').showModal()} type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                                <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                                Upload photo
                                            </button>
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
                                    <input required name='firstname' id="af-account-full-name" type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Maria" />
                                    <input required name='lastname' type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Boone" />
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
                                <input required name='email' id="af-account-email" type="email" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="maria@site.com" />
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
                                    <input required name='phon' id="af-account-phone" type="number" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="+x(xxx)xxx-xx-xx" />
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
                                <textarea required name='address' id="af-account-bio" class="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" rows="6" placeholder="Type your Address..."></textarea>
                            </div>
                        </div>
                        <div class="mt-5 flex justify-end gap-x-2">
                            <button type="submit" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                                Add your user
                            </button>
                        </div>
                    </form>
                </div>

            </div>


            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</button>
                    </form>
                    <section class="container w-full mx-auto items-center">
                        <div class="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
                            <div class="px-4 py-6">
                                {
                                    !uploading ? <div id="image-preview" class="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer">
                                        <input id="upload" onChange={handleFileChange} type="file" class="hidden" accept="image/*" />
                                        <label for="upload" class="cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-700 mx-auto mb-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                            </svg>
                                            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-700">Upload picture</h5>
                                            <p class="font-normal text-sm text-gray-400 md:px-6">Choose photo size should be less than <b class="text-gray-600">2mb</b></p>
                                            <p class="font-normal text-sm text-gray-400 md:px-6">and should be in <b class="text-gray-600">JPG, PNG, or GIF</b> format.</p>
                                            <span id="filename" class="text-gray-500 bg-gray-200 z-50"></span>
                                        </label>
                                    </div> : <div id="image-preview" class="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer">
                                        <div className="radial-progress" style={{ "--value": `${uploadProgress}`, "--size": "12rem", "--thickness": "2px" }} role="progressbar">{uploadProgress}%</div>
                                    </div>
                                }
                                <div class="flex items-center justify-center">
                                    <div class="w-full">
                                        <label onClick={uploadImageToImgBB} class="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
                                            <span class="text-center ml-2">Upload</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </dialog>

        </div>
    );
};

export default AddContract;