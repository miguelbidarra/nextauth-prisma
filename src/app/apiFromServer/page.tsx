
export default async function APIFromServer() {
  const resp = await fetch("http://localhost:3000/api/whoAmI", {
    method: "GET",
  }).then((res) => res.json());

  return (
    <div>
      <div>
        API Route From <span className="font-bold underline">Server</span>
      </div>
      <div>Name: {resp?.email}</div>
    </div>
  );
}