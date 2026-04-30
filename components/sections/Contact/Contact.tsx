import ContactHeader from "@/components/sections/Contact/ContactHeader";
import ContactLinks from "@/components/sections/Contact/ContactLinks";

export default function Contact() {
  return (
    <section className="w-full min-h-[70vh] flex flex-col justify-center items-center py-20 px-4">
      <div className="max-w-[800px] w-full flex flex-col items-center text-center gap-12">
        <ContactHeader />
        <ContactLinks />
      </div>
    </section>
  );
}
