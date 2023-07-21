export function convertStatusToName(status) {
  switch (status.toLowerCase()) {
    case "bpjs":
      return "BPJS";
    case "mandiri":
      return "Mandiri";
    default:
      return "";
  }
}

//short, mid, long

export function convertWindowToName(window) {
  switch (window.toLowerCase()) {
    case "short":
      return "< 4,5 jam";
    case "mid":
      return "< 4,5 jam - 24 jam";

    case "long":
      return "> 24 jam";
    default:
      return "";
  }
}
