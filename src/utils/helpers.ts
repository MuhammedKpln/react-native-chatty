import type { IUrlPreviewBubble } from 'src/types/Chatty.types';

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const extractUrlFromString = (string: string): string | null => {
  const regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm;
  const match = string.match(regex);

  if (match && match.length > 0) {
    return match[0];
  }

  return null;
};

export const fetchMetaData = async (
  url: string
): Promise<IUrlPreviewBubble | null> => {
  const response = await fetch(url);
  const text = await response.text();

  const ogImage = new RegExp('<meta.*property="og:image".*content="(.*)".*/>');
  const ogTitle = new RegExp('<meta.*property="og:title".*content="(.*)".*/>');
  const ogDescription = new RegExp(
    '<meta.*property="og:description".*content="(.*)".*/>'
  );

  const image = text.match(ogImage);
  const title = text.match(ogTitle);
  const description = text.match(ogDescription);

  if (image && title && description) {
    return {
      image: image[1],
      title: title[1],
      description: description[1],
      url,
    };
  }

  return null;
};
