import { Metadata } from "next";
import BrowniesContent from "./BrowniesContent";

export const metadata: Metadata = {
    title: "Brownies",
};

export default function Brownies() {
    return <BrowniesContent />;
}
