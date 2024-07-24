import BlurPage from "@/components/global/blur-page";
import React from "react";

type Props = {};

const page = (props: Props) => {
	return (
		<BlurPage>
			<h1 className="text-4xl p-4">Automations</h1>
			<p className="mt-10 text-center text-muted-foreground">No data found</p>
		</BlurPage>
	);
};

export default page;
