import { GetServerSideProps, NextPage } from "next";
import { UserCredentials, UserInfoComponent, UserSchedule } from "../../../../components/userDashboard";
import { db } from "../../../../lib/database";
import { AppointmentData } from "../../../api/dbquery/booking/appointment";
import React from "react";
export type UserProps = {
	firstName: string;
	lastName: string;
	birthday: string;
	street: string;
	zipCode: string;
	city: string;
};
export type AppointmentProps = {
	timestamp: string;
	typeOfRequest: string;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { id } = ctx.params as { id: string };
	let appointmentResopnseData;
	try {
		const appointmentData = (await db.appointment.findMany({
			orderBy: {
				timestamp: "asc",
			},
			where: {
				userId: id,
				timestamp: {
					gte: new Date().getTime() / 1000,
				},
			},
			select: {
				timestamp: true,
				typeOfRequest: true,
			},
		})) as unknown as AppointmentData[];

		appointmentResopnseData = appointmentData.map((e) => {
			return {
				...e,
				timestamp: e.timestamp.toFixed(),
			};
		});
	} catch (error) {
		console.error("appointmentError", error);
	}

	let zipCode;
	let personalData;

	try {
		personalData = await db.user.findFirst({
			where: {
				uuid: id,
			},
			select: {
				firstname: true,
				surname: true,
				birthday: true,
				address: true,
				zipcode: true,
				city: true,
			},
		});

		zipCode = personalData?.zipcode?.toFixed();

		if (zipCode!.length < 5) {
			for (let i = zipCode!.length; i < 5; i++) {
				zipCode = `0${zipCode}`;
			}
		}
	} catch (error) {
		console.error("Personal Data Error", error);
	}

	return {
		props: {
			scheduleData: appointmentResopnseData,
			personalData: {
				firstName: personalData?.firstname,
				lastName: personalData?.surname,
				birthday: `${personalData?.birthday?.getFullYear()}-${personalData?.birthday?.getMonth()! + 1}-${
					personalData?.birthday?.getDate()! < 10
						? `0${personalData?.birthday!.getDate()}`
						: personalData?.birthday!.getDate()
				}`,
				street: personalData?.address,
				zipCode: zipCode,
				city: personalData?.city,
			},
		},
	};
};

const DashboardPage: NextPage<{ personalData: UserProps; scheduleData: AppointmentProps[] }> = ({
	personalData,
	scheduleData,
}) => {
	return (
		<div className={"p-8 flex-grow flex flex-col w-full"}>
			<div className={"gap-8 flex-grow grid xl:grid-cols-2"}>
				<>
					<UserSchedule initData={scheduleData} />
					<UserCredentials initData={personalData} />
					<UserInfoComponent />
				</>
			</div>
		</div>
	);
};

export default DashboardPage;
