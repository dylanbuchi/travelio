import { ImageUploader } from "../ImageUploader";
import { ModalContentLayout } from "./ModalContentLayout";

interface ImageUploaderModalContentProps {
  image: string;
  onChange: (imgSrc: string) => void;
}

export const ImageUploaderModalContent = ({
  image,
  onChange,
}: ImageUploaderModalContentProps) => {
  return (
    <ModalContentLayout
      title="Add a picture of your place"
      subtitle="Show your guests how your place looks"
    >
      <ImageUploader onChange={(value) => onChange(value)} image={image} />
    </ModalContentLayout>
  );
};
