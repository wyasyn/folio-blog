import ContactForm from "@/components/ContactForm";

export default function page() {
  return (
    <div id="contact">
      <small className="uppercase text-primary">Contact</small>
      <h2 className="capitalize text-4xl my-4">Let’s Connect</h2>
      <p className="max-w-[35ch]">
        Have a project in mind or want to collaborate? I’d love to hear from
        you! Reach out and let’s get started.
      </p>

      <div className="my-[3rem]">
        <ContactForm />
      </div>
    </div>
  );
}
