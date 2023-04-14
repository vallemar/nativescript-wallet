import { isAndroid } from "@nativescript/core"
import { Card, Transaction } from "./types";

export const HEIGH_CARD = isAndroid ? 220 : 200;

export const dataCards: Card[] = [{
  bg: "linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(245,144,2,1) 100%)",
  imgType: "~/assets/master-card.png",
}, {
  bg: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
  imgType: "~/assets/visa-card.png",
}, {
  bg: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
  imgType: "~/assets/master-card.png",
}];

export const transactions: Transaction[] = [
  {
    id: 1,
    title: "Amazon",
    subTitle: "Groceries",
    date: new Date(),
    image: `~/assets/list/amazon.png`,
    price: 100,
  },
  {
    id: 2,
    title: "Apple",
    subTitle: "Electronics",
    date: new Date(),
    image: `~/assets/list/apple.png`,
    price: 200,
  },
  {
    id: 3,
    title: "Dribbble",
    subTitle: "Design",
    date: new Date(),
    image: `~/assets/list/dribble.png`,
    price: 50,
  },
  {
    id: 4,
    title: "GitHub",
    subTitle: "Code",
    date: new Date(),
    image: `~/assets/list/github.png`,
    price: 75,
  },
  {
    id: 5,
    title: "Instagram",
    subTitle: "Social Media",
    date: new Date(),
    image: `~/assets/list/instagram.png`,
    price: 150,
  },
  {
    id: 6,
    title: "Figma",
    subTitle: "Design Tool",
    date: new Date(),
    image: `~/assets/list/figma.png`,
    price: 120,
  },
  {
    id: 7,
    title: "Twitter",
    subTitle: "Social Media",
    date: new Date(),
    image: `~/assets/list/twitter.png`,
    price: 90,
  },
  {
    id: 8,
    title: "Spotify",
    subTitle: "Music Streaming",
    date: new Date(),
    image: `~/assets/list/spotify.png`,
    price: 60,
  },
  {
    id: 9,
    title: "Netflix",
    subTitle: "Video Streaming",
    date: new Date(),
    image: `~/assets/list/netflix.png`,
    price: 80,
  },
  {
    id: 10,
    title: "Dropbox",
    subTitle: "Cloud Storage",
    date: new Date(),
    image: `~/assets/list/dropbox.png`,
    price: 55,
  },
];