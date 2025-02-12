import { unstable_cache } from "next/cache";

export const getBase64ImageUrl = unstable_cache(
  async (publicId: string): Promise<string> => {
    const blurUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/w_50,h_50,c_fill,e_blur:1000,f_auto,q_auto:low/${publicId}`;

    try {
      const response = await fetch(blurUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      }
      const buffer = await response.arrayBuffer();
      return `data:image/jpeg;base64,${Buffer.from(buffer).toString("base64")}`;
    } catch (error) {
      console.error("Error fetching blurred image:", error);
      return "";
    }
  },
  ["base64-image"],
  { revalidate: 3600 } // Cache for 1 hour
);
