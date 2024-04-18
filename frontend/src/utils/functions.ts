import cssValidator from "w3c-css-validator";

export function getLanguage(key: string, firstLetter: string) {
  switch (key) {
    case "from":
      if (firstLetter === "c") return "css";
      else return "xml";
    case "to":
      if (firstLetter === "c") return "xml";
      else return "css";
  }
}

export async function codeValidator(code: string, language: string) {
  let result = null;

  if (language === "css") result = await cssValidator.validateText(code);

  if (!result) return { isValid: false, errors: [] };
  return { isValid: result.valid, errors: result.errors };
}
