
import Image from "next/image";

interface AssetInformationProps {
  data: {
    imageUrl: string
    label: string
  }
}

export function AssetInformation({ data }: AssetInformationProps) {
  return (
    <div className="flex items-center gap-4 ">
      <Image src={data.imageUrl}
        width={30}
        height={30}

        alt={data.label} />

      <span>{data.label}</span>
    </div>
  )
}