import React, { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

const Index: FC = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/group');
  }, [router]);

  return null;
};

export default Index;
