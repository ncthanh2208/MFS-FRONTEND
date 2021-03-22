import HomePage from '../page/HomePage';
import SignUpPage from '../page/SignUpPage';
import DashPage from '../page/DashBoard'
import FileView from '../components/files/viewfile/file'
import UserPage from '../page/UserPage'
import UpLoadPage from '../page/UpFilePage'
import CategoryPage from '../page/CategoryPage'
import UpdateUserPage from'../page/UpdateUserPage'
import FileUpdatePage from '../page/FileUpdatePage'
const routerIndex = [
    {
        path: '/',
        exact: true,
        components: HomePage,
    },
    {
        path: '/register',
        exact: true,
        components: SignUpPage,
    },
    {
        path: '/admin',
        exact: true,
        components: DashPage,
    },
    {
        path: '/file/:id',
        exact: true,
        components: FileView,
    },
    {
        path: '/user/:userName',
        exact: true,
        components: UserPage,
    },
    {
        path:'/upload',
        exact:true,
        components: UpLoadPage,
    },
    {
        path:'/category/:categoryName',
        exact: true,
        components: CategoryPage,

    },
     {
        path:'/update/:userName',
        exact: true,
        components: UpdateUserPage,

    },
    {
       path:'/update/file/:id',
       exact: true,
       components: FileUpdatePage,

   }
];

export default routerIndex;
