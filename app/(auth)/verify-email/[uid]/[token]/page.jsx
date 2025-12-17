'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Check, XCircle, ArrowLeft } from 'lucide-react';
import { useVerifyEmail } from '@/features/auth/hooks';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

const VerifyEmailPage = () => {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const params = useParams();
  const hasVerified = useRef(false);
  const [status, setStatus] = useState('verifying'); // "verifying" | "success" | "error"
  const isAuthenticated = useSelector((state) => state.auth.status);

  const uid = params.uid;
  const token = params.token;

  const { mutateAsync: verifyEmail } = useVerifyEmail();

  useEffect(() => {
    if (uid && token && !hasVerified.current) {
      hasVerified.current = true;

      const verify = async () => {
        try {
          await verifyEmail({ uid, token });
          setStatus('success');

          // Broadcast verification event for cross-tab communication
          if (typeof window !== 'undefined') {
            localStorage.setItem('email-verified', Date.now().toString());
            window.dispatchEvent(new Event('storage'));
          }

          setTimeout(() => {
            // If user is logged in, reload the page to update auth state
            if (isAuthenticated) {
              router.push('/');
            } else {
              router.push('/login');
            }
          }, 3000);
        } catch (error) {
          setStatus('error');
        }
      };

      verify();
    }
  }, [uid, token, router, verifyEmail, isAuthenticated]);

  return (
    <div className="min-h-screen bg-linear-to-br flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center pt-2 mb-2">
            {resolvedTheme === 'dark' ? (
              <Image
                width={200}
                height={100}
                src="/omway-white.png"
                alt="logo"
                className="w-[200px]"
              />
            ) : (
              <Image
                width={200}
                height={100}
                src="/omway-logo.png"
                alt="logo"
                className="w-[200px]"
              />
            )}
          </div>
        </div>

        {/* Verification Card */}
        <Card className="border-0 shadow-xl backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-0">
            <CardTitle className="text-2xl text-center">Email Verification</CardTitle>
            <CardDescription className="text-center">
              {status === 'verifying' && 'Verifying your email address...'}
              {status === 'success' && 'Email verified successfully'}
              {status === 'error' && 'Verification failed'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {status === 'verifying' && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-sm text-muted-foreground text-center">
                  Please wait while we verify your email address...
                </p>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-primary " />
                  <p className="text-sm text-muted-foreground text-center">
                    Redirecting to login page...
                  </p>
                </div>
                <div className="flex items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                    <Check className="h-5 w-5" />
                    <span className="text-sm font-medium">Email verified successfully</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Your email has been verified successfully. You will be redirected to the login
                  page in a few seconds.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-4">
                <div className="flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <XCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Verification failed</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  The verification link is invalid or has expired. Please request a new verification
                  email from your account settings.
                </p>
                <Button variant="outline" className="w-full" onClick={() => router.push('/login')}>
                  Go to Login
                </Button>
              </div>
            )}

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Journal Portal. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
