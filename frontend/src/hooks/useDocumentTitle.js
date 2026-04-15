import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — 3DSAN` : '3DSAN | Impresiones 3D Profesionales';
    return () => {
      document.title = '3DSAN | Impresiones 3D Profesionales';
    };
  }, [title]);
}
