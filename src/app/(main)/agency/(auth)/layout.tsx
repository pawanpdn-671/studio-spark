import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="h-full flex items-center justify-center">
			<div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white p-2 text-black flex flex-col gap-1 text-sm font-medium">
				<span>test email - cokasof957@ikangou.com</span>
				<span>test password - testac123#</span>
			</div>
			{children}
		</div>
	);
};

export default AuthLayout;
