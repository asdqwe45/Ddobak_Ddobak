import classes from './PageMiniManuscript.module.css';

interface PageMiniManuscriptProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PageMiniManuscript: React.FC<PageMiniManuscriptProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // 페이지 번호 생성 로직
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={classes.paginationWrapper}>
      <div className={classes.manuscriptLargeBox}>
        {/* 상 */}
        <div className={classes.manuscriptLine}></div>
        {/* 중 */}
        <div className={classes.manuscriptMiddleBox}>
          <div className={classes.manuscriptSmallBetweenBoxLeft}></div>
          {/* 페이지 번호를 동적으로 생성하고 클릭 이벤트를 할당합니다. */}
          {pageNumbers.map((number) => (
            <div
              key={number}
              className={`${classes.manuscriptSmallBox} ${
                currentPage === number ? classes.active : ''
              }`}
              onClick={() => onPageChange(number - 1)} // 페이지 번호를 인덱스로 변환하여 호출
            >
              <p
                className={`${classes.manuscriptText} ${
                  currentPage + 1 === number ? classes.manuscriptTextActive : ''
                }`}
              >
                {number}
              </p>
            </div>
          ))}
          <div className={classes.manuscriptSmallBetweenBoxRight}></div>
        </div>
        {/* 하 */}
        <div className={classes.manuscriptLine}></div>
      </div>
    </div>
  );
};
export default PageMiniManuscript;
