import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { verifyEmail, resendOtp } from "../../services/authApi";

function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState([]);

  const inputClass = `w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-3xl font-bold text-slate-900 shadow-sm transition placeholder:text-base placeholder:font-medium placeholder:tracking-normal placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20 ${
    otp ? "tracking-[0.5em]" : "tracking-normal"
  }`;

  const handleVerify = async (e) => {
    e.preventDefault();

    setErrors([]);
    setSuccess("");

    if (!otp.trim()) {
      setErrors(["OTP is required."]);
      return;
    }

    if (otp.length !== 6) {
      setErrors(["OTP must contain exactly 6 digits."]);
      return;
    }

    try {
      setLoading(true);

      const { data } = await verifyEmail({
        email,
        otp,
      });

      setSuccess(data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setErrors([error.response?.data?.message || "Something went wrong."]);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);

      const { data } = await resendOtp(email);

      setSuccess(data.message);
      setErrors([]);
    } catch (error) {
      setErrors([error.response?.data?.message || "Unable to resend OTP."]);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full">
      {/* Heading */}

      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFBA7D]">
          Email Verification
        </p>

        <h2 className="mt-4 text-4xl font-bold tracking-tight text-black dark:text-white">
          Verify your email.
        </h2>

        <p className="mt-4 max-w-lg leading-7 text-neutral-600 dark:text-neutral-400">
          Enter the 6-digit verification code sent to
        </p>

        <p className="mt-2 break-all font-semibold text-black dark:text-white">
          {email}
        </p>
      </div>

      {/* Error */}

      {errors.length > 0 && (
        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/30">
          <p className="mb-2 font-semibold text-red-600">Verification failed</p>

          <ul className="list-disc space-y-1 pl-5 text-sm text-red-500">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Success */}

      {success && (
        <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900/40 dark:bg-green-950/30">
          <p className="font-medium text-green-700 dark:text-green-300">
            {success}
          </p>
        </div>
      )}

      {/* Form */}

      <form onSubmit={handleVerify} className="space-y-8">
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Verification Code
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 6-digit code"
            className={`${inputClass} text-center text-3xl font-semibold tracking-[0.6em]`}
          />

          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            This verification code expires in 10 minutes.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#FFBA7D] text-lg font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <svg
                className="h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Verifying...
            </>
          ) : (
            <>
              Verify Email
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {/* Resend */}

      <div className="mt-10 border-t border-black/10 pt-8 text-center dark:border-white/10">
        <p className="text-neutral-600 dark:text-neutral-400">
          Didn't receive the code?
        </p>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="mt-3 font-semibold text-[#FFBA7D] transition hover:opacity-80 disabled:opacity-60"
        >
          {resending ? "Sending..." : "Resend Verification Code"}
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
