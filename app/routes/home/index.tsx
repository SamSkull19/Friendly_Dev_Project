import type { Route } from "./+types/index";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Friendly DEV | Home" },
        { name: "description", content: "Custom Website Development" },
    ];
}

export default function Home() {
    return <section>Home Page</section>;
}
