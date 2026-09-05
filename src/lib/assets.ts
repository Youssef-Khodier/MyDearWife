export function resolveAsset(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.replace(/^(\.\/|\/)/, '');
  const baseUrl = import.meta.env.BASE_URL || '/';
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${base}${cleanPath}`;
}
