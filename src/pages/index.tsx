import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_DEFAULT_CHANNEL) {
      return;
    }
    const url = new URL(
      process.env.NEXT_PUBLIC_DEFAULT_CHANNEL,
      process.env.NEXT_PUBLIC_FRONTEND_BASE_URL);
    router.push(url);
  }, []);

  return 'Redirecting...';
};

export default Index;
