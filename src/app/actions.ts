"use server";

import { verifyCaptchaToken } from "@/utils/captcha";

export async function contactUsAction(
  token: string | null,
  formData: FormData
) {
  if (!token) {
    return {
      success: false,
      message: "Token not found",
    };
  }

  // Verify the token
  const captchaData = await verifyCaptchaToken(token);

  if (!captchaData) {
    return {
      success: false,
      message: "Captcha Failed",
    };
  }

  if (!captchaData.success || captchaData.score < 0.5) {
    return {
      success: false,
      message: "Captcha Failed",
      errors: !captchaData.success ? captchaData["error-codes"] : undefined,
    };
  }

  // Do anything with the formData
  return {
    success: true,
    message: "Message sent successfully!",
  };
}
