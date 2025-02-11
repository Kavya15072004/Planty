import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold">Welcome to Planty!</h1>
      <p>Your online plant nursery.</p>
      <Link href="/shop">
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Shop Now</button>
      </Link>
    </div>
  );
}
