import { Metadata } from "next";
import IndividualesContent from "./IndividualesContent";

export const metadata: Metadata = {
    title: "Individuales",
};


export default function Pasteles() {
    return <IndividualesContent />;
}
