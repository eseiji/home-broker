import { twMerge } from "tailwind-merge";
import Image from "next/image";

interface AssetInformationProps {
  data: {
    imageUrl: string
    label: string
  }
  image?: {
    width?: number
    height?: number
  }
  classNames?: {
    container?: string
    label?: string
  }
}

export function AssetInformation({ data, image, classNames }: AssetInformationProps) {
  return (
    <div className={twMerge("flex items-center gap-4 ", classNames?.container)}>
      <Image src={data.imageUrl}
        width={image?.width || 30}
        height={image?.height || 30}
        alt={data.label} />

      <span className={twMerge("", classNames?.label)}>{data.label}</span>
    </div>
  )
}