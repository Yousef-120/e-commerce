import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import payment1 from "../../../assets/payment-methods/payment-1.png";
import payment2 from "../../../assets/payment-methods/payment-2.png";
import payment3 from "../../../assets/payment-methods/payment-3.png";
import payment4 from "../../../assets/payment-methods/payment-4.png";
import payment5 from "../../../assets/payment-methods/payment-5.png";

export const links = [
  {
    sectionName: "Company",
    companyLinks: [
      { name: "About", url: "/" },
      { name: "Features", url: "/" },
      { name: "Works", url: "/" },
      { name: "Career", url: "/" },
    ],
  },
  {
    sectionName: "Help",
    helpLinks: [
      { name: "Customer Support", url: "/" },
      { name: "Delivery Details", url: "/" },
      { name: "Terms & Conditions", url: "/" },
      { name: "Privacy Policy", url: "/" },
    ],
  },
  {
    sectionName: "Faq",
    faqLinks: [
      { name: "Account", url: "/" },
      { name: "Manage Deliveries", url: "/" },
      { name: "Orders", url: "/" },
      { name: "Payments", url: "/" },
    ],
  },
  {
    sectionName: "Resources",
    resourcesLinks: [
      { name: "Free eBooks", url: "/" },
      { name: "Development Tutorial", url: "/" },
      { name: "How to - Blog", url: "/" },
      { name: "Youtube Playlist", url: "/" },
    ],
  },
];

export const socialLinks = [
  { name: "facebook", ico: FaFacebookF, url: "/" },
  { name: "instagram", ico: FaInstagram, url: "/" },
  { name: "twitter", ico: FaTwitter, url: "/" },
  { name: "github", ico: FaGithub, url: "/" },
];

export const paymentMethods = [
  { name: "visa", img: payment1 },
  { name: "mastercard", img: payment2 },
  { name: "paypal", img: payment3 },
  { name: "apple pay", img: payment4 },
  { name: "google pay", img: payment5 },
];
