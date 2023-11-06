import React, { useState, useEffect } from 'react';
import classes from './FontListPage.module.css';
import { FaSistrix, FaAngleDown } from 'react-icons/fa';
import { PageTitle } from 'common/titleComponents/TitleComponents';
import FontBoxComponent from './fontListPageComponents/FontBoxComponent';
import { axiosWithAuth } from 'https/http';
// import MiniManuscript from './fontListPageComponents/MiniManuscript';


// API로부터 받아올 폰트 데이터의 타입을 정의
type Font = {
  font_id: bigint;
  kor_font_name: string;
  producer_name: string;
};

const FontListPage: React.FC = () => {
  window.scrollTo({ left: 0, top: 0 })

  const [fonts, setFonts] = useState<Font[]>([]); // 폰트 데이터를 위한 상태

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

  // 컴포넌트 마운트시 API 호출
  useEffect(() => {
    fetchFonts();
  }, []);


  // 폰트 데이터를 가져오는 함수
  const fetchFonts = async () => {
    try {
      const response = await axiosWithAuth.get('/font/list')
      .then((r) => { return r });
      if (response.data) {
        console.log("API로부터 받은 데이터:", response.data); // 데이터 로깅 추가
        setFonts(response.data); // 상태 업데이트
      } else {
        console.log("API 응답에 fonts 프로퍼티가 없습니다.", response.data); // 경고 로그 추가
      }
    } catch (error) {
      console.error('API 호출 에러:', error); // 에러 로깅 개선
    }
  };

  // 현재 페이지의 폰트 목록을 렌더링
  const renderFontBoxes = () => {
    return fonts.map((font) => (
      <FontBoxComponent
        key={font.font_id.toString()}
        id={font.font_id}
        title={font.kor_font_name}
        maker={font.producer_name}
      />
    ));
  };

  // // 페이지 번호 생성 함수
  // const renderMiniManuscriptPagination = () => {
  //   const pageCount = Math.ceil(getFilteredFonts().length / ITEMS_PER_PAGE);
  //   const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  //   return (
  //     <MiniManuscript
  //       pages={pages}
  //       currentPage={currentPage}
  //       onPageChange={setCurrentPage}
  //     />
  //   );
  // };

  const options = ['단정한', '가지런한', '둥글둥글', '네모네모', '삐뚤빼뚤', '귀여운', '문서체', '어른같은', '아이같은', '자유로운',];

  const renderFilterOptions = () => {
    return (
      <div className={classes.filterOptions}>
        {options.map((option, index) => (
          <label key={index}>
            <input type="checkbox" className={classes.checkbox} />
            {' ' + option}
          </label>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.topContainer}>
          <PageTitle>
            <span>모든 폰트</span>
          </PageTitle>
          <div className={classes.searchBar}>
            <input
              type="text"
              placeholder="폰트명, 제작자 검색"
            // value={searchTerm}
            // onChange={(e) => {
            //   setSearchTerm(e.target.value);
            //   setCurrentPage(1); // 검색시에는 항상 첫 페이지로 리셋
            // }}
            />
            <FaSistrix size={24} color="black" />
          </div>
          <div className={classes.filterBarWrapper}>
            <div
              className={`${classes.filterBar} ${showFilterOptions ? classes.filterBarActive : ''}`}
              onClick={() => setShowFilterOptions(!showFilterOptions)}
            >
            폰트 필터링
            <FaAngleDown
              size={22}
              color="gray"
              style={{ marginLeft: '4px' }}
            // className={`${classes.filterIcon} ${showFilterOptions ? classes.filterIconActive : ''
            //   }`}
            />
          </div>
          {showFilterOptions && renderFilterOptions()}
        </div>
      </div>
      <div className={classes.fontBoxContainer}>{renderFontBoxes()}</div>
      {/* <div className={classes.paginationContainer}>{renderMiniManuscriptPagination()}</div> */}
      </div>
    </>
  )
};
export default FontListPage
