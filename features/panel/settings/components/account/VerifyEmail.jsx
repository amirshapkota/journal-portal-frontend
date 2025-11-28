"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Loader2, Check } from "lucide-react";
import { useResendVerificationEmail } from "@/features/auth/hooks";

export default function VerifyEmail() {
  const [emailSent, setEmailSent] = useState(false);
  const { mutate: resendVerificationEmail, isPending } =
    useResendVerificationEmail();

  const handleSendVerification = () => {
    resendVerificationEmail(undefined, {
      onSuccess: () => {
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 5000);
      },
    });
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Email Verification</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Verify your email address to access all features
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleSendVerification}
            disabled={isPending || emailSent}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Send Verification Email
              </>
            )}
          </Button>
          {emailSent && (
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <Check className="h-4 w-4" />
              Verification email sent
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
