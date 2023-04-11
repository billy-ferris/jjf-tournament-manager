import type { ComponentProps, FC, PropsWithChildren } from "react";
import classNames from "classnames";

interface AvatarGroupCounterProps
  extends PropsWithChildren<ComponentProps<"a">> {
  total?: number;
}

interface AvatarGroupCounterTheme {
  base: string;
}

const theme: AvatarGroupCounterTheme = {
  base: "relative flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full ring-2 ring-gray-300 hover:bg-gray-600 dark:ring-gray-500",
};

export const AvatarGroupCounter: FC<AvatarGroupCounterProps> = ({
  className,
  href,
  total,
  ...props
}) => {
  return (
    <a href={href} className={classNames(theme.base, className)} {...props}>
      +{total}
    </a>
  );
};

AvatarGroupCounter.displayName = "AvatarGroupCounter";
