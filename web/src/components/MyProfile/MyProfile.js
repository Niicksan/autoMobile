import './MyProfile.scss';

import { useEffect, useState } from 'react';

import { imageUrl } from '../../env';

import { userServiceFactory } from '../../services/userService';

import { Loader } from "../Loader/Loader";

export const MyProfile = () => {
    const [profileData, setProfileData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const userService = userServiceFactory();

    useEffect(() => {
        setIsLoading(true);
        userService.getUserInfo()
            .then(result => {
                setProfileData(result);
                setIsLoading(false);
            })
    }, []);

    const date = new Date(profileData?.createdAt);
    const createdAt = date.toLocaleDateString('Us-us', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <>
            {isLoading && (<Loader />)}
            {!isLoading && (<main className="profile">
                <div className="grid-header">
                    <h1>My Profile</h1>
                </div>
                <div className="my-profile">
                    <div className="image-holder">
                        <img src={profileData?.imageUrl ? `${imageUrl}/users/${profileData?.imageUrl}` : ''} alt={profileData?.companyName} />
                    </div>
                    <div className="user-info">
                        <div className="key-value">
                            <p className="left">Company name: </p>
                            <p className="right">{profileData?.companyName}</p>
                        </div>
                        <div className="key-value">
                            <p className="left">Email: </p>
                            <p className="right">{profileData?.email}</p>
                        </div>
                        <div className="key-value">
                            <p className="left">Created on: </p>
                            <p className="right">{createdAt}</p>
                        </div>
                    </div>
                </div>
            </main>)}
        </>
    );
};