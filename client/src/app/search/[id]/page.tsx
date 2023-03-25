"use client";

import Results from "@/components/Results";
import { deleteDoc, doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../../../firebase";
import Spinner from "react-spinkit";
import { useRouter } from "next/navigation";

type Props = {
    params: {
        id: string;
    };
};

const SearchPage = ({ params: { id } }: Props) => {
    const [snapshot, loading, error] = useDocument(doc(db, "searches", id));
    const router = useRouter();

    const handleDelete = () => {
        deleteDoc(doc(db, "searches", id));

        fetch("https://us-central1-bright-data-web-scraper.cloudfunctions.net/onScraperDelete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ collectionId: id }),
        });



        router.push("/");
    }

    const deleteButton = (
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg " onClick={handleDelete}>Delete Search</button>
    )

    if (loading) {
        <h1 className="text-center p-10 animate-plus text-xl text-indigo-600/50">
            Loading Results....
        </h1>;
    }

    if (!snapshot?.exists()) return;

    if (snapshot.data()?.status === "pending")
        return (
            <div className="flex flex-col gap-y-5 py-10 items-center justify-between">
                <p className="text-indigo-600 animate-plus text-center"> Scraping result from Amazon...</p>
                <Spinner style={{ height: "100px", width: "100px", }} name="cube-grid" fadeIn="none" color="indigo" />
                {deleteButton}
            </div>
        );

    console.log('snapshot.data()', snapshot.data());

    return (
        <div className="py-5">
            <div className="flex items-center justify-between mb-7">
                <div className="flex flex-col md:flex-row gap-x-4">
                    <h1 className="font-bold">
                        Search result for <span className="text-indigo-600">"{snapshot.data()?.search}"</span>
                    </h1>
                    <p>
                        {snapshot.data()?.result?.length > 0 &&
                            `${snapshot.data()?.result?.length} results found`}
                    </p>
                </div>

                {deleteButton}
            </div>

            {snapshot.data()?.result?.length > 0 && <Results results={snapshot.data()?.result} />}
        </div>
    );
};

export default SearchPage;
