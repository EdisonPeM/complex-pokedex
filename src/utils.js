import { isValidElement } from "react";
import { createPortal, render } from "react-dom";
import { POKE_IMAGE_URL } from "./constants";

export const delayTimeOut = (timeOut) =>
  new Promise((resolve) => setTimeout(resolve, timeOut));

export const getRandomInt = (maxValue = 100) =>
  parseInt(Math.random() * maxValue, 10);

export const getIdFromUrl = (url) => parseInt(url.match(/\d+\/$/), 10);

export const getFrontImage = (id) => {
  return `${POKE_IMAGE_URL}/${id}.png`;
};

export const getShinyImage = (id) => {
  return `${POKE_IMAGE_URL}/shiny/${id}.png`;
};

/**
 * Render a React Element in a portal if the targetId exist
 * @param {ReactNode} element Element to render
 * @param {string} targetId html target id
 * @example
 * const POKE_NAV_CONTAINER = "poke-nav";
 * <div>
 *  {renderInPortal(<PokeNav />, POKE_NAV_CONTAINER)}
 * </div>
 */
export const renderInPortal = (element, targetId) => {
  const container = document.getElementById(targetId);
  return container && isValidElement(element)
    ? createPortal(element, container)
    : null;
};

/**
 * Render a react element in a div element
 * @param {ReactNode} jsx React Element to render
 */
export const renderInDiv = (jsx) => {
  const container = document.createElement("div");
  if (isValidElement(jsx)) render(jsx, container);
  return container;
};
