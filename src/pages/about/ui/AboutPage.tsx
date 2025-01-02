import { useSearchParams } from "react-router-dom";

export function AboutPage() {
  const [searchParams] = useSearchParams();

  const name = searchParams.get("name");
  const groups = searchParams.getAll("groups");

  return (
    <div>
      <h1>About Hello</h1>
      <div>name: {name}</div>
      <div>groups: {groups.toString()}</div>
    </div>
  );
}
