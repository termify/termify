import { NextPage } from "next";
import {
	AppointmentSettings,
	AppointmentSlotSettings,
	OpeningSettings,
	WebApiConfigSettings,
} from "../../../../components/config";

const ConfigPage: NextPage = () => {
	return (
		<div className={"conatiner p-4 mx-auto grid grid-cols-2 gap-4"}>
			<OpeningSettings />
			<AppointmentSettings />
			<AppointmentSlotSettings />
			<WebApiConfigSettings />
		</div>
	);
};

export default ConfigPage;
