// /src/components/NavBar.tsx

import AppLogo from './AppLogo';
// import UserInfo from './UserInfos';

import { useAuth } from '../hooks/useAuth';
import RegisterButton from './auth/RegisterButton';
import LoginButton from './auth/LoginButton';
import LogoutButton from './auth/LogoutButton';
import UserInfos from './auth/UserInfos';
// import LoginButton from './auth/LoginButton';
// import RegisterButton from './auth/RegisterButton';
// import LogoutButton from './auth/LogoutButton';
// import WishlistButton from './wishlist/WishlistButton';
// import CartButton from './cart/CartButton';
// import OrdersButton from './order/OrdersButton';
// import DarkModeToggle from './DarkModeButton';

export default function NavBar() {
	const { isAuthenticated } = useAuth();

	return (
		<div className="bg-bg sticky top-0 z-50 w-full shadow-sm">
			<div className="mx-auto flex max-w-7xl flex-row items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-8">
					<AppLogo />
				</div>
				{isAuthenticated() ? (
					<div className="flex items-center gap-8">
						<UserInfos />
						{/* 
						<OrdersButton /> */}
						{/* 
						<CartButton />
						<WishlistButton /> */}
						<LogoutButton />
					</div>
				) : (
					<div className="flex items-center gap-8">
						<LoginButton />
						<RegisterButton />
					</div>
				)}
			</div>
		</div>
	);
}
