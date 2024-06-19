export function nonNullableEnvironmentVariable(key: string): string {
  const value = process.env[key];
  if (value == null) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value;
}

export const environment = {
  googlePlacesApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY as string,
  apiUrl: process.env.NEXT_PUBLIC_API_URL as string,
  appUrl: process.env.NEXT_PUBLIC_APP_URL as string,
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
  domain: process.env.NEXT_PUBLIC_DOMAIN as string,
};
