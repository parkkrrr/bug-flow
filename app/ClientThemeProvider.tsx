import React from "react";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

interface Props {
  children: React.ReactNode;
}

const ClientThemeProvider = ({ children }: Props) => {
  return (
    <Theme accentColor="violet" radius="large">
      {children}
    </Theme>
  );
};

export default ClientThemeProvider;
