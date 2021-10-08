// assets
import { IconKey, IconReceipt2, IconBug, IconBellRinging, IconPhoneCall, IconBrandProducthunt } from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconReceipt2,
    IconBug,
    IconBellRinging,
    IconPhoneCall,
    IconBrandProducthunt
};

// ===========================|| EXTRA PAGES MENU ITEMS ||=========================== //

const pages = {
    id: 'pages',
    title: 'Menu',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'product',
            title: 'Productos',
            type: 'item',
            url: '/productos',
            target: false,
            icon: icons.IconBrandProducthunt,
        },
        {
            id: 'ventas',
            title: 'Ventas',
            type: 'item',
            url: '/ventas',
            target: false,
            icon: icons.IconBrandProducthunt,
        },
        {
            id: 'authentication',
            title: 'Authentication',
            type: 'collapse',
            icon: icons.IconKey,
            children: [
                {
                    id: 'login3',
                    title: 'Login',
                    type: 'item',
                    url: '/pages/login/login3',
                    target: true
                },
                {
                    id: 'register3',
                    title: 'Register',
                    type: 'item',
                    url: '/pages/register/register3',
                    target: true
                }
            ]
        }
    ]
};

export default pages;
