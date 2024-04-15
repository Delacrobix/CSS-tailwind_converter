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
