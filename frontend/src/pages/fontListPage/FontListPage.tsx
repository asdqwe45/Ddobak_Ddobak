import React, { useState } from "react";
import classes from "./FontListPage.module.css"
import { FaSistrix, FaAngleDown } from 'react-icons/fa';
import FontBoxComponent from "./fontListPageComponents/FontBoxComponent";

const FontListPage: React.FC = () => {
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const renderFontBoxes = () => {
    console.log("Rendering filter options");
    return Array(8).fill(null).map((_, index) => <FontBoxComponent key={index} />);
  }

  const options = ["단정한", "가지런한", "둥글둥글", "네모네모", "삐뚤빼뚤", "귀여운", "문서체", "어른같은", "아이같은", "자유로운"];

  const renderFilterOptions = () => {
    return (
      <div className={classes.filterOptions}>
        {options.map((option, index) => (
          <label key={index}>
            <input type="checkbox" className={classes.checkbox} />
            {" " + option}
          </label>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className={classes.topContainer}>
        <div className={classes.pageName}>
          <span>모든 폰트</span>
        </div>
        <div className={classes.searchBar}>
          <input
            type="text"
            placeholder="폰트명, 제작자 검색"
          // value={searchTerm}
          // onChange={e => setSearchTerm(e.target.value)}
          />
          <FaSistrix size={24} color="black" />
        </div>
        <div className={classes.filterBarWrapper}>
          <div
            className={`${classes.filterBar} ${showFilterOptions ? classes.filterBarActive : ""}`}
            onClick={() => setShowFilterOptions(!showFilterOptions)}
          >
            폰트 필터링
            <FaAngleDown size={22} color="gray" style={{ marginLeft: '4px' }} className={`${classes.filterIcon} ${showFilterOptions ? classes.filterIconActive : ""}`} />
          </div>
          {showFilterOptions && renderFilterOptions()}
        </div>
      </div>

      <div className={classes.fontBoxContainer}>
        {renderFontBoxes()}
      </div>

    </>
  )
}
export default FontListPage
