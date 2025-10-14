import Hero from "~/components/Hero";
import type { Route } from "./+types/index";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Friendly DEV | Home" },
        { name: "description", content: "Custom Website Development" },
    ];
}

export default function Home() {
    return <Hero name="Samin"/>;
}
