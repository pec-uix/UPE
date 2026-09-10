export const useAssetPath = () => {
  const baseURL = useRuntimeConfig().app.baseURL || "/";
  const normalizedBase = baseURL.endsWith("/") ? baseURL : `${baseURL}/`;

  return (assetPath: string) => {
    if (!assetPath || /^(https?:|mailto:|tel:|#)/.test(assetPath)) {
      return assetPath;
    }

    return `${normalizedBase}${assetPath.replace(/^\//, "")}`;
  };
};
