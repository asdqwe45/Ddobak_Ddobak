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
import MainPageMiniManuscript from './mainPageComponents/MainPageMiniManuscript';
const MainPage: React.FC = () => {
  return (
    <main className={classes.container}>
      <MainLargePage></MainLargePage>
      <MainLargePage></MainLargePage>
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
