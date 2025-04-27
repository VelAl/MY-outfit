import Image from "next/image";

import Icon from "@/assets/fade-stagger-circles.svg";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-40">
      <Image src={Icon} alt="loading ..." width={150} height={150} />
    </div>
  );
};

export default Loading;
