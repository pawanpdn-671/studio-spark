import BlurPage from "@/components/global/blur-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getStripeOAuthLink } from "@/lib/utils";
import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
	searchParams: {
		state: string;
		code: string;
	};
	params: {
		subaccountId: string;
	};
};

const LaunchPad = async ({ searchParams, params }: Props) => {
	const subaccountDetails = await db.subAccount.findUnique({
		where: {
			id: params.subaccountId,
		},
	});

	if (!subaccountDetails) {
		return;
	}

	const allDetailsExist =
		subaccountDetails.address &&
		subaccountDetails.subAccountLogo &&
		subaccountDetails.city &&
		subaccountDetails.companyEmail &&
		subaccountDetails.companyPhone &&
		subaccountDetails.country &&
		subaccountDetails.name &&
		subaccountDetails.state &&
		subaccountDetails.zipCode;

	const stripeOAuthLink = getStripeOAuthLink("subaccount", `launchpad___${subaccountDetails.id}`);

	let connectedStripeAccount = false;

	if (searchParams.code) {
		if (!subaccountDetails.connectAccountId) {
			try {
				const response = await stripe.oauth.token({
					grant_type: "authorization_code",
					code: searchParams.code,
				});
				await db.subAccount.update({
					where: {
						id: params.subaccountId,
					},
					data: {
						connectAccountId: response.stripe_user_id,
					},
				});
				connectedStripeAccount = true;
			} catch (error) {
				console.log("couldn't connect stripe account");
			}
		}
	}

	return (
		<BlurPage>
			<div className="flex flex-col justify-center items-center">
				<div className="w-full h-full max-w-[800px]">
					<Card className="border-none">
						<CardHeader>
							<CardTitle>Lets get started</CardTitle>
							<CardDescription>Follow up the steps below to get your account setup.</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col gap-4">
							<div className="flex justify-between items-center w-full p-4 rounded-lg gap-2 border">
								<div className="flex md:items-center gap-4 flex-col md:!flex-row">
									<Image
										src="/appstore.png"
										alt="app logo"
										height={80}
										width={80}
										className="rounded-md object-contain"
									/>
									<p>Save the website as a shortcut on your mobile device.</p>
								</div>
								<Button>Start</Button>
							</div>
							<div className="flex justify-between items-center w-full p-4 rounded-lg gap-2 border">
								<div className="flex md:items-center gap-4 flex-col md:!flex-row">
									<Image
										src="/stripelogo.png"
										alt="app logo"
										height={80}
										width={80}
										className="rounded-md object-contain"
									/>
									<p>Connect your stripe account to accept payments and see your dashboard.</p>
								</div>
								{subaccountDetails.connectAccountId || connectedStripeAccount ? (
									<CheckCircleIcon size={50} className="text-primary p-2 flex-shrink-0" />
								) : (
									<Link className="bg-primary py-2 px-4 rounded-md text-white" href={stripeOAuthLink}>
										Start
									</Link>
								)}
							</div>
							<div className="flex justify-between items-center w-full p-4 rounded-lg gap-2 border">
								<div className="flex md:items-center gap-4 flex-col md:!flex-row">
									<Image
										src={subaccountDetails.subAccountLogo}
										alt="app logo"
										height={80}
										width={80}
										className="rounded-md object-contain"
									/>
									<p>Fill in all your business details</p>
								</div>
								{allDetailsExist ? (
									<CheckCircleIcon className="text-primary p-2 flex-shrink-0" size={50} />
								) : (
									<Link
										href={`/subaccount/${subaccountDetails.id}/settings`}
										className="bg-primary py-2 px-4 rounded-md text-white">
										Start
									</Link>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</BlurPage>
	);
};

export default LaunchPad;
