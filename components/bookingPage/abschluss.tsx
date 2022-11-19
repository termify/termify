export default function Abschluss({ onClick }: any) {
    return (
        <div className={'py-16 xl:p-52'}>
            <div className={'flex justify-center mb-8 '}>
                <h3
                    className={
                        ' text-center  font-bold bg-gradient-to-r from-sky-400 to-emerald-500 inline-block bg-clip-text text-transparent text-2xl py-4 xl:p-8 xl:text-5xl'
                    }
                >
                    Vielen Dank für Ihre Buchung
                </h3>
            </div>
            <p className={'container text-center p-1 mx-auto text-xl xl:w-2/3 xl:text-3xl'}>
                Wir haben Ihnen eine Bestätigung mit allen erforderlichen Links und Informationen an Ihre E-Mail und
                Ihren Dashboard gesendet
            </p>
        </div>
    );
}
