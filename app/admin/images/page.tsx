import ImageGallery from "@/components/AdminImages";
import ImageUploadForm from "@/components/image-upload";

export default function page() {
  return (
    <section className="py-14">
      <ImageUploadForm />
      <ImageGallery />
    </section>
  );
}
