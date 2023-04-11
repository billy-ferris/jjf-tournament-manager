import type { ComponentProps, FC, PropsWithChildren } from "react";
import classNames from "classnames";

type AvatarGroupProps = PropsWithChildren<ComponentProps<"div">>;

interface AvatarGroupTheme {
  base: string;
}

const theme: AvatarGroupTheme = {
  base: "flex -space-x-4",
};

export const AvatarGroup: FC<AvatarGroupProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={classNames(theme.base, className)} {...props}>
      {children}
    </div>
  );
};

AvatarGroup.displayName = "AvatarGroup";
