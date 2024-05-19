import Navbar from "@/components/navbar";
import SearchForm from "@/components/search-form";

export default function Home() {
  return (
    <div className="container">
      <Navbar />

      <main>
        <SearchForm />
      </main>
    </div>
  );
}
