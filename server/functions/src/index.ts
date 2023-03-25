import * as functions from "firebase-functions";
import { adminDb } from './firebaseAdmin';
// import * as admin from "firebase-admin";
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

const fetchResults: any = async (id: string) => {
    const api_key = process.env.BRIGHTDATA_API_KEY

    const res = await fetch(`https://api.brightdata.com/dca/dataset?id=${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${api_key}`,
        }
    })

    const data = await res.json();

    console.log('data', data);


    if (data.status === "building" || data.status === "collecting") {
        console.log("NOT COMPLETE YET, TRY AGAIN...");
        return fetchResults(id);

    }

    return data;
}

export const onScraperComplete = functions.https.onRequest(async (request, response) => {

    console.log("SCRAPE COMPLETE >>>> :", request.body);

    const { success, id, finished } = request.body;

    if (!success) {
        await adminDb.collection('searches').doc(id).set({
            status: "error",
            updateAt: finished,
        }, {
            merge: true
        })
    }

    const data = await fetchResults(id);

    await adminDb.collection('searches').doc(id).set({
        status: "complete",
        updatedAt: finished,
        result: data,
    }, {
        merge: true
    })

    response.send("Scraping Function Finished");
});

export const onScraperDelete = functions.https.onRequest(async (request) => {

    console.log("SCRAPE COMPLETE >>>> :", request.body);

    const { collectionId } = request.body;

    const url = `https://api.brightdata.com/datasets/collections/${collectionId}`;
    const api_key = process.env.BRIGHTDATA_API_KEY
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${api_key}`,
        },
    }

    )



    if (response.ok) {
        console.log(`Collection with ID ${collectionId} deleted successfully`);
    } else {
        console.error(`Failed to delete collection with ID ${collectionId}: ${response.status} ${await response.text()}`);
    }



});


// https://75e1-112-134-219-176.ap.ngrok.io/bright-data-web-scraperld/us-central1/onScraperComplete