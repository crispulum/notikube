'use client'

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";

const DeleteAccount = () => {

    const router = useRouter();

    const session = useSession().data;
    const userId = session?.user?.userid;

    function handleClick() {
        if (confirm('Deleting user account will remove all data associated with this account. This action cannot be undone. Do you wish to continue deleting your account?')) {
            fetch('http://localhost:3000/api/updateUser/removeAccount', {
                method: 'POST',
                body: JSON.stringify({user_id: userId})
            })
            signOut();
        }
    }


    return (
        <button onClick={handleClick} className="text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-40 mt-4 shadow-lg">Delete Account</button>
    )



}

export default DeleteAccount;