import { NextPage } from "next";
import Dashboard from "../../../../components/dashboard";

const DashboardPage: NextPage = () => {
	return (
		<div className={"p-8 container flex-grow flex flex-col"}>
			<Dashboard />
		</div>
	);
};

export default DashboardPage;
