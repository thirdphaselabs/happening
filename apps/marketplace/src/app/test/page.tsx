import { serverClient } from "../../trpc/server";
import { AllExamples } from "./_components/AllExamples";
import { NewExample } from "./_components/NewExample";

export default async function Home() {
  const data = await serverClient.event.all.query();

  return (
    <div>
      <h1>Home</h1>

      <NewExample />

      <AllExamples initialExamples={data} />
    </div>
  );
}
