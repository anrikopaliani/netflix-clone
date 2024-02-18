"use client";
import GoogleIcon from "../../public/google.svg";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function GoogleSignInButton() {
  return (
    <Button variant="outline" size="icon">
      <Image src={GoogleIcon} alt="google icon" className="w-6 h-6" />
    </Button>
  );
}
