import Hero from "@/components/sections/Hero/Hero";
import { getHomeConfiguration } from "@/lib/home";

export const dynamic = "force-dynamic";
export default async function Home() {
  const { settings, projects } = await getHomeConfiguration();
  return (
    <main>
      <Hero projects={projects} settings={settings} />
    </main>
  );
}
