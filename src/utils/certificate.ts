import n1 from "assets/certificate/N1.jpeg";
import n2 from "assets/certificate/N2.svg";
import n3 from "assets/certificate/N3.jpg";
import n4 from "assets/certificate/N4.jpeg";
import n5 from "assets/certificate/N5.jpg";

const CERTIFICATE_IMAGES = [n1, n2, n3, n4, n5];
export const getCertificateImage = (value: number) => {
  return CERTIFICATE_IMAGES[value - 1];
};
