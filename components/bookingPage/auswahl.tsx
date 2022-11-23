import React, { useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useBookingStore } from "../../store/stores";
import { suspend } from "suspend-react";
import { baseUrl } from "../../lib/baseUrl";

export default function AuswahlPage() {
	return <AuswahlAmt col={4} row={3} />;
}

interface AuswahlAmtProps {
	col: number;
	row: number;
}

//TODO Kevin Bläser: Auswahl des Landkreises
//TODO Kevin Bläser: AuswahlAmt Style
interface DataOffice {
	id: number;
	officeName: string;
	officeDescription?: string;
}

interface DataPartner {
	id: number;
	partnerName: string;
	partnerDescription: string;
	districtId: number;
	Office: OfficeProps[] | OfficeProps;
}

interface AllDataState {
	id: number;
	stateName: string;
	District: DistrictProps[];
}

function AuswahlAmt({ col, row }: AuswahlAmtProps) {
	const [pos, setPos] = useState<number>(1);
	const [partner, setPartner] = useState<DataPartner[]>([]);
	const bookingData = useBookingStore((state) => state.bookingData);

	const data = suspend(async () => {
		try {
			const officeResponse = (await (await fetch(`${baseUrl()}/api/dbquery/booking/office`)).json()) as DataOffice[];
			const stateResponse = (await (await fetch(`${baseUrl()}/api/dbquery/booking/state`)).json()) as AllDataState[];

			return {
				officeData: officeResponse,
				stateData: stateResponse,
			};
		} catch (e) {
			console.error("OfficeData und StateData konnten nicht geladen werden", e);
		}
	}, [`auswahl-${JSON.stringify(bookingData)}`]);

	function setHref(dest: number) {
		setPos(dest);
		document.location.href = `#s-${dest}`;
	}

	async function fetchPartner(event: React.ChangeEvent<HTMLSelectElement>) {
		let id: number;

		data?.stateData.forEach((e) => {
			e.District.map((entrie) => {
				if (entrie.districtName === event.target.value) id = entrie.id;
			});
		});

		const response = await (
			await fetch(`${baseUrl()}/api/dbquery/booking/partner`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ districtId: id! || 0 }),
			})
		).json();

		setPartner(response);
	}

	return (
		<>
			<div className={"min-h-[3rem]"}>
				{pos !== 1 && (
					<button title="Button" onClick={() => setHref(pos - 8)} className={"mx-auto flex justify-center"}>
						<BsFillArrowUpCircleFill className={"h-12 w-12"} />
					</button>
				)}
			</div>
			{partner && partner.length > 0 ? (
				<div className={`grid grid-cols-2 grid-rows-${row} gap-3 xl:grid-cols-${col} overflow-y-hidden scroll-smooth`}>
					{partner.map((e, i) => (
						<BookingButton key={e.partnerName + i} index={i} partnerData={e} />
					))}
				</div>
			) : (
				<div className={"mt-24"}>
					<h3 className={"text-center p-8 text-xl xl:text-5xl"}>Bitte wählen Sie Ihren Bezirk aus</h3>
					<div className="p-2 w-1/2 container mx-auto bg-gradient-to-r from-sky-400 to-emerald-500 rounded shadow-xl relative">
						<select className="w-full rounded bg-white p-2 xl:p-6 xl:text-2xl " onChange={fetchPartner}>
							<option>--- Bezirk wählen ---</option>
							{data?.stateData.map((e, i) => (
								<optgroup key={e.stateName + i} label={e.stateName}>
									{e.District.map((f, j) => (
										<option key={f.districtName + j}>{f.districtName}</option>
									))}
								</optgroup>
							))}
						</select>
					</div>
				</div>
			)}
		</>
	);
}

interface DistrictProps {
	id: number;
	districtName: string;
}
interface OfficeProps {
	id: number;
	officeName: string;
	officeDescription: string;
}

interface BookinButtonProps {
	partnerData: DataPartner;
	index: number;
}

function BookingButton({ partnerData, index }: BookinButtonProps) {
	const bookingData = useBookingStore((state) => state.bookingData);
	const setBookingData = useBookingStore((state) => state.setBookingData);
	const setBookingPage = useBookingStore((state) => state.setPageNumber);

	function onClickHandler() {
		setBookingData({
			...bookingData,
			officeId: index,
			officeName: (partnerData.Office as OfficeProps).officeName,
		});
		setBookingPage(2);
	}

	return (
		<div className={"p-1 m-5 group bg-gradient-to-r from-sky-400 to-emerald-500 transition-all  hover:scale-105"}>
			<button
				onClick={onClickHandler}
				id={`s-${index}`}
				className={
					"bg-white w-full font-bold min-h-[5rem] group-hover:bg-gradient-to-r transition-all group-hover:from-sky-400 group-hover:to-emerald-500 xl:min-h-[13rem]"
				}
			>
				<p
					className={
						"bg-gradient-to-r from-sky-400 to-emerald-500 p-2 bg-clip-text text-base break-words text-transparent transition-all xl:text-5xl group-hover:text-white"
					}
				>
					{(partnerData.Office as OfficeProps).officeName}
				</p>
			</button>
		</div>
	);
}
