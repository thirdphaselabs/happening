export function nonNullableEnvironmentVariable(key: string): string {
  const value = process.env[key];
  if (value == null) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value;
}