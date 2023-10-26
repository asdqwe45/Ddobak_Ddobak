import React, { useState } from "react";
import classes from "./FontListPage.module.css"
import { FaSistrix, FaAngleDown } from 'react-icons/fa';
import FontBoxComponent from "./fontListPageComponents/FontBoxComponent";

const FontListPage: React.FC = () => {
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const renderFontBoxes = () => {
    const fonts = [
      { id: '1', title: '또박또박_테스트체_1', maker: '김싸피_1', content: '다람쥐 헌 쳇바퀴에 타고파_1' },
      { id: '2', title: '또박또박_테스트체_2', maker: '이싸피_2', content: '다람쥐 헌 쳇바퀴에 타고파_2' },
      { id: '3', title: '또박또박_테스트체_3', maker: '박싸피_3', content: '다람쥐 헌 쳇바퀴에 타고파_3' },
      { id: '4', title: '또박또박_테스트체_4', maker: '최싸피_4', content: '다람쥐 헌 쳇바퀴에 타고파_4' },
      { id: '5', title: '또박또박_테스트체_5', maker: '정싸피_5', content: '다람쥐 헌 쳇바퀴에 타고파_5' },
      { id: '6', title: '또박또박_테스트체_6', maker: '양싸피_6', content: '다람쥐 헌 쳇바퀴에 타고파_6' },
      { id: '7', title: '또박또박_테스트체_7', maker: '위싸피_7', content: '다람쥐 헌 쳇바퀴에 타고파_7' },
      { id: '8', title: '또박또박_테스트체_8', maker: '안싸피_8', content: '다람쥐 헌 쳇바퀴에 타고파_8' },
    ];

    return fonts.map((font) => (
      <FontBoxComponent
        key={font.id}
        id={font.id}
        title={font.title}
        maker={font.maker}
        content={font.content}
      />
    ));
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
