import { $, component$, useStore } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useAddProduct } from "~/routes/admin";
import { uploadManager } from "../utils/data";

export default component$(() => {
  const { submit, value } = useAddProduct();
  const selectedImages = useStore({
    images: [] as string[],
  });
  const handleFormSubmit = $(async (e: Event, el: HTMLFormElement) => {
    e.preventDefault();
    const formData = new FormData(el);
    const images = formData.getAll("images") as File[];

    const res = images.map(async (image) => {
      const { fileUrl } = await uploadManager.upload({ data: image });
      return {
        url: fileUrl,
        alt: image.name,
      };
    });
    const urls = await Promise.all(res);
    await submit({
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      images: urls,
    });
    el.reset();
  });

  const handleFileChange = $(async (e: Event, el: HTMLInputElement) => {
    for (let i = 0; i < el.files!.length; i++) {
      const blob = URL.createObjectURL(el.files!.item(i)!);
      selectedImages.images.push(blob);
    }
  });

  return (
    <Form onSubmit$={handleFormSubmit} enctype="multipart/form-data">
      <div class="join join-vertical gap-1">
        <input
          type="text"
          name="name"
          placeholder="Name"
          class="input join-item input-bordered"
          aria-errormessage={value?.fieldErrors?.name}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          class="input join-item input-bordered"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          inputMode="decimal"
          class="input join-item input-bordered"
          aria-errormessage={value?.fieldErrors?.price}
          required
        />
        <input
          type="file"
          name="images"
          onChange$={handleFileChange}
          multiple
          class="file-input join-item input-bordered w-full max-w-xs"
          accept="image/*"
        />
        <button type="submit" class="btn join-item">
          Submit
        </button>
      </div>
      {value?.success && (
        <div class="toast toast-center toast-top">
          <div class="alert alert-success">
            <span>{value.message}</span>
          </div>
        </div>
      )}
    </Form>
  );
});
