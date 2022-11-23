import { NextPage } from "next";
import Dashboard from "../../../../components/dashboard";

const DashboardPage: NextPage = () => {
	return (
		<div className={"p-8 flex-grow flex flex-col w-full"}>
			<Dashboard />
		</div>
	);
};

export default DashboardPage;
