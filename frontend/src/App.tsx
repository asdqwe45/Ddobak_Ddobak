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
import PontListPage from './pages/pontListPage/PontListPage';
import ProductPage from './pages/productPage/ProductPage';
import QuestionPage from './pages/questionPage/QuestionPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <WrongPage />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/myPage', element: <MyPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signUp', element: <SignupPage /> },
      { path: '/pontList', element: <PontListPage /> },
      { path: '/product', element: <ProductPage /> },
      { path: '/question', element: <QuestionPage /> },
    ],
  },
]);
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
