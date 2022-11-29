import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../lib/database";

//REST API für den Partner
//Hierüber lassen sich die Daten abfragen
//Zeitpunkt der Anfrage = Alle Termine ab diesem Zeitpunkt

//GET PartnerID,Zeitpunkt; Abgleich Termine seitens Termify
//POST Abgleich Termine seitens Kunde

