import vnFlag from "assets/flag/vn.svg";
import jpFlag from "assets/flag/jp.svg";
const nationality = [
  { value: "VN", label: "ベトナム", flag: vnFlag },
  { value: "JP", label: "日本", flag: jpFlag },
  { value: "CN", label: "中国", flag: jpFlag },
  { value: "KR", label: "韓国", flag: jpFlag },
  { value: "US", label: "アメリカ", flag: jpFlag },
  { value: "UK", label: "イギリス", flag: jpFlag },
  { value: "FR", label: "フランス", flag: jpFlag },
  { value: "DE", label: "ドイツ", flag: jpFlag },
  { value: "IT", label: "イタリア", flag: jpFlag },
  { value: "ES", label: "スペイン", flag: jpFlag },
  { value: "OTHER", label: "その他", flag: jpFlag },
] as const;
export default { nationality };
