export function CSS_TO_TAILWIND_PROMPT(code: string) {
  return `Convert the following CSS to Tailwind CSS: 
  ${code}
  The response must be an json object with the key "code" and the value as the converted Tailwind CSS code in string format. Consider de following rules: \n\n - For all elements create a html tag for example, wether the tag is ".container{}" or something similar, create a div tag. \n\n - Don't forget to close the tags \n\n - Don't create any tag "<styles>" with css styles inside. All the styles must be written in tailwind format \n\n - hover styles must be inside the class attribute/prop of the tag \n\n - Put all the styles on the class attribute/prop and the original class name too \n\n - If the class name is a reference to an specific html tag, create a html tag reference, for example for input ".button{}" create a button tag  \n\n - if the classes are nested, must to keep the structure \n\n The idea is have functional components just with your response. `;
}

export function TAILWIND_TO_CSS_PROMPT(code: string) {
  return `Convert the following tailwind styles to CSS code: 
  ${code}
  The response must be an json object with the key "code" and the value as the converted CSS code. Consider de following rules: 
  - The tailwind styles could be inside a 'class' or 'className' attribute/prop of a tag reference. If the styles are inside a class or className attribute of a tag, create a tag selector with the same name of the tag reference and put the styles inside.
  - Try to nest the styles if the html element are nested.
  - Don't create class names selectors on css code, only put correct html selector.
  - Don't use tailwind classes like selectors in the css code.
  - All the selectors must be html elements, don't use class names or id's.
  - I will show you some wrong and correct result examples.
  Correct examples: 
    - nav a:hover {}
    - img {}
    - div span{}
  Wrong examples:
    - .overflow-hidden {}
    - .font-bold {}
    - .text-gray-700 {}
    - #Category {}
    - nav .flex {}`;
}
