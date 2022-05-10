import { ReactNode, useState } from "react";
import { Button, Text, TextProps } from "@chakra-ui/react";

interface TruncatedTextProps extends TextProps {
  children: ReactNode;
  truncatedLines: number;
}

export default function TruncatedText({ truncatedLines, ...props }: TruncatedTextProps) {
  const [truncate, setTruncate] = useState<boolean>(true);

  return (
    <>
      <Text {...props} noOfLines={{ base: truncate ? truncatedLines : 0, sm: 0 }}>
        {props.children}
      </Text>
      <Button
        _focus={{
          border: "none",
        }}
        alignSelf={"flex-end"}
        display={{ base: "block", sm: "none" }}
        variant={"unstyled"}
        onClick={() => {
          setTruncate((old) => !old);
        }}
      >
        {truncate ? "seguir" : "ocultar"}
      </Button>
    </>
  );
}
