import React from "react";
import sanitizeHtml from 'sanitize-html';
import { getFontSizeForHeading, getTextAlign } from "utils/fonts";

const Heading = ({textAlign, content, level=2}) => {

  const clean = sanitizeHtml(content);
 
  const tag = React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: {__html: clean},
    className: `font-heading max-w-5xl mx-auto my-5 ${getFontSizeForHeading(level)} ${getTextAlign(textAlign)}`
  });
  return tag;
}
export default Heading