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
      <div className="mb-8">
        <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
          Email verification
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Verify your email
        </h2>

        <p className="mt-3 leading-7 text-slate-500 dark:text-slate-400">
          Enter the 6-digit code sent to{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            {email}
          </span>
          .
        </p>
      </div>

      {errors.length > 0 && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50/80 p-4 dark:border-red-900/70 dark:bg-red-950/40">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700 dark:bg-red-500/10 dark:text-red-300">
              !
            </span>

            <div>
              <h3 className="font-semibold text-red-700 dark:text-red-300">
                Verification Failed
              </h3>

              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-600 dark:text-red-200">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-900/70 dark:bg-emerald-950/40">
          <p className="font-medium text-emerald-700 dark:text-emerald-300">
            {success}
          </p>
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Verification Code
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 6-digit OTP"
            className={inputClass}
          />

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            This verification code expires in 10 minutes.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-700 px-4 py-3 font-semibold text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          {loading ? (
            "Verifying..."
          ) : (
            <>
              Verify Email
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm dark:border-slate-800">
        <span className="text-slate-600 dark:text-slate-400">
          Didn't receive the verification code?
        </span>{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="font-semibold text-indigo-700 transition hover:text-indigo-800 hover:underline disabled:opacity-60 dark:text-indigo-300 dark:hover:text-indigo-200"
        >
          {resending ? "Sending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
