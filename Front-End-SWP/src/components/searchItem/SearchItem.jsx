import { Link, useNavigate } from "react-router-dom";
import "./searchItem.css";
import CheckIcon from "@mui/icons-material/Check";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { GetbyRealestateID } from "../API/APIConfigure";
import { useAuth } from "../../hook/AuthContext";

import Swal from "sweetalert2";

const SearchItem = ({ searchResult }) => {
    const BASE_URL = "http://meokool-001-site1.ltempurl.com/";
    const [value, setValue] = useState(4);
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [userLoggedIn, setUserLoggedIn] = useState(isLoggedIn);

    useEffect(() => {
        setUserLoggedIn(isLoggedIn);
    }, [isLoggedIn]);

    const handleHotelsLinkClick = (e) => {
        if (!userLoggedIn) {
            e.preventDefault();
            Swal.fire({
                icon: "error",
                title: "Vui lòng đăng nhập để xem thông tin!",
                showConfirmButton: true,
                confirmButtonText: "Đăng nhập",
                showCancelButton: true,
                cancelButtonText: "Huỷ",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login-register");
                }
            });
            console.log("Bạn cần đăng nhập để xem Hotels.");
        }
    };
    const handleViewTimeshare = async (itemId) => {
        if (userLoggedIn) {
            try {
                const response = await GetbyRealestateID(itemId);

                const realEstate = response;

                localStorage.setItem("Realestate", JSON.stringify(realEstate));

                const photoUrls = realEstate.photo ? realEstate.photo.split(",") : [];
                localStorage.setItem("imageReal", JSON.stringify(photoUrls));
                navigate(`/timeshare/${itemId}`);
                // setRealEstateData(realEstate);
            } catch (error) {
                console.error("Error fetching real estate data", error);
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Vui lòng đăng nhập để xem thông tin!",
                showConfirmButton: true,
                confirmButtonText: "Đăng nhập",
                showCancelButton: true,
                cancelButtonText: "Huỷ",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login-register");
                }
            });
        }
    };

    return (
        <div className="ResultListPage_content">
            <section className="pb-3 max-w-screen-2xl ItemListWrapper_reponsive">
                <div className="relative min-h-screen pt-1">
                    <div className="flex flex-col gap-y-2">
                        {searchResult
                            .filter((item) => item.status === "2")
                            .map((item) => {
                                const photoUrls = item.photo ? item.photo.split(",") : [];
                                return (
                                    <div key={item.id} className="bg-white rounded-md shadow-nux-15">
                                        <article className="flex  text-grey-900 relative rounded-md">
                                            <Link
                                                to={`/hotels/${item.id}`}
                                                onClick={handleHotelsLinkClick}
                                                className="AccommodationItem_infoWrapper AccommodationItem_infoSection flex-1"
                                            >
                                                <div className="relative overflow-hidden min-h-full rounded-l-md ImageSectionWrapper_imageSectionFull__ZDCP6 w-full">
                                                    <button className="bg-white group w-full h-full inset-0 absolute cursor-pointer">
                                                        <img
                                                            className="ItemImage_itemImage__cs2RU object-cover"
                                                            src={BASE_URL + photoUrls[0]}
                                                            alt={item.name}
                                                        />
                                                    </button>
                                                </div>
                                                <div className="w-1/2 flex-1">
                                                    <div className="ItemNameSection_itemNameSection__OY3p3">
                                                        <h2 className="Heading_heading__xct3h Heading_h-m__bqwg0 ItemNameSection_nameWithFav__mi6zT">
                                                            <div className="ItemNameSection_itemNameButton__sWjFo">
                                                                <span>{item.name}</span>
                                                            </div>
                                                        </h2>
                                                    </div>
                                                    <div className="ItemLocatonSection">{item.location}</div>

                                                    <div className="ItemRatingSection">
                                                        <Rating name="simple-controlled" value={value} readOnly />
                                                    </div>
                                                </div>
                                            </Link>

                                            <div className="flex flex-col justify-between DealAreaWrapper_clickoutSectionWide__cT8ZT DealAreaWrapper_clickoutSectionFull__iYkvL w-2/5">
                                                <div className="clickout-area">
                                                    <div className="p-2 flex flex-col h-full">
                                                        <div className="flex mb-1 justify-between flex-wrap-reverse items-baseline gap-x-1">
                                                            <div className="ClickoutArea_advertiserDetailsWrapper__g2ijy">
                                                                <strong className="advertiser-name-placeholder text-m">
                                                                    Booking
                                                                </strong>
                                                            </div>
                                                        </div>
                                                        <div className="flex pb-2 gap-x-1 text-green-900 flex-wrap">
                                                            <li style={{ listStyle: "none" }}>
                                                                <div className="RateAttribute_rateAttribute__WgkCk RateAttribute_bold__4cCjF">
                                                                    <span className="leading-none inline-flex Icon_s__HT6ei transform">
                                                                        <CheckIcon
                                                                            style={{ width: "18px", height: "18px" }}
                                                                            fontSize="small"
                                                                        />
                                                                    </span>
                                                                    <span className="RateAttribute_label__daekR">
                                                                        Bao gồm ăn sáng
                                                                    </span>
                                                                </div>
                                                            </li>
                                                        </div>
                                                        <div className="flex items-center max-w-full flex-row justify-between mt-auto gap-x-2">
                                                            <div className="flex-col-reverse ClickoutArea_priceWrapper__1EX1i flex flex-col justify-between flex-shrink flex-grow">
                                                                <div className="ClickoutArea_price__eFQrA">
                                                                    <span className="flex flex-wrap-reverse items-baseline gap-x-1">
                                                                        <p className="font-bold text-grey-900 text-sm">
                                                                            {item.price.toLocaleString()}VND/Đêm
                                                                        </p>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="ClickoutAreaCTASection_buttonWrapper__BgcvI ">
                                                                <button
                                                                    className="viewTS_btn"
                                                                    onClick={() => handleViewTimeshare(item.id)}
                                                                >
                                                                    <span className="flex items-center justify-center">
                                                                        Xem timeshare
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="IntroSection_wrapper">
                                                        <p>{item.description}</p>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SearchItem;
