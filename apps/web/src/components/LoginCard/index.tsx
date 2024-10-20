import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useCallback } from "react";
import { toast } from "@/src/hooks/use-toast";
import { graphQLClient } from "@/src/clients/api";
import { verifyGoogleToken } from "@/src/graphql/query/user";
import { useCurrentUser } from "@/src/hooks/user";

export default function LoginCard() {
  const { user } = useCurrentUser();

  const handleLoginWithGoogle = useCallback(
    async (credential: CredentialResponse) => {
      const token = credential.credential;
      if (!token) {
        toast({
          title: "Failed to login with Google",
          description: "Google token is missing",
          variant: "destructive",
          className: "text-white",
        });
        return;
      }

      let verifiedGoogleToken: any; // Declare outside of try block

      try {
        verifiedGoogleToken = await graphQLClient.request(verifyGoogleToken, {
          token,
        });

        // Handle the response
        if (verifiedGoogleToken.verifyGoogleToken) {
          // Fixed the typo here
          window.localStorage.setItem(
            "_threads_token",
            verifiedGoogleToken.verifyGoogleToken // Ensure this matches the response structure
          );

          toast({
            title: "Login with Google",
            description: "You are logged in with Google",
            className: "text-white",
          });
        } else {
          throw new Error("Invalid token response");
        }
      } catch (error) {
        console.error("Error verifying Google token:", error);
        toast({
          title: "Error",
          description: "Failed to verify Google token",
          variant: "destructive",
          className: "text-white",
        });
      }
    },
    []
  );

  return (
    <Card className="w-[350px] m-6">
      <CardHeader>
        <CardTitle>Login with Google</CardTitle>
        <CardDescription>
          Use your Google account to sign in quickly and securely.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          By logging in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardContent>
      <CardFooter>
        <GoogleLogin
          onSuccess={handleLoginWithGoogle}
          onError={() => {
            toast({
              title: "Failed to login with Google",
              description: "Something went wrong",
              variant: "destructive",
              className: "text-white",
            });
          }}
        />
      </CardFooter>
    </Card>
  );
}
