import { adminDb } from "@/../firebaseAdmin";
import axios from "axios";

export async function POST(req: Request, res: Response) {
  try {
    const { search } = await req.json();
    const response = await fetch(
      `https://api.brightdata.com/dca/trigger?collector=c_lewyqo3w1aaxnzuo1h&queue_next=1`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search,
        }),
      }
    );

    const data = await response.json();
    const { collection_id, start_eta } = data;

    await adminDb.collection("searches").doc(collection_id).set({
      search,
      start_eta,
      status: "pending",
      updatedAt: start_eta,
    });
    const url = `https://api.brightdata.com/dca/dataset?id=${collection_id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.BRIGHTDATA_API_KEY}`,
      },
    };


    await axios.get(url, config)
      .then(async (response: any) => {
        const status = response.data.status ?? "";
        if (!status) {
          await adminDb.collection("searches").doc(collection_id).set(
            {
              status: "complete",
              updatedAt: start_eta,
              result: response.data,
            },
            {
              merge: true,
            }
          );
        } else {
          await adminDb.collection("searches").doc(collection_id).set({
            result: response.data,
          },
            {
              merge: true,
            }
          );
        }
      })
      .catch((error: any) => {
        console.log(error);
      });



    return new Response(
      JSON.stringify({
        collection_id,
        start_eta,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return (
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
