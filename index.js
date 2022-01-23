const fs = require('fs');
const { XMLParser, XMLBuilder, XMLValidator} =  require("./node_modules/fast-xml-parser/src/fxp");
const { exec } = require('child_process');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const parser = new XMLParser({
	ignoreAttributes: false,
});

const xmlString = fs.readFileSync('./data/Active Agency Map.kml');

const parsedXML = parser.parse(xmlString);

//const states = {'AR': [], 'CA': [], 'CO': [], 'CT': [], 'DE': [], 'DC': [], 'FL': [], 'GA': [], 'GU': [], 'HI': [], 'ID': [], 'IL': [], 'IN': [], 'IA': [], 'KS': [], 'KY': [], 'LA': [], 'ME': [], 'MD': [], 'MA': [], 'MI': [], 'MN': [], 'MS': [], 'MO': [], 'MT': [], 'NE': [], 'NV': [], 'NH': [], 'NJ': [], 'NM': [], 'NY': [], 'NC': [], 'ND': [], 'MP': [], 'OH': [], 'OK': [], 'OR': [], 'PA': [], 'PR': [], 'RI': [], 'SC': [], 'SD': [], 'TN': [], 'TX': [], 'UT': [], 'VT': [], 'VA': [], 'VI': [], 'WA': [], 'WV': [], 'WI': [], 'WY': [], 'Other': []};
const policeDepartments = parsedXML.kml.Document.Folder[0].Placemark;

const out = {
	'meta': {
		'total': 0,
		'states': {'AK': {'total': 0, 'municipality': 0, 'county': 0}, 'AL': {'total': 0, 'municipality': 0, 'county': 0}, 'AR': {'total': 0, 'municipality': 0, 'county': 0}, 'AZ': {'total': 0, 'municipality': 0, 'county': 0}, 'CA': {'total': 0, 'municipality': 0, 'county': 0}, 'CO': {'total': 0, 'municipality': 0, 'county': 0}, 'CT': {'total': 0, 'municipality': 0, 'county': 0}, 'DE': {'total': 0, 'municipality': 0, 'county': 0}, 'DC': {'total': 0, 'municipality': 0, 'county': 0}, 'FL': {'total': 0, 'municipality': 0, 'county': 0}, 'GA': {'total': 0, 'municipality': 0, 'county': 0}, 'GU': {'total': 0, 'municipality': 0, 'county': 0}, 'HI': {'total': 0, 'municipality': 0, 'county': 0}, 'ID': {'total': 0, 'municipality': 0, 'county': 0}, 'IL': {'total': 0, 'municipality': 0, 'county': 0}, 'IN': {'total': 0, 'municipality': 0, 'county': 0}, 'IA': {'total': 0, 'municipality': 0, 'county': 0}, 'KS': {'total': 0, 'municipality': 0, 'county': 0}, 'KY': {'total': 0, 'municipality': 0, 'county': 0}, 'LA': {'total': 0, 'municipality': 0, 'county': 0}, 'ME': {'total': 0, 'municipality': 0, 'county': 0}, 'MD': {'total': 0, 'municipality': 0, 'county': 0}, 'MA': {'total': 0, 'municipality': 0, 'county': 0}, 'MI': {'total': 0, 'municipality': 0, 'county': 0}, 'MN': {'total': 0, 'municipality': 0, 'county': 0}, 'MS': {'total': 0, 'municipality': 0, 'county': 0}, 'MO': {'total': 0, 'municipality': 0, 'county': 0}, 'MT': {'total': 0, 'municipality': 0, 'county': 0}, 'NE': {'total': 0, 'municipality': 0, 'county': 0}, 'NV': {'total': 0, 'municipality': 0, 'county': 0}, 'NH': {'total': 0, 'municipality': 0, 'county': 0}, 'NJ': {'total': 0, 'municipality': 0, 'county': 0}, 'NM': {'total': 0, 'municipality': 0, 'county': 0}, 'NY': {'total': 0, 'municipality': 0, 'county': 0}, 'NC': {'total': 0, 'municipality': 0, 'county': 0}, 'ND': {'total': 0, 'municipality': 0, 'county': 0}, 'MP': {'total': 0, 'municipality': 0, 'county': 0}, 'OH': {'total': 0, 'municipality': 0, 'county': 0}, 'OK': {'total': 0, 'municipality': 0, 'county': 0}, 'OR': {'total': 0, 'municipality': 0, 'county': 0}, 'PA': {'total': 0, 'municipality': 0, 'county': 0}, 'PR': {'total': 0, 'municipality': 0, 'county': 0}, 'RI': {'total': 0, 'municipality': 0, 'county': 0}, 'SC': {'total': 0, 'municipality': 0, 'county': 0}, 'SD': {'total': 0, 'municipality': 0, 'county': 0}, 'TN': {'total': 0, 'municipality': 0, 'county': 0}, 'TX': {'total': 0, 'municipality': 0, 'county': 0}, 'UT': {'total': 0, 'municipality': 0, 'county': 0}, 'VT': {'total': 0, 'municipality': 0, 'county': 0}, 'VA': {'total': 0, 'municipality': 0, 'county': 0}, 'VI': {'total': 0, 'municipality': 0, 'county': 0}, 'WA': {'total': 0, 'municipality': 0, 'county': 0}, 'WV': {'total': 0, 'municipality': 0, 'county': 0}, 'WI': {'total': 0, 'municipality': 0, 'county': 0}, 'WY': {'total': 0, 'municipality': 0, 'county': 0}, 'Other': {'total': 0, 'municipality': 0, 'county': 0}},
		'localities': {'municipality': 0, 'county': 0},
		'years': {
			'2018': 0,
			'2019': 0,
			'2020': 0,
			'2021': 0,
		}
	},
	'police': []
};

policeDepartments.forEach(function(local) {
	const convertedEntity = entityToObject(local);
	out.police.push(convertedEntity);
});

out.police.forEach( el => {
	out['meta']['states'][el.state].total++;
	out['meta']['states'][el.state][el.type.toLowerCase()]++;
	out['meta']['localities'][el.type.toLowerCase()]++;
	out['meta']['total']++;

	out['meta']['years'][(new Date(el.start_date)).getFullYear()]++;
});

fs.writeFileSync('./data/out.json', JSON.stringify(out));

function entityToObject(entity) {
	const obj = {
		name: '',
		state: '',
		//municipality: '',
		start_date: '',
		//profile: '',
		type: 'Municipality', //county, municipality, etc
		//num_posts: ''
	};
	
	const addressParts = entity.address.split(',').map(el => { return el.trim(); });
	obj.state = addressParts.pop();
	//obj.municipality = addressParts.join(' ');
	obj.name = entity.name;

	/* Some of these aren't using abbreviations, for whatever reason. */
	if (obj.state == 'Kentucky') {
		obj.state = 'KY';
	}
	if (obj.state == 'Texas') {
		obj.state = 'TX';
	}
	if (obj.state == 'North Carolina') {
		obj.state = 'NC';
	}

	entity.ExtendedData.Data.forEach((ed) => {
		switch (ed['@_name']) {
			case 'Active Date':
				obj.start_date = ed.value;
				break;
			case 'Agency Profile':
				//obj.profile = ed.value;
				break;
		}
	});

	if (obj.name.includes('County')) {
		obj.type = 'County';
	} else if (obj.name.includes('State ')) { // space is important, otherwise we get Statesville
		obj.type = 'State';
	}

	return obj;
}

/*fetch("https://publicsafety.ring.com/api/v2/alerts/agency", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:96.0) Gecko/20100101 Firefox/96.0",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "X-Ring-Correlation-Id": "RingNwAgencyProfileUI:ad883506-7eb7-4bf6-b880-6cb4022178ef",
        "X-Ring-Request-Start-Time": "1642821246156000000",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "Sec-GPC": "1",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
    },
    "referrer": "https://agency.ring.com/",
    "body": "{\"include_agencies\":[\"16d68eb1-4640-46ca-9cc6-d0237eed2c64\"],\"limit\":20}",
    "method": "POST",
    "mode": "cors"
}).then(response => response.json()).then(data => console.log(data));*/
