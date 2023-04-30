import { ExpoConfig, ConfigContext } from "expo/config";

module.exports = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: "modo",
  name: "modo",
  ios: {
    ...config.ios,
    googleServicesFile:
      process.env.GOOGLE_SERVICES_IOS ?? "./GoogleService-Info.plist",
  },
  extra: {
    apiKey: process.env.MOVIEDB_KEY ?? "",
  },
});
