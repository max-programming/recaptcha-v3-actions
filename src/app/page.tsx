import { ContactForm } from "./_components/contact-form";

export default function Home() {
  return (
    <main className="container mx-auto flex items-center h-screen justify-center">
      <div className="flex justify-center items-center border-2 rounded-md p-10">
        <ContactForm />
      </div>
    </main>
  );
}
