"use client";

import type { FormEvent } from "react";
import toast from "react-hot-toast";
import { contactUsAction } from "../actions";
import { getCaptchaToken } from "@/utils/captcha";

export function ContactForm() {
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const loadingToast = toast.loading("Sending message...");

    const token = await getCaptchaToken();
    const res = await contactUsAction(token, formData);
    toast.dismiss(loadingToast);

    if (res.success) {
      toast.success(res.message);
      form.reset();
    } else {
      toast.error(res.message);
    }
  }

  return (
    <form className="flex items-center flex-col gap-3" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold">Contact Us</h2>
      <input
        type="name"
        placeholder="Name"
        name="name"
        className="p-2.5 text-lg w-full rounded-md focus:ring-2 focus:ring-blue-300 bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="p-2.5 text-lg w-full rounded-md focus:ring-2 focus:ring-blue-300 bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
      />
      <textarea
        placeholder="Message"
        name="message"
        className="p-2.5 text-lg w-full rounded-md focus:ring-2 focus:ring-blue-300 bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
      ></textarea>
      <button
        type="submit"
        className="text-lg w-full bg-blue-800 text-white rounded-md p-2.5 focus:ring-2 focus:ring-blue-300 g-recaptcha"
      >
        Submit
      </button>
    </form>
  );
}
