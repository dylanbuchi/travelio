export const AUTH_CONFIG = {
  githubProvider: {
    clientId: process.env.GITHUB_AUTH_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET as string,
  },
  googleProvider: {
    clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
  },
  nextAuth: {
    secret: process.env.NEXTAUTH_SECRET as string,
  },
};
