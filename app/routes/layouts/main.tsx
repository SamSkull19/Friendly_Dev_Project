import { Outlet } from "react-router";
import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Friendly DEV" },
        { name: "description", content: "Custom Website Development" },
    ];
}

const HomeLayout = () => {
    return (
        <>
            <section className="max-w-6xl mx-auto px-6 my-8">
                <Outlet />
            </section>
        </>
    );
};

export default HomeLayout;