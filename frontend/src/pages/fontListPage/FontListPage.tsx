import React from "react"
import classes from "./FontListPage.module.css"
import { FaSistrix } from 'react-icons/fa';
import FontBoxComponent from "./fontListPageComponents/FontBoxComponent";

const FontListPage: React.FC = () => {

  const renderFontBoxes = () => {
    return Array(8).fill(null).map((_, index) => <FontBoxComponent key={index} />);
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
      </div>
      <div className={classes.fontBoxContainer}>
        {renderFontBoxes()}
      </div>

    </>
  )
}
export default FontListPage
