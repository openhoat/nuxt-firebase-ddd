export const capitalize = (value: string) =>
  value.replace(/(?:^|\s|-)\S/g, (firstLetter) => firstLetter.toUpperCase())
