import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost", "st3.depositphotos.com"]
  }
};

export default withFlowbiteReact(nextConfig);
