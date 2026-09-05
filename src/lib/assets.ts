export function resolveAsset(path: string): string {
  if (!path) return '';

  // Return full URLs and data URIs as is
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const rawBase = import.meta.env.BASE_URL || '/';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  // Remove leading './' or '/'
  const cleanPath = path.replace(/^(\.\/|\/)/, '');

  // If the path is already prefixed with the base path, don't duplicate
  const cleanBase = base.replace(/^\//, '');
  if (cleanBase && cleanPath.startsWith(cleanBase)) {
    return `/${cleanPath}`;
  }

  return `${base}${cleanPath}`;
}
