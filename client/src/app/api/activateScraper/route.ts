import { adminDb } from "@/../firebaseAdmin";

type Data = {
  collection_id: string;
  start_eta: number;
};
export async function POST(req: Request, res: Response) {
  try {
    const { search } = await req.json();
    console.log("SEARCH IS >>>", search);

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
    console.log("DATA IS >>>>>", data);

    const { collection_id, start_eta } = data;

    await adminDb.collection("searches").doc(collection_id).set({
      search,
      start_eta,
      status: "pending",
      updateAt: start_eta,
    });

    return new Response(
      JSON.stringify({
        collection_id,
        start_eta,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {}
