export function CSS_TO_TAILWIND_PROMPT(code: string) {
  return `Convert the following CSS to Tailwind CSS: \n\n${code} \n\n the response must be an json object with the key "tailwindCSS" and the value as the converted Tailwind CSS code. Consider de following rules: \n\n - For all elements create a html tag for example, wether the tag is ".container{}" or something similar, create a div tag. \n\n - Don't forget to close the tags \n\n - Don't create any tag "<styles>" with css styles inside. All the styles must be written in tailwind format \n\n - hover styles must be inside the class attribute/prop of the tag \n\n - Put all the styles on the class attribute/prop and the original class name too \n\n - If the class name is a reference to an specific html tag, create a html tag reference, for example for ".button{}" create a button tag  \n\n - if the classes are nested, must to keep the structure \n\n The idea is have functional components just with your response. `;
}

export function TAILWIND_TO_CSS_PROMPT(code: string) {
  return `Convert the following Tailwind CSS to CSS: \n\n${code} \n\n the response must be an json object with the key "css" and the value as the converted CSS code.`;
}
