import { Metadata } from "next";
import GalletasContent from "./GalletasContents";

export const metadata: Metadata = {
    title: "Galletas",
};


export default function Pasteles() {
    return <GalletasContent />;
}
