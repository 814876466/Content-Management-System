import {
    EditOutlined,
    ScissorOutlined,
    HomeOutlined ,
    UserOutlined
} from '@ant-design/icons';

const MenuArr =[
    {
        title:'Home',
        icon :HomeOutlined,
        permission:1, 
        path:'/home'
    },
    {
        title:"User Management",
        icon:UserOutlined,
        permission:3,
        path:"/user-manage",
        children:[
            {
                title:"User List",
                permission:3,
                path:"/user-manage/users"
            }
        ]
    },
    {
        title:"Right Management",
        permission:3,
        path:"/right-manage",
        icon:ScissorOutlined,
        children:[
            {
                title:"Role List",
                path:"/right-manage/roles",
                permission:3
            },
            {
                title:"Right List",
                path:"/right-manage/rights",
                permission:3
            }
        ]
    },
    {
        title:"Article Management",
        icon: EditOutlined,
        path:"/article-manage",
        permission:1,
        children:[
            {
                title:"Article List",
                permission:1,
                path:"/article-manage/list"
            },
            {
                title:"Article Category",
                permission:2,
                path:"/article-manage/category"
            }
        ]
    }
]
export default MenuArr
