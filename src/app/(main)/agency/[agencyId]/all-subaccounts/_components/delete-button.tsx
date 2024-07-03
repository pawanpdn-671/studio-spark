"use client";
import { deleteSubaccount, getSubaccountDetails, saveActivityLogsNotification } from "@/lib/queries";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
	subaccountId: string;
};

const DeleteButton = ({ subaccountId }: Props) => {
	const router = useRouter();

	return (
		<div
			onClick={async () => {
				const response = await getSubaccountDetails(subaccountId);
				await saveActivityLogsNotification({
					agencyId: undefined,
					description: `Delete a subaccount | ${response?.name}`,
					subaccountId: subaccountId,
				});
				await deleteSubaccount(subaccountId);
				router.refresh();
			}}>
			Delete Subaccount
		</div>
	);
};

export default DeleteButton;
