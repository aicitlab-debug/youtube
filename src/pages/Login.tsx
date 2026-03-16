import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface GoogleJwt {
  name: string;
  email: string;
  picture: string;
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = (response: CredentialResponse) => {
    if (!response.credential) return;
    const decoded = jwtDecode<GoogleJwt>(response.credential);
    login({ name: decoded.name, email: decoded.email, picture: decoded.picture });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-lg flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-2">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary-foreground fill-current">
              <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
            </svg>
          </div>
          <span className="text-2xl font-semibold tracking-tight">YouTube</span>
        </div>

        <div className="text-center">
          <h1 className="text-xl font-semibold">Sign in</h1>
          <p className="text-sm text-muted-foreground mt-1">to continue to YouTube</p>
        </div>

        <div className="w-full flex flex-col items-center gap-3">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.error("Google sign-in failed")}
            width="100%"
            theme="outline"
            size="large"
            shape="pill"
          />
        </div>

        <p className="text-xs text-muted-foreground text-center">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
