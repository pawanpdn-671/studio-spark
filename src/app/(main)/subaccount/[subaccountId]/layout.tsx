import Infobar from "@/components/global/infobar";
import Sidebar from "@/components/sidebar";
import Unauthorized from "@/components/unauthorized";
import { getAuthUserDetails, getNotificationAndUser, verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
	children: React.ReactNode;
	params: {
		subaccountId: string;
	};
};

const SubAccountLayout = async ({ children, params }: Props) => {
	const agencyId = await verifyAndAcceptInvitation();
	if (!agencyId) return <Unauthorized />;

	const user = await currentUser();
	if (!user) {
		return redirect("/");
	}

	let notifications: any = [];

	if (!user.privateMetadata.role) {
		return <Unauthorized />;
	} else {
		const allPermission = await getAuthUserDetails();
		const hasPermission = allPermission?.Permissions?.find(
			(permission) => permission.access && permission.subAccountId === params.subaccountId,
		);

		if (!hasPermission) {
			return <Unauthorized />;
		}

		const allNotifications = await getNotificationAndUser(agencyId);

		if (user.privateMetadata.role === "AGENCY_ADMIN" || user.privateMetadata.role === "AGENCY_OWNER") {
			notifications = allNotifications;
		} else {
			const filteredNotifications = allNotifications?.filter((item) => item.subAccountId === params.subaccountId);

			if (filteredNotifications) notifications = filteredNotifications;
		}
	}

	return (
		<div className="h-screen overflow-hidden">
			<Sidebar id={params.subaccountId} type="subaccount" />
			<div className="md:pl-[300px]">
				<Infobar
					notifications={notifications}
					role={user.privateMetadata.role as Role}
					subAccountId={params.subaccountId as string}
				/>
				<div className="relative">{children}</div>
			</div>
		</div>
	);
};

export default SubAccountLayout;
