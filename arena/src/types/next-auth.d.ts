export declare module "next-auth" {
  interface Session {
    user: {
      /** The user's name. */
      fullname: string;
      id: string;
      image: string;
      email: string;
      username: string;
    };
  }
}
