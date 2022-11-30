import { NextPage } from "next";
import { Suspense } from "react";
import {
	AppointmentSettings,
	AppointmentSlotSettings,
	OpeningSettings,
	WebApiConfigSettings,
} from "../../../../components/config";
import LoadingSpinner from "../../../../components/shared/loadingSpinner";

const ConfigPage: NextPage = () => {
	return (
		<div className={"container p-4 mx-auto grid gap-4 md:grid-cols-2"}>
			<Suspense
				fallback={
					<div className="w-screen flex justify-center">
						<LoadingSpinner />
					</div>
				}
			>
				<OpeningSettings />
				<AppointmentSettings />
				<AppointmentSlotSettings />
				<WebApiConfigSettings />
			</Suspense>
		</div>
	);
};

export default ConfigPage;
