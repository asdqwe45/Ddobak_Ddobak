import classes from './MainPage.module.css';
import {
  MainLargePage,
  MainFooter,
  MainFooterHeader,
  MainFooterText,
  MainFooterBetween,
  MainFooterMiddle,
  MainFooterBetweenInnerBox,
} from './mainPageComponents/MainPageComponents';
// 조금 큰 컴포넌트
import MainPageMiniManuscript from './mainPageComponents/MainPageMiniManuscript';
import MainPageLargeManuscript from './mainPageComponents/MainPageLargeManuscript';

const MainPage: React.FC = () => {
  return (
    <main className={classes.container}>
      {/* 첫 번째 메인 페이지 */}
      <MainLargePage>
        <MainPageLargeManuscript />
      </MainLargePage>
      {/* 두 번째 메인 페이지 */}
      <MainLargePage></MainLargePage>
      {/* 세 번째 메인 페이지 */}
      <MainLargePage></MainLargePage>
      <MainFooter>
        <MainFooterBetween>
          <MainFooterBetweenInnerBox>
            <MainFooterText>LEE JI EUN</MainFooterText>
            <MainFooterText>LEE TAE SEONG</MainFooterText>
            <MainFooterText>LEE JAE MYEONG</MainFooterText>
          </MainFooterBetweenInnerBox>
        </MainFooterBetween>
        <MainFooterMiddle>
          <MainFooterHeader>또박또박 고객문의</MainFooterHeader>
          <MainFooterText>"원고지를 클릭하시면 구글폼으로 연결됩니다."</MainFooterText>
          <MainPageMiniManuscript />
        </MainFooterMiddle>
        <MainFooterBetween>
          <MainFooterBetweenInnerBox>
            <MainFooterText>KIM JIN JU</MainFooterText>
            <MainFooterText>LEE MIN KYU</MainFooterText>
            <MainFooterText>LEE KYU MIN</MainFooterText>
          </MainFooterBetweenInnerBox>
        </MainFooterBetween>
      </MainFooter>
    </main>
  );
};

export default MainPage;
