import { NextPage } from "next";
import UserDashboard from "../../../../components/userDashboard";

const DashboardPage: NextPage = () => {
	return (
		<div className={"p-8 flex-grow flex flex-col w-full"}>
			<UserDashboard />
		</div>
	);
};

export default DashboardPage;
