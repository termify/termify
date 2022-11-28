import { NextPage } from "next";
import {
	AppointmentSettings,
	AppointmentSlotSettings,
	OpeningSettings,
	WebApiConfigSettings,
} from "../../../../components/config";

const ConfigPage: NextPage = () => {
	return (
		<div className={"conatiner p-4 mx-auto grid gap-4 md:grid-cols-2"}>
			<OpeningSettings />
			<AppointmentSlotSettings />
			<AppointmentSettings />
			<WebApiConfigSettings />
		</div>
	);
};

export default ConfigPage;
