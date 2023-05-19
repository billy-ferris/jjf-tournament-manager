import type { ComponentProps, FC } from "react";
import Image from "next/image";
import classNames from "classnames";
import { AvatarGroup } from "~/components/Avatar/AvatarGroup";
import { AvatarGroupCounter } from "~/components/Avatar/AvatarGroupCounter";

type AvatarColors = "default";
type AvatarSizes = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarImageTheme {
  placeholder: string;
  on: string;
  off: string;
  size: Record<AvatarSizes, number>;
}

interface AvatarInitialsTheme {
  base: string;
  text: string;
}

interface AvatarTheme {
  base: string;
  bordered: string;
  color: Record<AvatarColors, string>;
  img: AvatarImageTheme;
  initials: AvatarInitialsTheme;
  size: Record<AvatarSizes, string>;
  stacked: string;
}

interface AvatarProps extends Omit<ComponentProps<"div">, "color"> {
  alt?: string;
  bordered?: boolean;
  img?: string;
  color?: AvatarColors;
  size?: AvatarSizes;
  stacked?: boolean;
  placeholderInitials?: string;
}

const theme: AvatarTheme = {
  base: "flex justify-center items-center space-x-4 rounded-full",
  bordered: "p-1 ring-2",
  color: {
    default: "ring-gray-300 dark:ring-gray-500",
  },
  img: {
    off: "rounded-full relative overflow-hidden bg-gray-100 dark:bg-gray-600",
    on: "rounded-full",
    placeholder: "absolute w-auto h-auto text-gray-400 -bottom-2",
    size: {
      xs: 6,
      sm: 8,
      md: 10,
      lg: 20,
      xl: 36,
    },
  },
  size: {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-20 h-20",
    xl: "w-36 h-36",
  },
  stacked: "ring-2 ring-gray-300 dark:ring-gray-500",
  initials: {
    text: "font-medium text-gray-600 dark:text-gray-300",
    base: "inline-flex overflow-hidden relative justify-center items-center bg-gray-100 dark:bg-gray-600",
  },
};

export const AvatarComponent: FC<AvatarProps> = ({
  alt = "",
  bordered = false,
  className,
  color = "default",
  img,
  placeholderInitials = "",
  size = "md",
  stacked = false,
  ...props
}) => {
  const imgClassName = classNames(
    bordered && theme.bordered,
    bordered && theme.color[color],
    stacked && theme.stacked,
    theme.img.on,
    theme.size[size]
  );

  const imgProps = {
    alt,
    className: classNames(imgClassName, theme.img.on),
  };
  return (
    <div className={classNames(theme.base, className)} {...props}>
      <div className="relative">
        {img ? (
          <Image
            {...imgProps}
            src={img}
            alt={alt}
            height={theme.img.size[size] * 4}
            width={theme.img.size[size] * 4}
          />
        ) : placeholderInitials ? (
          <div
            className={classNames(
              theme.img.off,
              theme.initials.base,
              stacked && theme.stacked,
              bordered && theme.bordered,
              bordered && theme.color[color],
              theme.size[size]
            )}
          >
            <span className={classNames(theme.initials.text)}>
              {placeholderInitials}
            </span>
          </div>
        ) : (
          <div className={classNames(imgClassName, theme.img.off)}>
            <svg
              className={theme.img.placeholder}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

AvatarComponent.displayName = "Avatar";

export const Avatar = Object.assign(AvatarComponent, {
  Group: AvatarGroup,
  Counter: AvatarGroupCounter,
});
