import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Filter.css";
import { useRef } from "react";

const Filter = ({
  dropdownRef,
  dateDropdownRef,
  toggleDropdown,
  dateDropdown,
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
                {/* Remove additional filters if not needed */}
                {/* <div className="RowItems_rowItem">
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
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
