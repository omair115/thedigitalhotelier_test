import { FC } from "react";
import { PageLayoutWrapper, ChildrenWrapper } from "./AppLayout.styled";

interface Props {
  children?: React.ReactNode;
}

const AppMainLayout: FC<Props> = ({ children }) => {
  return (
    <PageLayoutWrapper>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </PageLayoutWrapper>
  );
};

export default AppMainLayout;
