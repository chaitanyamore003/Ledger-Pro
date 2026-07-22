import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

  const inputClass = `w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-center text-3xl font-bold text-slate-900 transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:bg-slate-950 dark:focus:ring-indigo-500/20 ${
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
    <div className="w-full max-w-2xl">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
          Verify Your Email
        </h2>

        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-indigo-600 dark:bg-indigo-400" />

        <p className="mt-4 text-slate-500 dark:text-slate-400">
          We've sent a verification code to
        </p>

        <p className="font-semibold text-indigo-600 dark:text-indigo-300">
          {email}
        </p>
      </div>

      {errors.length > 0 && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-900/70 dark:bg-red-950/40">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700 dark:bg-red-500/10 dark:text-red-300">
              !
            </span>

            <h3 className="font-semibold text-red-700 dark:text-red-300">
              Verification Failed
            </h3>
          </div>

          <ul className="list-disc space-y-1 pl-6 text-sm text-red-600 dark:text-red-200">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-5 dark:border-green-900/70 dark:bg-green-950/40">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 dark:bg-green-500/10 dark:text-green-300">
              OK
            </span>

            <p className="font-medium text-green-700 dark:text-green-300">
              {success}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-6">
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
          className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 dark:from-indigo-500 dark:to-indigo-600"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      <div className="mt-8 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Didn't receive the verification code?
        </p>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="mt-2 font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline disabled:opacity-60 dark:text-indigo-300 dark:hover:text-indigo-200"
        >
          {resending ? "Sending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
