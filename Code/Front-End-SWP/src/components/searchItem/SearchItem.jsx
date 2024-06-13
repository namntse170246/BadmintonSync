import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Swal from 'sweetalert2';
import { useAuth } from '../../hook/AuthContext';
import { GetbyRealestateID } from "../API/APIConfigure";
import './searchItem.css';

const SearchItem = ({ searchResult }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn);

    useEffect(() => {
        setUserLoggedIn(isLoggedIn);
    }, [isLoggedIn]);

    const handleViewCourt = async (courtId) => {
        if (userLoggedIn) {
            try {
                const response = await GetbyRealestateID(courtId);
                const courtDetails = response;

                localStorage.setItem('CourtDetails', JSON.stringify(courtDetails));
                const photoUrls = courtDetails.photo ? courtDetails.photo.split(',') : [];
                localStorage.setItem('imageCourt', JSON.stringify(photoUrls));
                navigate(`/court/${courtId}`);
            } catch (error) {
                console.error('Error fetching court details', error);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Vui lòng đăng nhập để xem thông tin!',
                showConfirmButton: true,
                confirmButtonText: 'Đăng nhập',
                showCancelButton: true,
                cancelButtonText: 'Huỷ',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login-register');
                }
            });
        }
    };

    return (
        <div className="ResultListPage_content">
            <section className="pb-3 max-w-screen-2xl ItemListWrapper_reponsive">
                <div className="relative min-h-screen pt-1">
                    <div className="flex flex-wrap gap-6 justify-center">
                        {searchResult.map((court) => (
                            <div key={court.courtId} className="court-card">
                                <article className="flex flex-col text-grey-900 relative rounded-md">
                                    <Link
                                        to={`/courts/${court.courtId}`}
                                        onClick={handleViewCourt}
                                        className="flex flex-col justify-between"
                                    >
                                        <div className="relative overflow-hidden rounded-t-md">
                                            <button className="bg-white group w-full h-48 cursor-pointer">
                                                <img
                                                    className="object-cover w-full h-full"
                                                    src={court.image}
                                                    alt={court.courtName}
                                                />
                                            </button>
                                        </div>
                                        <div className="p-4 flex flex-col">
                                            <div className="font-bold text-xl mb-2">{court.courtName}</div>
                                            <div className="text-gray-700 mb-4">{court.location}</div>
                                            <Rating
                                                name="court-rating"
                                                value={court.evaluates.length > 0 ? court.evaluates[0].rating : 0}
                                                readOnly
                                            />
                                        </div>
                                    </Link>
                                </article>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SearchItem;
