import { Metadata } from "next";
import PastelesContent from "./PastelesContent";

export const metadata: Metadata = {
    title: "Pasteles",
};


export default function Pasteles() {
    return <PastelesContent />;
}
