import React, { useState, useEffect, useCallback } from 'react';
import classes from './FontListPage.module.css';
import { FaSistrix, FaAngleDown } from 'react-icons/fa';
import { PageTitle } from 'common/titleComponents/TitleComponents';
import FontBoxComponent from './fontListPageComponents/FontBoxComponent';
import { axiosWithAuth, axiosWithoutAuth } from 'https/http';
import { getData } from 'https/http';
// import PageMiniManuscript from './fontListPageComponents/PageMiniManuscript';

// API로부터 받아올 데이터 타입 정의
// type FontList = {
//   fontCount: number;
//   fontListResponse: Font[];
// };
type Font = {
  font_id: string;
  kor_font_name: string;
  producer_name: string;
  font_file_url: string;
  dibCheck: boolean;
};

const FontListPage: React.FC = () => {
  window.scrollTo({ left: 0, top: 0 });

  const [fonts, setFonts] = useState<Font[]>([]); // 폰트 데이터를 위한 상태
  // 컴포넌트 마운트시 API 호출
  useEffect(() => {
    const fetch = async () => {
      const token = await getData('accessToken');
      if (!token) {
        try {
          const response = await axiosWithoutAuth.get('/font/list/NoAuth').then((r) => {
            return r;
          });
          if (response.data) {
            console.log('API로부터 받은 데이터:', response.data); // 데이터 로깅 추가
            setFonts(response.data.fontListResponse); // 상태 업데이트
          } else {
            console.log('API 응답에 fonts 프로퍼티가 없습니다.', response.data);
          }
        } catch (error) {
          console.error('API 호출 에러:', error);
        }
      } else {
        fetchFonts();
      }
    };
    fetch();
  }, []);

  // 폰트 데이터를 가져오는 함수
  const fetchFonts = async () => {
    try {
      const response = await axiosWithAuth.get('/font/list').then((r) => {
        return r;
      });
      if (response.data) {
        console.log('API로부터 받은 폰트 목록:', response.data);
        setFonts(response.data.fontListResponse); // 상태 업데이트
      } else {
        console.log('API 응답에 fonts 프로퍼티가 없습니다.', response.data);
      }
    } catch (error) {
      console.error('API 호출 에러:', error);
    }
  };

  // 폰트보기 페이지의 폰트 목록 렌더링
  const renderFontBoxes = () => {
    console.log(fonts);
    if (fonts) {
      return fonts.map((font) => (
        <FontBoxComponent
          key={font.font_id.toString()}
          id={font.font_id.toString()}
          title={font.kor_font_name}
          maker={font.producer_name}
          dib={font.dibCheck}
        />
      ));
    }
  };

  const options = [
    '단정한',
    '가지런한',
    '둥글둥글',
    '네모네모',
    '삐뚤빼뚤',
    '귀여운',
    '문서체',
    '어른같은',
    '아이같은',
    '자유로운',
  ];
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleCheckboxChange = (option: string) => {
    setCheckedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
    );
  };

  const renderFilterOptions = () => {
    return (
      <div className={classes.filterOptions}>
        {options.map((option, index) => (
          <label key={index}>
            <input
              type="checkbox"
              className={classes.checkbox}
              checked={checkedOptions.includes(option)}
              onChange={() => handleCheckboxChange(option)}
            />
            {' ' + option}
          </label>
        ))}
      </div>
    );
  };

  // const [totalPages, setTotalPages] = useState(0);
  // const [currentPage, setCurrentPage] = useState(0);
  // 폰트 필터링
  const fetchFilteredFonts = useCallback(async () => {
    // console.log('선택된 필터 옵션:', checkedOptions);
    // console.log('입력한 검색어:', searchTerm);
    // console.log('전체 폰트 수:', totalFonts);
    // console.log('페이지 인덱스 번호:', currentPage);
    // console.log('현재 페이지 번호:', currentPage + 1);
    try {
      const params = {
        // page: currentPage,
        search: searchTerm,
        keywords:
          checkedOptions.length > 0
            ? checkedOptions.join(',') // 선택된 옵션이 있을 경우, 쉼표로 구분된 문자열로 전송
            : {}, // 옵션 체크 해제 시, params 비워서 모든 데이터 요청
      };
      const response = await axiosWithoutAuth.get('/font/list/NoAuth', { params });
      if (response.data) {
        console.log('필터링 된 폰트 목록:', response.data);
        console.log('폰트 개수:', response.data.fontCount);
        setFonts(response.data.fontListResponse);
        // const totalFonts = response.data.fontCount; // 서버로부터 받은 전체 폰트 수
        // const newTotalPages = Math.ceil(totalFonts / response.data.fontListResponse.length); // 전체 페이지 수 계산
        // setTotalPages(newTotalPages); // 상태 업데이트
      }
    } catch (error) {
      console.error('폰트 목록을 가져오는데 실패했습니다:', error);
    }
  }, [searchTerm, checkedOptions]);

  // 페이지 번호 변경 핸들러
  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage);
  // };

  // 페이지 번호 버튼 렌더링 함수
  // const renderPaginationButtons = () => {
  //   const pages = Array.from({ length: totalPages }, (_, index) => index);
  //   return pages.map((pageNumber) => (
  //     <button
  //       key={pageNumber}
  //       onClick={() => handlePageChange(pageNumber)}
  //       className={pageNumber === currentPage ? classes.active : ''}
  //     >
  //       {pageNumber + 1}
  //     </button>
  //   ));
  // };

  // 검색어나 옵션 변경 시 필터링된 데이터 요청
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFilteredFonts();
    }, 500); // 타이핑을 멈춘 후 500ms 뒤 검색 수행

    return () => clearTimeout(timer); // 클린업 함수로 타이머를 제거
  }, [searchTerm, checkedOptions, fetchFilteredFonts]); // 의존성 배열 추가

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                className={`${classes.filterIcon} ${
                  showFilterOptions ? classes.filterIconActive : ''
                }`}
              />
            </div>
            {showFilterOptions && renderFilterOptions()}
          </div>
        </div>
        <div className={classes.fontBoxContainer}>{renderFontBoxes()}</div>
        <div className={classes.paginationContainer}>
          {/* 페이지네이션 자리 */}
          {/* {renderPaginationButtons()} */}
        </div>
      </div>
    </>
  );
};
export default FontListPage;
