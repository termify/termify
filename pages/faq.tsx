import { NextPage } from "next";
import Accordion from "../components/accordion";

const allgemein: { title: string; body: string }[] = [
	{
		title: "Was ist Termify",
		body: `Termify ist eine App, bei der sich alles um Termine dreht. 
		Sie übernimmt dabei die Vermittlerrolle zwischen Dir und den deutschen Ämtern. 
		Termify ist also deine allgemeine Adresse für Behördenangelegenheiten innerhalb von Deutschland.`,
	},
	{
		title: "Für wen ist Termify gedacht?",
		body: `Termify ist für jeden gedacht, der bei Ämtern oder öffentlichen Stellen Termine vereinbaren möchte.`,
	},
	{
		title: "Warum sollte ich Termify nutzen?",
		body: `Weil Termify einfach praktisch ist. 
		Alle terminbasierten Dienstleistungen von deutschen Behörden werden hier zentral und effektiv angeboten.`,
	},
	{
		title: "Wie kann ich Termify nutzen?",
		body: `Mit einem beliebigen Browser deiner Wahl, ganz gleich ob per Smartphone, Tablet oder Desktop.`,
	},
	{
		title: "Funktioniert Termify auch im Ausland?",
		body: `Der Service von Termify ist rein digital und somit auch im Ausland erreichbar.`,
	},
	{
		title: "Wie sieht’s mit Kosten aus?",
		body: `Ganz simpel, es entstehen keine. 
		Dieser Dienst ist für Dich kostenlos.`,
	},
	{
		title: "Ist es zwingend notwendig, dass ich mich registriere?",
		body: `Ja, ist es. 
		Für einen reibungslosen Ablauf und die sichere und komfortable Nutzung des Service von Termify benötigst Du einen Account.`,
	},
	{
		title: "Warum muss ich meinen Account verifizieren lassen?",
		body: `Dies dient dem Ausschluss von automatisierten Anfragen, welche eine Belastung und ein Sicherheitsrisiko für alle Beteiligten darstellen.`,
	},
	{
		title: "Welche Daten werden von mir benötigt?",
		body: `Allgemeine Daten zu deiner Person, wie Name, Geburtsdatum und Anschrift. 
		Bankdaten oder andere Daten für Bezahlvorgänge werden von Termify unter keinen Umständen erhoben.`,
	},
	{
		title: "Warum werden Daten von mir benötigt?",
		body: `Wir möchten Dir einen personalisierten und frustfreien Service anbieten. 
		Dieser sieht einen Abgleich deiner Identität bei den Anfragen an die Behörden vor und benötigt deshalb deine Daten.`,
	},
	{
		title: "Was passiert mit meinen Daten?",
		body: `Diese werden bei den Anfragen gem. 
		DSGVO an die jeweilige Behörde übermittelt, um deine Identität anhand der dort vorliegenden Daten zu überprüfen. 
		Dies optimiert und beschleunigt den gesamten Vorgang. Eine anderweitige Verwendung der Daten findet nicht statt.`,
	},
	{
		title: "Wie kann ich meine Daten und mein Passwort ändern?",
		body: `Du kannst deine Daten jederzeit über dein Profil bearbeiten. 
		Dein Passwort lässt sich über die „Passwort zurücksetzen“-Funktion der Login-Seite jederzeit neu setzen.`,
	},
	{
		title: "Arbeitet Termify mit den Behörden zusammen?",
		body: `Ja, es besteht eine Kooperation mit den Behörden.`,
	},
];
const buchung: { title: string; body: string }[] = [
	{
		title: "Was ist eine Buchung?",
		body: `Als Buchung bezeichnen wir eine Terminanfrage an eine Behörde.`,
	},
	{
		title: "Wie gelange ich zur Buchung?",
		body: `Über das Termify-Logo im linken oberen Bereich deines Bildschirms oder über das Navigationsmenü in der Kopfleiste.`,
	},
	{
		title: "Wie führe ich eine Buchung durch?",
		body: `Nach dem Aufruf der Buchung wählst du einfach Schritt für Schritt aus den angezeigten Auswahlkriterien das aus, was Du brauchst.`,
	},
	{
		title: "Was ist, wenn die gewünschte Behörde nicht hinterlegt ist?",
		body: `Wir sind bemüht, allen Anliegen gerecht zu werden und unseren Service für alle Behörden zur Verfügung zu stellen. 
		Sollte dies einmal nicht der Fall sein, so kannst Du gern eine Anfrage unter Nennung der fehlenden Behörde über folgenden Link 
		(behoerde@termify.digital) 
		an uns richten und wir kümmern uns um alles Weitere.`,
	},
	{
		title: "Wer legt die Termine fest?",
		body: `Die Termine werden über die Behörden festgelegt und bereitgestellt. 
		Termify greift auf die dort vorliegenden Termine zu und ermöglicht Dir eine Buchung.`,
	},
	{
		title: "Was ist, wenn kein freier Termin mehr verfügbar ist?",
		body: `Falls wirklich absolut kein Termin mehr verfügbar ist, liegt eine temporäre Buchungseinschränkung vor. 
		Bitte versuche es zu einem späteren Zeitpunkt noch einmal. 
		Es kommt regelmäßig vor, dass über Stornierungen oder die Verschiebung des Buchungshorizonts wieder Termine verfügbar werden.`,
	},
	{
		title: "Was ist, wenn mein Anliegen nicht in der Auswahl vertreten ist?",
		body: `Die Anliegen entnimmt Termify dem Dienstleistungskatalog der Behörden. 
		Sollte dein Anliegen dort nicht mit aufgeführt sein, so existiert die Dienstleistung 
		in dem Rahmen nicht oder sie wurde nicht korrekt eingepflegt, 
		in welchem Fall wir dir über einen kurzen Hinweis über folgenden Link 
		(behoerde@termify.digital) dankbar wären.`,
	},
	{
		title: "Welche Unterlagen werden für die Buchung benötigt?",
		body: `Grundsätzlich werden keine Unterlagen benötigt. 
		Sollte bei Buchung die Vorlage von Unterlagen explizit gefordert sein, 
		so wird dies bei Auswahl des Anliegens entsprechend mitgeteilt.`,
	},
	{
		title: "Wie lege ich Unterlagen zur Buchung vor?",
		body: `Die Unterlagen kannst du über das dafür vorgesehene Feld, unter der Auswahl des Anliegens, anwählen und hochladen. `,
	},
	{
		title: "Wofür ist die Bestätigungsmail?",
		body: `Die Bestätigungsmail dient als Nachweis der erfolgreich durchgeführten Buchung und als Zusammenfassung der Termindaten. `,
	},
	{
		title: "Kann ich bereits erfolgte Buchungen irgendwo einsehen?",
		body: `Es ist möglich, die getätigten Buchungen nach dem Login bei Termify über das Dashboard einzusehen. 
		Dort ist eine Buchungshistorie hinterlegt.`,
	},
	{
		title: "Wo finde ich das Dashboard?",
		body: `Das Dashboard findest du nach dem Login über die Navigation in der Kopfleiste von Termify.`,
	},
	{
		title: "Ist es möglich, bereits erfolgte Buchungen zu verändern?",
		body: `Das Verändern und Stornieren von bereits getätigten Buchungen ist nach dem Login jederzeit über das Dashboard von Termify möglich.`,
	},
	{
		title: "Sind Buchungen mit den gleichen Anliegen mehrfach möglich?",
		body: `Nein, solche Buchungsvorgänge sind nicht möglich. 
		Daraus würde eine Einschränkung anderer Nutzer durch doppelt geblockte Termine folgen, was unserem Servicegedanken widerspricht.`,
	},
];

const FAQ: NextPage = () => {
	return (
		<div className={"p-8 container mx-auto"}>
			<h2
				className={
					" font-bold bg-gradient-to-r from-indigo-400 to-sky-500 text-transparent bg-clip-text p-2 inline text-xl xl:text-5xl"
				}
			>
				FAQ - Häufig gestellte Fragen
			</h2>
			<div className={"flex flex-col my-8 gap-6"}>
				<Accordion title="Allgemein" accordionSection={allgemein} />
				<Accordion title="Buchung" accordionSection={buchung} />
			</div>
		</div>
	);
};

export default FAQ;
