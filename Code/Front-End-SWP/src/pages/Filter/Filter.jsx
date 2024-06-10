import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Slider } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./Filter.css";
import { useRef } from "react";

const Filter = ({
  dropdownRef,
  dateDropdownRef,
  toggleDropdown,
  dateDropdown,
  priceDropdown,
  minPrice,
  selectedPriceRange,
  maxPrice,
  handlePriceChange,
  handleMinInputChange,
  handleMaxInputChange,
  resetFilter,
  handleApplyFilter,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const datePickerRef = useRef(null);
  const handleChange = (dates) => {
    const [start, end] = dates;
    if (start && end && start.getTime() === end.getTime()) {
      const newEndDate = new Date(start);
      newEndDate.setDate(newEndDate.getDate() + 1);
      setEndDate(newEndDate);
    } else {
      setStartDate(start);
      setEndDate(end);
    }
  };
  const handleButtonClick = () => {
    datePickerRef.current.setOpen(true);
    toggleDropdown("date");
  };
  return (
    <div className="top-0 sticky z-20 transition-transform durian-400 transform  search-form_condition px-5 ">
      <div>
        <div className="fresnel-container">
          <div className="mx-auto wrapper-default rep-diverse">
            <div className="RefinementRow_placeholder ">
              <div className="RowItems_itemList">
                <div className="RowItems_dateFilter">
                  <div className="RefinementRowElement" ref={dateDropdownRef}>
                    <button
                      className="RefinementRowElement_RowBtn"
                      onClick={handleButtonClick}
                    >
                      <strong className="RefinementRowElement_titleItem block">
                        Ngày
                      </strong>
                      <span
                        className={`RefinementRowElement_optionItem ${
                          dateDropdown ? "border-blue-700" : "border-grey-300"
                        }`}
                      >
                        <span className="truncate w-full lsItem flex items-center">
                          <span></span>
                          <FontAwesomeIcon
                            icon={faCalendarDays}
                            className="headerIcon"
                          />

                          <DatePicker
                            ref={datePickerRef}
                            selectsRange
                            startDate={startDate}
                            endDate={endDate}
                            onChange={handleChange}
                            placeholderText="MM/DD/YYYY - MM/DD/YYYY"
                            dateFormat="MM/dd/yyyy"
                            isClearable
                            className="date-input-range"
                          />
                        </span>
                        <span className="optionItem_plus rotate-90 transform">
                          <KeyboardArrowDownIcon />
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="RowItems_rowItem">
                  <div className="RefinementRowElement" ref={dropdownRef}>
                    <button
                      className="RefinementRowElement_RowBtn"
                      onClick={() => toggleDropdown("price")}
                    >
                      <strong className="RefinementRowElement_titleItem block">
                        Giá: <span className="font-normal">theo tiếng</span>
                      </strong>
                      <span
                        className={`RefinementRowElement_optionItem ${
                          priceDropdown ? "border-blue-700" : "border-grey-300"
                        }`}
                      >
                        <span className="truncate w-full">
                          <span></span>

                          <span>{selectedPriceRange.toLocaleString()}</span>
                        </span>
                        <span className="optionItem_plus rotate-90 transform">
                          <KeyboardArrowDownIcon />
                        </span>
                      </span>
                    </button>
                    {priceDropdown && (
                      <div className="flyout_container z-60 absolute top-0  Flyout_fadeIn opacity-0 transition-opacity durian-200 opacity-100">
                        <div className="Flyout_wrapper bg-white shadow-popover rounded rounded-sm">
                          <div className="text-m rounded-sm overflow-hidden RefinementRowElement_elementContent RefinementRowElement_extended">
                            <section className="FilterDropdown_section FilterDropdown_stickyFilters">
                              <div className="FilterDropdown_children">
                                <section className="BudgetFilter_flyoutContainer w-full bg-white border-grey-200 BudgetFilter_sizedContainer leading-normal text-l p-4 border-b">
                                  <h4 className="Heading_heading BudgetFilter_flyoutHeading mb-4">
                                    Phạm vi giá tiền
                                  </h4>
                                  <section>
                                    <div className="slider_mg">
                                      <Slider
                                        value={[minPrice, maxPrice]}
                                        onChange={handlePriceChange}
                                        valueLabelDisplay="auto"
                                        valueLabelFormat={(value) =>
                                          `${value.toLocaleString()}`
                                        }
                                        min={1000}
                                        max={100000000}
                                      ></Slider>
                                    </div>
                                    <div className="display_row">
                                      <div className="flex-1">
                                        <strong className="text-display">
                                          Giá tối thiểu
                                        </strong>
                                        <div className="PriceInput_inputContainer">
                                          <input
                                            className="PriceInput_input"
                                            type="text"
                                            min={1000}
                                            max={maxPrice}
                                            value={minPrice.toLocaleString()}
                                            onChange={handleMinInputChange}
                                          />
                                        </div>
                                      </div>
                                      <span className="flex-0 ">-</span>
                                      <div className="flex-1">
                                        <strong className="text-display">
                                          Giá tối đa
                                        </strong>
                                        <div className="PriceInput_inputContainer">
                                          <input
                                            className="PriceInput_input"
                                            type="text"
                                            min={minPrice}
                                            max={100000000}
                                            value={maxPrice.toLocaleString()}
                                            onChange={handleMaxInputChange}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                </section>
                              </div>
                              <footer className="FilterDropdown_footer FilterDropdown_ifVisible">
                                <button
                                  onClick={resetFilter}
                                  className="FilterDropdown_resetBtn"
                                >
                                  Đặt lại
                                </button>
                                <button
                                  onClick={handleApplyFilter}
                                  className="FilterDropdown_applyBtn"
                                >
                                  Áp dụng
                                </button>
                              </footer>
                            </section>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="RowItems_rowItem">
                  <div className="RefinementRowElement">
                    <button className="RefinementRowElement_RowBtn">
                      <strong className="RefinementRowElement_titleItem block">
                        Filter
                      </strong>
                      <span className="RefinementRowElement_optionItem border-grey-300">
                        <span className="truncate w-full">
                          <span></span>
                          <span>Select</span>
                        </span>
                        <span className="optionItem_plus rotate-90 transform">
                          <KeyboardArrowDownIcon />
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="RowItems_rowItem">
                  <div className="RefinementRowElement">
                    <button className="RefinementRowElement_RowBtn">
                      <strong className="RefinementRowElement_titleItem block">
                        Filter
                      </strong>
                      <span className="RefinementRowElement_optionItem border-grey-300">
                        <span className="truncate w-full">
                          <span></span>
                          <span>Select</span>
                        </span>
                        <span className="optionItem_plus rotate-90 transform">
                          <KeyboardArrowDownIcon />
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="RowItems_rowItem">
                  <div className="RefinementRowElement">
                    <button className="RefinementRowElement_RowBtn">
                      <strong className="RefinementRowElement_titleItem block">
                        Filter
                      </strong>
                      <span className="RefinementRowElement_optionItem border-grey-300">
                        <span className="truncate w-full">
                          <span></span>
                          <span>Select</span>
                        </span>
                        <span className="optionItem_plus rotate-90 transform">
                          <KeyboardArrowDownIcon />
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
