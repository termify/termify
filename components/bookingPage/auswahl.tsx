import React, { useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useBookingStore } from "../../store/stores";
import { useBaseUrl } from "../../lib/baseUrl";

export interface DataOffice {
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

export interface AllDataState {
	id: number;
	stateName: string;
	District: DistrictProps[];
}

export default function AuswahlPage({
	data,
}: {
	data: {
		stateData: AllDataState[];
		officeData: DataOffice[];
	};
}) {
	const [pos, setPos] = useState<number>(1);
	const [partner, setPartner] = useState<DataPartner[]>([]);
	const baseUrl = useBaseUrl();

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
			await fetch(`${baseUrl}/api/dbquery/booking/partner`, {
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
				<div className={`grid grid-cols-2 gap-3 xl:grid-cols-4 overflow-y-hidden scroll-smooth`}>
					{partner.map((e, i) => (
						<BookingButton key={e.partnerName + i} index={e.id} partnerData={e} />
					))}
				</div>
			) : (
				<div className={"mt-24"}>
					<h3 className={"text-center p-8 text-xl text-sky-900 xl:text-5xl"}>Bitte wählen Sie Ihren Bezirk aus</h3>
					<div className="p-1 w-1/2 container mx-auto bg-gradient-to-r from-sky-400 to-emerald-500 rounded shadow-xl relative">
						<select className="w-full rounded bg-sky-50 text-sky-900 p-2 xl:p-6 xl:text-2xl" onChange={fetchPartner}>
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

export interface DistrictProps {
	id: number;
	districtName: string;
}
interface OfficeProps {
	id: number;
	officeName: string;
	officeDescription: string;
}

interface BookingButtonProps {
	partnerData: DataPartner;
	index: number;
}
// Auswahl Seite
function BookingButton({ partnerData, index }: BookingButtonProps) {
	const bookingData = useBookingStore((state) => state.bookingData);
	const setBookingData = useBookingStore((state) => state.setBookingData);
	const setBookingPage = useBookingStore((state) => state.setPageNumber);

	function onClickHandler() {
		setBookingData({
			...bookingData,
			officeId: (partnerData.Office as OfficeProps).id,
			officeName: (partnerData.Office as OfficeProps).officeName,
		});
		setBookingPage(2);
	}

	return (
		<div
			className={"p-1 m-5 group rounded-md bg-gradient-to-r from-sky-400 to-emerald-500 transition-all hover:scale-105"}
		>
			<button
				onClick={onClickHandler}
				id={`s-${index}`}
				className={
					"w-full font-bold bg-sky-50 min-h-[5rem] rounded-md group-hover:bg-gradient-to-r transition-all group-hover:from-sky-400 group-hover:to-emerald-500 xl:min-h-[13rem]"
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
