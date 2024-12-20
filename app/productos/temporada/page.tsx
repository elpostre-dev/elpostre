import { Metadata } from "next";
import TemporadaContent from "./TemporadaContent";

export const metadata: Metadata = {
    title: "Temporada",
};


export default function Pasteles() {
    return <TemporadaContent />;
}
