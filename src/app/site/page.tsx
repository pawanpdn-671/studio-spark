import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingCards } from "@/lib/constants";
import { stripe } from "@/lib/stripe";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	const prices = await stripe.prices.list({
		product: process.env.NEXT_STUDIO_SPARK_PRODUCT_ID,
		active: true,
	});
	return (
		<>
			<section className="h-full w-full pt-36 relative flex items-center justify-center flex-col ">
				<div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
				<p className="text-center">Run your agency, in one place</p>
				<div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
					<h1 className="font-bold text-center text-6xl sm:text-[100px] lg:text-[150px] xl:text-[200px] 2xl:text-[250px]">
						StudioSpark
					</h1>
				</div>
				<div className="flex justify-center items-center relative md:mt-[-40px] lg:mt-[-60px] xl:mt-[-80px] 2xl:mt-[-100px]">
					<Image
						src={"/assets/preview.png"}
						alt="banner image"
						height={1200}
						width={1200}
						className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
					/>
					<div className="bottom-0 top-1/2 bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
				</div>
			</section>

			<section className="flex justify-center flex-col gap-4 mt-[-60px] md:!mt-20 pb-20">
				<h2 className="text-4xl text-center">Choose what fits you right</h2>
				<p className="text-muted-foreground text-center">
					Our straightforward pricing model is designed to fit your needs. If {" you're "} not <br /> ready to
					commit you can get started for free.
				</p>
				<div className="flex justify-center gap-4 flex-wrap mt-6">
					{prices.data?.map((card) => (
						<Card
							key={card.nickname}
							className={clsx("w-[300px] flex flex-col justify-between", {
								"border-2 border-primary": card.nickname === "Unlimited SaaS",
							})}>
							<CardHeader>
								<CardTitle
									className={clsx("", { "text-muted-foreground": card.nickname !== "Unlimited Saas" })}>
									{card.nickname}
								</CardTitle>
								<CardDescription>
									{pricingCards.find((c) => c.title === card.nickname)?.description}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<span className="text-4xl font-bold">${card.unit_amount && card.unit_amount / 100}</span>
								<span className="text-muted-foreground">/ {card.recurring?.interval}</span>
							</CardContent>
							<CardFooter className="flex flex-col items-start gap-4">
								<div>
									{pricingCards
										.find((c) => c.title === card.nickname)
										?.features.map((feature) => (
											<div key={feature} className="flex gap-2 items-center">
												<Check className="text-muted-foreground" />
												<p>{feature}</p>
											</div>
										))}
								</div>
								<Link
									href={`/agency?plan=${card.id}`}
									className={clsx("w-full text-white text-center bg-primary p-2 rounded-md", {
										"!bg-muted-foreground": card.nickname !== "Unlimited SaaS",
									})}>
									Get Started
								</Link>
							</CardFooter>
						</Card>
					))}
					<Card className={clsx("w-[300px] flex flex-col justify-between")}>
						<CardHeader>
							<CardTitle className={clsx("", { "text-muted-foreground": true })}>
								{pricingCards[0].title}
							</CardTitle>
							<CardDescription>
								{pricingCards.find((c) => c.title === pricingCards[0].title)?.description}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<span className="text-4xl font-bold">{pricingCards[0].price}</span>
							<span className="text-muted-foreground">/ month</span>
						</CardContent>
						<CardFooter className="flex flex-col items-start gap-4">
							<div>
								{pricingCards
									.find((c) => c.title === "Starter")
									?.features.map((feature) => (
										<div key={feature} className="flex gap-2 items-center">
											<Check className="text-muted-foreground" />
											<p>{feature}</p>
										</div>
									))}
							</div>
							<Link
								href={`/agency`}
								className={clsx("w-full text-center text-white bg-primary p-2 rounded-md", {
									"!bg-muted-foreground": pricingCards[0].title !== "Unlimited SaaS",
								})}>
								Get Started
							</Link>
						</CardFooter>
					</Card>
				</div>
			</section>
		</>
	);
}
