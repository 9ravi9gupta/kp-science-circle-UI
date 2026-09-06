'use client';

import { useEffect } from 'react';

export default function BodyLoadedEffect() {
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => document.body.classList.add('loaded'))
    );
    return () => cancelAnimationFrame(id);
  }, []);

  return null;
}
