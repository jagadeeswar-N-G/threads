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

export default function LoginCard() {
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
      const verifiedGoogleToken: any = await graphQLClient.request(
        verifyGoogleToken,
        { token: token }
      );
      toast({
        title: "Login with Google",
        description: "You are logged in with Google",
        className: "text-white",
      });
      console.log(verifiedGoogleToken);

      if (verifiedGoogleToken.vefifyGoogleToken)
        window.localStorage.setItem(
          "_threads_token",
          verifiedGoogleToken.vefifyGoogleToken
        );
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
