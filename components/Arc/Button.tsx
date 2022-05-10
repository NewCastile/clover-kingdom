import { TriangleDownIcon } from "@chakra-ui/icons";
import { Button, IconProps } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface ArcButtonProps {
  toggled: boolean;
  handler: () => void;
  children: ReactNode | ReactNode[];
}

const MotionArrow = motion<IconProps>(TriangleDownIcon);

export default function ArcButton({ children, toggled, handler }: ArcButtonProps) {
  const controls = useAnimation();

  useEffect(() => {
    toggled ? controls.start({ rotate: "0deg" }) : controls.start({ rotate: "-90deg" });
  }, [toggled]);

  return (
    <Button onClick={handler}>
      <MotionArrow animate={controls} />
      {children}
    </Button>
  );
}
