import ClientPage from "@/components/client-page-wrapper";

export default function Home() {
  const locationParams = {
    postcode: "NR32",
    area: "Lowestoft",
  };

  return <ClientPage locationParams={locationParams} />;
}
