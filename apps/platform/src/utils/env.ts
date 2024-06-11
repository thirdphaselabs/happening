export function nonNullableEnvironmentVariable(key: string): string {
  const value = process.env[key];
  if (value == null) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value;
}

export const environment = {
  googlePlacesApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY as string,
};
