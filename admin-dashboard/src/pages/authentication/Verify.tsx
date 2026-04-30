import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo from "components/common/Logo";

export default function Verify() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");
  const hasVerified = useRef(false);

  useEffect(() => {
    if (hasVerified.current) return;
    
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Missing verification token.");
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage("Your email has been verified! You can now log in.");
          hasVerified.current = true;
        } else {
          setStatus("error");
          setMessage(data.error || "Verification failed.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("error");
        setMessage("Network error. Please try again.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <Card className="shadow-lg border border-gray-200 py-6" style={{ backgroundColor: '#fcfcfc' }}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Logo showName={true} />
            </div>
            <CardTitle className="text-xl font-bold text-gray-900">Email Verification</CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-6" style={{ padding: '32px' }}>
            <div className="flex justify-center">
              {status === "loading" && (
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              )}
              {status === "success" && (
                <div className="bg-green-100 p-3 rounded-full">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              {status === "error" && (
                <div className="bg-red-100 p-3 rounded-full">
                  <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
            </div>

            <p className={`text-sm font-medium ${status === "error" ? "text-red-600" : "text-gray-600"}`}>
              {message}
            </p>

            <div className="pt-4">
              <Button 
                onClick={() => navigate("/auth/login")} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11"
              >
                Go to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
