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
        <form className="flex flex-col gap-4 max-w-[500px] ">
          <div className="flex max-[400px]:flex-col items-center gap-3 w-full">
            <input
              className="input"
              name="name"
              placeholder="Name"
              type="text"
              minLength={3}
              maxLength={50}
              required
            />
            <input
              className="input"
              name="email"
              placeholder="Email Address"
              type="email"
              minLength={5}
              maxLength={50}
              required
            />
          </div>

          <input
            className="input"
            name="subject"
            placeholder="Subject"
            type="text"
            minLength={5}
            maxLength={50}
            required
          />
          <textarea
            className="input"
            minLength={7}
            rows={4}
            maxLength={500}
            name="message"
            placeholder="Message"
            required
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
