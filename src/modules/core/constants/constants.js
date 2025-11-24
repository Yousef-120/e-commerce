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

export const happyCustomers = [
  {
    stars: 5,
    name: "Sarah M.",
    comment: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`,
  },
  {
    stars: 5,
    name: "Alex K.",
    comment: `"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."`,
  },
  {
    stars: 5,
    name: "James L.",
    comment: `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."`,
  },
  {
    stars: 5,
    name: "Daniel R.",
    comment: `"Excellent quality and service. I love how comfortable the clothes are and how well they hold up after washing."`,
  },
  {
    stars: 5,
    name: "Layla S.",
    comment: `"Shop.co never disappoints! The fabric feels so soft, and the attention to detail is impressive."`,
  },
  {
    stars: 5,
    name: "Omar H.",
    comment: `"Amazing customer support and top-notch quality. I’ve already recommended Shop.co to my friends."`,
  },
];

export const customersReviews = [
  {
    stars: 4.5,
    name: "Samantha D.",
    comment: `"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."`,
    date: "August 15, 2023"
  },
  {
    stars: 4,
    name: "Alex M.",
    comment: `"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."`,
    date: "August 16, 2023"
  },
  {
    stars: 4.5,
    name: "Ethan R.",
    comment: `"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."`,
    date: "August 17, 2023"
  },
  {
    stars: 4,
    name: "Olivia P.",
    comment: `"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out."`,
    date: "August 18, 2023"
  },
  {
    stars: 4,
    name: "Liam K.",
    comment: `"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion."`,
    date: "August 19, 2023"
  },
  {
    stars: 4.5,
    name: "Ava H.",
    comment: `"I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter."`,
    date: "August 20, 2023"
  },
];

export const colors = [
  "#00C12B","#F50606","#F5DD06","#F57906","#06CAF5","#063AF5","#7D06F5","#F506A4","#FFFFFF","#000000"
]

export const categories = [
  {name: 't-shirts' , url: '/'},
  {name: 'shorts' , url: '/'},
  {name: 'shirts' , url: '/'},
  {name: 'hoodie' , url: '/'},
  {name: 'jeans' , url: '/'},
]

export const styles = [
  {name: 'casual' , url: '/'},
  {name: 'formal' , url: '/'},
  {name: 'party' , url: '/'},
  {name: 'gym' , url: '/'},
]