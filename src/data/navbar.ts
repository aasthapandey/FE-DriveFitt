import { NavbarProps, LoginModalType } from "@/types/staticPages";

export const navbarData: NavbarProps = {
  logo: "/images/drive-wordmark-dark.png",
  navLinks: [
    { title: "Home", href: "/" },
    { title: "Cricket", href: "/cricket" },
    { title: "Fitness", href: "/fitness" },
    { title: "Recovery", href: "/recovery" },
    { title: "Running", href: "/running" },
    { title: "Membership", href: "/membership" },
    { title: "Franchise", href: "/franchise" },
  ],
  signInButton: {
    text: "Sign in",
  },
  loginModalType: LoginModalType.PHONE,
};
