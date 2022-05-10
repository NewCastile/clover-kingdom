import { ReactNode } from "react";
export interface ChapterPaneProps {
  direction: "left" | "right";
  children?: ReactNode | ReactNode[];
}
