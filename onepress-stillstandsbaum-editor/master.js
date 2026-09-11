const MASTER=[
{id:'0001',text:'Freie Kapazität',children:[['0020','Wochenende'],['0021','Feiertage'],['0022','Schließtage'],['0023','Kurzarbeit'],['0024','Pause'],['0025','Schichtübergabe'],['0026','Kein Personal']]},
{id:'0002',text:'Betriebliche Stillstands Zeiten',children:[['0027','Betriebsversammlungen'],['0028','Belegschaftsinformation'],['0029','Gewerkschaftsinfos'],['0030','Sonderunterweisungen']]},
{id:'0003',text:'Langzeitstörung',children:[['0031','geplante Großreparatur'],['0032','ungeplante Langzeitstörung']]},
{id:'0004',text:'Werkzeugintegration',children:[['0033','Mechanisierung'],['0034','Werkzeug'],['0035','Zuführgeräte']]},
{id:'0005',text:'Geplanter Stillstand außerhalb Belegungszeit',children:[]},
{id:'0006',text:'Geplanter Stillstand innerhalb Belegungszeit',children:[]},
{id:'0007',text:'Teamgespräche',children:[]},
{id:'0008',text:'Prozessoptimierung',children:[['0036','Werkzeug'],['0037','Kurvenanpassung'],['0038','Feedermechanisierung'],['0039','Versuch Hubzahlerhöhung'],['0040','Presskraftversuche'],['0041','Abstapelanlage'],['0042','Technologien'],['0043','Probematerial'],['0044','Teileänderung'],['0045','OP-Teilentnahme']]},
{id:'0009',text:'TPM',children:[]},
{id:'0010',text:'Störung Maschine',children:[['0046','Elektrik'],['0047','Mechanik'],['0048','Schrott']]},
{id:'0011',text:'Störung Werkzeug',children:[['0049','Mechanisierung'],['0050','Werkzeug'],['0051','Zuführgeräte']]},
{id:'0012',text:'Störung Technologie',children:[['0052','Abstapelanlage'],['0053','Risserkennungssystem'],['0054','Kamerasystem'],['0055','Geräte zur Ergonomieverbesserung']]},
{id:'0013',text:'Störung Qualität / Material',children:[['0056','Halbfertigteil niO'],['0057','Platine niO'],['0058','Material vom Lieferanten niO']]},
{id:'0014',text:'Prozess-/ Ablaufbedingter Stillstand',children:[['0059','Reinigen/Polieren Werkzeuge'],['0060','Individueller Fehler'],['0061','Coilwechsel'],['0062','Palettenwechsel'],['0063','Ladungsträgerwechsel'],['0064','Wochenstempel'],['0065','Variantenwechsel'],['0066','Teil / Platine prüfen'],['0067','Stapelwechsel'],['0068','Vorrüsten'],['0069','Doppelplatine'],['0070','Vorrübergehend nicht ausreichend Personal'],['0071','Inbetriebnahme'],['0072','Schrottbehälterwechsel'],['0073','Restpaket ausfahren'],['0074','Deckplatinenlader voll'],['0075','Hallenbedingte Störung'],['0076','Schweißnaht'],['0077','Bandendeverarbeitung']]},
{id:'0015',text:'Störung Logistik',children:[['0078','fehlendes Material'],['0079','Leergutversorgung'],['0080','Vollgutentsorgung'],['0081','Kran'],['0082','Automatische Fertigteileinlagerung'],['0083','Flurförderfahrzeug']]},
{id:'0016',text:'Rüsten',children:[['0084','Zusatzrüsten']]}
];
MASTER.forEach(x=>x.children=x.children.map(([id,text])=>({id,text})));
