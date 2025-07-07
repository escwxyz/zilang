import Image from "next/image";

export const Logo = () => {
	return (
		<Image
			src="/logo.svg"
			alt="logo"
			width={100}
			height={100}
			priority={true}
			unoptimized
		/>
	);
};

export const MenuIcon = () => {
	return (
		<Image
			src="/favicon.svg"
			alt="menu"
			width={100}
			height={100}
			priority={true}
			unoptimized
		/>
	);
};
