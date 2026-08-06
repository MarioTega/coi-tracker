import Link from 'next/link';

export default function Home() {
  return (
    <main>
    <p>Your Content Here</p>
    <Link href="/sign-up">
    <button>Sign Up!</button>
    </Link>
    </main>
    
  
  );
}
