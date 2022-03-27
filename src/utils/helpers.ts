import type { IUrlPreviewBubble } from 'src/types/Chatty.types';

/**
 * `wait` is a function that returns a promise that resolves after a given number of milliseconds
 * @param {number} ms - number
 */
export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * It takes a string and returns the first URL found in the string
 * @param {string} string - The string to extract the URL from.
 * @returns The first match of the regex.
 */
export const extractUrlFromString = (string: string): string | null => {
  const regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm;
  const match = string.match(regex);

  if (match && match.length > 0) {
    return match[0];
  }

  return null;
};

/**
 * It takes a URL, fetches the HTML from that URL, and then parses the HTML for the og:image, og:title,
 * and og:description meta tags. If all three of these meta tags are found, it returns a
 * UrlPreviewBubble object with the image, title, and description. If any of these meta tags are
 * missing, it returns null
 * @param {string} url - The URL of the page to fetch.
 * @returns An object with the following properties:
 */
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
