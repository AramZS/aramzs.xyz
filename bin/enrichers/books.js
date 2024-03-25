const fs = require("fs");
const ObjectCache = require("../../lib/helpers/cache");
const processImageUrl = require("../../lib/helpers/processImageUrl");
// Date,Name,Year,Letterboxd URI,Rating,Rewatch,Review,Tags,Watched Date
const books = fs.readFileSync(
	"./to-process/goodreads/libraryjson/shelves/read.json",
	"utf8"
);
const { processObjectToMarkdown } = require("../json-to-markdown");
const slugger = require("../slugger");
const csvParse = require("csv-parse/sync");
var crypto = require("crypto");
var sharp = require("sharp");
require("dotenv").config();


const cache = new ObjectCache("books");
// https://developer.themoviedb.org/reference/intro/getting-started
let OLUrl = "https://openlibrary.org/search.json";

/**
 * Cache Object to contain the Open Library Data from queries 
 *
 * @var {Object}
 */
let olDBSet = {};

if (cache.has("ol-books")) {
	console.log("Found Cached OL Data");
	olDBSet = cache.get("ol-books");
}

/** 
 * Open Library Format 
 * 
{
	"numFound": 6,
	"start": 0,
	"numFoundExact": true,
	"docs": [
		{
			"key": "/works/OL5838218W",
			"type": "work",
			"seed": [
				"/books/OL28435398M",
				"/books/OL28274852M",
				"/books/OL9332510M",
				"/works/OL5838218W",
				"/subjects/dragons_fiction",
				"/subjects/children's_fiction",
				"/subjects/atlases",
				"/subjects/fiction",
				"/subjects/dragons",
				"/subjects/fantasy",
				"/authors/OL1431557A"
			],
			"title": "Here, There Be Dragons",
			"title_suggest": "Here, There Be Dragons",
			"title_sort": "Here, There Be Dragons",
			"edition_count": 3,
			"edition_key": [
				"OL28435398M",
				"OL28274852M",
				"OL9332510M"
			],
			"publish_date": [
				"January 1, 2008",
				"2007",
				"Dec 01, 2008"
			],
			"publish_year": [
				2008,
				2007
			],
			"first_publish_year": 2007,
			"number_of_pages_median": 336,
			"contributor": [
				"TBA (Narrator)"
			],
			"isbn": [
				"9781606409596",
				"9781416932499",
				"0743569105",
				"1416932496",
				"160640959X",
				"9780743569101"
			],
			"last_modified_i": 1670601468,
			"ebook_count_i": 1,
			"ebook_access": "borrowable",
			"has_fulltext": true,
			"public_scan_b": false,
			"ia": [
				"heretherebedrago0000owen"
			],
			"ia_collection": [
				"inlibrary",
				"internetarchivebooks",
				"printdisabled"
			],
			"ia_collection_s": "inlibrary;internetarchivebooks;printdisabled",
			"lending_edition_s": "OL28435398M",
			"lending_identifier_s": "heretherebedrago0000owen",
			"printdisabled_s": "OL28435398M",
			"ratings_count_1": 0,
			"ratings_count_2": 0,
			"ratings_count_3": 0,
			"ratings_count_4": 0,
			"ratings_count_5": 1,
			"ratings_average": 5.0,
			"ratings_sortable": 2.4036636,
			"ratings_count": 1,
			"readinglog_count": 4,
			"want_to_read_count": 4,
			"currently_reading_count": 0,
			"already_read_count": 0,
			"cover_edition_key": "OL28435398M",
			"cover_i": 10619184,
			"publisher": [
				"Simon & Schuster",
				"Simon & Schuster Audio",
				"Simon & Schuster, Limited"
			],
			"language": [
				"eng"
			],
			"author_key": [
				"OL1431557A"
			],
			"author_name": [
				"James A. Owen"
			],
			"subject": [
				"Dragons, fiction",
				"Children's fiction",
				"Atlases",
				"Fiction",
				"Dragons",
				"Fantasy"
			],
			"id_goodreads": [
				"701011"
			],
			"id_librarything": [
				"1088160"
			],
			"ia_box_id": [
				"IA40055901"
			],
			"publisher_facet": [
				"Simon & Schuster",
				"Simon & Schuster Audio",
				"Simon & Schuster, Limited"
			],
			"subject_facet": [
				"Atlases",
				"Children's fiction",
				"Dragons",
				"Dragons, fiction",
				"Fantasy",
				"Fiction"
			],
			"_version_": 1767938324046020608,
			"author_facet": [
				"OL1431557A James A. Owen"
			],
			"subject_key": [
				"atlases",
				"children's_fiction",
				"dragons",
				"dragons_fiction",
				"fantasy",
				"fiction"
			]
		},
		{
			"key": "/works/OL27320664W",
			"type": "work",
			"seed": [
				"/books/OL37091692M",
				"/books/OL39623510M",
				"/works/OL27320664W",
				"/authors/OL1431557A"
			],
			"title": "Here, There Be Dragons",
			"title_suggest": "Here, There Be Dragons",
			"title_sort": "Here, There Be Dragons",
			"edition_count": 2,
			"edition_key": [
				"OL37091692M",
				"OL39623510M"
			],
			"publish_date": [
				"2010",
				"2013"
			],
			"publish_year": [
				2010,
				2013
			],
			"first_publish_year": 2010,
			"isbn": [
				"9781484404744",
				"0857070290",
				"9780857070296",
				"1484404742"
			],
			"last_modified_i": 1663492676,
			"ebook_count_i": 0,
			"ebook_access": "no_ebook",
			"has_fulltext": false,
			"public_scan_b": false,
			"publisher": [
				"Simon & Schuster, Incorporated",
				"Simon & Schuster Children's Publishing"
			],
			"language": [
				"eng"
			],
			"author_key": [
				"OL1431557A"
			],
			"author_name": [
				"James A. Owen"
			],
			"publisher_facet": [
				"Simon & Schuster Children's Publishing",
				"Simon & Schuster, Incorporated"
			],
			"_version_": 1767920807566114816,
			"author_facet": [
				"OL1431557A James A. Owen"
			]
		},
		{
			"key": "/works/OL27742448W",
			"type": "work",
			"seed": [
				"/books/OL37876472M",
				"/works/OL27742448W",
				"/subjects/time_travel",
				"/subjects/juvenile_fiction",
				"/subjects/fantasy",
				"/subjects/war_stories",
				"/subjects/voyages_dans_le_temps",
				"/subjects/romans_nouvelles_etc._pour_la_jeunesse",
				"/subjects/fantasmes",
				"/subjects/récits_de_guerre",
				"/subjects/war",
				"/authors/OL1431557A"
			],
			"title": "Tierra de dragones",
			"title_suggest": "Tierra de dragones",
			"title_sort": "Tierra de dragones",
			"edition_count": 1,
			"edition_key": [
				"OL37876472M"
			],
			"publish_date": [
				"2007"
			],
			"publish_year": [
				2007
			],
			"first_publish_year": 2007,
			"number_of_pages_median": 366,
			"publish_place": [
				"Barcelona"
			],
			"oclc": [
				"81250622"
			],
			"contributor": [
				"Gallart, Gemma"
			],
			"lcc": [
				"PZ-0073.00000000.O946 2007"
			],
			"ddc": [
				"813.6",
				"[Fic]"
			],
			"isbn": [
				"9788408070504",
				"8408070509"
			],
			"last_modified_i": 1670419653,
			"ebook_count_i": 1,
			"ebook_access": "borrowable",
			"has_fulltext": true,
			"public_scan_b": false,
			"ia": [
				"tierradedragones0000owen"
			],
			"ia_collection": [
				"inlibrary",
				"internetarchivebooks",
				"printdisabled"
			],
			"ia_collection_s": "inlibrary;internetarchivebooks;printdisabled",
			"lending_edition_s": "OL37876472M",
			"lending_identifier_s": "tierradedragones0000owen",
			"printdisabled_s": "OL37876472M",
			"cover_edition_key": "OL37876472M",
			"cover_i": 12747794,
			"publisher": [
				"Destino"
			],
			"language": [
				"spa"
			],
			"author_key": [
				"OL1431557A"
			],
			"author_name": [
				"James A. Owen"
			],
			"subject": [
				"Time travel",
				"Juvenile fiction",
				"Fantasy",
				"War stories",
				"Voyages dans le temps",
				"Romans, nouvelles, etc. pour la jeunesse",
				"Fantasmes",
				"Récits de guerre",
				"War"
			],
			"ia_box_id": [
				"IA40488523"
			],
			"publisher_facet": [
				"Destino"
			],
			"subject_facet": [
				"Fantasmes",
				"Fantasy",
				"Juvenile fiction",
				"Romans, nouvelles, etc. pour la jeunesse",
				"Récits de guerre",
				"Time travel",
				"Voyages dans le temps",
				"War",
				"War stories"
			],
			"_version_": 1767921381075320833,
			"lcc_sort": "PZ-0073.00000000.O946 2007",
			"author_facet": [
				"OL1431557A James A. Owen"
			],
			"subject_key": [
				"fantasmes",
				"fantasy",
				"juvenile_fiction",
				"romans_nouvelles_etc._pour_la_jeunesse",
				"récits_de_guerre",
				"time_travel",
				"voyages_dans_le_temps",
				"war",
				"war_stories"
			],
			"ddc_sort": "813.6"
		},
		{
			"key": "/works/OL5838220W",
			"type": "work",
			"seed": [
				"/books/OL8458104M",
				"/works/OL5838220W",
				"/subjects/children's_fiction",
				"/subjects/time_travel_fiction",
				"/subjects/fantasy_fiction",
				"/subjects/dragons_fiction",
				"/authors/OL1431557A"
			],
			"title": "Here, There Be Dragons (Chronicles of the Imaginarium Geographica #1)",
			"title_sort": "Here, There Be Dragons (Chronicles of the Imaginarium Geographica #1)",
			"title_suggest": "Here, There Be Dragons (Chronicles of the Imaginarium Geographica #1)",
			"edition_count": 1,
			"edition_key": [
				"OL8458104M"
			],
			"publish_date": [
				"October 23, 2007"
			],
			"publish_year": [
				2007
			],
			"first_publish_year": 2007,
			"number_of_pages_median": 352,
			"oclc": [
				"148912507"
			],
			"isbn": [
				"9781416912286",
				"1416912282"
			],
			"last_modified_i": 1670624634,
			"ebook_count_i": 1,
			"ebook_access": "printdisabled",
			"has_fulltext": true,
			"public_scan_b": false,
			"ia": [
				"heretherebedrago00jame"
			],
			"ia_collection": [
				"cnusd-ol",
				"hamiltonpubliclibrary-ol",
				"internetarchivebooks",
				"printdisabled",
				"stmaryscountylibrary",
				"worthingtonlibraries-ol"
			],
			"ia_collection_s": "cnusd-ol;hamiltonpubliclibrary-ol;internetarchivebooks;printdisabled;stmaryscountylibrary;worthingtonlibraries-ol",
			"printdisabled_s": "OL8458104M",
			"ratings_average": 5.0,
			"ratings_sortable": 2.4036636,
			"ratings_count": 1,
			"ratings_count_1": 0,
			"ratings_count_2": 0,
			"ratings_count_3": 0,
			"ratings_count_4": 0,
			"ratings_count_5": 1,
			"readinglog_count": 5,
			"want_to_read_count": 4,
			"currently_reading_count": 0,
			"already_read_count": 1,
			"cover_edition_key": "OL8458104M",
			"cover_i": 761063,
			"publisher": [
				"Simon Pulse"
			],
			"language": [
				"eng"
			],
			"author_key": [
				"OL1431557A"
			],
			"author_name": [
				"James A. Owen"
			],
			"subject": [
				"Children's fiction",
				"Time travel, fiction",
				"Fantasy fiction",
				"Dragons, fiction"
			],
			"id_amazon": [
				""
			],
			"id_goodreads": [
				"2242097"
			],
			"id_librarything": [
				"1088160"
			],
			"ia_box_id": [
				"IA162516"
			],
			"publisher_facet": [
				"Simon Pulse"
			],
			"subject_facet": [
				"Children's fiction",
				"Dragons, fiction",
				"Fantasy fiction",
				"Time travel, fiction"
			],
			"_version_": 1778933031173619713,
			"author_facet": [
				"OL1431557A James A. Owen"
			],
			"subject_key": [
				"children's_fiction",
				"dragons_fiction",
				"fantasy_fiction",
				"time_travel_fiction"
			]
		},
		{
			"key": "/works/OL5838219W",
			"type": "work",
			"seed": [
				"/books/OL8458103M",
				"/works/OL5838219W",
				"/authors/OL1431557A"
			],
			"title": "Here, There Be Dragons (Chronicles of the Imaginarium Geographica, the)",
			"title_suggest": "Here, There Be Dragons (Chronicles of the Imaginarium Geographica, the)",
			"title_sort": "Here, There Be Dragons (Chronicles of the Imaginarium Geographica, the)",
			"edition_count": 1,
			"edition_key": [
				"OL8458103M"
			],
			"publish_date": [
				"September 26, 2006"
			],
			"publish_year": [
				2006
			],
			"first_publish_year": 2006,
			"number_of_pages_median": 336,
			"isbn": [
				"1416912274",
				"9781416912279"
			],
			"last_modified_i": 1281410752,
			"ebook_count_i": 0,
			"ebook_access": "no_ebook",
			"has_fulltext": false,
			"public_scan_b": false,
			"cover_edition_key": "OL8458103M",
			"cover_i": 761062,
			"publisher": [
				"Simon & Schuster Children's Publishing"
			],
			"language": [
				"eng"
			],
			"author_key": [
				"OL1431557A"
			],
			"author_name": [
				"James A. Owen"
			],
			"id_goodreads": [
				"34908"
			],
			"id_librarything": [
				"1088160"
			],
			"publisher_facet": [
				"Simon & Schuster Children's Publishing"
			],
			"_version_": 1767938324533608448,
			"author_facet": [
				"OL1431557A James A. Owen"
			]
		},
		{
			"key": "/works/OL20102343W",
			"type": "work",
			"seed": [
				"/books/OL27282379M",
				"/works/OL20102343W",
				"/authors/OL1431557A"
			],
			"title": "Here, There Be Dragons (The Chronicles of the Imaginarium Geographica)",
			"title_suggest": "Here, There Be Dragons (The Chronicles of the Imaginarium Geographica)",
			"title_sort": "Here, There Be Dragons (The Chronicles of the Imaginarium Geographica)",
			"edition_count": 1,
			"edition_key": [
				"OL27282379M"
			],
			"publish_date": [
				"Apr 18, 2008"
			],
			"publish_year": [
				2008
			],
			"first_publish_year": 2008,
			"number_of_pages_median": 326,
			"isbn": [
				"1435260031",
				"9781435260030"
			],
			"last_modified_i": 1566682140,
			"ebook_count_i": 0,
			"ebook_access": "no_ebook",
			"has_fulltext": false,
			"public_scan_b": false,
			"cover_edition_key": "OL27282379M",
			"cover_i": 8763826,
			"publisher": [
				"Paw Prints 2008-04-18"
			],
			"author_key": [
				"OL1431557A"
			],
			"author_name": [
				"James A. Owen"
			],
			"id_amazon": [
				"1435260031"
			],
			"publisher_facet": [
				"Paw Prints 2008-04-18"
			],
			"_version_": 1767908015691792384,
			"author_facet": [
				"OL1431557A James A. Owen"
			]
		}
	],
	"num_found": 6,
	"q": "Here, There Be Dragons",
	"offset": null
}
 */

// https://openlibrary.org/dev/docs/api/covers
function getCoverImage(openLibraryObj){
  var imageFound = false;
  var counter = 0;
  let olIDImageUrl = function(idString){ return `https://covers.openlibrary.org/b/olid/${idString}-M.jpg`}
  let isbnIDImageUrl = function(idString){ return `https://covers.openlibrary.org/b/isbn/${idString}-M.jpg`}


  return new Promise((resolve, reject) => {
    let candidates = {};
    candidates.openLibraryIDs = openLibraryObj.edition_key;
    candidates.isbnIDs = openLibraryObj.isbn;
    candidates.totalLength = candidates.openLibraryIDs.length + candidates.isbnIDs.length;
    while (imageFound === false && counter < candidates.totalLength) {
      let imageUrl = ""
      if (candidates.openLibraryIDs.length){
        let olIdString = candidates.openLibraryIDs.pop();
        imageUrl = olIDImageUrl(olIdString);
      } else if (candidates.isbnIDs.length){
        let isbnIdString = candidates.isbnIDs.pop();
        imageUrl = isbnIDImageUrl(isbnIdString);
      } else {
        console.log("no more images to try", candidates);
        resolve(false);
        break;
      }
      fetch(imageUrl)
        .then(async (response) => {
          if (response.ok) {
            let imageBuffered = Buffer.from(await response.arrayBuffer())
            const image = sharp(imageBuffered)
            const metadata = await image.metadata()
            // console.log(metadata.width, metadata.height)            
            if (metadata.width > 10 && metadata.height > 10){
              resolve(imageUrl);
              imageFound = true;
            }
          }
        })
        .catch((e) => {
          console.log("image retrieval failed for", imageUrl, e);
        });
      counter = counter+1;     
    }
  });
}

// Use sharp to get image size
// const image = sharp(file.buffer)
// const metadata = await image.metadata()
// console.log(metadata.width, metadata.height)

function idGen(libraryJsonObj) {
	var pieces = [libraryJsonObj.title, libraryJsonObj.author];
	if (libraryJsonObj.bookIds.olid && libraryJsonObj.bookIds.olid > 0) {
		pieces.push(libraryJsonObj.identifiers.olid);
	}
	var idCandidate = pieces.join("-");
	return crypto.createHash("md5").update(idCandidate).digest("hex");
}

function getOLData(libraryJsonObj){
  return new Promise((resolve, reject) => {
    let olDataUrl = new URL(OLUrl);
    olDataUrl.searchParams.delete("q");
    olDataUrl.searchParams.delete("title");
    olDataUrl.searchParams.delete("author");
    olDataUrl.searchParams.append("title", libraryJsonObj.title);
    olDataUrl.searchParams.append("author", libraryJsonObj.authors[0].name);
    fetch(olDataUrl.href)
      .then((response) => response.json())
      .then(async (data) => {
        if (data.docs.length) {
          console.log(
            "book retrieved from db query",
            JSON.stringify(olDataUrl.href),
            libraryJsonObj.title,
            data.docs[0]
          );
          var olID = data.docs[0].edition_key[0];
          libraryJsonObj.identifiers.olid = olID;
          var bookID = idGen(libraryJsonObj);
          libraryJsonObj.id = bookID
          // do something with the docs - data.docs[0]
          libraryJsonObj.cover_image = await getCoverImage(data.docs[0]);
          olDBSet[bookID] = {
            ...libraryJsonObj,
            ...data.docs[0],
          };
          cache.set("ol-books", olDBSet);
          resolve(olDBSet[bookID]);
        } else {
          console.log("No book found", mediaName, data);
          resolve({ ...libraryJsonObj });
        }
      })
      .catch((e) => {
        console.log(
          "book retrieval failed for",
          olDataUrl.href,
          e
        );
        reject(e);
      });
  });
};

function writeBookFile(){
  var candidatesToProcess = JSON.parse(books);
  var finalActioned = candidatesToProcess.books.map((libraryJsonObj) => {
    console.log(libraryJsonObj)
    var bookID = idGen(libraryJsonObj);
    var pieces = [libraryJsonObj.title, libraryJsonObj.author];
    libraryJsonObj.slug = slugger(pieces.join("-"));
    libraryJsonObj.id = bookID;
    libraryJsonObj.content = libraryJsonObj?.reviews[0].content || "";
    //libraryJsonObj.date 
    var date = Date.now();
    if (libraryJsonObj.date_started && libraryJsonObj.date_started.length) {
      date = libraryJsonObj.date_started;
    }
    if (libraryJsonObj.date_finished && libraryJsonObj.date_finished.length) {
      date = libraryJsonObj.date_finished;
    }
    if (libraryJsonObj.reviews && libraryJsonObj.reviews.length && libraryJsonObj.reviews[0]?.date) {
      date = libraryJsonObj.reviews[0].date;
    }
    libraryJsonObj.date = new Date(date).toISOString();
    libraryJsonObj.tags = libraryJsonObj.tags.map((tag) => {
      return tag.trim().replace(" & ", " and ")
    });
		return processObjectToMarkdown(
			"title",
			"content",
			"./src/content/resources/books",
			libraryJsonObj
		)
  });
	return finalActioned;
}

module.exports = {
	writeBooks: async () => {
		//var finishedArray = await Promise.all(quoteArray);
		var result = await writeBookFile();
		return result;
	},
};
