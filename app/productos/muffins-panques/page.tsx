import { Metadata } from "next";
import MuffinsPanquesContent from "./MuffinsPanquesContent";

export const metadata: Metadata = {
    title: "Muffins y Panqués",
};


export default function Pasteles() {
    return <MuffinsPanquesContent />;
}
