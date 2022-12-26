import AuswahlPage, { AllDataState, DataOffice } from "../../components/bookingPage/auswahl";
import Taskleiste from "../../components/bookingPage/taskleiste";
import Termin from "../../components/bookingPage/termin";
import { useBookingStore } from "../../store/stores";
import { Suspense } from "react";
import Eintragung from "../../components/bookingPage/eintragung";
import Abschluss from "../../components/bookingPage/abschluss";
import LoadingSpinner from "../../components/shared/loadingSpinner";
import { GetStaticProps, NextPage } from "next";
import { db } from "../../lib/database";
export const getStaticProps:GetStaticProps = async (ctx) => {

    const stateData = (await db.state.findMany({
        where: {
            District: {
                some: {
                    Partner: {
                        some: {},
                    },
                },
            },
        },

        include: {
            District: {
                where: {
                    Partner: {
                        some: {},
                    },
                },
            },
        },
    })) as unknown as AllDataState[]

	const officeData = (await db.office.findMany()) as unknown as DataOffice[];

	return{
		props:{
			data:{
				stateData:stateData,
				officeData: officeData
			}
		},
		revalidate:3600
	}
} 

const BookingPage:NextPage<{data:any}> = ({data}) => {
	const bookingPageNumber = useBookingStore((state) => state.pageIndex);

	return (
		<div>
			<Taskleiste />
			<Suspense fallback={<LoadingSpinner />}>
				{bookingPageNumber === 1 ? (
					<AuswahlPage data={data} />
				) : bookingPageNumber === 2 ? (
					<Termin />
				) : bookingPageNumber === 3 ? (
					<Eintragung />
				) : bookingPageNumber === 4 ? (
					<Abschluss />
				) : null}
			</Suspense>
		</div>
	);
};

export default BookingPage;
