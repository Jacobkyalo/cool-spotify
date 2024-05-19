import Link from "next/link";

export default function Navbar() {
  return (
    <header className="py-6">
      <Link href="/">
        <h1 className="text-3xl font-bold text-green-600">CoolSpotify</h1>
      </Link>
    </header>
  );
}
