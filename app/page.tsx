import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function HomePage() {
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth-token');

  if (authToken) {
    redirect('/notes');
  } else {
    redirect('/login');
  }
}
