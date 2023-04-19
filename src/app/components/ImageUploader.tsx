import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import { useCallback } from "react";
import clsx from "clsx";

interface ImageUploaderResult {
  info: { secure_url: string };
}

interface ImageUploaderProps {
  onChange: (value: string) => void;
  image: string;
}

export const ImageUploader = ({ onChange, image }: ImageUploaderProps) => {
  const handleImageUpload = useCallback(
    (result: ImageUploaderResult) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleImageUpload}
      uploadPreset="ml_default"
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            className={clsx(
              "relative flex cursor-pointer flex-col items-center justify-center border-2   border-neutral-200 p-20 text-neutral-500 transition",
              image ? "border-none" : "border-dashed "
            )}
            onClick={() => {
              open?.();
            }}
          >
            <TbPhotoPlus size={25} />
            <div className="text-sm">Click to upload</div>
            {image && (
              <div className="absolute inset-0 h-full w-full">
                <Image
                  src={image}
                  alt={"upload-image"}
                  className="object-fill"
                  fill
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
