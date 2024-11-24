const routes = {
    '/': 'AutoSoft',
    '/catalog/vehicles': 'Каталог автомобили',
    '/catalog/vehicles/:id': 'Детайли',
    '/vehicle/create': 'Добавяне на автомобил',
    '/catalog/vehicles/edit/:id': 'Редактиране на автомобил',
    '/user/my-profile': 'Моят проявил',
    '/auth/login': 'Вход',
    '/auth/register': 'Регистрация',
    '/auth/logout': 'Изход',
    '/about': 'За нас',
    '/contacts': 'Свържете се с нас',
    "/403": '403 Нямате право да достъпите тази страница',
    "/404": '404 Страницата не беше намерена',

};

export const seTabTitle = (pathname) => {
    if (pathname === '/') {
        document.title = routes[pathname];
    } else if (pathname.includes('catalog/vehicles/edit/')) {
        document.title = `${routes['/']} - ${routes['/catalog/vehicles/edit/:id']}`;
    } else if (pathname.includes('/catalog/vehicles/')) {
        document.title = `${routes['/']} - ${routes['/catalog/vehicles/:id']}`;
    } else {
        document.title = `${routes['/']} - ${routes[pathname]}`;
    }
};