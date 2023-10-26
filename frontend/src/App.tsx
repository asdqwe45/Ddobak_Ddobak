import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// layout
import RootLayout from './rootLayout/RootLayout';

// error
import WrongPage from './wrongPage/WrongPage';

// pages
import MainPage from './pages/mainPage/MainPage';
import MyPage from './pages/myPage/MyPage';
import LoginPage from './pages/loginPage/LoginPage';
import SignupPage from './pages/signupPage/SignupPage';
import FontListPage from './pages/fontListPage/FontListPage';
import FontMakePage from './pages/fontMakePage/FontMakePage';
import FaqPage from './pages/faqPage/FaqPage';
import MakerPage from 'pages/makerPage/MakerPage';

// components
import FontDetailPage from './componentPages/fontDetailComponent/FontDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <WrongPage />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/myPage', element: <MyPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      { path: '/fontList', element: <FontListPage /> },
      { path: '/font/:fontId', element: <FontDetailPage /> }, 
      { path: '/fontMake', element: <FontMakePage /> },
      { path: '/faqPage', element: <FaqPage /> },
      { path: '/maker', element: <MakerPage /> },
    ],
  },
]);
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
