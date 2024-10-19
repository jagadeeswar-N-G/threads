import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import {CredentialResponse, GoogleLogin} from "@react-oauth/google"


export default function LoginCard() {
  return (
    <Card className="w-[350px] m-6">
      <CardHeader>
        <CardTitle>Login with Google</CardTitle>
        <CardDescription>Use your Google account to sign in quickly and securely.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          By logging in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardContent>
      <CardFooter>
        <GoogleLogin onSuccess={(credentialResponse: CredentialResponse) => {
          console.log(credentialResponse)
        }}/>
      </CardFooter>
    </Card>
  )
}